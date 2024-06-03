package com.temporary_directory.fruitage.controller;

import com.temporary_directory.fruitage.config.oauth.PrincipalDetails;
import com.temporary_directory.fruitage.dto.response.TodayTodoResponseDTO;
import com.temporary_directory.fruitage.service.TodayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/today")
public class TodayController {
    private final TodayService todayService;

    @GetMapping("/todo")
    @ResponseStatus(code= HttpStatus.OK)
    public TodayTodoResponseDTO getTodoCount(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return todayService.getTodoCount(principalDetails.getUser());
    }

}
