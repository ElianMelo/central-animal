package com.iftm.centralanimal.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="institution")
@Data
public class Institution implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String whatsapp;
	private String pix;
	private Boolean portion;
	private Boolean medicines;
	private Boolean cleaningMaterial;
	
	private String institutionImage;

	private String description;

	@OneToOne(cascade = CascadeType.REMOVE)
	private InstitutionAddress address;

	@OneToOne(cascade = CascadeType.REMOVE)
	private Administrator administrator;

	@OneToMany(mappedBy = "institution", cascade = CascadeType.REMOVE)
  	private List<Animal> animals = new ArrayList<Animal>();
}
