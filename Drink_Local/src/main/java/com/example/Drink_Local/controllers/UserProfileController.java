package com.example.Drink_Local.controllers;

import com.example.Drink_Local.models.UserProfileModel;
import com.example.Drink_Local.repositories.UserProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userprofile")
public class UserProfileController {

    private final UserProfileRepository repository;

    public UserProfileController(UserProfileRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<UserProfileModel> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileModel> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/by-username/{username}")
    public ResponseEntity<UserProfileModel> getByUsername(@PathVariable String username) {
        return repository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/by-email/{email}")
    public ResponseEntity<UserProfileModel> getByEmail(@PathVariable String email) {
        return repository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/by-fav-brewery/{favBrewery}")
    public List<UserProfileModel> getByFavBrewery(@PathVariable String favBrewery) {
        return repository.findByFavBrewery(favBrewery);
    }

    @PostMapping("/add")
    public ResponseEntity<?> create(@RequestBody UserProfileModel user) {
        if (user.getUsername() != null && repository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("username already exists");
        }
        if (user.getEmail() != null && repository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("email already exists");
        }
        UserProfileModel saved = repository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileModel> update(@PathVariable Long id, @RequestBody UserProfileModel user) {
        return repository.findById(id)
                .map(existing -> {
                    if (user.getUsername() != null) {
                        existing.setUsername(user.getUsername());
                    }
                    if (user.getEmail() != null) {
                        existing.setEmail(user.getEmail());
                    }
                    if (user.getFavBrewery() != null) {
                        existing.setFavBrewery(user.getFavBrewery());
                    }
                    // copy other mutable fields as needed, checking for nulls
                    UserProfileModel updated = repository.save(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}