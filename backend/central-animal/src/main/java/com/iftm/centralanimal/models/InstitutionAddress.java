package com.iftm.centralanimal.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="institutionAddress")
@Data
public class InstitutionAddress implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String city;
    private String publicPlace;
    private String publicPlaceName;
    private String number;
}
