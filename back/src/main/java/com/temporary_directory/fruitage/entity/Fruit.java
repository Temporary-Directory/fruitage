package com.temporary_directory.fruitage.entity;


import javax.persistence.*;

@Entity
public class Fruit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="fruit_id")
    private int fruitId;

    @Column(name="fruit_name")
    private String fruitName;

    @Column(name="fruit_image")
    private String fruitImage;

}
