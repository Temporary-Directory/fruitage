package com.temporary_directory.fruitage.externalApi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Component
public class GitHubApi {
    @Value("${github-api.token}")
    private String gitToken;

    public GitHubApi(){

    }

    public String getEvents(String userName){
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.github.com/users/"+userName+ "/events")
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+gitToken);
        headers.add("X-GitHub-Api-Version", "2022-11-28");

        HttpEntity entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, String.class);

        if(response.getStatusCode() == HttpStatus.OK){
            return response.getBody();
        }else{
            return null;
        }
    }
}
