package com.temporary_directory.fruitage.dto.response;

import com.temporary_directory.fruitage.entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class TodoResponseDTO {
    private int todoId;
    private String todoCategory;
    private String todoContent;
    private boolean todoComplete;
    private LocalDate todoDate;

    public static TodoResponseDTO toDto(Todo todo){
        return new TodoResponseDTO(todo.getTodoId(), todo.getCategory().getCategoryName(), todo.getTodoContent(), todo.isTodoComplete(), todo.getTodoDate());
    }
}
