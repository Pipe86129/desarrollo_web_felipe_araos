package cl.ucursos.tarea4.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "comuna")
public class Comuna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", length = 200)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    @OneToMany(mappedBy = "comuna", cascade = CascadeType.ALL)
    private List<AvisoAdopcion> avisos;

    // Constructores
    public Comuna() {}

    public Comuna(String nombre, Region region) {
        this.nombre = nombre;
        this.region = region;
    }

    // Entidad para representar las comunas de Chile
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

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public List<AvisoAdopcion> getAvisos() {
        return avisos;
    }

    public void setAvisos(List<AvisoAdopcion> avisos) {
        this.avisos = avisos;
    }
}