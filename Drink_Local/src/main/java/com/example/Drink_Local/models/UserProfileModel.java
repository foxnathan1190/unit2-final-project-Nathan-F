package com.example.Drink_Local.models;

import jakarta.persistence.*;

@Entity
public class UserProfileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fName;
    private String lName;
    private String userName;
    private String email;
    private String password;
    private String favBrewery;
    private int birthMonth;
    private int birthDay;
    private int birthYear;

    public UserProfileModel() {
    }

    public UserProfileModel(String fName, String lName, String userName, String email, String password, String favBrewery, int birthMonth, int birthDay, int birthYear) {
        this.fName = fName;
        this.lName = lName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.favBrewery = favBrewery;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.birthYear = birthYear;
    }

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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
}

