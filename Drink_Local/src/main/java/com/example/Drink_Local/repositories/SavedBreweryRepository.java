package com.example.Drink_Local.repositories;

import com.example.Drink_Local.models.SavedBreweryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedBreweryRepository extends JpaRepository<SavedBreweryModel, Long> {
}