from database import db

class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200))

class Comuna(db.Model):
    __tablename__ = 'comuna'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200))
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))

class AvisoAdopcion(db.Model):
    __tablename__ = 'aviso_adopcion'
    id = db.Column(db.Integer, primary_key=True)
    fecha_ingreso = db.Column(db.DateTime)
    comuna_id = db.Column(db.Integer, db.ForeignKey('comuna.id'))
    sector = db.Column(db.String(100))
    nombre = db.Column(db.String(200))
    email = db.Column(db.String(100))
    celular = db.Column(db.String(15))
    tipo = db.Column(db.Enum('gato', 'perro'))
    cantidad = db.Column(db.Integer)
    edad = db.Column(db.Integer)
    unidad_medida = db.Column(db.Enum('a', 'm'))
    fecha_entrega = db.Column(db.DateTime)
    descripcion = db.Column(db.Text)
    
    comuna = db.relationship('Comuna', backref='avisos')
    fotos = db.relationship('Foto', backref='aviso_foto')
    contactos = db.relationship('ContactarPor', backref='aviso_contacto')
    comentarios = db.relationship('Comentario', backref='aviso_comentario')

class Foto(db.Model):
    __tablename__ = 'foto'
    id = db.Column(db.Integer, primary_key=True)
    ruta_archivo = db.Column(db.String(300))
    nombre_archivo = db.Column(db.String(300))
    actividad_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'))

class ContactarPor(db.Model):
    __tablename__ = 'contactar_por'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'))
    identificador = db.Column(db.String(150))
    actividad_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'))

class Comentario(db.Model):
    __tablename__ = 'comentario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    texto = db.Column(db.String(300), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)
    aviso_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), nullable=False)