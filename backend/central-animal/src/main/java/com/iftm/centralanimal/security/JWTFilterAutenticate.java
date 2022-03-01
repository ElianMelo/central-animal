package com.iftm.centralanimal.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iftm.centralanimal.data.DetailAdministratorData;
import com.iftm.centralanimal.models.Administrator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;

public class JWTFilterAutenticate extends UsernamePasswordAuthenticationFilter {

    // tempo de expiração do token de 1 mês.
    public static final long EXPIRATION_TOKEN = 2628100005L;

//    a senha está aqui para fins de desenvolvimento, em um momento futuro estará em algum arquivo fora do repositório.
    public static final String PASSWORD_TOKEN = "af305f04-2fb6-4322-a652-bd771436fd35";

    private AuthenticationManager authenticationManager;

    public JWTFilterAutenticate(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            Administrator administrator = new ObjectMapper()
                    .readValue(request.getInputStream(), Administrator.class);

            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    administrator.getEmail(),
                    administrator.getPassword(),
                    new ArrayList<>()
            ));


        } catch (IOException e) {
            throw new RuntimeException("Falha ao autenticar o administrador", e);
        }

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        DetailAdministratorData administratorData = (DetailAdministratorData) authResult.getPrincipal();

        String token = JWT.create()
                .withSubject(administratorData.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + System.currentTimeMillis()))
                .sign(Algorithm.HMAC512(PASSWORD_TOKEN));

        response.getWriter().write(token);
        response.getWriter().flush();
    }
}
