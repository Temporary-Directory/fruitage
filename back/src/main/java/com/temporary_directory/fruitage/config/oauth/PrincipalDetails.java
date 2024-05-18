package com.temporary_directory.fruitage.config.oauth;

import com.temporary_directory.fruitage.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Getter
public class PrincipalDetails implements OAuth2User, UserDetails {
    private User user;
    private Map<String, Object> attributes;

    public PrincipalDetails(User user){
        this.user=user;
    }

    public PrincipalDetails(User user, Map<String, Object> attributes){
        this.user=user;
        this.attributes=attributes;
    }

    @Override
    public String getPassword() {
        return user.getUserLoginName();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    /* 계정 만료 여부
     * true: 만료 x
     * false: 만료 o */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /* 계정 잠김 여부
     * true: 잠금 x
     * false: 잠금 o */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /* 비밀번호 만료 여부
     * true: 만료 x
     * false: 만료 o */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /* 계정 활성화 여부
     * true: 활성화 o
     * false: 활성화 x */
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // 해당 user의 권한을 반환
        Collection<GrantedAuthority> collection=new ArrayList<>();
        collection.add((GrantedAuthority) ()-> "ROLE_USER");
        return collection;
    }

    @Override
    public String getName() {
        return user.getUserName();
    }
}
