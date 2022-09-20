package com.iftm.centralanimal.security;

import com.iftm.centralanimal.services.impl.DetailAdministratorServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class JWTConfiguration extends WebSecurityConfigurerAdapter {

    private DetailAdministratorServiceImpl administratorService;
    private PasswordEncoder passwordEncoder;

    public JWTConfiguration(DetailAdministratorServiceImpl administratorService, PasswordEncoder passwordEncoder) {
        this.administratorService = administratorService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(administratorService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable().authorizeHttpRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.POST, "/animal").permitAll()
                .antMatchers(HttpMethod.GET, "/administrator").authenticated()
                .antMatchers(HttpMethod.GET, "/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTFilterAutenticate(authenticationManager()))
                .addFilter(new JWTFilterValidate(authenticationManager()))
//              para nao guardar a seção do usuário no servidor
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

//    configuracao de cors => permitir a aplicacao de receber requisicoes de outros dominios além do seu proprio
    @Bean
    CorsConfigurationSource corsConfiguration() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();

        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
