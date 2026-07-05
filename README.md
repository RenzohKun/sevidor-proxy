# Sevidor-Proxy

# Configuración de un Servidor Proxy Inverso con Apache y Node.js

Este repositorio contiene la entrega correspondiente a la **Práctica de Laboratorio: Configuración de un Servidor Proxy Inverso con Apache** para la materia de Sistemas Operativos.

## 👥 Integrantes
* Bailón Paredes Francis Joseph
* Vasconez Lopez Angel Francisco
* Pinoargote Holguin Carlos Alfredo
* Pacheco Olivo Enoc Elias

## 📋 Objetivo de la Práctica
Aprender a configurar Apache como un servidor proxy inverso en Rocky Linux para redirigir solicitudes entrantes a una aplicación backend desarrollada en Node.js, ocultando la infraestructura interna y mejorando la seguridad del despliegue.

## 🛠️ Tecnologías y Herramientas Utilizadas
* **Sistema Operativo:** Rocky Linux 9 (Virtualizado en Oracle VM VirtualBox)
* **Servidor Web / Proxy Inverso:** Apache HTTP Server (`httpd`)
* **Entorno de Ejecución:** Node.js (Versión 20) + Express Framework
* **Base de Datos:** MongoDB

## 🔄 Arquitectura del Sistema
El flujo de las solicitudes dentro del entorno configurado funciona de la siguiente manera:

1. **Cliente:** El usuario realiza una petición desde el navegador web ingresando a la dirección IP de la máquina virtual por el puerto estándar **80** (`http://<IP_DE_LA_VM>`).
2. **Proxy Inverso (Apache):** Apache intercepta la solicitud en el puerto 80. Gracias a las directivas `ProxyPass` y `ProxyPassReverse`, redirige internamente el tráfico.
3. **Backend (Node.js):** El servidor de Node.js, que se ejecuta de forma interna en el puerto **3000**, procesa la solicitud y responde al proxy, exponiendo los datos de forma segura.

## 📁 Estructura del Repositorio
- En proceso
