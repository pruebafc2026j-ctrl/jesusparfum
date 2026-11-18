# Guía: activar recomendaciones públicas (Firebase gratis)

Con esto, cada recomendación que un cliente deje se publica al instante y la ven TODOS los visitantes de la web. No cuesta nada.

## Paso 1 — Crear el proyecto

- Entra a https://console.firebase.google.com e inicia sesión con tu cuenta de Google.
- Toca **"Agregar proyecto"** (o "Create a project").
- Nombre del proyecto: `jesusparfum`
- Desmarca Google Analytics si te pregunta (no lo necesitas).
- Toca **Crear proyecto** y espera a que termine.

## Paso 2 — Crear la base de datos

- En el menú de la izquierda entra a **Compilación** → **Realtime Database**.
- Toca **Crear base de datos**.
- Ubicación: deja la que viene por defecto (us-central1 está bien).
- Modo: **Modo de producción** (Production mode).
- Toca **Crear**.

## Paso 3 — Abrir los permisos (para que el público pueda leer y escribir)

- Dentro de Realtime Database, abre la pestaña **Reglas**.
- Borra todo lo que hay y pega exactamente esto:

```
{
  "rules": {
    "resenas": {
      ".read": true,
      ".write": true
    }
  }
}
```

- Toca **Publicar**.

## Paso 4 — Copiar la dirección de la base de datos

- En la pestaña **Datos** de Realtime Database, arriba dice algo como:
  `https://jesusparfum-xxxx.firebaseio.com`
- Copia esa dirección completa (sin la barra final).

## Paso 5 — Pegármela aquí

- Pégame esa dirección en el chat, por ejemplo:
  `https://jesusparfum-a1b2c-default-rtdb.firebaseio.com`
- Yo la conecto a la página y la subo a GitHub.
- Desde ese momento, toda recomendación nueva se ve para todos al instante.

## Notas

- El plan gratis (Spark) alcanza de sobra para una tienda.
- Si alguien deja una recomendación fea o falsa, la borras desde la consola de Firebase (pestaña Datos).
- Nadie ve el correo ni el teléfono de los clientes: solo nombre, ciudad y texto que ellos escriben.
