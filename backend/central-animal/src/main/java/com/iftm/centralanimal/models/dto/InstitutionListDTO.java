package com.iftm.centralanimal.models.dto;

import java.sql.Blob;
import com.iftm.centralanimal.models.Institution;
import lombok.Data;

@Data
public class InstitutionListDTO {

	private Integer id;
    private String name;
    private String city;
    private String district;
    private String publicPlace;
    private String publicPlaceName;
    private String institutionNumber;
    private String institutionImage;
    
    public InstitutionListDTO(Institution institution) {
        this.id = institution.getId();
        this.name = institution.getName();
        this.city = institution.getAddress().getCity();
        this.district = institution.getAddress().getDistrict();
        this.institutionImage = institution.getInstitutionImage();
        this.publicPlace = institution.getAddress().getPublicPlace();
        this.institutionNumber = institution.getAddress().getNumber();
        this.publicPlaceName = institution.getAddress().getPublicPlaceName();
    }
	
}
