package cl.ucursos.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "contactar_por")
public class ContactarPor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nombre")
    private TipoContacto nombre;

    @Column(name = "identificador", length = 150)
    private String identificador;

    @ManyToOne
    @JoinColumn(name = "actividad_id")
    private AvisoAdopcion aviso;

    // Enumeración con los tipos de contacto permitidos
    // Incluye redes sociales y métodos de comunicación
    public enum TipoContacto {
        whatsapp, telegram, X, instagram, tiktok, otra
    }

    // Constructores
    public ContactarPor() {}

    // Métodos de acceso estándar
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TipoContacto getNombre() {
        return nombre;
    }

    public void setNombre(TipoContacto nombre) {
        this.nombre = nombre;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public AvisoAdopcion getAviso() {
        return aviso;
    }

    public void setAviso(AvisoAdopcion aviso) {
        this.aviso = aviso;
    }
}