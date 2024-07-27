package com.temporary_directory.fruitage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="avatar_id")
    private int avatarId;

    @Column(name="avatar_image")
    private String avatarImage;
}
