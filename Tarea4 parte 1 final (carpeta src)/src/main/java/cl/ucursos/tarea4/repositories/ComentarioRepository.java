package cl.ucursos.tarea4.repositories;

import cl.ucursos.tarea4.models.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    
    //Esto es para encontrar comentarios por aviso, ordenados por fecha descendente
    @Query("SELECT c FROM Comentario c WHERE c.aviso.id = :avisoId ORDER BY c.fecha DESC")
    List<Comentario> findByAvisoIdOrderByFechaDesc(@Param("avisoId") Integer avisoId);
}