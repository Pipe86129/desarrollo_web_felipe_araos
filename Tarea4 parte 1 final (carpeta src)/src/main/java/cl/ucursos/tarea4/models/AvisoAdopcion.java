package cl.ucursos.tarea4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "aviso_adopcion")
public class AvisoAdopcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fecha_ingreso")
    private LocalDateTime fechaIngreso;

    @ManyToOne
    @JoinColumn(name = "comuna_id")
    private Comuna comuna;

    @Column(name = "sector", length = 100)
    private String sector;

    @Column(name = "nombre", length = 200, nullable = false)
    private String nombre;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "celular", length = 15)
    private String celular;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoMascota tipo;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "edad", nullable = false)
    private Integer edad;

    @Enumerated(EnumType.STRING)
    @Column(name = "unidad_medida", nullable = false)
    private UnidadMedida unidadMedida;

    @Column(name = "fecha_entrega", nullable = false)
    private LocalDateTime fechaEntrega;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    //Esto es para relaciones uno a muchos con las entidades relacionadas
    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL)
    private List<Foto> fotos;

    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL)
    private List<ContactarPor> contactos;

    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL)
    private List<Comentario> comentarios;

    //Esto es para enumeraciones para tipos predefinidos
    //Esto es similar al uso de enums en el auxiliar 10 pero adaptado a mascotas
    public enum TipoMascota {
        gato, perro
    }

    public enum UnidadMedida {
        a, m  // a = años, m = meses
    }

    //Constructores
    public AvisoAdopcion() {}

    
    // Métodos de acceso estándar para todas las propiedades
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDateTime fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public TipoMascota getTipo() {
        return tipo;
    }

    public void setTipo(TipoMascota tipo) {
        this.tipo = tipo;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public UnidadMedida getUnidadMedida() {
        return unidadMedida;
    }

    public void setUnidadMedida(UnidadMedida unidadMedida) {
        this.unidadMedida = unidadMedida;
    }

    public LocalDateTime getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDateTime fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    //Esto es para las relaciones (añadidos para completar el modelo)
    public List<Foto> getFotos() {
        return fotos;
    }

    public void setFotos(List<Foto> fotos) {
        this.fotos = fotos;
    }

    public List<ContactarPor> getContactos() {
        return contactos;
    }

    public void setContactos(List<ContactarPor> contactos) {
        this.contactos = contactos;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    //Este es un atributo temporal para datos adicionales en la vista
    // No se persiste en la base de datos
    private transient java.util.Map<String, Object> attributes = new java.util.HashMap<>();
    
    public java.util.Map<String, Object> getAttributes() {
        return attributes;
    }
}