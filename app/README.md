Para el mapa web

ACTUALIZAR

Para facilitar he colocado el comentario "[ACTUALIZAR]" cerca de aquellas líneas o secciones que se deben modificar en cas de querer actualizar.

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



