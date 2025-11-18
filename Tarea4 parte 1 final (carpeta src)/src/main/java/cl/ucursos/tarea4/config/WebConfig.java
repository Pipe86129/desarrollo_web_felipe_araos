package cl.ucursos.tarea4.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    //Esta configuración es para que puedan servir los archivos estáticos desde las múltiples ubicaciones.
    //Es similar al patrón visto en el auxiliar 10 para el manejo de recursos.
    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        //Esto es para servir los archivos subidos desde ambas carpetas posibles (las carpetas de uploads)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/", "file:src/main/resources/static/uploads/");
    }
}