package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.dto.response.FruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.UserFruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.FruitResponseDTO;
import com.temporary_directory.fruitage.entity.*;
import com.temporary_directory.fruitage.repository.AvatarRepository;
import com.temporary_directory.fruitage.repository.FruitRepository;
import com.temporary_directory.fruitage.repository.UserAvatarRepository;
import com.temporary_directory.fruitage.repository.UserFruitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserAvatarRepository userAvatarRepository;
    private final FruitRepository fruitRepository;
    private final AvatarRepository avatarRepository;
    private final UserFruitRepository userFruitRepository;
    @Override
    public void createCharacter(User user, int characterType) {
        Fruit fruit=fruitRepository.findById(2).orElseThrow(()->new IllegalArgumentException("no fruit"));
        Avatar avatar=avatarRepository.findById(characterType).orElseThrow(()->new IllegalArgumentException("no avatar"));
        UserAvatar userAvatar= UserAvatar.builder()
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
        UserAvatar userAvatar=userAvatarRepository.findByUser(user);
        Avatar avatar=avatarRepository.findById(characterType).orElseThrow(()->new IllegalArgumentException("no avatar"));
        userAvatar.updateAvatar(avatar);
    }

    @Override
    public FruitResponseDTO getFruitCount(User user) {
        return new FruitResponseDTO(userFruitRepository.countByUser(user));
    }

    @Override
    public void selectFruit(User user, ArrayList<Integer> fruitList) {
        for(int num: fruitList){
            Fruit fruit=fruitRepository.findById(num).orElseThrow(()->new IllegalArgumentException("no fruit"));
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
        UserAvatar userAvatar=userAvatarRepository.findByUser(user);

        List<FruitInfoResponseDTO> fruitInfoResponseDTOList =new ArrayList<>();

        Fruit fruit=null;
        for(int i=userAvatar.getFruit().getFruitId()+1; i<=fruitId; i++){
            fruit=fruitRepository.findById(i).orElseThrow(()->new IllegalArgumentException("no fruit"));
            fruitInfoResponseDTOList.add(FruitInfoResponseDTO.toDto(fruit));

            createFruit(user, fruit, false);
        }
        userAvatar.updateFruit(fruit);

        return fruitInfoResponseDTOList;
    }

    public void createFruit(User user, Fruit fruit, boolean flag) {
        UserFruit userFruit=UserFruit.builder()
                .user(user)
                .fruit(fruit)
                .fruitIsSelected(flag)
                .build();
        userFruitRepository.save(userFruit);
    }
}
