package com.temporary_directory.fruitage.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.temporary_directory.fruitage.config.oauth.PrincipalDetails;
import com.temporary_directory.fruitage.dto.request.CategoryRequestDTO;
import com.temporary_directory.fruitage.dto.request.TodoRequestDTO;
import com.temporary_directory.fruitage.dto.response.CalendarResponseDTO;
import com.temporary_directory.fruitage.dto.response.CategoryResponseDTO;
import com.temporary_directory.fruitage.dto.response.CommitResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodoResponseDTO;
import com.temporary_directory.fruitage.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;

    //category
    @PostMapping("/category")
    @ResponseStatus(code = HttpStatus.OK)
    public void createCategory(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CategoryRequestDTO categoryRequestDTO) {
        calendarService.createCategory(principalDetails.getUser(), categoryRequestDTO.getCategoryName(), categoryRequestDTO.getCategoryColor());
    }

    @GetMapping("/category")
    @ResponseStatus(code = HttpStatus.OK)
    public List<CategoryResponseDTO> getCategory(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return calendarService.getCategory(principalDetails.getUser());
    }

    @DeleteMapping("/category/{categoryId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteCategory(@PathVariable("categoryId") int categoryId) {
        calendarService.deleteCategory(categoryId);
    }

    @PutMapping("/category")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateCategory(@RequestBody CategoryRequestDTO categoryRequestDTO) {
        calendarService.updateCategory(categoryRequestDTO.getCategoryId(), categoryRequestDTO.getCategoryName(), categoryRequestDTO.getCategoryColor());
    }

    // to do
    @PostMapping("/todo")
    @ResponseStatus(code = HttpStatus.OK)
    public void createTodo(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody TodoRequestDTO todoRequestDTO) {
        calendarService.createTodo(principalDetails.getUser(), todoRequestDTO.getTodoDate(), todoRequestDTO.getTodoContent(), todoRequestDTO.getCategoryId());
    }

    @PutMapping("/todo/{todoId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void completeTodo(@PathVariable("todoId") int todoId) {
        calendarService.completeTodo(todoId);
    }

    @GetMapping("/todo")
    @ResponseStatus(code = HttpStatus.OK)
    public List<TodoResponseDTO> getTodo(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return calendarService.getTodo(principalDetails.getUser(), date);
    }

    @PutMapping("/todo")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateTodo(@RequestBody TodoRequestDTO todoRequestDTO) {
        calendarService.updateTodo(todoRequestDTO.getTodoId(), todoRequestDTO.getTodoDate(), todoRequestDTO.getTodoContent(), todoRequestDTO.getCategoryId());
    }

    @DeleteMapping("/todo/{todoId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteTodo(@PathVariable("todoId") int todoId) {
        calendarService.deleteTodo(todoId);
    }

    @GetMapping("/commit")
    @ResponseStatus(code = HttpStatus.OK)
    public List<CommitResponseDTO> getCommit(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) throws JsonProcessingException {
        return calendarService.getCommit(principalDetails.getUser(), date);
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public CalendarResponseDTO getCalendar(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam(value="flag") String flag, @RequestParam(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) throws JsonProcessingException {
        return calendarService.getCalendar(principalDetails.getUser(), flag, date);
    }
}
