package com.example.Drink_Local.controllers;

import com.example.Drink_Local.models.SavedBreweryModel;
import com.example.Drink_Local.repositories.SavedBreweryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-breweries")
public class SavedBreweryController {

    private final SavedBreweryRepository repository;

    public SavedBreweryController(SavedBreweryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<SavedBreweryModel> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SavedBreweryModel> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<SavedBreweryModel> create(@RequestBody SavedBreweryModel newBrewery) {
        // id cannot be set (no setter), so saving will always generate a new id
        SavedBreweryModel saved = repository.save(newBrewery);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SavedBreweryModel> update(@PathVariable Long id, @RequestBody SavedBreweryModel updates) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setBreweryName(updates.getBreweryName());
                    existing.setCity(updates.getCity());
                    existing.setState(updates.getState());
                    existing.setWebsiteURL(updates.getWebsiteURL());
                    SavedBreweryModel saved = repository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return repository.findById(id)
                .map(existing -> {
                    repository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}