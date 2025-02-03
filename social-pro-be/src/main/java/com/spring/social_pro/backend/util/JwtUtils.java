package com.spring.social_pro.backend.util;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.spring.social_pro.backend.exception.ExpiredTokenException;
import com.spring.social_pro.backend.exception.InvalidTokenException;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;

@Component
public class JwtUtils {
    @NonFinal
    @Value("${jwt.secret}")
    protected String SECRET_KEY;

    @NonFinal
    @Value("${jwt.audience}")
    protected String AUDIENCE;

    @NonFinal
    @Value("${jwt.issuer}")
    protected String ISSUER_JWT;

    /**
     * Lấy thông tin người dùng từ accessToken
     *
     * @param accessToken token cần giải mã và xác minh
     * @return Thông tin người dùng dưới dạng JWTClaimsSet
     * @throws InvalidTokenException nếu token không hợp lệ hoặc hết hạn
     */
    public JWTClaimsSet getUserInfoFromAccessToken(String accessToken) {
        try {
            // Parse token
            SignedJWT signedJWT = SignedJWT.parse(accessToken);

            // Xác minh chữ ký token
            MACVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());
            if (!signedJWT.verify(verifier)) {

                throw new InvalidTokenException();
            }

            // Lấy claims từ token
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            // Kiểm tra thời gian hết hạn
            if (claims.getExpirationTime().before(new Date())) {
                throw new ExpiredTokenException();
            }

            // Xác minh issuer và audience
            if (!ISSUER_JWT.equals(claims.getIssuer())) {
                throw new InvalidTokenException();
            }
            if (!claims.getAudience().contains(AUDIENCE)) {
                throw new InvalidTokenException();
            }

            return claims;

        } catch (ParseException | JOSEException e) {
            throw new InvalidTokenException();
        }
    }
}
