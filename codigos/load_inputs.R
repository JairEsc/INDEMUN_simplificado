## Los archivos .geojson y .csv 

list.files("inputs/",pattern = ".geojson",full.names = T) |> lapply(sf::st_read)->lista_geojson
list.files("inputs/",pattern = ".csv",full.names = T) |> lapply(read.csv)->lista_csvs


###Unir lo que se pueda en un solo archivo .geojson o .csv