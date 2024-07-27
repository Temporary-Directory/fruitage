package com.temporary_directory.fruitage.dto.response;

import com.temporary_directory.fruitage.entity.UserFruit;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserFruitInfoResponseDTO {
    private int userFruitId;
    private int fruitId;
    private String fruitImage;
    private String fruitName;
    private boolean fruitIsSelected;

    public static UserFruitInfoResponseDTO toDto(UserFruit userFruit){
        return new UserFruitInfoResponseDTO(userFruit.getUserFruitId(), userFruit.getFruit().getFruitId(), userFruit.getFruit().getFruitImage(), userFruit.getFruit().getFruitName(), userFruit.isFruitIsSelected());
    }
}
