package com.temporary_directory.fruitage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.temporary_directory.fruitage.dto.response.FruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodayCommitResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodayStatusResponseDTO;
import com.temporary_directory.fruitage.dto.response.TodayTodoResponseDTO;
import com.temporary_directory.fruitage.entity.*;
import com.temporary_directory.fruitage.externalApi.GitHubApi;
import com.temporary_directory.fruitage.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class TodayServiceImpl implements TodayService {
    private final TodoRepository todoRepository;
    private final UserAvatarRepository userAvatarRepository;
    private final FruitRepository fruitRepository;
    private final UserFruitRepository userFruitRepository;
    private final AvatarRepository avatarRepository;
    private final GitHubApi gitHubApi;

    @Override
    public TodayTodoResponseDTO getTodoCount(User user) {
        LocalDate date = LocalDate.now();
        int complete = todoRepository.countByUserAndTodoDateAndTodoComplete(user, date, true);
        int incomplete = todoRepository.countByUserAndTodoDateAndTodoComplete(user, date, false);

        return new TodayTodoResponseDTO(complete, incomplete);
    }

    @Override
    public TodayCommitResponseDTO getCommitCount(String name) throws JsonProcessingException {
        String result = gitHubApi.getEvents(name);

        if (result != null) {
            JsonNode jsonNode = new ObjectMapper().readTree(result);

            int commit = 0, days = 0;
            ArrayList<LocalDate> list = new ArrayList<>();
            for (JsonNode node : jsonNode) {
                if (node.get("type").asText().equals("PushEvent")) {
                    String str = node.get("created_at").asText();
                    Instant instant = Instant.parse(str);
                    ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
                    LocalDate date = zonedDateTime.toLocalDate();

                    if (!list.contains(date))
                        list.add(date);
                    if (date.isEqual(LocalDate.now())) {
                        commit += 1;
                    }
                }
            }

            if (commit > 0) {
                Collections.sort(list, Collections.reverseOrder());

                LocalDate temp = LocalDate.now();
                for (LocalDate date : list) {
                    if (date.equals(temp)) {
                        temp = date.minusDays(1);
                        days += 1;
                    } else {
                        break;
                    }
                }
            }
            return new TodayCommitResponseDTO(commit, days);
        }
        return null;
    }

    @Override
    public Map<String, Object> getTodayStatus(User user) throws JsonProcessingException {

        UserAvatar userAvatar = userAvatarRepository.findByUser(user);

        if (!(userAvatar.getRecentDate().getYear() == LocalDate.now().getYear() && userAvatar.getRecentDate().getMonth() == LocalDate.now().getMonth())) {
            userAvatar.updateFruitGauge(0);
        }
        userAvatar.updateRecentDate(LocalDate.now());

        // gauge = todoComplete + commit
        int todoCount = todoRepository.countByUserAndTodoCompleteAndTodoDateBetween(user, true, LocalDate.now().withDayOfMonth(1), LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()));

        String result = gitHubApi.getEvents(user.getUserLoginName());
        int commitCount = 0;
        if (result != null) {
            JsonNode jsonNode = new ObjectMapper().readTree(result);
            for (JsonNode node : jsonNode) {
                if (node.get("type").asText().equals("PushEvent")) {
                    String time = node.get("created_at").asText();
                    Instant instant = Instant.parse(time);
                    ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
                    LocalDate localDate = zonedDateTime.toLocalDate();

                    if (localDate.isAfter(LocalDate.now().withDayOfMonth(1).minusDays(1)) && localDate.isBefore(LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()).plusDays(1))) {
                        commitCount += 1;
                    }
                }
            }
        }

        int count = Math.max(userAvatar.getFruitGauge(), todoCount + commitCount);
        int avatarNum = userAvatar.getAvatar().getAvatarId();

        List<FruitInfoResponseDTO> fruitInfoResponseDTOList = new ArrayList<>();
        if(userAvatar.getFruitGauge()/30 < count/30){
            Fruit fruit = null;
            for (int i = 1; i <= count/30 - userAvatar.getFruitGauge()/30 ; i++) {
                fruit = fruitRepository.findById(userAvatar.getFruit().getFruitId()+i).orElseThrow(() -> new IllegalArgumentException("no fruit"));
                fruitInfoResponseDTOList.add(FruitInfoResponseDTO.toDto(fruit));
                avatarNum+=2;

                createFruit(user, fruit, false);
            }
            userAvatar.updateFruit(fruit);
        }

        userAvatar.updateFruitGauge(count);
        TodayStatusResponseDTO todayStatusResponseDTO = new TodayStatusResponseDTO(userAvatar);
        todayStatusResponseDTO.setUserFruitGauge(30 - (count % 30));
        Avatar avatar = avatarRepository.findById(avatarNum).orElseThrow(() -> new IllegalArgumentException("no avatar"));
        userAvatar.updateAvatar(avatar);

        Map<String, Object> map = new HashMap<>();
        map.put("todayStatus", todayStatusResponseDTO);
        map.put("newFruit", fruitInfoResponseDTOList);
        return map;
    }

    public void createFruit(User user, Fruit fruit, boolean flag) {
        UserFruit userFruit = UserFruit.builder()
                .user(user)
                .fruit(fruit)
                .fruitIsSelected(flag)
                .build();
        userFruitRepository.save(userFruit);
    }
}
