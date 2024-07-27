package com.temporary_directory.fruitage.controller;

import com.temporary_directory.fruitage.config.oauth.PrincipalDetails;
import com.temporary_directory.fruitage.dto.request.CharacterRequestDTO;
import com.temporary_directory.fruitage.dto.request.FruitRequestDTO;
import com.temporary_directory.fruitage.dto.response.FruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.UserFruitInfoResponseDTO;
import com.temporary_directory.fruitage.dto.response.FruitResponseDTO;
import com.temporary_directory.fruitage.dto.response.UserNameResponseDTO;
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

    @GetMapping("/fruit/{fruitId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<FruitInfoResponseDTO> getNewFruitInfo(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable("fruitId") int fruitId) {
        return userService.getNewFruitInfo(principalDetails.getUser(), fruitId);
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
}
