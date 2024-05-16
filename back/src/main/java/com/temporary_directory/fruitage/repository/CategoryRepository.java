package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
