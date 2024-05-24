package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.UserFruit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFruitRepository extends JpaRepository<UserFruit, Integer> {
}
