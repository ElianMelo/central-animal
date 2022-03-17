package com.iftm.centralanimal.services;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.dto.InstitutionDTO;
import com.iftm.centralanimal.models.dto.InstitutionListDTO;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import com.iftm.centralanimal.services.exceptions.InstitutionNotFoundException;
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
        entity.setId(id);
        if(entity.getInstitutionImage() != null || entity.getInstitutionImage() != "")  {
            String imageName = ImageUploader.ExtractImageNameFromUrl(findInstitutionById(id).getInstitutionImage());
            ImageUploader.setImage(entity, true, imageName);
        }
        return repository.save(entity);
    }

    public List<Animal> findAnimalsFromInstitutionId(Integer id) {
        Institution institution = repository.findById(id).
                orElseThrow(() -> new InstitutionNotFoundException(id));
        return animalRepository.findByInstitutionId(id);
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
