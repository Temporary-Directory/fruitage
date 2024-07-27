package com.temporary_directory.fruitage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.temporary_directory.fruitage.dto.response.TodayCommitResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodayStatusResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodayTodoResponseDTO;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.entity.UserAvatar;
import com.temporary_directory.fruitage.externalApi.GitHubApi;
import com.temporary_directory.fruitage.repository.TodoRepository;
import com.temporary_directory.fruitage.repository.UserAvatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class TodayServiceImpl implements TodayService{
    private final TodoRepository todoRepository;
    private final UserAvatarRepository userAvatarRepository;
    private final GitHubApi gitHubApi;
    @Override
    public TodayTodoResponseDTO getTodoCount(User user) {
        LocalDate date= LocalDate.now();
        int complete = todoRepository.countByUserAndTodoDateAndTodoComplete(user, date, true);
        int incomplete= todoRepository.countByUserAndTodoDateAndTodoComplete(user, date, false);

        return new TodayTodoResponseDTO(complete, incomplete);
    }

    @Override
    public TodayCommitResponseDTO getCommitCount(String name) throws JsonProcessingException {
        String result = gitHubApi.getEvents(name);

        if(result != null){
            JsonNode jsonNode = new ObjectMapper().readTree(result);

            int commit=0, days=0;
            ArrayList<LocalDate> list =new ArrayList<>();
            for(JsonNode node: jsonNode){
                if(node.get("type").asText().equals("PushEvent")){
                    String str= node.get("created_at").asText();
                    Instant instant = Instant.parse(str);
                    ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
                    LocalDate date = zonedDateTime.toLocalDate();

                    if(!list.contains(date))
                        list.add(date);
                    if(date.isEqual(LocalDate.now())){
                        commit+=1;
                    }
                }
            }

            if(commit > 0){
                Collections.sort(list, Collections.reverseOrder());

                LocalDate temp = LocalDate.now();
                for(LocalDate date : list){
                    if(date.equals(temp)) {
                        temp = date.minusDays(1);
                        days+=1;
                    }else{
                        break;
                    }
                }
            }
            return new TodayCommitResponseDTO(commit, days);
        }
        return null;
    }

    @Override
    public TodayStatusResponseDTO getTodayStatus(User user) throws JsonProcessingException {
        UserAvatar userAvatar = userAvatarRepository.findByUser(user);
        TodayStatusResponseDTO todayStatusResponseDTO = new TodayStatusResponseDTO(userAvatar);

        // gauge = todoComplete + commit
        int todoCount = todoRepository.countByUserAndTodoComplete(user, true);

        String result = gitHubApi.getEvents(user.getUserLoginName());
        int commitCount=0;
        if(result != null){
            JsonNode jsonNode = new ObjectMapper().readTree(result);
            ArrayList<LocalDate> list =new ArrayList<>();
            for(JsonNode node: jsonNode){
                if(node.get("type").asText().equals("PushEvent")){
                    commitCount+=1;
                }
            }
        }
        commitCount = Math.max(userAvatar.getFruitGauge(), todoCount+commitCount);
        userAvatar.updateFruitGauge(commitCount);
        todayStatusResponseDTO.setUserFruitGauge(30 - (commitCount%30));
        return todayStatusResponseDTO;
    }
}
