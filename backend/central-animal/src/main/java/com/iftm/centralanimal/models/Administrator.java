package com.iftm.centralanimal.models;

import java.io.Serializable;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name="administrator")
@Data
public class Administrator implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(unique = true)
	private String email;
	private String password;
}
