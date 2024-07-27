package com.temporary_directory.fruitage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TodayTodoResponseDTO {
    private int todoComplete;
    private int todoIncomplete;
}
