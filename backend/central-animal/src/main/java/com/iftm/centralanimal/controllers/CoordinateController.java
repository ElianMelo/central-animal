package com.iftm.centralanimal.controllers;

import com.iftm.centralanimal.models.Animal;
import com.iftm.centralanimal.services.CoordinateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/coordinate")
public class CoordinateController {

    @Autowired
    CoordinateService service;

    @GetMapping("/closer-animals/{lati}&&{longi}")
    public List<Animal> animalsWithin10Km(@PathVariable Double lati, @PathVariable Double longi) {
        return service.animalsWithin10Km(lati, longi);
    }
}
