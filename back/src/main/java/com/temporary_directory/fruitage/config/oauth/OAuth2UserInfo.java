package com.temporary_directory.fruitage.config.oauth;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class OAuth2UserInfo {
    private Map<String, Object> attributes;
    private String name;
    private String loginName;
    private String email;

    public static OAuth2UserInfo of(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equals("github")) {
            return ofGithub(attributes);
        }
        return null;
    }

    private static OAuth2UserInfo ofGithub(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
                .attributes(attributes)
                .name((String) attributes.get("name"))
                .loginName((String) attributes.get("login"))
                .email((String) attributes.get("email"))
                .build();
    }
}
