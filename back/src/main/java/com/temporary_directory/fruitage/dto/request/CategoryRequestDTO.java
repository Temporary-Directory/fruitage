package com.temporary_directory.fruitage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequestDTO {
    private String categoryName;
    private String categoryColor;
}
