package com.temporary_directory.fruitage.controller;

import com.temporary_directory.fruitage.config.oauth.PrincipalDetails;
import com.temporary_directory.fruitage.dto.request.CategoryRequestDTO;
import com.temporary_directory.fruitage.dto.response.CategoryResponseDTO;
import com.temporary_directory.fruitage.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;

    //category

    @PostMapping("/category")
    @ResponseStatus(code = HttpStatus.OK)
    public void setCategory(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CategoryRequestDTO categoryRequestDTO){
        calendarService.setCategory(principalDetails.getUser(), categoryRequestDTO.getCategoryName(), categoryRequestDTO.getCategoryColor());
    }

    @GetMapping("/category")
    @ResponseStatus(code = HttpStatus.OK)
    public List<CategoryResponseDTO> getCategory(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return calendarService.getCategory(principalDetails.getUser());
    }
}
