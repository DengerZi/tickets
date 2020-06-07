# 🎫 Tickets

> Tickets es una aplicación de gestión de tickets (helpdesk).

## Indice

* [Arquitectura del la aplicación](#archApp)
* [Pasos iniciales](#initApp)
* [Ejecutar la aplicación](#exeApp)

## <a name="archApp"></a> Arquitectura del la aplicación 🚀

La aplicación esta construida en **React** para el front-end, el cuál realiza consumo de microservicios API, desarrollados en **NodeJS** especificamente con **Express**, bajo una base de datos no relacional (noSql) gestionada en **MongoDB**.

### Librerias implementadas para complementar el desarrollo del front-end 📚

* [Material-UI](https://material-ui.com/es/)
* [React Router Dom](https://reacttraining.com/react-router/)
* [Redux](https://es.redux.js.org/)
* [React Hook Form](https://react-hook-form.com/)

## <a name="initApp"></a> Pasos iniciales 💻
Una vez clonado el proyecto, debemos movernos a la carpeta raiz, ejecutando el siguiente comando:

```sh
$ cd tickets
```

Luego necesitamos ejecutar el siguiente comando para instalar todas las librerias necesarias:

```sh
$ npm i
```

## <a name="exeApp"></a> Ejecutar la aplicación 🤓
Para arrancar la aplicación ejecutamos el siguiente comando:

```sh
$ npm start
```