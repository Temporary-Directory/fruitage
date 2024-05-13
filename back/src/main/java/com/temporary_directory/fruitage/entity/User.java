package com.temporary_directory.fruitage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int userId;

    @Column(name="creation_date")
    private LocalDateTime creationDate;

    @Column(name="recent_Date")
    private LocalDateTime recentDate;

    @Column(name="user_name")
    private String userName;

    @Column(name="user_email")
    private String userEmail;

}
