package com.iftm.centralanimal.exceptionhandler.controllerAdvice;

import com.iftm.centralanimal.exceptionhandler.exceptions.AnimalNotFoundException;
import com.iftm.centralanimal.exceptionhandler.MessageExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@ControllerAdvice(basePackages = "com.iftm.centralanimal.controllers")
public class AnimalControllerAdvice {

    @ResponseBody
    @ExceptionHandler(AnimalNotFoundException.class)
    public ResponseEntity<MessageExceptionHandler> animalNotFound(AnimalNotFoundException animalNotFound) {
        MessageExceptionHandler error = new MessageExceptionHandler(new Date(),
                                                                    HttpStatus.NOT_FOUND.value(),
                                                            "Animal não encontrado.");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
