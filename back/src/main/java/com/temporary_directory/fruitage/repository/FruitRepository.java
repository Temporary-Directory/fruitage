package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.Fruit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FruitRepository extends JpaRepository<Fruit, Integer> {
}
