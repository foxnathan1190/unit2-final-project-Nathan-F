package com.example.Drink_Local.controllers;

import com.example.Drink_Local.models.SavedBrewery;
import com.example.Drink_Local.services.SavedBreweryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/userprofile/{userId}/saved-breweries")
public class SavedBreweryController {

    private final SavedBreweryService service;

    public SavedBreweryController(SavedBreweryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SavedBrewery>> list(@PathVariable Long userId) {
        return ResponseEntity.ok(service.listForUser(userId));
    }

    @PostMapping
    public ResponseEntity<?> save(@PathVariable Long userId, @RequestBody SavedBreweryRequest req) {
        SavedBrewery toSave = new SavedBrewery();
        toSave.setBreweryId(req.getBreweryId());
        toSave.setName(req.getName());
        toSave.setCity(req.getCity());
        toSave.setState(req.getState());
        toSave.setWebsite_url(req.getWebsite_url());

        SavedBrewery saved = service.saveForUser(userId, toSave);
        return ResponseEntity.created(URI.create("/api/userprofile/" + userId + "/saved-breweries/" + saved.getId())).body(saved);
    }

    @DeleteMapping("/{savedId}")
    public ResponseEntity<?> delete(@PathVariable Long userId, @PathVariable Long savedId) {
        boolean ok = service.removeForUser(userId, savedId);
        if (!ok) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }

    // DTO
    public static class SavedBreweryRequest {
        private String breweryId;
        private String name;
        private String city;
        private String state;
        private String website_url;
        // getters/setters
        public String getBreweryId() { return breweryId; }
        public void setBreweryId(String breweryId) { this.breweryId = breweryId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }
        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
        public String getWebsite_url() { return website_url; }
        public void setWebsite_url(String website_url) { this.website_url = website_url; }
    }
}