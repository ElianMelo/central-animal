package com.iftm.centralanimal.repositories;

import com.iftm.centralanimal.models.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {

    public Optional<Administrator> findByEmail(String string);

}
