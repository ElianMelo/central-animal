package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import com.iftm.centralanimal.services.exceptions.InstitutionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository repository;

    public List<Institution> allInstitutions() {
        return repository.findAll();
    }

    public Institution newInstitution(Institution entity) {
        return repository.save(entity);
    }

    public Institution updateInstitutionById(Integer id, Institution entity) {
        entity.setId(id);
        return repository.save(entity);
    }

    public Institution findInstitutionById(Integer id) {
        return repository.findById(id).
                orElseThrow(() -> new InstitutionNotFoundException(id));
    }

    public void deleteInstitutionById(Integer id) {
        repository.deleteById(id);
    }
}
