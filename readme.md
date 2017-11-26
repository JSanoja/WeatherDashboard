# WeatherDashboard

Un dashboard realizado con el api apixu.com.

# Backend desarrollada con Node en Express
- Es una API REST que se encarga de hacer las peticiones a la API de apixu.com.
- El Apirest Manda los datos en formato json
- /current devuelve en json la temperatura actual, junto a la condicion climatica y el icono que lo identifica
- /history devuelve en json la Maxima y la Minima Calculada de las ultimas 24 horas y el rango de tiempo en cual estos datos fueron tomados.

# Frontend
- Hecho con AngularJS, Bootstrap, jQuery
- Se usaron algunos CDN
- Inspirado en Silicon Valley & The Weather Chanel

# Instalacion
En una linea de comandos.

1. git clone https://github.com/JSanoja/WeatherDashboard.git
2. cd WeatherDashboard
2. npm install
3. npm start
4. Abrir en el explorador localhost:3000
