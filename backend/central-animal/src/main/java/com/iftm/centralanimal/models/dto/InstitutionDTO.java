package com.iftm.centralanimal.models.dto;

import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.InstitutionAddress;
import lombok.Data;

import java.sql.Blob;

@Data
public class InstitutionDTO {

    private Integer id;
    private String name;
    private String description;
    private InstitutionAddress address;
    private String whatsapp;
    private String pix;
    private Boolean portion;
    private Boolean medicines;
    private Boolean cleaningMaterial;
    private String institutionImage;
    private Administrator administrator;

    public InstitutionDTO(Institution institution) {
        this.id = institution.getId();
        this.name = institution.getName();
        this.description = institution.getName();
        this.address = institution.getAddress();
        this.whatsapp = institution.getWhatsapp();
        this.pix = institution.getPix();
        this.portion = institution.getPortion();
        this.medicines = institution.getMedicines();
        this.cleaningMaterial = institution.getCleaningMaterial();
        this.institutionImage = institution.getInstitutionImage();
        this.administrator = institution.getAdministrator();
    }
}
