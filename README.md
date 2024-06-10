# POSTS APP

Por Mateo Sepúlveda

## Descripción

Aplicación web para crear, leer y eliminar posts que contienen nombre y descripción.

## Tecnologías utilizadas

### Frontend

- React
- React Redux

### Backend

- NodeJS
- Prisma (ORM)

### Motor de base de datos

- PostgreSQL

### Herramientas auxiliares

- wait-for-it (https://github.com/vishnubob/wait-for-it)

## Instrucciones para levantar ambiente de desarrollo localmente

### Requisitos

- NodeJS
- PostgreSQL
- Docker (opcional)

### Método 1: sin Docker

Una vez clonado el repositorio:

1. En PostgreSQL, crear una base de datos llamada "posts_app".
2. En PostgreSQL, agregar un usuario que pueda iniciar sesión y crear bases de datos, y que tenga al menos el privilegio CREATE para la base de datos "posts_app".
3. En el directorio "backend", renombrar el archivo ".env.example" a ".env".
4. En el archivo ".env", en el string de conexión "DATABASE_URL", escribir las credenciales del usuario agregado en el paso 2 (usuario y contraseña).
5. En el directorio "backend", ejecutar el comando "npm install".
6. En el directorio "backend", ejecutar el comando "npx prisma migrate dev --name init".
7. En el directorio "backend", ejecutar el comando "npm run dev".
8. En el directorio "frontend", ejecutar el comando "npm install".
9. En el directorio "frontend", ejecutar el comando "npm start".
10. Mediante el navegador de internet, acceder a http://localhost:3000/ para usar la aplicación.

### Método 2: con Docker

Una vez clonado el repositorio:

1. En el directorio "backend", renombrar el archivo ".env.example" a ".env".
2. En el archivo ".env", en el string de conexión "DATABASE_URL", cambiar la palabra "localhost" por "database".
3. En el directorio raíz del proyecto, ejecutar el comando "docker compose up --build".
4. Mediante el navegador de internet, acceder a http://localhost:3000/ para usar la aplicación.

## Información adicional

- Desarrollado en Visual Studio Code.
- Probado en Windows 10, con Google Chrome, mediante el método 1 (sin Docker).
- Probado en Ubuntu 20.04, con Mozilla Firefox, mediante el método 2 (con Docker).
