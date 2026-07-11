# Usa una versión oficial de Node.js
FROM node:18

# Define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de tu aplicación
COPY . .

# Expone el puerto donde corre tu app
EXPOSE 3000

# Comando para ejecutar la aplicación (Cambiado a app.js para tu cafetería)
CMD ["node", "app.js"]