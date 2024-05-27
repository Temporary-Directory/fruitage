package com.temporary_directory.fruitage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FruitRequestDTO {
    private ArrayList<Integer> fruitIdList;
}
