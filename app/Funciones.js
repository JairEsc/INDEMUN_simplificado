
        
        //Ya tenemos lo básico, es momento de declarar las variables globales necesarias para después

        //Para la gráfica de pastel
        let data;
        let Grafica;
        const ctx =document.getElementById('myChart').getContext('2d');

        const modal = document.getElementById("chartModal");
        //const openBtn = document.getElementById("openModal");
        const closeBtn = document.getElementById("closeModal");

        //Para la gráfica de año-municipio-módulo
        let data2;
        let Grafica2;
        const ctx2 =document.getElementById('myChart2').getContext('2d');

        //Para la gráfica por año
        let data0;
        let Grafica0;
        const ctx0 =document.getElementById('myChart0').getContext('2d');

        //Estas son vitales pues serán las que constantemente dicten la selección en la que estamos
        Modulo= "1"; //del 1 al 8
        Tema = "1"; // entre el 1 y el 6 (aunque la mayoría tienen menos)
        Indicador = "1"; // entre el 1 y el 10 (aunque la mayoría tienen menos)
        Año= "25"; //// entre el 20 y el 25 (según el año actual)
        //Nos vamos al 1.1.1 de 2025 por defecto

        //Creemos las variables que vamos a necesitar para el pop up de cada municipio
        //Estas son las que servirán para el histórico
        let A20 = 0;
        let A21 = 0;
        let A22 = 0;
        let A23 = 0;
        let A24 = 0;
        let A25 = 0;

        //
        let v_AñoMpio = 0;
        let a_AñoMpio = 0;
        let r_AñoMpio = 0;
        let nm_AñoMpio = 0;
        let ndR_AñoMpio = 0;
        let nd_AñoMpio = 0;
        //
        let v_ModAñoMpio = 0;
        let a_ModAñoMpio = 0;
        let r_ModAñoMpio = 0;
        let nm_ModAñoMpio = 0;
        let ndR_ModAñoMpio = 0;
        let nd_ModAñoMpio = 0;

        //Estas son para la gráfica anual
        let Optimos = [];
        let EnProcesos = [];
        let Rezagos = [];
        let RezNoInfo = [];
        let NoDispo = [];
        let NoMedible = [];

        //////////////////////////
        
        //La función primera nos dará la información necesaria para nuestro Popup
        //Por lo que se debe llamar cada vez que se hace clic sobre un municipio
        function Tarjeta_indv(M,T,I,A,Mpio){ // M de Módulo, T de Tema, I de indicador, A de año y Mpio del municipio (CVEGEO)
            let Semi_combinacion = "M"+M+"_"+T+"_"+I+"_"; //Para poder usar la de varios años
            const columnas = [Semi_combinacion+"20", Semi_combinacion+"21", Semi_combinacion+"22",
                Semi_combinacion+"23", Semi_combinacion+"24",Semi_combinacion+"25", "CVEGEO"]; //Hasta el año actual

            //Y la filtramos
            const geojsonFiltrado = filtrarPorCol(Data2, columnas);
            let geojsonFiltrado2 = geojsonFiltrado.features.find(
                f => f.properties.CVEGEO === Mpio
            );
            
            //Estas son del histórico de cada municipio
            console.log(geojsonFiltrado2.properties[Semi_combinacion+"20"]); //
            A20=geojsonFiltrado2.properties[Semi_combinacion+"20"]
            console.log(geojsonFiltrado2.properties[Semi_combinacion+"21"]); //
            A21=geojsonFiltrado2.properties[Semi_combinacion+"21"]
            console.log(geojsonFiltrado2.properties[Semi_combinacion+"22"]); //
            A22=geojsonFiltrado2.properties[Semi_combinacion+"22"]
            console.log(geojsonFiltrado2.properties[Semi_combinacion+"23"]); //
            A23=geojsonFiltrado2.properties[Semi_combinacion+"23"]
            console.log(geojsonFiltrado2.properties[Semi_combinacion+"24"]); //
            A24=geojsonFiltrado2.properties[Semi_combinacion+"24"]
            console.log(geojsonFiltrado2.properties[Semi_combinacion+"25"]); //
            A25=geojsonFiltrado2.properties[Semi_combinacion+"25"]

            let geojsonFiltrado3 = Data2.features.find(
                f => f.properties.CVEGEO === Mpio
            );

            //Estos solo dependen del Año y el municipio
            let columnas_año= Object.keys(geojsonFiltrado3.properties).filter(col => col.split("_")[3] === A);
            let indicador_año = columnas_año.map(col => geojsonFiltrado3.properties[col]);
            console.log(indicador_año);
            v_AñoMpio = (100 * indicador_año.filter(v => Number(v) === 1).length) / indicador_año.length;
            console.log(v_AñoMpio+" % de optimos") //

            a_AñoMpio = (100 * indicador_año.filter(v => Number(v) === 2).length) / indicador_año.length;
            console.log(a_AñoMpio+" % de en proceso") //

            r_AñoMpio = (100 * indicador_año.filter(v => Number(v) === 3).length) / indicador_año.length;
            console.log(r_AñoMpio+" % de rezago") //

            nm_AñoMpio = (100 * indicador_año.filter(v => Number(v) === 4).length) / indicador_año.length;
            console.log(nm_AñoMpio+" % de no medibles") //

            ndR_AñoMpio = (100 * indicador_año.filter(v => Number(v) === 5).length) / indicador_año.length;
            console.log(ndR_AñoMpio+" % de rezago por no info") //

            nd_AñoMpio = (100 * indicador_año.filter(v => Number(v) === 0).length) / indicador_año.length;
            console.log(nd_AñoMpio+" % de no disponible") //

            Gráfica_Pastel(Mpio);
        }

        //Ahora esta función nos dará la información necesaria para la gráfica de Municipio-Módulo-Año
        //Por lo que se debe mandar a llamar cuando uno de esos tres filtros cambie
        function Tarjeta_por_Modulo(M,A,Mpio){
            let geojsonFiltrado = Data2.features.find(
                f => f.properties.CVEGEO === Mpio
            );
            let columnas_modulo= Object.keys(geojsonFiltrado.properties).filter(col => col.split("_")[0] === "M"+M && col.split("_")[3] === A).concat(["CVEGEO"]);
            const geojsonFiltrado2 = filtrarPorCol(Data2, columnas_modulo);

            let geojsonFiltrado3 = geojsonFiltrado2.features.find(
                f => f.properties.CVEGEO === Mpio
            );
            let modulos_año= columnas_modulo.map(col => geojsonFiltrado3.properties[col]);

            v_ModAñoMpio = (modulos_año.filter(v => Number(v) === 1).length);
            console.log(v_ModAñoMpio+" de optimos") //

            a_ModAñoMpio = (modulos_año.filter(v => Number(v) === 2).length);
            console.log(a_ModAñoMpio+" de en proceso") //

            r_ModAñoMpio = (modulos_año.filter(v => Number(v) === 3).length);
            console.log(r_ModAñoMpio+" de rezago") //

            nm_ModAñoMpio = (modulos_año.filter(v => Number(v) === 4).length);
            console.log(nm_ModAñoMpio+" de 4 (no medible)") //

            ndR_ModAñoMpio = (modulos_año.filter(v => Number(v) === 5).length);
            console.log(ndR_ModAñoMpio+" de 5(rezago por no info)") //

            nd_ModAñoMpio = (modulos_año.filter(v => Number(v) === 0).length);
            console.log(nd_ModAñoMpio+" de 0 (no disponible)") //

            Gráfica_Barras1(Mpio);
            
        }
        function Tarjeta_por_Año(A){
            let geojsonFiltrado = Data2.features.find(
                f => f.properties.CVEGEO === 13001 //No importa, esto solo es por mi facilidad
            );

            //Debemos reiniciarlos para evitar que estén guardando de anteriores
            Optimos = [];
            EnProcesos = [];
            Rezagos = [];
            RezNoInfo = [];
            NoDispo = [];
            NoMedible = [];

            //La idea es que por cada municipio (feature) verifique cuantos optimos tiene, cuantos en proceso, etc.
            //Y solo depende del año, por lo que hay que cortar a las columnas que terminan en ese año
            let columnas_modulo= Object.keys(geojsonFiltrado.properties).filter(col => col.split("_")[3] === A).concat(["CVEGEO"]);
            const geojsonFiltrado2 = filtrarPorCol(Data2, columnas_modulo);
            geojsonFiltrado2.features.forEach(feature => {
                // contar valores iguales a 1
                let z1 = Object.values(feature.properties).filter(v => Number(v) === 1).length;
                Optimos.push(z1);

                let z2 = Object.values(feature.properties).filter(v => Number(v) === 2).length;
                EnProcesos.push(z2);

                let z3 = Object.values(feature.properties).filter(v => Number(v) === 3).length;
                Rezagos.push(z3);

                let z4 = Object.values(feature.properties).filter(v => Number(v) === 4).length;
                NoMedible.push(z4);

                let z5 = Object.values(feature.properties).filter(v => Number(v) === 5).length;
                RezNoInfo.push(z5);

                let z0 = Object.values(feature.properties).filter(v => Number(v) === 0).length;
                NoDispo.push(z1);

                Gráfica_Barras0(A)
            });
        }
        //Ya tenemos las funciones que nos pueden regresar los valores para las gáficas y el mapa
        //Ahora solo necesitamos una forma de seleccionar los 4 niveles para filtrar sobre los valores
        //Para ello crearemos 4 objetos tipo select en el index, pero necesitamos una forma de llenar las opciones
        //Dado que el Tema depende del Módulo y el Indicador del Módulo y el Tema usaremos dos funciones que rellenen las opcciones 
        //de sus respectivos select

        //INDICADOR
        function rellenar_Indicador(T){ //T nos dirá el Tema que se ha seleccionado
            const menu = document.getElementById("selector_indicador");
            menu.innerHTML = ""; // Se supone que borra fácil TODAS las opciones del select

            let filtrado_M=Lista_Descriptor.filter(v => v[1].split("_")[0] === T);
            let lista= filtrado_M.map(fila => fila[2]);

            lista.forEach(ind => {
                const opcion = document.createElement("option");
                opcion.value = ind.split("_")[0];
                opcion.text = ind.replace(/\_/g, " ");
                menu.appendChild(opcion);
            })
            
            Crear_Mapa(T.split(".")[0],T.split(".")[1],"1",Año).addTo(map);
        }

        //TEMA
        function rellenar_Tema(M){ //X nos dirá el Módulo que se ha escogido
            const menu = document.getElementById("selector_tema");
            menu.innerHTML = ""; // Se supone que borra fácil TODAS las opciones del select

            let filtrado_M=Lista_Descriptor.filter(v => v[0].split("_")[0] === M);
            let lista_sucia= filtrado_M.map(fila => fila[1]); //En esta se repite los valores tal como en el excel
            let lista = lista_sucia.filter((item, index) => lista_sucia.indexOf(item) === index); //Esto limpia como un unique

            lista.forEach(ind => {
                const opcion = document.createElement("option");
                opcion.value = ind.split("_")[0];
                opcion.text = ind.replace(/\_/g, " ");
                menu.appendChild(opcion);
            })
            rellenar_Indicador(M+".1");
            Crear_Mapa(M,"1","1",Año).addTo(map);

        }
        //Ahora queremos la función que genera y cambia la grafica de pastel
        function Gráfica_Pastel(Mpio){


            const select = document.getElementById("selector_indicador");

            // Obtener el índice seleccionado
            const indice = select.selectedIndex;

            // Obtener el texto de la opción seleccionada
            const textoSeleccionado = select.options[indice].text;

            select.textContent = textoSeleccionado;

        
            document.getElementById("indicador_popup").textContent = Indicador;
            modal.style.display = "block";
            let data = {
            labels: ['Optimos', 'En Proceso', 'Rezago','Rezago por no información', 'No disponible', 'No medible'],
            datasets: [
                {
                
                data: [v_AñoMpio,a_AñoMpio,r_AñoMpio,ndR_AñoMpio,nd_AñoMpio,nm_AñoMpio],
                backgroundColor: [
                    '#90E852',
                    '#F1FF40',
                    '#FF0000',
                    '#662D2D',
                    '#B0B0B0',
                    '#FFFFFF'
                ]
                }
            ]
            };
            if (Grafica) {
                Grafica.destroy();
            }
            Grafica = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: {
                    responsive: false,
                    plugins: {
                        legend: {
                            position: 'absolute',
                        },
                        title: {
                            display: true,
                            text: 'Indicadores en '+Mpio+' en el año 20'+Año
                        }
                    }
                },
            });

        }
        closeBtn.onclick = function() {
            modal.style.display = "none";
        };

        //Se cierrar si se hace clic afuera
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        //Ahora queremos la función que genera y cambia la grafica de pastel
        function Gráfica_Barras1(Mpio){
            data2 = {
            labels: ['Optimos', 'En Proceso', 'Rezago','Rezago por no información', 'No disponible', 'No medible'],
            datasets: [
                {
                label: 'Óptimo',
                data: [v_ModAñoMpio,a_ModAñoMpio,r_ModAñoMpio,ndR_ModAñoMpio,nd_ModAñoMpio,nm_ModAñoMpio],
                backgroundColor: [
                    '#90E852',
                    '#F1FF40',
                    '#FF0000',
                    '#662D2D',
                    '#B0B0B0',
                    '#FFFFFF'
                ],
                borderColor: [
                    '#90E852',
                    '#F1FF40',
                    '#FF0000',
                    '#662D2D',
                    '#B0B0B0',
                    '#000000'
                ],
                borderWidth: 1
                }]
            };
            if (Grafica2) {
                Grafica2.destroy();
            }
            Grafica2 = new Chart(ctx2, {
                type: 'bar',
                data: data2,
                options: {
                    responsive: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Indicadores Totales en '+Mpio+' en el año 20'+Año
                        }
                    }
                },
            });
        }




        //Ahora queremos la función que genera y cambia la grafica de pastel
        function Gráfica_Barras0(A){
            data0 = {
            labels: [
                "Acatlán",
                "Acaxochitlán",
                "Actopan",
                "Agua Blanca de Iturbide",
                "Ajacuba",
                "Alfajayucan",
                "Almoloya",
                "Apan",
                "Atitalaquia",
                "Atlapexco",
                "Atotonilco de Tula",
                "Atotonilco el Grande",
                "Calnali",
                "Cardonal",
                "Chapantongo",
                "Chapulhuacán",
                "Chilcuautla",
                "Cuautepec de Hinojosa",
                "El Arenal",
                "Eloxochitlán",
                "Emiliano Zapata",
                "Epazoyucan",
                "Francisco I. Madero",
                "Huasca de Ocampo",
                "Huautla",
                "Huazalingo",
                "Huehuetla",
                "Huejutla de Reyes",
                "Huichapan",
                "Ixmiquilpan",
                "Jacala de Ledezma",
                "Jaltocán",
                "Juárez Hidalgo",
                "La Misión",
                "Lolotla",
                "Metepec",
                "Metztitlán",
                "Mineral de la Reforma",
                "Mineral del Chico",
                "Mineral del Monte",
                "Mixquiahuala de Juárez",
                "Molango de Escamilla",
                "Nicolás Flores",
                "Nopala de Villagrán",
                "Omitlán de Juárez",
                "Pachuca de Soto",
                "Pacula",
                "Pisaflores",
                "Progreso de Obregón",
                "San Agustín Metzquititlán",
                "San Agustín Tlaxiaca",
                "San Bartolo Tutotepec",
                "San Felipe Orizatlán",
                "San Salvador",
                "Santiago de Anaya",
                "Santiago Tulantepec de Lugo Guerrero",
                "Singuilucan",
                "Tasquillo",
                "Tecozautla",
                "Tenango de Doria",
                "Tepeapulco",
                "Tepehuacán de Guerrero",
                "Tepeji del Río de Ocampo",
                "Tepetitlán",
                "Tetepango",
                "Tezontepec de Aldama",
                "Tianguistengo",
                "Tizayuca",
                "Tlahuelilpan",
                "Tlahuiltepa",
                "Tlanalapa",
                "Tlanchinol",
                "Tlaxcoapan",
                "Tolcayuca",
                "Tula de Allende",
                "Tulancingo de Bravo",
                "Villa de Tezontepec",
                "Xochiatipan",
                "Xochicoatlán",
                "Yahualica",
                "Zacualtipán de Ángeles",
                "Zapotlán de Juárez",
                "Zempoala",
                "Zimapán"
            ],
            datasets: [
                {
                label: 'Optimos',
                data: Optimos,
                backgroundColor:'#90E852',
                borderColor: '#90E852'
                },
                {
                label: 'En Proceso',
                data: EnProcesos,
                backgroundColor:'#F1FF40',
                borderColor: '#F1FF40'
                },
                {
                label: 'Rezago',
                data: Rezagos,
                backgroundColor: '#FF0000',
                borderColor: '#FF0000'
                },
                {
                label: 'Rezago por no info',
                data: RezNoInfo,
                backgroundColor: '#662D2D',
                borderColor: '#662D2D'
                },
                {
                label: 'No disponible',
                data: NoDispo,
                backgroundColor: '#662D2D',
                borderColor: '#662D2D'
                },
                {
                label: 'No medible',
                data: NoMedible,
                backgroundColor: '#FFFFFF',
                borderColor: '#000000'
                },
            ]
            };
            if (Grafica0) {
                Grafica0.destroy();
            }
            Grafica0 = new Chart(ctx0, {
                type: 'bar',
                data: data0,
                options: {
                    responsive: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        x: {
                            stacked: false
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Indicadores Anuales en el año 20'+A
                        }
                    }
                },
            });
        }

