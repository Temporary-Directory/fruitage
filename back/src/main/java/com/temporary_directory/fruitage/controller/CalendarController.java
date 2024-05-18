package com.temporary_directory.fruitage.controller;

import com.temporary_directory.fruitage.config.oauth.PrincipalDetails;
import com.temporary_directory.fruitage.dto.request.CategoryRequestDTO;
import com.temporary_directory.fruitage.dto.request.TodoRequestDTO;
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
    public void createCategory(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CategoryRequestDTO categoryRequestDTO){
        calendarService.createCategory(principalDetails.getUser(), categoryRequestDTO.getCategoryName(), categoryRequestDTO.getCategoryColor());
    }

    @GetMapping("/category")
    @ResponseStatus(code = HttpStatus.OK)
    public List<CategoryResponseDTO> getCategory(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return calendarService.getCategory(principalDetails.getUser());
    }

    @DeleteMapping("/category/{categoryId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteCategory(@PathVariable("categoryId") int categoryId){
        calendarService.deleteCategory(categoryId);
    }

    @PutMapping("/category")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateCategory(@RequestBody CategoryRequestDTO categoryRequestDTO){
        calendarService.updateCategory(categoryRequestDTO.getCategoryId(), categoryRequestDTO.getCategoryName(), categoryRequestDTO.getCategoryColor());
    }

    // to do
    @PostMapping("/todo")
    @ResponseStatus(code = HttpStatus.OK)
    public void createTodo(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody TodoRequestDTO todoRequestDTO){
        calendarService.createTodo(principalDetails.getUser(), todoRequestDTO.getTodoDate(), todoRequestDTO.getTodoContent(), todoRequestDTO.getCategoryId());
    }
}
