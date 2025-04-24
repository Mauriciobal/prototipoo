from flask import Flask, request, jsonify
from flask_cors import CORS
import pymssql

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
server = "localhost"
database = "master"
username = "sa"
password = "YourPassword123!"

def get_connection():
    return pymssql.connect(server=server, user=username, password=password, database=database)

# ======== RUTAS PARA LOGIN ========
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data['email']
        password = data['password']
        
        conn = get_connection()
        cursor = conn.cursor(as_dict=True)
        cursor.execute("SELECT email, NombreUsuario FROM Usuario WHERE email = %s AND Password = %s", (email, password))
        user = cursor.fetchone()
        conn.close()
        
        if user:
            return jsonify({'success': True, 'user': user})
        else:
            return jsonify({'success': False, 'message': 'Credenciales incorrectas'}), 401
            
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verificar si el usuario ya existe
        cursor.execute("SELECT email FROM Usuario WHERE email = %s", (data['email'],))
        if cursor.fetchone():
            return jsonify({'success': False, 'message': 'El correo ya está registrado'}), 400
        
        # Insertar nuevo usuario
        cursor.execute(
            "INSERT INTO Usuario (email, NombreUsuario, Password) VALUES (%s, %s, %s)",
            (data['email'], data['NombreUsuario'], data['password'])
        )
        conn.commit()
        return jsonify({'success': True, 'message': 'Usuario registrado'}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=2025)