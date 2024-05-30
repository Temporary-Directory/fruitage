package com.temporary_directory.fruitage.dto.response;

import com.temporary_directory.fruitage.entity.Fruit;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FruitInfoResponseDTO {
    private int fruitId;
    private String fruitImage;
    private String fruitName;

    public static FruitInfoResponseDTO toDto(Fruit fruit){
        return new FruitInfoResponseDTO(fruit.getFruitId(), fruit.getFruitImage(), fruit.getFruitName());
    }
}
