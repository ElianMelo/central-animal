package com.iftm.centralanimal.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.dto.InstitutionDTO;
import com.iftm.centralanimal.models.dto.InstitutionListDTO;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import com.iftm.centralanimal.services.exceptions.InstitutionNotFoundException;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository repository;

    public List<InstitutionListDTO> allInstitutions() {
        List<Institution> list = repository.findAll();
        List<InstitutionListDTO> institutions = new ArrayList<>();
        
        if(!list.isEmpty()) {
        	for(Institution i : list) {
        		institutions.add(new InstitutionListDTO(i));
        	}
        }
        
        return institutions;
    }

    public Institution newInstitution(Institution entity) {
        return repository.save(entity);
    }

    public Institution updateInstitutionById(Integer id, Institution entity) {
        entity.setId(id);
        return repository.save(entity);
    }

    public Institution findAnimalsFromInstitutionId(Integer id) {
        return repository.findById(id).
                orElseThrow(() -> new InstitutionNotFoundException(id));
    }

    public InstitutionDTO findInstitutionById(Integer id) {
        Institution institution = repository.findById(id).
                orElseThrow(() -> new InstitutionNotFoundException(id));
        return new InstitutionDTO(institution);
    }
    
    public void deleteInstitutionById(Integer id) {
        repository.deleteById(id);
    }
}
