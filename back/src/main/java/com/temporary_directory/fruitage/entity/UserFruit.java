package com.temporary_directory.fruitage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserFruit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_fruit_id")
    private int userFruitId;

    @Column(name="fruit_is_selected" , columnDefinition = "TINYINT(1)")
    private boolean fruitIsSelected;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fruit_id")
    private Fruit fruit;

    public void selectFruit(){
        this.fruitIsSelected = !this.fruitIsSelected;
    }

}
