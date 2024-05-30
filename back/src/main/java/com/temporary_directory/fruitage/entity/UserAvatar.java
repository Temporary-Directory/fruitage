package com.temporary_directory.fruitage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAvatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_avatar_id")
    private int userAvatarId;

    @Column(name="fruit_gauge")
    private int fruitGauge;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fruit_id")
    private Fruit fruit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="avatar_id")
    private Avatar avatar;

    public void updateAvatar(Avatar avatar){
        this.avatar=avatar;
    }
    public void updateFruit(Fruit fruit) {this.fruit = fruit; }
}
