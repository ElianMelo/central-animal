package com.iftm.centralanimal.services.exceptions;

public class AnimalNotFoundException extends RuntimeException {
    public AnimalNotFoundException(Integer id) {
        super("Animal não encontrado. ID = " + id);
    }
}