package com.temporary_directory.fruitage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.temporary_directory.fruitage.dto.response.CalendarResponseDTO;
import com.temporary_directory.fruitage.dto.response.CategoryResponseDTO;
import com.temporary_directory.fruitage.dto.response.CommitResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodoResponseDTO;
import com.temporary_directory.fruitage.entity.*;
import com.temporary_directory.fruitage.externalApi.GitHubApi;
import com.temporary_directory.fruitage.repository.CategoryRepository;
import com.temporary_directory.fruitage.repository.FruitRepository;
import com.temporary_directory.fruitage.repository.TodoRepository;
import com.temporary_directory.fruitage.repository.UserFruitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;
    private final UserFruitRepository userFruitRepository;
    private final FruitRepository fruitRepository;
    private final GitHubApi gitHubApi;

    @Override
    public void createCategory(User user, String categoryName, String categoryColor) {
        Category category = Category.builder()
                .categoryName(categoryName)
                .categoryColor(categoryColor)
                .user(user)
                .build();
        categoryRepository.save(category);
    }

    @Override
    public List<CategoryResponseDTO> getCategory(User user) {
        return categoryRepository.findByUserAndCategoryIsDeleted(user, false).stream().map(CategoryResponseDTO::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(int categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("no category"));
        category.deleteCategory();
    }

    @Override
    public void updateCategory(int categoryId, String categoryName, String categoryColor) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("no category"));
        category.updateCategory(categoryName, categoryColor);
    }

    @Override
    public void createTodo(User user, LocalDate todoDate, String todoContent, int categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("no category"));
        Todo todo = Todo.builder()
                .todoDate(todoDate)
                .todoContent(todoContent)
                .category(category)
                .user(user)
                .build();
        todoRepository.save(todo);
    }

    @Override
    public void completeTodo(int todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new IllegalArgumentException("no todo"));
        todo.updateTodoComplete();
    }

    @Override
    public List<TodoResponseDTO> getTodo(User user, LocalDate date) {
        return todoRepository.findByUserAndTodoDate(user, date).stream().map(TodoResponseDTO::toDto).collect(Collectors.toList());
    }

    @Override
    public void updateTodo(int todoId, LocalDate todoDate, String todoContent, int categoryId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new IllegalArgumentException("no todo"));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("no category"));
        todo.updateTodo(todoDate, todoContent, category);
    }

    @Override
    public void deleteTodo(int todoId) {
        todoRepository.deleteById(todoId);
    }

    @Override
    public List<CommitResponseDTO> getCommit(User user, LocalDate date) throws JsonProcessingException {
        String result = gitHubApi.getEvents(user.getUserLoginName());

        List<CommitResponseDTO> commitResponseDTOList = new ArrayList<>();
        if (result != null) {
            JsonNode jsonNode = new ObjectMapper().readTree(result);

            for (JsonNode node : jsonNode) {
                if (node.get("type").asText().equals("PushEvent")) {
                    String time = node.get("created_at").asText();
                    Instant instant = Instant.parse(time);
                    ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
                    LocalDateTime datetime = zonedDateTime.toLocalDateTime();

                    if (datetime.toLocalDate().equals(date)) {
                        String repoInfo[] = node.get("repo").get("name").asText().split("/");
                        String repository = repoInfo[repoInfo.length - 1];

                        Duration duration = Duration.between(datetime, LocalDateTime.now());
                        if (duration.toHours() <= 24) {
                            if (duration.toHours() > 0) {
                                time = duration.toHours() + " hours ago";
                            } else if (duration.toMinutes() > 0) {
                                time = duration.toMinutes() + " minutes ago";
                            } else {
                                time = duration.toSeconds() + " seconds ago";
                            }
                        } else {
                            Period period = Period.between(date, LocalDate.now());
                            if (period.getYears() > 0) {
                                time = period.getYears() + " years ago";
                            } else if (period.getMonths() > 0) {
                                time = period.getMonths() + " months ago";
                            } else {
                                time = period.getDays() + " days ago";
                            }
                        }
                        String content = node.get("payload").get("commits").get(node.get("payload").get("commits").size() - 1).get("message").asText().split("\\n")[0];
                        commitResponseDTOList.add(new CommitResponseDTO(repository, content, time));
                    }
                }
            }
        }
        return commitResponseDTOList;
    }

    @Override
    public CalendarResponseDTO getCalendar(User user, String flag, LocalDate date) throws JsonProcessingException {
        List<String> fruitImage = new ArrayList<>();
        List<UserFruit> userFruits = userFruitRepository.findByUserAndFruitIsSelected(user, true);
        for (UserFruit userFruit : userFruits) {
            fruitImage.add(userFruit.getFruit().getFruitImage());
        }

        boolean days[] = new boolean[32];
        if (flag.equals("commit")) {
            String result = gitHubApi.getEvents(user.getUserLoginName());
            if (result != null) {
                JsonNode jsonNode = new ObjectMapper().readTree(result);

                for (JsonNode node : jsonNode) {
                    if (node.get("type").asText().equals("PushEvent")) {
                        String time = node.get("created_at").asText();
                        Instant instant = Instant.parse(time);
                        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
                        LocalDate localDate = zonedDateTime.toLocalDate();

                        if (localDate.getYear() == date.getYear() && localDate.getMonth() == date.getMonth() && !days[localDate.getDayOfMonth()]) {
                            days[localDate.getDayOfMonth()] = true;
                        }
                    }
                }
            }
        } else {
            List<Todo> todos = todoRepository.findByUserAndTodoCompleteAndTodoDateBetween(user, true, date.withDayOfMonth(1), date.withDayOfMonth(date.lengthOfMonth()));
            for (Todo todo : todos) {
                if (!days[todo.getTodoDate().getDayOfMonth()]) {
                    days[todo.getTodoDate().getDayOfMonth()] = true;
                }
            }
        }
        Fruit fruit = fruitRepository.findById(1).orElseThrow(() -> new IllegalArgumentException("no fruit"));;
        return new CalendarResponseDTO(fruitImage, fruit.getFruitImage(), days);
    }
}
