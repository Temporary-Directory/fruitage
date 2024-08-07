package com.temporary_directory.fruitage.repository;

import com.temporary_directory.fruitage.entity.Todo;
import com.temporary_directory.fruitage.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByUserAndTodoDate(User user, LocalDate date);

    int countByUserAndTodoDateAndTodoComplete(User user, LocalDate date, boolean flag);

    int countByUserAndTodoComplete(User user, boolean flag);

    List<Todo> findByUserAndTodoCompleteAndTodoDateBetween(User user, boolean flag, LocalDate start, LocalDate end);

    int countByUserAndTodoCompleteAndTodoDateBetween(User user, boolean flag, LocalDate start, LocalDate end);
}
