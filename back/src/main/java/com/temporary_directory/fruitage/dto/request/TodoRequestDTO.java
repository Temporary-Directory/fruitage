package com.temporary_directory.fruitage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TodoRequestDTO {
    private LocalDate todoDate;
    private String todoContent;
    private int categoryId;
}
