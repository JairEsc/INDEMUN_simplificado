A=sf::read_sf("PP_2026/INDEMUN_simplificado/app/CompiladoJSON_2.geojson")
install.packages("sf")
install.packages("dplyr")
poligonos_indiv <- sf::st_cast(A, to = "POLYGON")
sf::st_cast()
sf::st_combine(A,)


mapa_disuelto <- poligonos_indiv |>
  group_by(CVEGEO) |>
  summarise(geometry = sf::st_combine(geometry))
B=sf::st_drop_geometry(A)
c=sf::st_as_sf(merge(x = B, y = mapa_disuelto, by="CVEGEO"))
sf::write_sf(c,"PP_2026/INDEMUN_simplificado/app/CompiladoJSON_2C.geojson")
