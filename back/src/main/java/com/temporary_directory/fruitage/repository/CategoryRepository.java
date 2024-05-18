package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.Category;
import com.temporary_directory.fruitage.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    List<Category> findByUserAndCategoryIsDeleted(User user, boolean flag);
}
