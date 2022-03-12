package com.iftm.centralanimal.controllers;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.dto.InstitutionDTO;
import com.iftm.centralanimal.models.dto.InstitutionListDTO;
import com.iftm.centralanimal.services.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/institution")
public class InstitutionController {

    @Autowired
    private InstitutionService service;

    @GetMapping
    public List<InstitutionListDTO> institutions() {
        return service.allInstitutions();
    }

    @PostMapping
    public Institution newInstitution(@Valid @RequestBody Institution entity) {
        return service.newInstitution(entity);
    }

    @PutMapping("/{id}")
    public Institution updateInstitution(@PathVariable Integer id, @RequestBody Institution entity) {
            return service.updateInstitutionById(id, entity);
    }

    @GetMapping("/{id}")
    public InstitutionDTO findInstitutionById(@PathVariable Integer id) {
        return service.findInstitutionById(id);
    }

    @GetMapping("/animals/{id}")
    public List<Animal> findInstitutionsById(@PathVariable Integer id) {
        return service.findAnimalsFromInstitutionId(id);
    }

    @DeleteMapping("/{id}")
    public void deleteInstitutionById(@PathVariable Integer id) {
        service.deleteInstitutionById(id);
    }
}
