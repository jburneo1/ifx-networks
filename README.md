# Documentacion despliegue en ambiente local

Para el despliegue de la aplicación bastará con hacer los siguientes pasos:
```
1 - git clone https://github.com/jburneo1/ifx-networks.git
```

2 - Luego de haber clonado el proyecto, descargaremos las dependencias en la raíz del proyecto del frontcrud con el siguiente comando:
```
npm install
```

> Del lado del back se descargarán las dependencias de manera automatica

En caso de que no pase lo mencionado anteriormente, podremos lanzar el siguiente comando:

```
mvn install
```


Para correr nuestro proyecto Angular vamos a ingresar por consola y en la ruta ./frontcrud vamos a tirar el siguiente comando:
```
ng s -o
```

Para levantar nuestro proyecto backend, podemos ir a la consola y tirar el siguiente comando:

```
mvnw spring-boot:run
```
>En caso de no tener instalado Mongo en nuestras maquinas pero si contar con docker, podemos lanzar el siguiente comando que levantará un contenedor Docker de mongo de la versión *latest*.

> Nota: Si no tenemos alguna imagen de Mongo en nuestro local, el comando la descargará de igual manera.

```
docker run --name mongo-container -p 27020:27017 -d mongo
```