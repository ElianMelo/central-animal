package com.iftm.centralanimal.data;

import com.iftm.centralanimal.models.Administrator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

public class DetailAdministratorData implements UserDetails {

    private Optional<Administrator> administrator;

    public DetailAdministratorData(Optional<Administrator> administrador) {
        this.administrator = administrador;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @Override
    public String getPassword() {
        return administrator.orElse(new Administrator()).getPassword();
    }

    @Override
    public String getUsername() {
        return administrator.orElse(new Administrator()).getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
