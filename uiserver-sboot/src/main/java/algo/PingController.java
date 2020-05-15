package algo;

import java.util.HashMap;
import java.util.Map;

import com.google.common.collect.ImmutableMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {

    @GetMapping(path = "/ping")
    public ResponseEntity<Map<String, String>> ping() {
        Map<String,String> map = ImmutableMap.of("ping","pong");
        return new ResponseEntity<>(map, HttpStatus.OK);//==return map;
    }
}
