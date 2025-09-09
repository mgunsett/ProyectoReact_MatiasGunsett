# Configuración de Variables de Entorno en Render

Para que tu aplicación funcione correctamente en Render, necesitas configurar las siguientes variables de entorno en el dashboard de Render:

## Variables Requeridas

### 1. MercadoPago
```
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago
```

### 2. Firebase Admin SDK   
Ya tienes configurada la variable `GOOGLE_CREDENTIALS` que contiene todas las credenciales de Firebase. **NO necesitas agregar más variables de Firebase**. El código ahora usa automáticamente esta variable existente.

## Cómo configurar en Render

1. Ve al dashboard de tu servicio en Render
2. Navega a la pestaña "Environment"
3. Agrega cada variable de entorno con su respectivo valor
4. Guarda los cambios
5. Redeploya tu servicio

## Importante

- La `FIREBASE_PRIVATE_KEY` debe incluir las comillas dobles y los saltos de línea `\n`
- Asegúrate de que `NODE_ENV=production` esté configurado
- Verifica que tu `MERCADOPAGO_ACCESS_TOKEN` sea el token de producción correcto

## Verificación

Después de configurar las variables, verifica que el servidor inicie correctamente revisando los logs en Render. Deberías ver el mensaje: "Firebase Admin inicializado correctamente"
