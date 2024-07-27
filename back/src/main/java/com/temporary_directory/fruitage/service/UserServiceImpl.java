package com.temporary_directory.fruitage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.temporary_directory.fruitage.dto.response.*;
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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserAvatarRepository userAvatarRepository;
    private final FruitRepository fruitRepository;
    private final AvatarRepository avatarRepository;
    private final UserFruitRepository userFruitRepository;
    private final TodoRepository todoRepository;
    private final GitHubApi gitHubApi;

    @Override
    public void createCharacter(User user, int characterType) {
        Fruit fruit = fruitRepository.findById(2).orElseThrow(() -> new IllegalArgumentException("no fruit"));
        Avatar avatar = avatarRepository.findById(characterType).orElseThrow(() -> new IllegalArgumentException("no avatar"));
        UserAvatar userAvatar = UserAvatar.builder()
                .user(user)
                .fruit(fruit)
                .fruitGauge(0)
                .avatar(avatar)
                .build();
        userAvatarRepository.save(userAvatar);

        createFruit(user, fruit, true);
    }

    @Override
    public void updateCharacter(User user, int characterType) {
        UserAvatar userAvatar = userAvatarRepository.findByUser(user);

        if (userAvatar.getAvatar().getAvatarId() % 2 != characterType % 2) {
            if (characterType == 1) {
                Avatar avatar = avatarRepository.findById(userAvatar.getAvatar().getAvatarId() - 1).orElseThrow(() -> new IllegalArgumentException("no avatar"));
                userAvatar.updateAvatar(avatar);
            } else {
                Avatar avatar = avatarRepository.findById(userAvatar.getAvatar().getAvatarId() + 1).orElseThrow(() -> new IllegalArgumentException("no avatar"));
                userAvatar.updateAvatar(avatar);
            }
        }
    }

    @Override
    public CharacterResponseDTO getCharacter(User user) {
        UserAvatar userAvatar = userAvatarRepository.findByUser(user);
        if (userAvatar.getAvatar().getAvatarId() % 2 == 0) {
            return new CharacterResponseDTO(2, "호랑이");
        } else {
            return new CharacterResponseDTO(1, "곰");
        }
    }

    @Override
    public FruitResponseDTO getFruitCount(User user) {
        return new FruitResponseDTO(userFruitRepository.countByUser(user));
    }

    @Override
    public void selectFruit(User user, ArrayList<Integer> fruitList) {
        for (int num : fruitList) {
            Fruit fruit = fruitRepository.findById(num).orElseThrow(() -> new IllegalArgumentException("no fruit"));
            UserFruit userFruit = userFruitRepository.findByUserAndFruit(user, fruit);
            userFruit.selectFruit();
        }
    }

    @Override
    public List<UserFruitInfoResponseDTO> getFruitInfo(User user) {
        return userFruitRepository.findByUser(user).stream().map(UserFruitInfoResponseDTO::toDto).collect(Collectors.toList());
    }

    @Override
    public List<FruitInfoResponseDTO> getNewFruitInfo(User user, int fruitId) {
        UserAvatar userAvatar = userAvatarRepository.findByUser(user);

        List<FruitInfoResponseDTO> fruitInfoResponseDTOList = new ArrayList<>();

        Fruit fruit = null;
        for (int i = userAvatar.getFruit().getFruitId() + 1; i <= fruitId; i++) {
            fruit = fruitRepository.findById(i).orElseThrow(() -> new IllegalArgumentException("no fruit"));
            fruitInfoResponseDTOList.add(FruitInfoResponseDTO.toDto(fruit));

            createFruit(user, fruit, false);
        }
        userAvatar.updateFruit(fruit);

        return fruitInfoResponseDTOList;
    }

    @Override
    public UserInfoResponseDTO getUserInfo(User user) throws JsonProcessingException {

        int commit = 0;
        String result = gitHubApi.getEvents(user.getUserLoginName());
        if (result != null) {
            JsonNode jsonNode = new ObjectMapper().readTree(result);
            for (JsonNode node : jsonNode) {
                if (node.get("type").asText().equals("PushEvent")) {
                    String time = node.get("created_at").asText();
                    Instant instant = Instant.parse(time);
                    ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
                    LocalDate localDate = zonedDateTime.toLocalDate();

                    if (localDate.isAfter(LocalDate.now().withDayOfMonth(1).minusDays(1)) && localDate.isBefore(LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()).plusDays(1))) {
                        commit += 1;
                    }
                }
            }
        }
        int todo = todoRepository.countByUserAndTodoCompleteAndTodoDateBetween(user, true, LocalDate.now().withDayOfMonth(1), LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()));

        return new UserInfoResponseDTO(commit, todo);
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
