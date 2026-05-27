FROM node:18-alpine3.15

# Set working directory
RUN mkdir -p /var/www/pokedex
WORKDIR /var/www/pokedex

# Copiar el directorio y su contenido
COPY . ./var/www/pokedex
COPY package.json package-lock.json tsconfig.json tsconfig.build.json /var/www/pokedex/

# Instalar dependencias
RUN npm install

# Build de la aplicación
RUN npm run build

# Dar permiso para ejecutar la applicación
RUN adduser -D pokeuser
RUN chown -R pokeuser:pokeuser /var/www/pokedex
USER pokeuser

# Limpiar el caché
RUN npm cache clean --force

EXPOSE 3000

CMD ["npm", "run", "start:prod"]