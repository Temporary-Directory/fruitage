package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.FruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.FruitResponseDTO;
import com.temporary_directory.fruitage.entity.User;

import java.util.ArrayList;
import java.util.List;

public interface UserService {
    void createCharacter(User user, int characterType);
    void updateCharacter(User user, int characterType);
    FruitResponseDTO getFruitCount(User user);
    void selectFruit(User user, ArrayList<Integer> fruitList);
    List<FruitInfoResponseDTO> getFruitInfo(User user);
}
