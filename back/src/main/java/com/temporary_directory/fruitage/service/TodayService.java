package com.temporary_directory.fruitage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.temporary_directory.fruitage.dto.response.TodayCommitResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodayTodoResponseDTO;
import com.temporary_directory.fruitage.entity.User;

public interface TodayService {
    TodayTodoResponseDTO getTodoCount(User user);
    TodayCommitResponseDTO getCommitCount(String name) throws JsonProcessingException;
}
