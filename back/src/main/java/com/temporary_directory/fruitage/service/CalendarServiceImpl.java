package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.CategoryResponseDTO;
import com.temporary_directory.fruitage.entity.Category;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final CategoryRepository categoryRepository;

    @Override
    public void setCategory(User user, String categoryName, String categoryColor) {
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
        Category category= categoryRepository.findById(categoryId).orElseThrow();
        category.deleteCategory();
    }
}
