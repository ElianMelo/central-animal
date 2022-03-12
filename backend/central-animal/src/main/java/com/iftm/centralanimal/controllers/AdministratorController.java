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
    public Administrator newAdministrator(@Valid @RequestBody Administrator entity) {
        return service.newAdministrator(entity);
    }

    @PutMapping("/{id}")
    public Administrator updateAdministrator(@PathVariable Integer id,
                                             @RequestBody Administrator entity) {
        return service.updateAdministratorById(id, entity);
    }

    @GetMapping("/{id}")
    public Administrator findByIdAdministrator(@PathVariable Integer id) {
        return service.findAdministratorById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAdministratorById(@PathVariable Integer id) {
        service.deleteAdministratorById(id);
    }

    @GetMapping("/validatePassword")
    public ResponseEntity<Boolean> validadePassword(@RequestParam String login,
                                                    @RequestParam String password) {
        return service.validatePassword(login, password);
    }

    @PostMapping("/validateToken")
    public boolean validadeToken() {
        return true;
    }
}
