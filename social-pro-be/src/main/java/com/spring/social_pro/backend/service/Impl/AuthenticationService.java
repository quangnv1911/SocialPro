package com.spring.social_pro.backend.service.Impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.openid.connect.sdk.AuthenticationResponse;
import com.spring.social_pro.backend.dto.request.authen.AuthenticateRequest;
import com.spring.social_pro.backend.dto.request.authen.RegisterRequest;
import com.spring.social_pro.backend.dto.request.authen.VerifyAccountRequest;
import com.spring.social_pro.backend.dto.response.authen.AuthenticateResponse;
import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.exception.ExpiredTokenException;
import com.spring.social_pro.backend.exception.InvalidTokenException;
import com.spring.social_pro.backend.repository.InvalidTokenRepository;
import com.spring.social_pro.backend.repository.UserRepository;
import com.spring.social_pro.backend.service.IAuthenticationService;
import com.spring.social_pro.backend.service.IOtpService;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationService implements IAuthenticationService {
    @NonFinal
    @Value("${jwt.secret}")
    protected String SECRET_KEY;

    @NonFinal
    @Value("${jwt.audience}")
    protected String AUDIENCE;

    @NonFinal
    @Value("${jwt.access-token-expiration}")
    protected Long ACCESS_TOKEN_EXPIRATION;

    @NonFinal
    @Value("${jwt.refresh-token-expiration}")
    protected Long REFRESH_TOKEN_EXPIRATION;

    @NonFinal
    @Value("${jwt.issuer}")
    protected String ISSUER_JWT;

    @NonFinal
    @Value("${bcrypt.cost}")
    protected Integer BCRYPT_COST;

    InvalidTokenRepository invalidTokenRepository;
    UserRepository userRepository;
    IOtpService otpService;

    @Override
    public AuthenticateResponse authenticate(AuthenticateRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        var user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(user);
        var refreshToken = generateRefreshToken();
        String role = user.getRole().getRoleName();

        return AuthenticateResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .role(role)
                .authenticated(true)
                .build();
    }

    @Override
    public Boolean handleVerifyAccount(VerifyAccountRequest request) {
        var user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var checkValidateOtp = otpService.validateOtp(request.getOtp(), user.getEmail());
        if(!checkValidateOtp) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        user.setEnabled(true);
        userRepository.save(user);
        return true;
    }


    public SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        if (token == null || token.trim().isEmpty()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet()
                .getIssueTime()
                .toInstant()
                .plus(REFRESH_TOKEN_EXPIRATION, ChronoUnit.MICROS)
                .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        if (expiryTime.before(new Date())) {
            throw new ExpiredTokenException();
        }

        var verified = signedJWT.verify(verifier);
        if (!verified) throw new InvalidTokenException();

        if (!invalidTokenRepository.existsById(UUID.fromString(signedJWT.getJWTClaimsSet().getJWTID())))
            throw new InvalidTokenException();

        return signedJWT;
    }

    @Override
    public String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer(ISSUER_JWT)
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(ACCESS_TOKEN_EXPIRATION, ChronoUnit.MICROS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String handleLogout() {
        return "";
    }

    @Override
    public String handleRegister(RegisterRequest request) {
        // Check if account has exist
        if(userRepository.existsUserByEmailOrUserName(request.getEmail().toLowerCase(), request.getUserName().toLowerCase())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(BCRYPT_COST);

        User newUser = new User()
                .setEmail(request.getEmail())
                .setUserName(request.getUserName())
                .setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);
        otpService.generateOtp(request.getEmail());
        return "User registered successfully";
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        Optional.ofNullable(user.getRole()).ifPresent(role -> {
            stringJoiner.add(role.getRoleName());

//            Optional.ofNullable(role.getPermissions()).ifPresent(permissions ->
//                    permissions.forEach(permission -> stringJoiner.add(permission.getName())));
        });
        return stringJoiner.toString();
    }

    private static String generateRefreshToken() {
        int byteLength = 10;
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[byteLength];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }

    private static Date calculateExpiryDate(String timeValid) {

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MILLISECOND, Integer.parseInt(timeValid));
        return calendar.getTime();
    }
}
