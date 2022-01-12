package com.iftm.centralanimal.controllers;

import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.services.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/administrator")
public class AdministratorController {

    @Autowired
    private AdministratorService service;

    @GetMapping
    public List<Administrator> administrators() {
        return service.allAdministrators();
    }

    @PostMapping
    public ResponseEntity<String> newAnimal(@Valid @RequestBody Administrator entity) {
        service.newAdministrator(entity);
        return ResponseEntity.ok("Administrador cadastrado com sucesso.");
    }

    @PutMapping("/{id}")
    public Administrator updateAdministrator(@PathVariable Integer id, @RequestBody Administrator entity) {
        return service.updateAdministratorById(id, entity);
    }

    @GetMapping("/{id}")
    public Administrator findByIdAnimal(@PathVariable Integer id) {
        return service.findAdministratorById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAdministratorById(@PathVariable Integer id) {
        service.deleteAdministratorById(id);
    }
}
