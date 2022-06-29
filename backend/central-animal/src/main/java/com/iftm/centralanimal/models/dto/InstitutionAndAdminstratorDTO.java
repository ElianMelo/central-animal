package com.iftm.centralanimal.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.iftm.centralanimal.models.Administrator;
import com.iftm.centralanimal.models.Institution;
import com.iftm.centralanimal.models.InstitutionAddress;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class InstitutionAndAdminstratorDTO {

    private String name;
    private String description;
    private InstitutionAddress address;
    private String whatsapp;
    private String pix;
    private String instagram;
    private Boolean portion;
    private Boolean medicines;
    private Boolean cleaningMaterial;
    private String image;

    private String administratorEmail;
    private String administratorPassword;
}
