package com.iftm.centralanimal.services.exceptions;

public class AdministratorNotFoundException extends RuntimeException {
    public AdministratorNotFoundException(Integer id) {
        super("Administrador não encontrado. ID = " + id);
    }
}