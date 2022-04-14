package com.iftm.centralanimal.exceptionhandler.controllerAdvice;

import com.iftm.centralanimal.exceptionhandler.exceptions.AdministratorNotFoundException;
import com.iftm.centralanimal.exceptionhandler.MessageExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@ControllerAdvice(basePackages = "com.iftm.centralanimal.controllers")
public class AdministratorControllerAdvice {

    @ResponseBody
    @ExceptionHandler(AdministratorNotFoundException.class)
    public ResponseEntity<MessageExceptionHandler> administratorNotFound(AdministratorNotFoundException administratorNotFound) {
        MessageExceptionHandler error = new MessageExceptionHandler(new Date(),
                                                                    HttpStatus.NOT_FOUND.value(),
                                                            "Administrador não encontrado.");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
