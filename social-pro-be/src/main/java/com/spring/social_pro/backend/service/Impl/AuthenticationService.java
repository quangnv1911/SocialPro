package com.spring.social_pro.backend.service.Impl;


import java.util.*;
import java.time.Instant;
import lombok.AccessLevel;
import com.nimbusds.jose.*;
import java.text.ParseException;
import lombok.extern.slf4j.Slf4j;
import com.nimbusds.jwt.SignedJWT;
import java.security.SecureRandom;
import lombok.experimental.NonFinal;
import com.nimbusds.jwt.JWTClaimsSet;
import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;
import lombok.experimental.FieldDefaults;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import org.springframework.stereotype.Service;
import com.spring.social_pro.backend.service.*;
import jakarta.servlet.http.HttpServletRequest;
import com.spring.social_pro.backend.entity.Role;
import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.entity.Activity;
import com.spring.social_pro.backend.enums.ActivityType;
import com.spring.social_pro.backend.exception.ErrorCode;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.beans.factory.annotation.Value;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.constant.PredefinedRole;
import com.spring.social_pro.backend.repository.RoleRepository;
import com.spring.social_pro.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.spring.social_pro.backend.exception.ExpiredTokenException;
import com.spring.social_pro.backend.exception.InvalidTokenException;
import com.spring.social_pro.backend.repository.InvalidTokenRepository;
import com.spring.social_pro.backend.dto.request.authen.RegisterRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.spring.social_pro.backend.dto.request.authen.AuthenticateRequest;
import com.spring.social_pro.backend.dto.request.authen.VerifyAccountRequest;
import com.spring.social_pro.backend.dto.response.authen.AuthenticateResponse;
import com.spring.social_pro.backend.repository.specification.UserSpecification;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
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

    IOtpService otpService;
    IEmailService emailService;
    UserRepository userRepository;
    RoleRepository roleRepository;
    ITelegramService telegramService;
    IActivityService activityService;
    InvalidTokenRepository invalidTokenRepository;

    @Override
    public AuthenticateResponse authenticate(AuthenticateRequest request, HttpServletRequest requestHeader) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Specification<User> spec = UserSpecification.findByEmailOrUserName(request.getUserCredential());
        var users = userRepository.findAll(spec);
        var user = users.stream()
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!user.getEnabled()) throw new AppException(ErrorCode.USER_NOT_ENABLED);
        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(user);
        var refreshToken = generateRefreshToken();
        String role = user.getRole().getRoleName();
        String message = user.getEmail() + " has logg in successfully";

        activityService.addActivity(ActivityType.Login, message, requestHeader);
        telegramService.sendMessage(message);
        return AuthenticateResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .role(role)
                .userName(user.getUserName())
                .image(user.getImage())
                .email(user.getEmail())
                .isAuthenticated(true)
                .build();
    }

    @Override
    public Boolean handleVerifyAccount(VerifyAccountRequest request) {
        var user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var checkValidateOtp = otpService.validateOtp(request.getOtp(), user.getEmail());
        if (!checkValidateOtp) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        user.setEnabled(true);
        userRepository.save(user);
        String message = request.getEmail() + " has verified your account";
        telegramService.sendMessage(message);
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
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

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
        Activity activity = Activity.builder()
                .type(ActivityType.Logout)
                .message("You have logged out")
                .build();
        return "";
    }

    @Override
    @Transactional
    public String handleRegister(RegisterRequest registerRequest, HttpServletRequest request) {
        // Check if account has existed
        if (!userRepository.existsUserByEmailIgnoreCase(registerRequest.getEmail()) || !userRepository.existsUserByEmailIgnoreCase(registerRequest.getUserName())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(BCRYPT_COST);
        Optional<Role> userRole = roleRepository.findByRoleName(PredefinedRole.USER_ROLE);
        if (userRole.isEmpty()) {
            throw new AppException(ErrorCode.ROLE_NOT_EXISTED);
        }
        User newUser = new User()
                .setEmail(registerRequest.getEmail())
                .setRole(userRole.get())
                .setUserName(registerRequest.getUserName())
                .setEnabled(false)
                .setApiKey(generateRefreshToken())
                .setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(newUser);

        // Send email to verify account
        String otp = otpService.generateOtp(registerRequest.getEmail());
        String verificationLink = String.format(
                "http://localhost:3000/verify-account?account=%s&otp=%s",
                newUser.getEmail(),
                otp
        );
        emailService.sendWelcomeEmail(newUser.getEmail(), newUser.getUserName(), verificationLink);


        String message = registerRequest.getEmail() + " has registered your account";
        activityService.addActivity(ActivityType.Register, message, request);

        telegramService.sendMessage(message);
        return "User registered successfully";
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        Optional.ofNullable(user.getRole()).ifPresent(role -> {
            stringJoiner.add(role.getRoleName());
        });
        stringJoiner.add(user.getEmail());
        stringJoiner.add(user.getUserName());
        stringJoiner.add(user.getImage());
        stringJoiner.add(user.getApiKey());
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
