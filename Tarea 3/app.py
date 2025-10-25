from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from database import db
from models import AvisoAdopcion, Foto, Comuna, ContactarPor, Region, Comentario
from datetime import datetime
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CARPETA_SUBIDAS'] = 'static/uploads'
app.secret_key = 'clave_secreta_tarea2'

db.init_app(app)

EXTENSIONES_PERMITIDAS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}

def archivo_permitido(nombre_archivo):
    return '.' in nombre_archivo and \
           nombre_archivo.rsplit('.', 1)[1].lower() in EXTENSIONES_PERMITIDAS

@app.route("/")
def portada():
    try:
        ultimos_avisos = AvisoAdopcion.query.join(Comuna).order_by(AvisoAdopcion.fecha_ingreso.desc()).limit(5).all()
        print(f"Encontrados {len(ultimos_avisos)} avisos")
        
        for aviso in ultimos_avisos:
            if aviso.fotos:
                aviso.nombre_archivo_foto = aviso.fotos[0].nombre_archivo
            else:
                aviso.nombre_archivo_foto = None
            
            aviso.unidad_texto = "meses" if aviso.unidad_medida == 'm' else "años"

        return render_template("portada.html", ultimos_avisos=ultimos_avisos)
        
    except Exception as error:
        return render_template("portada.html", ultimos_avisos=[])

@app.route("/agregar", methods=["GET", "POST"])
def agregar_aviso_de_adopcion():
    if request.method == "GET":
        return render_template("agregar.html")
    
    elif request.method == "POST":
        try:
            #Esto es para obtener los datos del formulario
            nombre = request.form.get("nombre")
            email = request.form.get("email")
            telefono = request.form.get("telefono")
            region_id = request.form.get("region")
            comuna_id = request.form.get("comuna")
            sector = request.form.get("sector")
            tipo = request.form.get("tipo")
            cantidad = request.form.get("cantidad")
            edad = request.form.get("edad")
            unidad_medida = request.form.get("unidad_medida")
            fecha_entrega = request.form.get("fecha_entrega")
            descripcion = request.form.get("descripcion")
            fotos = request.files.getlist("fotos")
            
            print(f"Datos recibidos: nombre={nombre}, email={email}, tipo={tipo}")
            
            #Esto es para validar los campos obligatorios
            campos_obligatorios = [nombre, email, comuna_id, tipo, cantidad, edad, unidad_medida, fecha_entrega]
            if not all(campos_obligatorios):
                print("Error: Faltan campos obligatorios")
                flash("Faltan campos obligatorios", "error")
                return redirect(url_for('agregar_aviso_de_adopcion'))
            
            
            #Esto es para crear un nuevo aviso
            nuevo_aviso = AvisoAdopcion(
                fecha_ingreso=datetime.now(),
                comuna_id=int(comuna_id),
                sector=sector,
                nombre=nombre,
                email=email,
                celular=telefono,
                tipo=tipo,
                cantidad=int(cantidad),
                edad=int(edad),
                unidad_medida='m' if unidad_medida == 'meses' else 'a',
                fecha_entrega=datetime.strptime(fecha_entrega, '%Y-%m-%dT%H:%M'),
                descripcion=descripcion
            )
            
            db.session.add(nuevo_aviso)
            db.session.commit()
            
            #Esto es para procesar las fotos
            fotos_guardadas = 0
            for i, foto in enumerate(fotos):
                if foto and foto.filename and foto.filename != '':
                    if archivo_permitido(foto.filename):
                        nombre_archivo = secure_filename(foto.filename)
                        
                        os.makedirs(app.config['CARPETA_SUBIDAS'], exist_ok=True)
                        ruta_archivo = os.path.join(app.config['CARPETA_SUBIDAS'], nombre_archivo)
                        
                        foto.save(ruta_archivo)
                        
                        nueva_foto = Foto(
                            ruta_archivo='uploads/',
                            nombre_archivo=nombre_archivo,
                            actividad_id=nuevo_aviso.id
                        )
                        db.session.add(nueva_foto)
                        fotos_guardadas += 1
                        
            
            db.session.commit()
            
            #Esto es para procesar los contactos
            contactos_tipos = request.form.getlist('contacto_tipo[]')
            contactos_info = request.form.getlist('contacto_info[]')

            contactos_guardados = 0
            if contactos_tipos and contactos_info:
                longitud_minima = min(len(contactos_tipos), len(contactos_info))
                
                for i in range(longitud_minima):
                    tipo_contacto = contactos_tipos[i]
                    info_contacto = contactos_info[i]
                    
                    if tipo_contacto and tipo_contacto.strip() and info_contacto and info_contacto.strip():
                        nuevo_contacto = ContactarPor(
                            nombre=tipo_contacto.strip(),
                            identificador=info_contacto.strip(),
                            actividad_id=nuevo_aviso.id
                        )
                        db.session.add(nuevo_contacto)
                        contactos_guardados += 1
                        
                
                if contactos_guardados > 0:
                    db.session.commit()
            
            flash("Aviso de adopción agregado correctamente", "success")
            return redirect(url_for('portada'))
            
        except Exception as e:
            db.session.rollback()
            import traceback
            traceback.print_exc() 
            flash(f"Error al agregar aviso: {str(e)}", "error")
            return redirect(url_for('agregar_aviso_de_adopcion'))



@app.route("/listado")
def listado_completo_de_avisos():
    try:
        pagina = request.args.get('pagina', 1, type=int)
        avisos_por_pagina = 5
        
        offset = (pagina - 1) * avisos_por_pagina
        
        avisos = AvisoAdopcion.query.join(Comuna).join(Region)\
            .order_by(AvisoAdopcion.fecha_ingreso.desc())\
            .offset(offset).limit(avisos_por_pagina).all()
        
        total_avisos = AvisoAdopcion.query.count()
        total_paginas = (total_avisos + avisos_por_pagina - 1) // avisos_por_pagina
        
        avisos_data = []
        for aviso in avisos:
            total_fotos = len(aviso.fotos) if aviso.fotos else 0
            
            unidad_texto = "meses" if aviso.unidad_medida == 'm' else "años"
            
            avisos_data.append({
                'id': aviso.id,
                'fecha_publicacion': aviso.fecha_ingreso.strftime('%d-%m-%Y %H:%M'),
                'fecha_entrega': aviso.fecha_entrega.strftime('%d-%m-%Y'),
                'comuna': aviso.comuna.nombre if aviso.comuna else '',
                'sector': aviso.sector if aviso.sector else '',
                'mascota_info': f"{aviso.cantidad} {aviso.tipo} {aviso.edad} {unidad_texto}",
                'nombre_contacto': aviso.nombre,
                'total_fotos': total_fotos
            })
        
        return render_template("listado_de_avisos_de_adopcion.html", 
                             avisos=avisos_data, 
                             pagina_actual=pagina,
                             total_paginas=total_paginas)
        
    except Exception as error:
        print(f"Error en listado: {error}")
        return render_template("listado_de_avisos_de_adopcion.html", 
                             avisos=[], 
                             pagina_actual=1,
                             total_paginas=1)

@app.route("/aviso/<int:id>")
def detalle_aviso(id):
    try:
        aviso = AvisoAdopcion.query.filter(AvisoAdopcion.id == id).first()
        
        if not aviso:
            flash("Aviso no encontrado", "error")
            return redirect(url_for('listado_completo_de_avisos'))
        
        region_nombre = ""
        if aviso.comuna:
            region = Region.query.filter_by(id=aviso.comuna.region_id).first()
            if region:
                region_nombre = region.nombre
        
        contactos_adicionales = []
        for contacto in aviso.contactos:
            contactos_adicionales.append({
                'tipo': contacto.nombre.capitalize() if contacto.nombre else '',
                'info': contacto.identificador if contacto.identificador else ''
            })
        
        unidad_texto = "meses" if aviso.unidad_medida == 'm' else "años"
        
        fotos_data = []
        for foto in aviso.fotos:
            fotos_data.append({
                'ruta': url_for('static', filename=f'uploads/{foto.nombre_archivo}'),
                'nombre': foto.nombre_archivo
            })
        
        aviso_data = {
            'id': aviso.id,
            'region': region_nombre,
            'comuna': aviso.comuna.nombre if aviso.comuna else '',
            'sector': aviso.sector if aviso.sector else '',
            'nombre': aviso.nombre,
            'email': aviso.email,
            'telefono': aviso.celular if aviso.celular else '',
            'tipo_mascota': aviso.tipo.capitalize(),
            'cantidad': aviso.cantidad,
            'edad': f"{aviso.edad} {unidad_texto}",
            'fecha_disponible': aviso.fecha_entrega.strftime('%d-%m-%Y'),
            'descripcion': aviso.descripcion if aviso.descripcion else '',
            'contactos_adicionales': contactos_adicionales,
            'fotos': fotos_data
        }
        
        return render_template("detalle_aviso.html", aviso=aviso_data)
        
    except Exception as error:
        flash("Error al cargar el aviso", "error")
        return redirect(url_for('listado_completo_de_avisos'))

@app.route("/estadisticas")
def mostrar_estadisticas():
    #Lo que hace es mostrar la página de estadísticas con los gráficos correspondientes.
    return render_template("estadisticas.html")

@app.route("/estadisticas/datos")
def datos_estadisticas():
    #Lo que se hace acá, es proporcionar los datos para los gráficos en formato JSON
    try:
        from sqlalchemy import func, Date, extract
        
        #Se hace la primera consulta, para la cantidad de avisos por día (para gráfico de líneas)
        resultado_dias = db.session.query(
            func.date(AvisoAdopcion.fecha_ingreso).label('fecha'),
            func.count(AvisoAdopcion.id).label('cantidad')
        ).group_by(func.date(AvisoAdopcion.fecha_ingreso)).order_by('fecha').all()
        
        #Se hace la segunda consulta, para la cantidad de avisos por tipo de mascota (para gráfico de torta)
        resultado_tipos = db.session.query(
            AvisoAdopcion.tipo,
            func.count(AvisoAdopcion.id).label('cantidad')
        ).group_by(AvisoAdopcion.tipo).all()
        
        #Se hace la tercera consulta, para la cantidad de avisos por mes y tipo (para gráfico de barras agrupadas)
        resultado_meses = db.session.query(
            extract('year', AvisoAdopcion.fecha_ingreso).label('año'),
            extract('month', AvisoAdopcion.fecha_ingreso).label('mes'),
            AvisoAdopcion.tipo,
            func.count(AvisoAdopcion.id).label('cantidad')
        ).group_by('año', 'mes', AvisoAdopcion.tipo).order_by('año', 'mes').all()
        
        #Esto es para preparar datos para gráfico de líneas (avisos por día)
        fechas = []
        cantidades = []
        
        for fila in resultado_dias:
            fechas.append(fila.fecha.strftime('%d-%m-%Y'))  # Cambiado a formato DD-MM-YYYY
            cantidades.append(fila.cantidad)
        
        #Esto es para preparar datos para gráfico de torta (avisos por tipo de mascota)
        tipos_mascota = []
        cantidades_tipos = []
        colores = ['#FF6384', '#36A2EB']  # Colores para perros (rojo) y gatos (azul)
        
        for fila in resultado_tipos:
            tipos_mascota.append(fila.tipo.capitalize())  # Capitalizar: 'perro' -> 'Perro'
            cantidades_tipos.append(fila.cantidad)

        #Esto es para preparar datos para gráfico de barras (avisos por mes y tipo)
        meses_labels = []
        datos_perros = []
        datos_gatos = []
        
        #Este es el diccionario para organizar datos por mes
        datos_por_mes = {}
        
        for fila in resultado_meses:
            año = int(fila.año)
            mes = int(fila.mes)
            tipo = fila.tipo
            cantidad = fila.cantidad

            # Es para crear clave única para cada mes (ej: "2025-10")
            clave_mes = f"{año}-{mes:02d}"
            nombre_mes = f"{mes:02d}/{año}"  # Formato legible: "10/2025"

            # Es para inicializar estructura para el mes si no existe
            if clave_mes not in datos_por_mes:
                datos_por_mes[clave_mes] = {
                    'label': nombre_mes,
                    'perros': 0,
                    'gatos': 0
                }
            
            # Es para acumular cantidad según el tipo de mascota
            if tipo == 'perro':
                datos_por_mes[clave_mes]['perros'] = cantidad
            elif tipo == 'gato':
                datos_por_mes[clave_mes]['gatos'] = cantidad
        
        # Ordenar meses cronológicamente
        meses_ordenados = sorted(datos_por_mes.keys())

        # Es para extraer datos ordenados para el gráfico
        for mes_key in meses_ordenados:
            datos_mes = datos_por_mes[mes_key]
            meses_labels.append(datos_mes['label'])
            datos_perros.append(datos_mes['perros'])
            datos_gatos.append(datos_mes['gatos'])

        # Es para retornar todos los datos en formato JSON para el frontend
        return jsonify({
            'status': 'ok',
            'data': {
                'fechas': fechas,                    # Para gráfico de líneas
                'cantidades': cantidades,            # Para gráfico de líneas
                'tipos_mascota': tipos_mascota,      # Para gráfico de torta
                'cantidades_tipos': cantidades_tipos, # Para gráfico de torta
                'colores_tipos': colores,            # Colores para gráfico de torta
                'meses_labels': meses_labels,        # Etiquetas para gráfico de barras
                'datos_perros': datos_perros,        # Datos de perros para gráfico de barras
                'datos_gatos': datos_gatos           # Datos de gatos para gráfico de barras
            }
        })
        
    except Exception as error:
        # En caso de error, retornar mensaje de error
        return jsonify({
            'status': 'error',
            'message': str(error)
        })


# Estas son las rutas para la gestión de los comentarios.


@app.route("/aviso/<int:aviso_id>/comentarios", methods=["GET"])
def obtener_comentarios(aviso_id):
    # Se obtienen todos los comentarios asociados a un aviso específico
    try:
        # Se consultan comentarios ordenados por fecha (más recientes primero)
        comentarios = Comentario.query.filter_by(aviso_id=aviso_id).order_by(Comentario.fecha.desc()).all()

        # Para preparar datos para enviar al frontend
        comentarios_data = []
        for comentario in comentarios:
            comentarios_data.append({
                'id': comentario.id,
                'nombre': comentario.nombre,                    # Nombre del comentarista
                'texto': comentario.texto,                      # Texto del comentario
                'fecha': comentario.fecha.strftime('%d-%m-%Y %H:%M')  # Fecha formateada
            })
        
        return jsonify({
            'status': 'ok',
            'data': comentarios_data
        })
        
    except Exception as error:
        # En caso de error, retornar lista vacía para no romper la interfaz
        print(f"Error obteniendo comentarios: {error}")
        return jsonify({
            'status': 'ok',
            'data': []
        })

@app.route("/aviso/<int:aviso_id>/comentarios", methods=["POST"])
def agregar_comentario(aviso_id):
    # Agrega un nuevo comentario a un aviso específico
    try:
        # Es para obtener datos del formulario enviado por el frontend
        data = request.get_json()
        
        nombre = data.get('nombre', '').strip()
        texto = data.get('texto', '').strip()
        
        # Primera validación: Nombre debe tener entre 3 y 80 caracteres
        if not nombre or len(nombre) < 3 or len(nombre) > 80:
            return jsonify({
                'status': 'error',
                'message': 'El nombre debe tener entre 3 y 80 caracteres'
            })
        
        # Segunda validación: Comentario debe tener al menos 5 caracteres
        if not texto or len(texto) < 5:
            return jsonify({
                'status': 'error', 
                'message': 'El comentario debe tener al menos 5 caracteres'
            })

        #Es para verificar que el aviso existe antes de agregar comentario
        aviso = AvisoAdopcion.query.get(aviso_id)
        if not aviso:
            return jsonify({
                'status': 'error',
                'message': 'Aviso no encontrado'
            })

        #Es para crear nuevo comentario con los datos validados
        nuevo_comentario = Comentario(
            nombre=nombre,
            texto=texto,
            fecha=datetime.now(),  # Fecha y hora actual del servidor
            aviso_id=aviso_id
        )

        # Es para guardar en la base de datos
        db.session.add(nuevo_comentario)
        db.session.commit()
        
        return jsonify({
            'status': 'ok',
            'message': 'Comentario agregado correctamente'
        })
        
    except Exception as error:
        # Es para revertir cambios en caso de error
        db.session.rollback()
        return jsonify({
            'status': 'error',
            'message': f'Error al agregar comentario: {str(error)}'
        })

if __name__ == "__main__":
    # Es para iniciar la aplicación Flask en modo debug
    app.run(debug=True)