library(sf)
library(dplyr)

#Cambiar por el año al que se desea actualizar (en nuestro caso es 2025)
Año="25"

#Cargamos el que ya tenemos
Data_Original=sf::read_sf("CompiladoJSON.geojson")
#Cargamos el nuevo
Data_Nuevo=readxl::read_excel("Base de Resultados GDM 2025.xls",skip = 6)
#Vamos a filtrar a Hidalgo y solo a las columnas que nos interesan
Data_Nuevo=Data_Nuevo[Data_Nuevo$Estado=="Hidalgo" & !is.na(Data_Nuevo$Estado),]
Data_Nuevo=Data_Nuevo[,c(3:(which(colnames(Data_Nuevo)=="Total de indicadores")-1))]
#debería tener 116 columnas: 115 de Indicadores y una con el nombre del municipio

#Cambiamos al rango 0:5
Data_Nuevo[Data_Nuevo=="v"]="1" #óptimo
Data_Nuevo[Data_Nuevo=="a"]="2" #en proceso
Data_Nuevo[Data_Nuevo=="r"]="3" #rezago
Data_Nuevo[Data_Nuevo=="ndR"]="5" #rezago por no presentar información
Data_Nuevo[Data_Nuevo=="nd"]="0" #información no disponible
Data_Nuevo[Data_Nuevo=="nm"]="4" #no medible

#Renombramos las columnas
Columnas_porRenombrar=colnames(Data_Nuevo)[-1]
colnames(Data_Nuevo)[-1]=paste0("M",gsub("\\.","_",Columnas_porRenombrar),"_",Año)

#Juntamos por municipio
Compilado=merge(x = Data_Original,y = Data_Nuevo,by.x="NOMGEO",by.y="Municipio")

#Pasamos a enteros
Compilado <- Compilado |>
  mutate(across(7:(ncol(Compilado)-1), as.integer))

sf::st_write(Compilado,"CompiladoJSON.geojson",driver = "GeoJSON", delete_dsn = TRUE)


#A continuación puedes correr este fragmento para asegurarte que solo existan valores de 0 al 5
for(i in 1:84){
  for(j in 7:(ncol(Compilado)-1)){
    aux=Compilado[i,j] %in% c(0:5)
    if(!aux[1]){
      print("Aqui hay algo fuera del 0 al 5: ")
      i
      j
    }
  }
}