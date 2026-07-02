# Pokédex API 🐾

API REST que consume la [PokéAPI](https://pokeapi.co/) para poblar y gestionar
una base de datos propia de Pokémon. Incluye configuración completa con Docker
para desarrollo y producción.

## Tecnologías

- **NestJS** + **TypeScript**
- **MongoDB** + **Mongoose**
- **Docker** + **Docker Compose**
- **@nestjs/config** para variables de entorno

## Características

- Consume PokéAPI externa para obtener datos de Pokémon
- Almacena los datos en MongoDB propia
- Endpoint seed para poblar la base de datos con un solo request
- Configuración Docker para desarrollo y producción (docker-compose.yaml y docker-compose.prod.yaml)
- Dockerfile multi-stage para imagen optimizada de producción
- Arquitectura modular con NestJS
- Variables de entorno con @nestjs/config

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v2/seed` | Poblar la base de datos desde PokéAPI |
| GET | `/api/v2/pokemon` | Listar Pokémon con paginación |
| GET | `/api/v2/pokemon/:id` | Obtener un Pokémon por id, nombre o número |
| POST | `/api/v2/pokemon` | Crear un Pokémon |
| PATCH | `/api/v2/pokemon/:id` | Actualizar un Pokémon |
| DELETE | `/api/v2/pokemon/:id` | Eliminar un Pokémon |

## Instalación y uso

### Requisitos
- Node.js 18+
- Docker y Docker Compose

### Desarrollo

1. Clonar el repositorio
```bash
git clone https://github.com/SamiVijarra/pokedex-api.git
cd pokedex-api
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.template .env
```

Completar el `.env` con:
MONGODB_URL=mongodb://localhost:27017/nest-pokemon
PORT=3000
DEFAULT_LIMIT=10

4. Levantar MongoDB con Docker
```bash
docker-compose up -d
```

5. Iniciar en desarrollo
```bash
npm run start:dev
```

6. Poblar la base de datos
GET http://localhost:3000/api/v2/seed

### Producción con Docker

```bash
docker-compose -f docker-compose.prod.yaml up -d
```

## Estructura del proyecto
src/
├── common/         # DTOs y pipes compartidos
├── config/         # Variables de entorno
├── pokemon/        # Módulo principal (controller, service, schema)
└── seed/           # Módulo para poblar la base de datos

## Autor

**Samanta Vijarra** — [github.com/SamiVijarra](https://github.com/SamiVijarra)
