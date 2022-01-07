package com.iftm.centralanimal.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="administrator")
@Data
public class Administrator implements Serializable {
	private static final long serialVersionUID = 1L;

	private String email;
	private String password;
}
