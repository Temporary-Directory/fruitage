package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.TodayTodoResponseDTO;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TodayServiceImpl implements TodayService{
    private final TodoRepository todoRepository;
    @Override
    public TodayTodoResponseDTO getTodoCount(User user) {
        LocalDate date= LocalDate.now();
        int complete = todoRepository.countByUserAndTodoDateAndTodoComplete(user, date, true);
        int incomplete= todoRepository.countByUserAndTodoDateAndTodoComplete(user, date, false);

        return new TodayTodoResponseDTO(complete, incomplete);
    }
}
