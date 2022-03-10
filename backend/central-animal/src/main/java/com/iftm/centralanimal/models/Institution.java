package com.iftm.centralanimal.models;

import java.io.Serializable;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Size;

import lombok.Data;

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
	
	@Size(max = 250)
	private String institutionImage;

	@Size(max = 1337)
	private String description;

	@OneToOne(cascade = CascadeType.REMOVE)
	private InstitutionAddress address;

	@OneToOne(cascade = CascadeType.REMOVE)
	private Administrator administrator;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	private List<Animal> animals = new ArrayList<Animal>();
}
