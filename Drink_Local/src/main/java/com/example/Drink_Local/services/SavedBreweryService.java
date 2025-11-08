package com.example.Drink_Local.services;

import com.example.Drink_Local.models.SavedBrewery;
import com.example.Drink_Local.models.UserProfileModel;
import com.example.Drink_Local.repositories.SavedBreweryRepository;
import com.example.Drink_Local.repositories.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SavedBreweryService {
    private final SavedBreweryRepository repo;
    private final UserProfileRepository userRepo;

    public SavedBreweryService(SavedBreweryRepository repo, UserProfileRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public List<SavedBrewery> listForUser(Long userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional
    public SavedBrewery saveForUser(Long userId, SavedBrewery payload) {
        // load the user entity (throws if not found)
        UserProfileModel user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        // prevent duplicates
        Optional<SavedBrewery> existing = repo.findByUserIdAndBreweryId(userId, payload.getBreweryId());
        if (existing.isPresent()) {
            return existing.get();
        }

        payload.setUser(user);
        return repo.save(payload);
    }

    @Transactional
    public boolean removeForUser(Long userId, Long savedId) {
        var opt = repo.findById(savedId);
        if (opt.isEmpty()) return false;
        var saved = opt.get();
        if (!saved.getUser().getId().equals(userId)) {
            // user doesn't own this saved entry
            return false;
        }
        repo.deleteById(savedId);
        return true;
    }
}