package com.temporary_directory.fruitage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CalendarResponseDTO {
    private List<String> fruitImage;
    private boolean[] days;
}
