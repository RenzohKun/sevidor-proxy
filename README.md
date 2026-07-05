# ☕ AromaVirtual - Sistema de Gestión de Cafetería en 3 Capas

¡Bienvenido a **AromaVirtual**! Este es un proyecto académico de fin de ciclo desarrollado para la materia de **Sistemas Operativos** en la **Universidad Laica Eloy Alfaro de Manabí (ULEAM)**. 

El sistema consiste en una aplicación web robusta estructurada en una arquitectura de **tres capas**, utilizando un Proxy Inverso con Apache, un Backend dinámico en Node.js y persistencia de datos en MongoDB. La temática está ambientada en una cafetería virtual para realizar y gestionar pedidos de café en tiempo real.

---

## 🏛️ Arquitectura del Sistema (3 Capas)

La aplicación web está distribuida estratégicamente para garantizar la seguridad, escalabilidad y separación de responsabilidades:

1. **Capa de Presentación (Frontend - Puerto 80):** Interfaces modernas y responsivas construidas en HTML5 y CSS3, con una paleta de colores corporativa (tonos marrón, crema y dorado). Servida a través del servidor web Apache.
2. **Capa de Aplicación (Backend - Puerto 3000):** Un servidor lógico en Node.js que expone una API REST utilizando Express. Se encarga de procesar las peticiones del cliente y comunicarse con la base de datos.
3. **Capa de Datos (Base de Datos - Puerto 27017):** Instancia local de MongoDB que almacena los registros de todos los pedidos ingresados de manera persistente en formato NoSQL (JSON/BSON).

---

## 📁 Estructura de Archivos del Proyecto

```bash
├── index.html           # Página inicial / Portada de la cafetería con el menú destacado
├── hacer-pedido.html    # Formulario dinámico para el ingreso de nuevos pedidos de café
├── panel-pedidos.html   # Panel de control del Barista que lee y lista los pedidos desde MongoDB
├── app.js               # Código del servidor Backend de Node.js (Rutas, API y conexión a base de datos)
└── README.md            # Documentación técnica del proyecto (Este archivo)
