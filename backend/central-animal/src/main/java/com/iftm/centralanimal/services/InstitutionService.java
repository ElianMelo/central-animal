package com.iftm.centralanimal.services;

import com.iftm.centralanimal.exceptionhandler.exceptions.InstitutionNotFoundException;
import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.dto.InstitutionAndAdminstratorDTO;
import com.iftm.centralanimal.models.dto.InstitutionDTO;
import com.iftm.centralanimal.models.dto.InstitutionListDTO;
import com.iftm.centralanimal.repositories.AdministratorRepository;
import com.iftm.centralanimal.repositories.AnimalRepository;
import com.iftm.centralanimal.repositories.InstitutionRepository;
import com.iftm.centralanimal.utils.ConfigProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository repository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AdministratorService administratorService;

    @Autowired
    private ConfigProperties config;

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
        String credentials = config.getProperty("spring.firebase.credentials");
        ImageUploader.setImage(entity, false, "", credentials);
        return repository.save(entity);
    }

    public Institution updateInstitutionById(Integer id, Institution entity) {
        Institution institution = findInstitutionById(id);
        if(entity.getAdministrator() == null) {
            entity.setAdministrator(institution.getAdministrator());
        }
        entity.setId(id);
        if(entity.getImage() != null || entity.getImage() != "") {
            if(!ImageUploader.IsUrl(entity.getImage())){
                String credentials = config.getProperty("spring.firebase.credentials");
                ImageUploader.setImage(entity, true, findInstitutionById(id).getImage(), credentials);
            }
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
            String credentials = config.getProperty("spring.firebase.credentials");
            ImageUploader.DeleteImage(findInstitutionById(id).getImage(), "institution", credentials);
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

    public Institution saveInstitutionAndAdministrator(InstitutionAndAdminstratorDTO entity) {
            Administrator administrator = new Administrator(entity);
            Administrator newAdministrator = administratorService.newAdministrator(administrator);

            Institution institution = new Institution(entity);
            institution.setAdministrator(newAdministrator);
            return newInstitution(institution);
    }
}
