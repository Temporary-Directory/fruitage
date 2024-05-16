package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserLoginName(String name);
}
