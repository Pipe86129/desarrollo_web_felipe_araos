package cl.ucursos.tarea4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comentario")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", length = 80, nullable = false)
    private String nombre;

    @Column(name = "texto", length = 300, nullable = false)
    private String texto;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "aviso_id", nullable = false)
    private AvisoAdopcion aviso;

    // Constructores
    public Comentario() {}

    // Entidad simple para el sistema de comentarios de la Tarea 3
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public AvisoAdopcion getAviso() {
        return aviso;
    }

    public void setAviso(AvisoAdopcion aviso) {
        this.aviso = aviso;
    }
}