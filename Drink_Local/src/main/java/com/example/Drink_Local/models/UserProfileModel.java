package com.example.Drink_Local.models;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class UserProfileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fName;
    private String lName;
    private String username;
    private String email;
    private String password;
    private String favBrewery;
    private int birthMonth;
    private int birthDay;
    private int birthYear;

    public UserProfileModel() {
    }

    public UserProfileModel(String fName, String lName, String username, String email, String password, String favBrewery, int birthMonth, int birthDay, int birthYear) {
        this.fName = fName;
        this.lName = lName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.favBrewery = favBrewery;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.birthYear = birthYear;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "user_saved_breweries",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "brewery_id")
    )
    private Set<SavedBrewery> savedBreweries = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFavBrewery() {
        return favBrewery;
    }

    public void setFavBrewery(String favBrewery) {
        this.favBrewery = favBrewery;
    }

    public int getBirthMonth() {
        return birthMonth;
    }

    public void setBirthMonth(int birthMonth) {
        this.birthMonth = birthMonth;
    }

    public int getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(int birthDay) {
        this.birthDay = birthDay;
    }

    public int getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }

    public Set<SavedBrewery> getSavedBreweries() {
        return savedBreweries;
    }

    public void setSavedBreweries(Set<SavedBrewery> savedBreweries) {
        this.savedBreweries = savedBreweries;
    }
}

