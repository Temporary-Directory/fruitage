package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.TodayTodoResponseDTO;
import com.temporary_directory.fruitage.entity.User;

public interface TodayService {
    TodayTodoResponseDTO getTodoCount(User user);
}
