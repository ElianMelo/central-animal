package com.iftm.centralanimal.models;

import com.iftm.centralanimal.models.dto.InstitutionAndAdminstratorDTO;
import com.iftm.centralanimal.models.interfaces.EntityWithImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="institution")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Institution implements Serializable, EntityWithImage {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String whatsapp;
	private String pix;
	private String instagram;
	private Boolean portion;
	private Boolean medicines;
	private Boolean cleaningMaterial;
	
	private String image;

	private String description;

	@OneToOne(cascade = CascadeType.ALL)
	private InstitutionAddress address;

	@OneToOne(cascade = CascadeType.ALL)
	private Administrator administrator;

	@OneToMany(mappedBy = "institution", cascade = CascadeType.ALL)
  	private List<Animal> animals = new ArrayList<Animal>();

	@Override
	public void setImage(String institutionImage) {
		this.image = institutionImage;
	}

	@Override
	public String getImage() {
		return this.image;
	}

	public Institution(InstitutionAndAdminstratorDTO institution) {
		this.id = 0;
		this.name = institution.getName();
		this.description = institution.getDescription();
		this.address = institution.getAddress();
		this.whatsapp = institution.getWhatsapp();
		this.pix = institution.getPix();
		this.instagram = institution.getInstagram();
		this.portion = institution.getPortion();
		this.medicines = institution.getMedicines();
		this.cleaningMaterial = institution.getCleaningMaterial();
		this.image = institution.getImage();
	}
}
