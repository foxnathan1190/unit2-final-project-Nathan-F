package com.example.Drink_Local.repositories;

import com.example.Drink_Local.models.SavedBrewery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedBreweryRepository extends JpaRepository<SavedBrewery, Long> {
    List<SavedBrewery> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<SavedBrewery> findByUserIdAndBreweryId(Long userId, String breweryId);
    boolean existsByUserIdAndBreweryId(Long userId, String breweryId);
}