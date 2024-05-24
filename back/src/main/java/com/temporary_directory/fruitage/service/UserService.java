package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.FruitResponseDTO;
import com.temporary_directory.fruitage.entity.User;

public interface UserService {
    void createCharacter(User user, int characterType);
    void updateCharacter(User user, int characterType);
    FruitResponseDTO getFruitCount(User user);
}
