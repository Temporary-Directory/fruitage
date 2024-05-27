package com.temporary_directory.fruitage.dto.response;

import com.temporary_directory.fruitage.entity.UserFruit;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FruitInfoResponseDTO {
    private int userFruitId;
    private int fruitId;
    private String fruitImage;
    private String fruitName;
    private boolean fruitIsSelected;

    public static FruitInfoResponseDTO toDto(UserFruit userFruit){
        return new FruitInfoResponseDTO(userFruit.getUserFruitId(), userFruit.getFruit().getFruitId(), userFruit.getFruit().getFruitImage(), userFruit.getFruit().getFruitName(), userFruit.isFruitIsSelected());
    }
}
