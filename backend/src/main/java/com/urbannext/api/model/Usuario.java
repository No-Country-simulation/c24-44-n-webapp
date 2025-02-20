package com.urbannext.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "usuarios")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "nombre", length = 255, nullable = false)
    private String nombre;

    @Column(name = "email", length = 255, unique = true, nullable = false)
    @Pattern(regexp = "@", message = "El email debe contener '@'")
    private String email;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoUsuario tipo;

    @Column(name = "rol")
    private String rol;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Calificacion> calificaciones;

    @ManyToMany
    @JoinTable(
            name = "usuario_pago",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_pago")
    )
    private List<Pago> pagos;

    @OneToMany(mappedBy = "anfitrion", cascade = CascadeType.ALL,
    orphanRemoval = true)
    private List<Propiedad> propiedades;


    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chat> chats;

    public void registrarse() {

    }


    public boolean iniciarSesion(String password) {
        return this.password.equals(password); // provisorio
    }


    public boolean verificarIdentidad() {
        return true;
    }



}
