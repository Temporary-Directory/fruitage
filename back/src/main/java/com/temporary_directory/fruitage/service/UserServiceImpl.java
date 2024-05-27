package com.temporary_directory.fruitage.service;

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

        createFruit(user, fruit);
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

    public void createFruit(User user, Fruit fruit) {
        UserFruit userFruit=UserFruit.builder()
                .user(user)
                .fruit(fruit)
                .fruitIsSelected(true)
                .build();
        userFruitRepository.save(userFruit);
    }
}
