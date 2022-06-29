package com.iftm.centralanimal.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.iftm.centralanimal.models.dto.InstitutionAndAdminstratorDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="administrator")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Administrator implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(unique = true)
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	public Administrator(InstitutionAndAdminstratorDTO administrator) {
		this.id = 0;
		this.email = administrator.getAdministratorEmail();
		this.password = administrator.getAdministratorPassword();
	}
}
