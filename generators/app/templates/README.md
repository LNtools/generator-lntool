# <%= appname %>  

## <%= description %>  


<% if (autotuneProject) { -%>
![title](thumbnail.jpg)

## Activar el Live preview en Autotune

[Autotune live preview Documentation](https://github.com/voxmedia/autotune/wiki/Enabling-live-preview-on-a-blueprint)


## Commands: 

install dependences

```bash
npm install && bower install
```

Run server for dev

```bash
gulp server
```

Build Project

```bash
gulp build
```

Claen build

```bash
gulp clean_build
```


## Contenido de Directorios:

. <br>
├── gulp-tasks: tareas de GULP<br>
└── node_modules: dependencias de Node, esta carpeta no debe estar en GIT  <br>
└── source: carpeta que contiene el código fuente de la app <br>


## Archivos de configuración

### autotune-config.json

escribir ....

### autotune-build:

escribir....


### config.js

escribir....

<% } -%>
