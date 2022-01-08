package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.repositories.AdministratorRepository;
import com.iftm.centralanimal.services.exceptions.AdministratorNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorRepository repository;

    public List<Administrator> allAdministrators() {
        return repository.findAll();
    }

    public Administrator newAdministrator(Administrator entity) {
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
}
