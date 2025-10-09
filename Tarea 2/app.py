from flask import Flask, render_template, request, redirect, url_for, flash
from database import db
from models import AvisoAdopcion, Foto, Comuna, ContactarPor, Region #se importa el modelo y la base de datos (los dejé en inglés para evitar confusiones)
from datetime import datetime
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2?charset=utf8mb4' #acá se crea el usuario, y la base de datos se va creando en base a los avisos de adopción.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CARPETA_SUBIDAS'] = 'static/uploads'
app.secret_key = 'clave_secreta_tarea2' #es para flask

db.init_app(app)

#Esta es la configuración para la subida de archivos
EXTENSIONES_PERMITIDAS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}

def archivo_permitido(nombre_archivo):
    return '.' in nombre_archivo and \
           nombre_archivo.rsplit('.', 1)[1].lower() in EXTENSIONES_PERMITIDAS

@app.route("/")
def portada():
    try:
        #Esto es para realizarle consultas con SQLAlchemy, para así, obtener los últimos 5 avisos
        ultimos_avisos = AvisoAdopcion.query.join(Comuna).order_by(AvisoAdopcion.fecha_ingreso.desc()).limit(5).all()
        
        #Esto es para preparar los datos para el template
        for aviso in ultimos_avisos:
            #Esto es para obtener la primera foto si existe
            if aviso.fotos:
                aviso.nombre_archivo_foto = aviso.fotos[0].nombre_archivo
            else:
                aviso.nombre_archivo_foto = None
            
            #Esto es para convertir la unidad de medida a texto
            aviso.unidad_texto = "meses" if aviso.unidad_medida == 'm' else "años"

        return render_template("portada.html", ultimos_avisos=ultimos_avisos)
        
    except Exception as error:
        return render_template("portada.html", ultimos_avisos=[])

@app.route("/agregar", methods=["GET", "POST"])
def agregar_aviso_de_adopcion():
    if request.method == "GET":
        #Esto es para mostrar el formulario
        return render_template("agregar.html")
    
    elif request.method == "POST":
        try:
            #En primer lugar, se validarán los datos del formulario. 
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
            
            #Estas son las validaciones básicas del servidor
            if not all([nombre, email, comuna_id, tipo, cantidad, edad, unidad_medida, fecha_entrega]):
                flash("Faltan campos obligatorios", "error")
                return redirect(url_for('agregar_aviso_de_adopcion'))
            
            #En segundo lugar, se creará un aviso en la base de datos 
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
            
            # En tercer lugar, se guardarán las fotos
            fotos_guardadas = 0
            for foto in fotos:
                if foto and foto.filename and foto.filename != '':
                    if archivo_permitido(foto.filename):
                        #Esto es para crear un nombre seguro
                        nombre_archivo = secure_filename(foto.filename)
                        
                        #Esto es para crear una carpeta si es que no existe
                        os.makedirs(app.config['CARPETA_SUBIDAS'], exist_ok=True)
                        ruta_archivo = os.path.join(app.config['CARPETA_SUBIDAS'], nombre_archivo)
                        
                        #Esto es para guardar el archivo en el sistema
                        foto.save(ruta_archivo)
                        
                        #Esto es para guardarlo en la base de datos
                        nueva_foto = Foto(
                            ruta_archivo='uploads/',
                            nombre_archivo=nombre_archivo,
                            actividad_id=nuevo_aviso.id
                        )
                        db.session.add(nueva_foto)
                        fotos_guardadas += 1
            
            #Este es el commit final para las fotos
            db.session.commit()
            
            #En cuarto lugar, se deben guardar los contactos adicionales 
            contactos_tipos = request.form.getlist('contacto_tipo[]')
            contactos_info = request.form.getlist('contacto_info[]')

            contactos_guardados = 0

            if contactos_tipos and contactos_info:
                #Esto es para iterar por la cantidad mínima para evitar errores
                longitud_minima = min(len(contactos_tipos), len(contactos_info))
                
                for i in range(longitud_minima):
                    tipo_contacto = contactos_tipos[i]
                    info_contacto = contactos_info[i]
                    
                    #Esto es para validar que ambos campos tengan datos
                    if tipo_contacto and tipo_contacto.strip() and info_contacto and info_contacto.strip():
                        nuevo_contacto = ContactarPor(
                            nombre=tipo_contacto.strip(),
                            identificador=info_contacto.strip(),
                            actividad_id=nuevo_aviso.id
                        )
                        db.session.add(nuevo_contacto)
                        contactos_guardados += 1
                
                #Este es el commit final para los contactos
                if contactos_guardados > 0:
                    db.session.commit()
            
            flash("Aviso de adopción agregado correctamente", "success")
            return redirect(url_for('portada'))
            
        except Exception as e:
            db.session.rollback()
            flash(f"Error al agregar aviso: {str(e)}", "error")
            return redirect(url_for('agregar_aviso_de_adopcion'))

@app.route("/listado")
def listado_completo_de_avisos():
    try:
        #Esto es para obtener la página actual, por default, será la 1
        pagina = request.args.get('pagina', 1, type=int)
        avisos_por_pagina = 5
        
        #Esto es para calcular el offset para la paginación
        offset = (pagina - 1) * avisos_por_pagina
        
        #Esto es para obtener los avisos con la paginación correspondiente
        avisos = AvisoAdopcion.query.join(Comuna).join(Region)\
            .order_by(AvisoAdopcion.fecha_ingreso.desc())\
            .offset(offset).limit(avisos_por_pagina).all()
        
        #Esto es para contar el total de avisos para la paginación
        total_avisos = AvisoAdopcion.query.count()
        total_paginas = (total_avisos + avisos_por_pagina - 1) // avisos_por_pagina
        
        #Esto es para preparar los datos para el template
        avisos_data = []
        for aviso in avisos:
            #Esto es para contar fotos
            total_fotos = len(aviso.fotos) if aviso.fotos else 0
            
            #Esto es para formatear la edad
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
        return render_template("listado_de_avisos_de_adopcion.html", 
                             avisos=[], 
                             pagina_actual=1,
                             total_paginas=1)

@app.route("/aviso/<int:id>")
def detalle_aviso(id):
    try:
        #Esto es para obtener el aviso específico
        aviso = AvisoAdopcion.query.filter(AvisoAdopcion.id == id).first()
        
        if not aviso:
            flash("Aviso no encontrado", "error")
            return redirect(url_for('listado_completo_de_avisos'))
        
        #Esto es para obtener cada región por separado
        region_nombre = ""
        if aviso.comuna:
            region = Region.query.filter_by(id=aviso.comuna.region_id).first()
            if region:
                region_nombre = region.nombre
        
        #Esto es para obtener contactos adicionales
        contactos_adicionales = []
        for contacto in aviso.contactos:
            contactos_adicionales.append({
                'tipo': contacto.nombre.capitalize() if contacto.nombre else '',
                'info': contacto.identificador if contacto.identificador else ''
            })
        
        #Esto es para preparar datos para el template
        unidad_texto = "meses" if aviso.unidad_medida == 'm' else "años"
        
        #Esto es para obtener fotos
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
    return render_template("estadisticas.html")

if __name__ == "__main__":
    app.run(debug=True)