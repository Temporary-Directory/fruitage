package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
}
