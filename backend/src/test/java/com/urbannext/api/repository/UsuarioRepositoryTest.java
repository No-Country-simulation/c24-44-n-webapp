package com.urbannext.api.repository;

import com.urbannext.api.TestDataGenerator;
import com.urbannext.api.model.Usuario;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class UsuarioRepositoryTest {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Test
    public void testCreateUsuario(){
        Usuario usuario = TestDataGenerator.generateUsuario();
        Usuario savedUsuario = usuarioRepository.save(usuario);
        assert savedUsuario != null;
        assert savedUsuario.getIdUsuario() != null;
        assert savedUsuario.getNombre().equals(usuario.getNombre());
    }

}
