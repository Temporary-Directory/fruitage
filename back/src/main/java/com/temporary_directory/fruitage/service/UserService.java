package com.temporary_directory.fruitage.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.temporary_directory.fruitage.dto.response.FruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.UserFruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.FruitResponseDTO;
import com.temporary_directory.fruitage.dto.response.UserInfoResponseDTO;
import com.temporary_directory.fruitage.entity.User;

import java.util.ArrayList;
import java.util.List;

public interface UserService {
    void createCharacter(User user, int characterType);

    void updateCharacter(User user, int characterType);

    FruitResponseDTO getFruitCount(User user);

    void selectFruit(User user, ArrayList<Integer> fruitList);

    List<UserFruitInfoResponseDTO> getFruitInfo(User user);

    List<FruitInfoResponseDTO> getNewFruitInfo(User user, int fruitId);

    UserInfoResponseDTO getUserInfo(User user) throws JsonProcessingException;
}
