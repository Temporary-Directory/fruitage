package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.CategoryResponseDTO;
import com.temporary_directory.fruitage.entity.Category;
import com.temporary_directory.fruitage.entity.Todo;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.repository.CategoryRepository;
import com.temporary_directory.fruitage.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;

    @Override
    public void createCategory(User user, String categoryName, String categoryColor) {
        Category category=Category.builder()
                .categoryName(categoryName)
                .categoryColor(categoryColor)
                .user(user)
                .build();
        categoryRepository.save(category);
    }

    @Override
    public List<CategoryResponseDTO> getCategory(User user) {
        return categoryRepository.findByUserAndCategoryIsDeleted(user, false).stream().map(CategoryResponseDTO::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(int categoryId) {
        Category category= categoryRepository.findById(categoryId).orElseThrow(()->new IllegalArgumentException("no category"));
        category.deleteCategory();
    }

    @Override
    public void updateCategory(int categoryId, String categoryName, String categoryColor) {
        Category category=categoryRepository.findById(categoryId).orElseThrow(()->new IllegalArgumentException("no category"));
        category.updateCategory(categoryName, categoryColor);
    }

    @Override
    public void createTodo(User user, LocalDate todoDate, String todoContent, int categoryId) {
        Category category=categoryRepository.findById(categoryId).orElseThrow(()->new IllegalArgumentException("no category"));
        Todo todo= Todo.builder()
                .todoDate(todoDate)
                .todoContent(todoContent)
                .category(category)
                .user(user)
                .build();
        todoRepository.save(todo);
    }
}
