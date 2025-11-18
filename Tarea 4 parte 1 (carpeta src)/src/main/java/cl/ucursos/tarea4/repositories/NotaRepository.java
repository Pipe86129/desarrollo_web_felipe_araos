package cl.ucursos.tarea4.repositories;

import cl.ucursos.tarea4.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {

    //Es para encontrar todas las notas de un aviso específico
    // Parte del sistema de evaluaciones de la Tarea 4
    List<Nota> findByAvisoId(Integer avisoId);

    //Es para calcular promedio de notas de un aviso usando función AVG de SQL
    // Retorna null si no hay evaluaciones para ese aviso
    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.avisoId = :avisoId")
    Double findPromedioByAvisoId(@Param("avisoId") Integer avisoId);

    //Es para contar cantidad de evaluaciones de un aviso
    @Query("SELECT COUNT(n) FROM Nota n WHERE n.avisoId = :avisoId")
    Long countByAvisoId(@Param("avisoId") Integer avisoId);
}