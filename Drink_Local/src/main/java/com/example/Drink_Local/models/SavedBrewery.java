package com.example.Drink_Local.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "saved_breweries",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "brewery_id"}))
public class SavedBrewery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brewery_id", nullable = false)
    private String breweryId;

    // map existing UserProfile entity
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserProfileModel user;

    private String name;
    private String city;
    private String state;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public SavedBrewery() {
    }

    public SavedBrewery(String breweryId, UserProfileModel user, String name, String city, String state, String websiteUrl) {
        this.breweryId = breweryId;
        this.user = user;
        this.name = name;
        this.city = city;
        this.state = state;
        this.websiteUrl = websiteUrl;
    }

    public Long getId() {
        return id;
    }

    public String getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(String breweryId) {
        this.breweryId = breweryId;
    }

    public UserProfileModel getUser() {
        return user;
    }

    public void setUser(UserProfileModel user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}