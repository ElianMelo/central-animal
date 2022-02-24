package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.repositories.AdministratorRepository;
import com.iftm.centralanimal.services.exceptions.AdministratorNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    public List<Administrator> allAdministrators() {
        return repository.findAll();
    }

    public Administrator newAdministrator(Administrator entity) {
        entity.setPassword(encoder.encode(entity.getPassword()));
        return repository.save(entity);
    }

    public Administrator updateAdministratorById(Integer id, Administrator entity) {
        entity.setId(id);
        return repository.save(entity);
    }

    public Administrator findAdministratorById(Integer id) {
        return repository.findById(id).
                orElseThrow(() -> new AdministratorNotFoundException(id));
    }

    public void deleteAdministratorById(Integer id) {
        repository.deleteById(id);
    }

    public ResponseEntity<Boolean> validatePassword(String login, String password) {


        Optional<Administrator> administratorValid = repository.findByEmail(login);
        if(administratorValid.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        Administrator administrator = administratorValid.get();
        boolean valid = encoder.matches(password, administrator.getPassword());

        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(valid);
    }


}
