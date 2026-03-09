## Los archivos .geojson y .csv 

list.files("inputs/",pattern = ".geojson",full.names = T) |> lapply(sf::st_read)->lista_geojson
list.files("inputs/",pattern = ".csv",full.names = T) |> lapply(read.csv)->lista_csvs




Data_JSON=lista_geojson[[1]]
for(i in 2:length(lista_geojson)){
  Auxi=sf::st_drop_geometry(lista_geojson[[i]]) |> dplyr::select(-c(CVEGEO, CVE_ENT, NOMGEO, OID_, Estado))
  Data_JSON=merge(x = Data_JSON,y = Auxi,by = "CVE_MUN")
}


##Yo diría que los csv no se deben juntar
Data_CSV=lista_csvs[[1]]
for(i in 2:length(lista_csvs)){
  Auxi2=sf::st_drop_geometry(lista_csvs[[i]])
  Data_CSV=merge(x = Data_CSV,y = Auxi2,by = "Municipio")
}
###Unir lo que se pueda en un solo archivo .geojson o .csv

sf::write_sf(Data_JSON,"CompiladoJSON.geojson",driver="GeoJSON")

"../../../"

"../../../Try_Enrique/clasificacion.xlsx" |> readxl::read_excel() -> P
P=P |> 
  tidyr::fill(Tema, .direction = "down")
P$Nombre = gsub(pattern = "\\.","",P$Nombre)

P$Módulo=gsub("M","",P$Módulo)
P$Indicador=paste0(P$Indicador,"_",P$Nombre," (",P$Tipo,")")
P = P |> dplyr::select(Módulo,Tema,Indicador)
writexl::write_xlsx(P,"../../../Try_Enrique/Descriptor2.xlsx")


for(i in 4:ncol(LLL)){
  if(6 %in% LLL[,i]){
    cat("Aquí hay 6")
  }
  
}
readxl::read_excel("Base de Resultados GDM 2025.xls") -> B2025
colnames(B2025)=B2025[6,]
B2025=B2025[B2025$Estado=="Hidalgo" & !is.na(B2025$Estado),]
colnames(B2025)=paste0("M",colnames(B2025),"_25") |> gsub(pattern = "\\.",replacement = "_")

# //v = óptimo (verde) = 1
# //a = en proceso (amarillo) = 2
# //r = rezago (rojo) = 3
# //ndR = rezago por no presentar información (rojo obscuro)} = 5
# //nd = información no disponible (gris) = 0
# //nm = no medible (blanco) = 4
for(i in 1:84){
  for(j in 1:ncol(B2025)){
    if(B2025[i,j]=="v"){
      B2025[i,j]="1"
    }
    if(B2025[i,j]=="a"){
      B2025[i,j]="2"
    }
    if(B2025[i,j]=="r"){
      B2025[i,j]="3"
    }
    if(B2025[i,j]=="ndR"){
      B2025[i,j]="5"
    }
    if(B2025[i,j]=="nd"){
      B2025[i,j]="0"
    }
    if(B2025[i,j]=="nm"){
      B2025[i,j]="4"
    }
  }
}
dplyr::select(B2025,-c(MNo__25))
B2025=B2025[,c(3:118)]

for(i in 2:ncol(B2025)){
  B2025[,i]=as.numeric(unlist(B2025[,i]))
}
for(k in Data_JSON_2$NOMGEO){
  gsub('\\" ','\\"',cat('"',k,'"\n'))
}
cat(gsub(' \\"','"',gsub('\\" ','\\"',

         '" Acatlán "
         " Acaxochitlán "
         " Actopan "
         " Agua Blanca de Iturbide "
         " Ajacuba "
         " Alfajayucan "
         " Almoloya "
         " Apan "
         " Atitalaquia "
         " Atlapexco "
         " Atotonilco de Tula "
         " Atotonilco el Grande "
         " Calnali "
         " Cardonal "
         " Chapantongo "
         " Chapulhuacán "
         " Chilcuautla "
         " Cuautepec de Hinojosa "
         " El Arenal "
         " Eloxochitlán "
         " Emiliano Zapata "
         " Epazoyucan "
         " Francisco I. Madero "
         " Huasca de Ocampo "
         " Huautla "
         " Huazalingo "
         " Huehuetla "
         " Huejutla de Reyes "
         " Huichapan "
         " Ixmiquilpan "
         " Jacala de Ledezma "
         " Jaltocán "
         " Juárez Hidalgo "
         " La Misión "
         " Lolotla "
         " Metepec "
         " Metztitlán "
         " Mineral de la Reforma "
         " Mineral del Chico "
         " Mineral del Monte "
         " Mixquiahuala de Juárez "
         " Molango de Escamilla "
         " Nicolás Flores "
         " Nopala de Villagrán "
         " Omitlán de Juárez "
         " Pachuca de Soto "
         " Pacula "
         " Pisaflores "
         " Progreso de Obregón "
         " San Agustín Metzquititlán "
         " San Agustín Tlaxiaca "
         " San Bartolo Tutotepec "
         " San Felipe Orizatlán "
         " San Salvador "
         " Santiago de Anaya "
         " Santiago Tulantepec de Lugo Guerrero "
         " Singuilucan "
         " Tasquillo "
         " Tecozautla "
         " Tenango de Doria "
         " Tepeapulco "
         " Tepehuacán de Guerrero "
         " Tepeji del Río de Ocampo "
         " Tepetitlán "
         " Tetepango "
         " Tezontepec de Aldama "
         " Tianguistengo "
         " Tizayuca "
         " Tlahuelilpan "
         " Tlahuiltepa "
         " Tlanalapa "
         " Tlanchinol "
         " Tlaxcoapan "
         " Tolcayuca "
         " Tula de Allende "
         " Tulancingo de Bravo "
         " Villa de Tezontepec "
         " Xochiatipan "
         " Xochicoatlán "
         " Yahualica "
         " Zacualtipán de Ángeles "
         " Zapotlán de Juárez "
         " Zempoala "
         " Zimapán "')))






cat(Data_JSON_2$NOMGEO,"\n")
Data_JSON_2=merge(Data_JSON,B2025,by.x = "NOMGEO",by.y = "MMunicipio_25")
"../../Try_Enrique/"
sf::write_sf(Data_JSON_2,"../../Try_Enrique/CompiladoJSON_2.geojson",driver="GeoJSON")



"../../../P4_Indemun/Try_Enrique/M_1_1/M_1_1.shp" |> sf::read_sf() -> LLL
