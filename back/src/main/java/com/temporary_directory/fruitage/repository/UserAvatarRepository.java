package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.UserAvatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAvatarRepository extends JpaRepository<UserAvatar, Integer> {
}
