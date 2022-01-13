package com.iftm.centralanimal.models;

import java.io.Serializable;
import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.iftm.centralanimal.models.enums.AnimalSex;
import com.iftm.centralanimal.models.enums.AnimalType;

import lombok.Data;

@Entity
@Table(name="animal")
@Data
public class Animal implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String description;
	private AnimalType type;
	private int age;
	private AnimalSex sex;
	private String animalImage;
}
