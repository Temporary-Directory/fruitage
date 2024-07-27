package com.temporary_directory.fruitage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommitResponseDTO {
    private String repository;
    private String content;
    private String time;
}
