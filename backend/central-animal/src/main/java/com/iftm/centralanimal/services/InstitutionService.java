package com.iftm.centralanimal.services;

import com.iftm.centralanimal.exceptionhandler.exceptions.InstitutionNotFoundException;
import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.dto.InstitutionDTO;
import com.iftm.centralanimal.models.dto.InstitutionListDTO;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository repository;

    @Autowired
    private AnimalRepository animalRepository;

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
        ImageUploader.setImage(entity, false, "");
        return repository.save(entity);
    }

    public Institution updateInstitutionById(Integer id, Institution entity) {
        Institution institution = findInstitutionById(id);
        if(entity.getAdministrator() == null) {
            entity.setAdministrator(institution.getAdministrator());
        }
        entity.setId(id);
        if(entity.getImage() != null || entity.getImage() != "")  {
            ImageUploader.setImage(entity, true, findInstitutionById(id).getImage());
        }
        return repository.save(entity);
    }

    public List<Animal> findAnimalsFromInstitutionId(Integer id) {
        Institution institution = repository.findById(id).
                orElseThrow(() -> new InstitutionNotFoundException());
        return animalRepository.findByInstitutionId(id);
    }

    public InstitutionDTO findInstitutionDTOById(Integer id) {
        Institution institution = repository.findById(id).
                orElseThrow(() -> new InstitutionNotFoundException());
        return new InstitutionDTO(institution);
    }

    public Institution findInstitutionById(Integer id) {
        Institution institution = repository.findById(id).
                orElseThrow(() -> new InstitutionNotFoundException());
        return institution;
    }
    
    public void deleteInstitutionById(Integer id) {
        findInstitutionById(id);
        try {
            ImageUploader.DeleteImage(findInstitutionById(id).getImage(), "institution");
        } catch (Exception e) {
            e.printStackTrace();
        }
        repository.deleteById(id);
    }

    public InstitutionDTO findByAdministratorEmail(String email) {
        Institution institution = repository.findByAdministratorEmail(email).
                orElseThrow(() -> new InstitutionNotFoundException());
        return new InstitutionDTO(institution);
    }
}
