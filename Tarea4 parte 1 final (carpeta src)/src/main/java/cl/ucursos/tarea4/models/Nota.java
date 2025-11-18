package cl.ucursos.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "aviso_id", nullable = false)
    private Integer avisoId;

    @Column(name = "nota", nullable = false)
    private Integer nota;

    // Constructores
    public Nota() {}

    public Nota(Integer avisoId, Integer nota) {
        this.avisoId = avisoId;
        this.nota = nota;
    }

    // Métodos de acceso estándar
    // Entidad para el sistema de evaluaciones de la Tarea 4
    // Almacena las calificaciones de 1 a 7 para cada aviso
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAvisoId() {
        return avisoId;
    }

    public void setAvisoId(Integer avisoId) {
        this.avisoId = avisoId;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }
}