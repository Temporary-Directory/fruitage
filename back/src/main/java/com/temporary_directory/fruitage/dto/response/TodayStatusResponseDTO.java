package com.temporary_directory.fruitage.dto.response;

import com.temporary_directory.fruitage.entity.UserAvatar;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TodayStatusResponseDTO {
    private int userCharacterId;
    private String characterImage;
    private int fruitId;
    private String fruitName;
    private int userFruitGauge;

    public TodayStatusResponseDTO (UserAvatar userAvatar){
        this.userCharacterId = userAvatar.getUserAvatarId();
        this.characterImage = userAvatar.getAvatar().getAvatarImage();
        this.fruitId=userAvatar.getFruit().getFruitId();
        this.fruitName=userAvatar.getFruit().getFruitName();
    }
}
