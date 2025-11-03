package com.example.Drink_Local.models;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class SavedBreweryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String breweryName;
    private String city;
    private String state;
    private String websiteURL;

    public SavedBreweryModel() {
    }

    public SavedBreweryModel(String breweryName, String city, String state, String websiteURL) {
        this.breweryName = breweryName;
        this.city = city;
        this.state = state;
        this.websiteURL = websiteURL;
    }

    @ManyToMany(mappedBy = "savedBreweries")
    private Set<UserProfileModel> savingUsers = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getBreweryName() {
        return breweryName;
    }

    public void setBreweryName(String breweryName) {
        this.breweryName = breweryName;
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

    public String getWebsiteURL() {
        return websiteURL;
    }

    public void setWebsiteURL(String websiteURL) {
        this.websiteURL = websiteURL;
    }

    public Set<UserProfileModel> getSavingUsers() {
        return savingUsers;
    }

    public void setSavingUsers(Set<UserProfileModel> savingUsers) {
        this.savingUsers = savingUsers;
    }
}
