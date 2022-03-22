package com.iftm.centralanimal.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="animal")
@Data
public class Animal implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private int type;
	private int age;
	private int sex;

	private String animalImage;

	private String description;

	@ManyToOne
	@JsonBackReference
	private Institution institution;

	@OneToOne(cascade = CascadeType.ALL)
	private Coordinate animalCoordinate = new Coordinate();
}
