package com.temporary_directory.fruitage.dto.response;

import com.temporary_directory.fruitage.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponseDTO {
    private int categoryId;
    private String categoryName;
    private String categoryColor;

    public static CategoryResponseDTO toDto(Category category){
        return new CategoryResponseDTO(category.getCategoryId(),category.getCategoryName(),category.getCategoryColor());
    }
}
