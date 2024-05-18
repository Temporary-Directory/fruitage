package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.CategoryResponseDTO;
import com.temporary_directory.fruitage.entity.User;

import java.util.List;

public interface CalendarService {
    void setCategory(User user, String categoryName, String categoryColor);
    List<CategoryResponseDTO> getCategory(User user);
    void deleteCategory(int categoryId);
    void updateCategory(int categoryId, String categoryName, String categoryColor);
}
