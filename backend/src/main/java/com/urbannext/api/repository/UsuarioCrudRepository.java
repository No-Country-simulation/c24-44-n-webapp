package com.urbannext.api.repository;

import com.urbannext.api.model.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioCrudRepository extends CrudRepository<Usuario, Integer> {
}