package com.iftm.centralanimal.models;

import java.io.Serializable;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
	private String description;
	@OneToOne
	private InstitutionAddress address;
	private String whatsapp;
	private String pix;
	private Boolean portion;
	private Boolean medicines;
	private Boolean cleaningMaterial;
	private Blob institutionImage;
	
	@OneToOne
	private Administrator administrator;
	
	@OneToMany
	private List<Animal> animals = new ArrayList<Animal>();
}
