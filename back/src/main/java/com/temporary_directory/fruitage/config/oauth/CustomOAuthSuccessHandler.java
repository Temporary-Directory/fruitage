package com.temporary_directory.fruitage.config.oauth;

import com.temporary_directory.fruitage.config.jwt.JwtTokenProvider;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        User user = userRepository.findByUserLoginName(principalDetails.getPassword());
        String accessToken = jwtTokenProvider.createToken(user.getUserLoginName());

        Cookie accessCookie = new Cookie("accessToken", accessToken);
        Cookie flagCookie = new Cookie("flag", String.valueOf(principalDetails.isFlag()));
        accessCookie.setPath("/");
        accessCookie.setMaxAge(60 * 60 * 2);
        flagCookie.setPath("/");
        flagCookie.setMaxAge(60 * 60 * 2);

        response.addCookie(accessCookie);
        response.addCookie(flagCookie);

        response.setHeader("AccessToken", accessToken);
    }
}
