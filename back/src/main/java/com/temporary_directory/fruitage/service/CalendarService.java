package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.CategoryResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodoResponseDTO;
import com.temporary_directory.fruitage.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface CalendarService {
    void createCategory(User user, String categoryName, String categoryColor);
    List<CategoryResponseDTO> getCategory(User user);
    void deleteCategory(int categoryId);
    void updateCategory(int categoryId, String categoryName, String categoryColor);
    void createTodo(User user, LocalDate todoDate, String todoContent, int categoryId);
    void completeTodo(int todoId);
    List<TodoResponseDTO> getTodo(User user, LocalDate date);
    void updateTodo(int todoId, LocalDate todoDate, String todoContent, int categoryId);
    void deleteTodo(int todoId);
}
