package com.temporary_directory.fruitage.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.temporary_directory.fruitage.config.oauth.PrincipalDetails;
import com.temporary_directory.fruitage.dto.request.CharacterRequestDTO;
import com.temporary_directory.fruitage.dto.request.FruitRequestDTO;
import com.temporary_directory.fruitage.dto.response.*;
import com.temporary_directory.fruitage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    // character
    @PostMapping("/character")
    @ResponseStatus(code = HttpStatus.OK)
    public void createCharacter(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CharacterRequestDTO characterRequestDTO) {
        userService.createCharacter(principalDetails.getUser(), characterRequestDTO.getCharacterType());
    }

    @PutMapping("/character")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateCharacter(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CharacterRequestDTO characterRequestDTO) {
        userService.updateCharacter(principalDetails.getUser(), characterRequestDTO.getCharacterType());
    }

    @GetMapping("/character")
    @ResponseStatus(code = HttpStatus.OK)
    public CharacterResponseDTO getCharacter(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return userService.getCharacter(principalDetails.getUser());
    }

    // fruit
    @GetMapping("/fruit")
    @ResponseStatus(code = HttpStatus.OK)
    public FruitResponseDTO getFruitCount(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return userService.getFruitCount(principalDetails.getUser());
    }

    @PostMapping("/fruit")
    @ResponseStatus(code = HttpStatus.OK)
    public void selectFruit(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody FruitRequestDTO fruitRequestDTO) {
        userService.selectFruit(principalDetails.getUser(), fruitRequestDTO.getFruitIdList());
    }

    @GetMapping("/fruit/info")
    @ResponseStatus(code = HttpStatus.OK)
    public List<UserFruitInfoResponseDTO> getFruitInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return userService.getFruitInfo(principalDetails.getUser());
    }

    // user
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public UserNameResponseDTO getUserName(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("flag") boolean flag) {
        if (flag) {
            return new UserNameResponseDTO(principalDetails.getUser().getUserLoginName());
        } else {
            return new UserNameResponseDTO(principalDetails.getUser().getUserName());
        }
    }

    @GetMapping("/info")
    @ResponseStatus(code = HttpStatus.OK)
    public UserInfoResponseDTO getUserInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) throws JsonProcessingException {
        return userService.getUserInfo(principalDetails.getUser());
    }

    @DeleteMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        userService.deleteUser(principalDetails.getUser());
    }
}
