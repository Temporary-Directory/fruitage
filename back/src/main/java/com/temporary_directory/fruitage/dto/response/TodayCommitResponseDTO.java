package com.temporary_directory.fruitage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TodayCommitResponseDTO {
    private int commit;
    private int days;
}
