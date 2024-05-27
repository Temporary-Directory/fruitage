package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.Fruit;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.entity.UserFruit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFruitRepository extends JpaRepository<UserFruit, Integer> {
    int countByUser(User user);
    UserFruit findByUserAndFruit(User user, Fruit fruit);
    List<UserFruit> findByUser(User user);
}
