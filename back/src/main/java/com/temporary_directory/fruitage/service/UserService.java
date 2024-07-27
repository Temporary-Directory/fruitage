package com.temporary_directory.fruitage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.temporary_directory.fruitage.dto.response.*;
import com.temporary_directory.fruitage.entity.User;

import java.util.ArrayList;
import java.util.List;

public interface UserService {
    void createCharacter(User user, int characterType);

    void updateCharacter(User user, int characterType);

    CharacterResponseDTO getCharacter(User user);

    FruitResponseDTO getFruitCount(User user);

    void selectFruit(User user, ArrayList<Integer> fruitList);

    List<UserFruitInfoResponseDTO> getFruitInfo(User user);

    UserInfoResponseDTO getUserInfo(User user) throws JsonProcessingException;

    void deleteUser(User user);

}
