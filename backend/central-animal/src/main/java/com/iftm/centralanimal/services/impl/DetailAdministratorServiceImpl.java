package com.iftm.centralanimal.services.impl;

import com.iftm.centralanimal.data.DetailAdministratorData;
import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.repositories.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DetailAdministratorServiceImpl implements UserDetailsService {

    @Autowired
    private AdministratorRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Administrator> administrador = repository.findByEmail(email);

        if(administrador.isEmpty()) {
            throw new UsernameNotFoundException("O usuário de email " + email + " não foi encontrado.");
        }

        return new DetailAdministratorData(administrador);
    }
}
