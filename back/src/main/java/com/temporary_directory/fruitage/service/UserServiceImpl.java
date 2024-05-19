package com.temporary_directory.fruitage.service;

import com.temporary_directory.fruitage.entity.Avatar;
import com.temporary_directory.fruitage.entity.Fruit;
import com.temporary_directory.fruitage.entity.User;
import com.temporary_directory.fruitage.entity.UserAvatar;
import com.temporary_directory.fruitage.repository.AvatarRepository;
import com.temporary_directory.fruitage.repository.FruitRepository;
import com.temporary_directory.fruitage.repository.UserAvatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserAvatarRepository userAvatarRepository;
    private final FruitRepository fruitRepository;
    private final AvatarRepository avatarRepository;
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
    }
}
