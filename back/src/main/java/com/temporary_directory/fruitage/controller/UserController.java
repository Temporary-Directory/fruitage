package com.temporary_directory.fruitage.controller;

import com.temporary_directory.fruitage.config.oauth.PrincipalDetails;
import com.temporary_directory.fruitage.dto.request.CharacterRequestDTO;
import com.temporary_directory.fruitage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    //character
    @PostMapping("/character")
    @ResponseStatus(code= HttpStatus.OK)
    public void createCharacter(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CharacterRequestDTO characterRequestDTO){
        userService.createCharacter(principalDetails.getUser(), characterRequestDTO.getCharacterType());
    }

    @PutMapping("/character")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateCharacter(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CharacterRequestDTO characterRequestDTO){
        userService.updateCharacter(principalDetails.getUser(), characterRequestDTO.getCharacterType());
    }
}
