package com.temporary_directory.fruitage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAvatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_avatar_id")
    private int userAvatarId;

    @Column(name = "fruit_gauge")
    private int fruitGauge;

    @Column(name = "recent_Date")
    private LocalDate recentDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fruit_id")
    private Fruit fruit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public void updateFruit(Fruit fruit) {
        this.fruit = fruit;
    }

    public void updateFruitGauge(int gauge) {
        this.fruitGauge = gauge;
    }

    public void updateRecentDate(LocalDate date) {
        this.recentDate = date;
    }
}
