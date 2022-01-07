package com.iftm.centralanimal.models;

import java.io.Serializable;
import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.iftm.centralanimal.models.enums.AnimalSex;
import com.iftm.centralanimal.models.enums.AnimalType;

import lombok.Data;

@Entity
@Table(name="animal")
@Data
public class Animal implements Serializable {
	private static final long serialVersionUID = 1L;

	private String name;
	private String description;
	private AnimalType type;
	private int age;
	private AnimalSex sex;
	private Blob animalImage;
}
