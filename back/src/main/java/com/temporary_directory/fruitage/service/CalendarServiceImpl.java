package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.entity.Category;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
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
}
