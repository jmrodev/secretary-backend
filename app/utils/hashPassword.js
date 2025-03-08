// hashPasswords.js
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import userModel from '../models/usersModel.js'; // Ajusta la ruta según tu estructura de archivos

// Configura la conexión a la base de datos
const dbURI = 'mongodb://localhost:27017/secretary-db'; // Cambia esto por tu URI de MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Función para hashear y actualizar contraseñas
const hashAndUpdatePasswords = async () => {
  try {
    // Obtener todos los usuarios de la base de datos
    const users = await userModel.find({});

    // Iterar sobre cada usuario
    for (const user of users) {
      // Verificar si la contraseña ya está hasheada
      if (!user.password.startsWith('$2b$')) { // Los hashes de bcrypt comienzan con "$2b$"
        console.log(`Hasheando contraseña para el usuario: ${user.userName}`);

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Actualizar el usuario con la contraseña hasheada
        await userModel.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );

        console.log(`Contraseña actualizada para el usuario: ${user.userName}`);
      } else {
        console.log(`La contraseña del usuario ${user.userName} ya está hasheada.`);
      }
    }

    console.log('Proceso de hasheo de contraseñas completado.');
  } catch (error) {
    console.error('Error durante el proceso de hasheo:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
  }
};

// Ejecutar la función
hashAndUpdatePasswords();