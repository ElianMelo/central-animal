package com.iftm.centralanimal.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.dto.InstitutionDTO;
import com.iftm.centralanimal.models.dto.InstitutionListDTO;
import com.iftm.centralanimal.services.InstitutionService;

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
    public ResponseEntity<String> newInstitution(@Valid @RequestBody Institution entity) {
        service.newInstitution(entity);
        return ResponseEntity.ok("Instituição cadastrada com sucesso.");
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
