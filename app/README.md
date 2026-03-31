CLASIFICACIONES

Todo el trabajo se basará en las sigiuentes clasificaciones:
- v = óptimo (verde) = 1
- a = en proceso (amarillo) = 2
- r = rezago (rojo) = 3
- ndR = rezago por no presentar información (rojo obscuro) = 5
- nd = información no disponible (gris) = 0
- nm = no medible (gris obscuro) = 4 //Itzel propuso cambiarlo de blanco a gris obscuro

<br>

ACTUALIZAR

Para facilitar he colocado el comentario "[ACTUALIZAR]" cerca de aquellas líneas o secciones que se deben modificar en caso de querer actualizar.

Actualizar Parte 1: Actualizar los datos

Para ello usaremos los tres archivos siguientes:
 - Actualizar_JSON.R
 - CompiladoJSON.geojson
 - Cargar_data.js

Los datos deben llegar en un excell con un nombre como "Base de Resultados GDM 20XX", con la información para todos los municipios de todos los estados del país, por lo que hay que filtrarlos solo para el estado de Hidalgo, ajustar los nombres de las variables y pegarcelos a la base que ya tenemos; CompiladoJSON.geojson. El proceso exacto se describe en Actualizar_JSON.R.

Una vez creado el nuevo geojson, nos iremos a él y copiamos todo su contenido, posteriormentelo pegamos en el documento de Cargar_data.js EXACTAMENTE después de "const Data=". Listo! hemos actualizado la base de datos.

Actualizar Parte 2: Actualizar los .html

Para ello usaremos los dos archivos siguientes:
 - mapa.hmtl
 - estadisticas.hmtl

 En mapa.html:
 - Añadir un nuevo año para el select de la línea 88 y colocarlo como selected (y quitarselo al anterior)
 - Cambiar el valor de Año por el nuevo en la línea 147
 - Añadir una nueva variable para el año en aquellas que aparecen en la 154
 - Añadir el nuevo año en el ciclo del for en la línea 259
 - Añadir un nuevo elemento div para el nuevo año en el 541 (También habrá que ajustar sus tamaños para que quepan)
 - Añadir "Semicombinación"+ el nuevo año en la lista de la línea 632

En estadisticas.html:
- Añadir un nuevo año para el select de la línea 41 y colocarlo como selected (y quitarselo al anterior)
- Cambiar el valor de Año y Pre_año por el nuevo en las líneas 171 y 172.

<br>

DOCUMENTACIÓN

Funciones en mapa.html

- getColor(value)

Ubicada en la línea 191. En función de los valor "value", del 0 al 5, asigna el color correspondiente.

- filtrarPorCol(data, columnasPermitidas)

Ubicada en la línea 217. Filtra el geojson "data" en base a la lista "columnasPermitidas" con el nombre de las variables que queremos.

- map.on('popupopen', function (e)

Ubicada en la línea 233. Atualiza el título, los recuadros y la gráfica de pastel de los popup's.

- map.on('zoomend', function()

Ubicada en la línea 284. Hace desaparecer las etiquetas con los nombres del municipio si zoom<11.

- Semaforizacion.onAdd

Ubicada en la línea 294. Crea la simbología para el mapa.

- Buscador.onAdd

Ubicada en la línea 330. Crea el buscador de municipios, te lanza al municipio buscado en medio segundo y abre su popup.

- Hover.onAdd

Ubicada en la línea 370. Crea el recuadro del hover.

- Hover.update

Ubicada en la línea 377. Actualiza el color y el nombre del municipio del hover (se mandará a llamar en onEachfeature).

- Titulo.onAdd

Ubicada en la línea 403. Crea el recuadro para el título de Indicador y el Año.

- Titulo.update

Ubicada en la línea 409. Actualiza el Indicador y el Año para el recuadro del título. (se mandará a llamar en Crear_Mapa).

- Logo.onAdd

Ubicada en la línea 441. Crea el logo con los logos de Planeación e Indemun.

- function Crear_Mapa(M,T,I,A)

Ubicada en la línea 451. Esta es la más importante de todas, es la que crea el mapa en base al geojson filtrado según la selección del módulo "M", tema "T", indicador "I" y año "A". Además de crear la base para los popup's, limpiar las capas y resaltar el municipio sobre el que se pasa el ratón (se mandará a llamar cada que se cambie algún select)

- Caja.onAdd 

Ubicada en la línea 571. Crea el contenedor para los select y los mete ahí.

- Datos_Pastel(M,T,I,A,Mpio,ID)

Ubicada en la línea 621. Calcula los datos para la gráfica de pastel de los popup's basado en la selección del módulo "M", tema "T", indicador "I", año "A", municipio "Mpio" sobre el que se hace clic y lo colocará en el popup con el "ID" (se mandará a llamar en map.on('popupopen', function (e) ).

- Gráfica_Pastel(Mpio,ID)

Ubicada en la línea 652. Crea la gráfica de pastel del municipio "Mpio" con el popup con la "ID" abierto y la pega ahí (se mandará a llamar en Datos_Pastel(M,T,I,A,Mpio,ID)).

- Rellenar_Indicador(T)

Ubicada en la línea 715. Actualiza los valores y opciones del select para Indicador basado en el tema "T" actualmente seleccionado. (se mandará a llamar en Rellenar_Tema(M) y al cambiar la opción del select para Tema).

- Rellenar_Tema(M)

Ubicada en la línea 733. Actualiza los valores y opciones del select para Tema basado en el módulo "M" actualmente seleccionado. (se mandará a llamar al cambiar la opción del select para Módulo).



Funciones en estadisticas.html

- Igualmente filtrarPorCol(data, columnasPermitidas)

- Datos_PorModuloAñoMpio(M,A)

Ubicada en la línea 221. Calcula los datos para las gráficas de barras en base a la selección de módulo "M", el año "A" y el nombre del municipio en la selección actual.

- GraficaBarras_PorModuloAñoMpio(Mpio)

Ubicada en la línea 237. Crea la gráfica de barras por módulo, año y el "Mpio" actual. (se mandará a llamar en Datos_PorModuloAñoMpio(M,A)).

- Datos_PorAño(A)

Ubicada en la línea 299. Calcula los datos para las gráficas de barras en base a la selección del año "A" actual.

- GraficaBarras_PorAño(A)

Ubicada en la línea 343. Crea la gráfica de barras por el  año "A" actual. (se mandará a llamar en Datos_PorAño(A)
).

- Crear_Graficas(M,A)

Ubicada en la línea 522. Cambia los colores de los botones "Indicadores" y "Totales" para saber la selección actual, oculta los select de Municipio y Módulo cuando no son necesariose e impide que se actualice las gráficas al pulsar varias veces el mismo año o botón de selección (se mandará a llamar en Graficar_Año(M,A) y al presionar los botones de "Indicadores" y "Totales").

- Graficar_Año(M,A)

Ubicada en la línea 566. Sirve para que el select de Año funcione para ambas opciones: "Indicadores" o "Totales" (se madará a llamar cuando se cambia la selección del Año)


