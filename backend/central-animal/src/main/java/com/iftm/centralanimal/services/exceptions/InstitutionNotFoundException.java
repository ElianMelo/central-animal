package com.iftm.centralanimal.services.exceptions;

public class InstitutionNotFoundException extends RuntimeException {
    public InstitutionNotFoundException(Integer id) {
        super("Instituição não encontrada. ID = " + id);
    }
}
