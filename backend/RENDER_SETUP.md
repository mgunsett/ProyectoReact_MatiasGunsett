# Configuración de Variables de Entorno en Render

Para que tu aplicación funcione correctamente en Render, necesitas configurar las siguientes variables de entorno en el dashboard de Render:

## Variables Requeridas

### 1. MercadoPago
```
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago
```

### 2. Firebase Admin SDK
```
NODE_ENV=production
FIREBASE_PROJECT_ID=be-real-matiasgunsett
FIREBASE_PRIVATE_KEY_ID=089c9a7124b6fea0ad737ca41cf98d607f89cf79
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCpLwTpvCALBUfx
lbJIj481K9TBuoJpQfkOI2dI7pOczCCgQzefE9QLY5xvp01KhnejjO9OX112SwR+
dcLSU9NBH9MZD9weKJ1RKjLqoiDSanYmCocBmCxrFgjk4gFSxcA4D4adrTivH9/8
0h8F0G4xkourwSeFf5z+JaLM8WV0HU420qhjMx7ihCIfMuBgVhXDStjxn6PaotQ3
mvfyFbwxZZCxfLBDLgCjeMpL2zJFXa+zF6O2PXr/HZCfcBsVa8Q/ps7jWCKFvnkE
1cPtt8GAzbpGp1dz4KjuWLGiGQY5KxKZERcYVBS2OZEEvc52f48JcnJiqms4acjw
oKfJtQw/AgMBAAECggEAGHzzyxkt0iqLhU5TpekRo3KaswfaBH5GHGPHeWj++L0b
I9dW37GxCYz7gbXHnDfmbUfjA4cOMicdmWhWMLdtZonCtmfzRnI+gxcGk6uv8IT0
YQE5FWP/WeiwlOCZrG9vKS4mIACIqeCFPUT0tJS8vnQlv1CP9eTIxoiQDfYK50ly
F4RxWYUQzvqU5LWhrXF7PVbXfjK/jXBK8cvCBFVR+OSehFgGG44AbOLTk8tOHSQr
XIaQRI6+YU9inJZfNQy5+UeDd6YYlVux3bWGDX6+MCjC36Dg5EbdGjk/1mfZkme3
2G6i8A8mQYMeMn8mPQ0rfUUa63Bdtn6iDGB4sbHXAQKBgQDlPBH1Z9gB4PnmBFMj
qEqZiDxCw/IqaVPxy3zqbTC/COBr//t4+Uu8eK07AoruxJcu8CA3do0sixeGkB2z
4BW6Slqt0xt9+AvJY/8EKnmWPb/Cav0ePIn4PlCUjmpgxIG3tfHGWF4Ubst8vZyI
92vS2HlcdBPbyAXQ7LjwdM+zwQKBgQC87/9XAr06zHIcmmaplUEQNL1jCWaBQ4rJ
GyMT1Ob6SrlMZHgHNXqHO7WUZa4gn6QbmFQu51wG/WT7bv3ijiAlG2rEMkChcA8A
xIhG4wMhMsheEyg9SXsIGLt37MZzF0BQd1KbpboilrwwFcLZwiENW1OmPpjncqXp
JSOnFLS//wKBgHm65oZ9OJX21H2zOjsrOUJCuE10JHslJ7C1MIaEqWgo3JQ9gVsC
d5eENemqNgEJYIdKeLE7QUiwLDQG/97vVlpw9aps+qJwQEIX2epqa9q+u8AQdI3D
9DhhTwU0g4UTlRbrhZKghoUvONvrDN8nFJkI35mbApippX0G2EbIoSuBAoGAcz6U
6lcCY6YnCKlpa5Fd0WvKBWnLe5deRVLnL4aSqSMBKcayq/sD1Q8nr+/hqYaWzDo7
RyzaJm1TtkY6WIHGu7uggTIB2DcI/7fhRBPeadaW/0MCLXfvsr2bRAhJ+BO7qBlQ
ax5IjiaRfWcYpkjSblpBiMrv62U0LCT6PUTVB7MCgYAHSAIo6VUcJ52yuUMkoS5y
7ggFHkA41zKcWPzs1KwxDAkD9iJPGITHibkoAIXf2q3KodutAbpw6HQVgQJKvo/Q
onrzajbQu4EERIU3fmTar+YUuFKL33jAIHaSTXVsD2xn6FqBIXD/3VDak+eIpfyS
JSWiV1DDE5GEb4QsKoAOYg==
-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-m1ug4@be-real-matiasgunsett.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=109609587692016065860
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m1ug4%40be-real-matiasgunsett.iam.gserviceaccount.com
```

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
