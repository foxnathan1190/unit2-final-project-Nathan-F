package com.example.Drink_Local.repositories;

import com.example.Drink_Local.models.UserProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfileModel, Long> {
    Optional<UserProfileModel> findByUsername(String username);
    Optional<UserProfileModel> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    List<UserProfileModel> findByFavBrewery(String favBrewery);
}