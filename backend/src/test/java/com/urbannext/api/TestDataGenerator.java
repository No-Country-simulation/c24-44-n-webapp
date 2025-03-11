package com.urbannext.api;

import com.github.javafaker.Faker;
import com.urbannext.api.model.TipoUsuario;
import com.urbannext.api.model.Usuario;

import java.util.Locale;

public class TestDataGenerator {

    private static final Faker faker = new Faker(new Locale("es-ES"));

    public static Usuario generateUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNombre(faker.name().fullName());
        usuario.setEmail(faker.internet().emailAddress());
        usuario.setPassword(faker.internet().password(8, 16, true, true,true));
        usuario.setTipo(generateRamdomTipoUsuario());
        usuario.setRol(faker.options().option("USER", "ADMIN", "SUPER_ADMIN"));
        return usuario;
    }

    public static TipoUsuario generateRamdomTipoUsuario(){
        TipoUsuario[] types = TipoUsuario.values();
        return types[faker.random().nextInt(types.length)];
    }

}
