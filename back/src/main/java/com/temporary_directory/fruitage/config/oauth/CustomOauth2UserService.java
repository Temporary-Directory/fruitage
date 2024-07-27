package com.temporary_directory.fruitage.config.oauth;

import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); //Oauth name
        OAuth2UserInfo userInfo = OAuth2UserInfo.of(registrationId, oAuth2User.getAttributes());

        User user = userRepository.findByUserLoginName(userInfo.getLoginName());
        if (user == null) { // sign up
            user = User.builder()
                    .userLoginName(userInfo.getLoginName())
                    .userName(userInfo.getName())
                    .userEmail(userInfo.getEmail())
                    .build();
            userRepository.save(user);
            return new PrincipalDetails(user, userInfo.getAttributes(), true);
        } else {
            user.updateRecentDate(LocalDateTime.now());
            return new PrincipalDetails(user, userInfo.getAttributes(), false);
        }
    }
}