class Api{

    constructor() {
        this.url = "http://localhost/sustain_map/app_modules/maps/API/maps/";
        this.response = null;

        this.dataVectores= {};



        this.dataInversion = {
            "total_ejecucion" : 0,
            "rp" : 0,
            "fonc" : 0,
            "tercero" : 0
        };

        this.dataBeneficiarios = {
            "total_beneficiario" : 0,
            "afroValue" : 0,
            "joveValue" : 0,
            "mujerValue" :  0,
            "hombreValue" :  0
        };

        this.dataEjeInidicativo1 = {};

    }




    post = function (url, data = [],sucessCallBack, falloCallback){
        const  _self = this;
        url = _self.url+url;
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            timeout: 30000,
            dataType: 'json',
            cache: false,
            success : sucessCallBack,
            error : falloCallback
        });
    }

    getInversion = function ($data = {}, sucessCallBack, falloCallback){
        const  _self = this;
        $data.anio = $("#selectAnoCargue").val();
        $data.type = 1;
        $data.table = "monto_inversion";
        $data.dpto = nameDpto;
        $data.municipio = nameMunicipio;
        _self.post("get_data_nfc", $data,sucessCallBack, falloCallback);
    }

    getBeneficiarios = function ($data = {}, sucessCallBack, falloCallback){
        const  _self = this;
        $data.anio = $("#selectAnoCargue").val();
        $data.type = 1;
        $data.table = "monto_beneficiarios";
        $data.dpto = nameDpto;
        $data.municipio = nameMunicipio;

        _self.post("get_data_nfc", $data,sucessCallBack, falloCallback);
    }


    getVectores = function ($data = {}, sucessCallBack, falloCallback){
        const  _self = this;
        $data.anio = $("#selectAnoCargue").val();
        $data.type = 2;
        $data.dpto = nameDpto;
        $data.municipio = nameMunicipio;
        _self.post("get_data_nfc", $data,sucessCallBack, falloCallback);
    }

    getVieEjeIndicativo = function ($data = {}, sucessCallBack, falloCallback){
        const  _self = this;
        $data.anio = $("#selectAnoCargue").val();
        $data.type = 1;
        $data.table = "view_eje_indicativo";
        $data.dpto = nameDpto;
        $data.municipio = nameMunicipio;

        _self.post("get_data_nfc", $data,sucessCallBack, falloCallback);
    }

    getVieEjeIndicativo1 = function ($data = {}, sucessCallBack, falloCallback){
        const  _self = this;
        $data.anio = $("#selectAnoCargue").val();
        $data.type = 0;
        $data.table = "view_eje_eje";
        $data.dpto = nameDpto;
        $data.municipio = nameMunicipio;
        _self.post("get_data_nfc", $data,sucessCallBack, falloCallback);
    }

    getVieEjeIndicativo2 = function ($data = {}, sucessCallBack, falloCallback){
        const  _self = this;
        $data.anio = $("#selectAnoCargue").val();
        $data.type = 4;
        $data.table = "view_eje_eje_dpta_municipio";
        $data.dpto = nameDpto;
        $data.municipio = nameMunicipio;

        _self.post("get_data_nfc", $data,function (data){
            console.log(data);

            var AMBIENTAL = data.find(x => x.eje === "AMBIENTAL");
            var GOBERNANZA =  data.find(x => x.eje === "GOBERNANZA");
            var ECONOMICO =  data.find(x => x.eje === "ECONOMICO");
            var SOCIAL = data.find(x => x.eje === "SOCIAL");

            if(!AMBIENTAL){
                AMBIENTAL = {total : 0};
            }

            if(!GOBERNANZA){
                GOBERNANZA = {total : 0};
            }

            if(!ECONOMICO){
                ECONOMICO = {total : 0};
            }

            if(!SOCIAL){
                SOCIAL = {total : 0};
            }

            api.dataEjeInidicativo1 = {
                AMBIENTAL,
                GOBERNANZA,
                ECONOMICO,
                SOCIAL
            };
            // Doughnut chart



            if (data && data[0].ano_carge) {
                console.log(data);

                chDonutData1.datasets[0].data = [
                    getPorcentaje(api.dataEjeInidicativo1["AMBIENTAL"].total,100),
                    getPorcentaje(api.dataEjeInidicativo1["GOBERNANZA"].total,100),
                    getPorcentaje(api.dataEjeInidicativo1["ECONOMICO"].total,100),
                    getPorcentaje(api.dataEjeInidicativo1["SOCIAL"].total,100),
                ];


                chDonut3 = document.getElementById("circlemap4").getContext('2d');
                if (chDonut3) {
                    chDonut3Chart = new Chart(chDonut3, {
                        type: 'pie',
                        data: chDonutData1,
                        options: donutOptions1
                    });
                }
            }
        }, function (error){
            console.log(error);
        });
    }
    getVieEjeIndicativo3 = function ($data = {}, sucessCallBack, falloCallback){
        const  _self = this;
        $data.anio = $("#selectAnoCargue").val();
        $data.type = 0;
        $data.table = "view_indicadores";
        $data.dpto = nameDpto;
        $data.municipio = nameMunicipio;
        _self.post("get_data_nfc", $data,sucessCallBack, falloCallback);
    }


}

const  api = new Api();


$("#selectAnoCargue").change(function (){
    getLoad();
});

function getLoadMunicipios(){
    getLoad();
    api.getVieEjeIndicativo2();

}

function getLoad(){
    //inversion

    api.getInversion({}, function (data){
        console.log(data);
        if(data && data.ano_carge){


            api.dataInversion = {
                "total_ejecucion" : data.total_ejecucion,
                "rp" : data.rp,
                "fonc" : data.fonc,
                "tercero" : data.tercero
            };

            $("#inversionTotal").html(formatCurrency("es-CO", "COP", data.total_ejecucion));
            $("#rp").html(formatCurrency("es-CO", "COP", data.rp))
            $("#fonc").html(formatCurrency("es-CO", "COP", data.fonc))
            $("#tercero").html(formatCurrency("es-CO", "COP", data.tercero))
        }
    }, function (error){
            console.log(error);
    });


    //beneficiarios
    api.getBeneficiarios({}, function (data){
        console.log(data);
        if(data && data.ano_carge){
            api.dataBeneficiarios = {
                "total_beneficiario" : data.total,
                "afroValue" : data.afros,
                "joveValue" : data.jovenes,
                "mujerValue" : data.mujeres,
                "hombreValue" : data.hombres
            };

            $("#total_beneficiario").html(formatCurrency("es-CO", "COP", api.dataBeneficiarios.total_beneficiario).replace("$",""));


        }
    }, function (error){

    });


    //proyectos

    api.getVectores({}, function (data){
        console.log(data);
        if(data && data["vectores"] && data["vectores"][0].ano_carge){
            console.log(data["vectores"]);
            console.log(data["proyectos"]);


            if(!data["proyectos"]){
                data["proyectos"] = {total : 0}
            }

            if(!data["vectores"]){
                data["vectores"] = {total : 0}
            }

            api.dataVectores = {
                total_proyecto : data["proyectos"].total,
                infraestructuraValue : data["vectores"].find(x => x.vector.toLowerCase() === ("INFRAESTRUCTURA").toLowerCase()),
                productividadValue : data["vectores"].find(x => x.vector.toLowerCase() === ("PRODUCTIVIDAD").toLowerCase()),
                cuidadoRecursosNaturales : data["vectores"].find(x => x.vector.toLowerCase() === ("CUIDADO DE RECURSOS NATURALES").toLowerCase()),
                costosProduccion : data["vectores"].find(x => x.vector.toLowerCase() === ("COSTOS DE PRODUCCION").toLowerCase())
            };

            api.dataVectores = {
                total_proyecto : api.dataVectores.total_proyecto ? api.dataVectores.total_proyecto.total : 0,
                infraestructuraValue : api.dataVectores.infraestructuraValue ? api.dataVectores.infraestructuraValue.total : 0,
                productividadValue : api.dataVectores.productividadValue ? api.dataVectores.productividadValue.total : 0,
                cuidadoRecursosNaturales : api.dataVectores.cuidadoRecursosNaturales ? api.dataVectores.cuidadoRecursosNaturales.total : 0,
                costosProduccion : api.dataVectores.costosProduccion ? api.dataVectores.costosProduccion.total : 0,
            };

            $("#total_proyecto").html(data["proyectos"].total);
            $("#infraestructuraValue"). html(api.dataVectores.infraestructuraValue.total);
            $("#productividadValue"). html(api.dataVectores.productividadValue.total);
            $("#cuidadoRecursosNaturales"). html(api.dataVectores.cuidadoRecursosNaturales.total);
            $("#costosProduccion"). html(api.dataVectores.costosProduccion.total);

        }
    }, function (error){

    });



    api.getVieEjeIndicativo({}, function (data){
        console.log(data);



        // Doughnut chart
        circlemapChart.clear();
        circlemapChart.data.datasets[0].data = [];
        circlemapChart.update();

        if(data && data.ano_carge){
            console.log(data);

            circleMapData.datasets[0].data = [getPorcentaje(data.gob), getPorcentaje(data.inter),  getPorcentaje(data.org_nal_pri),  getPorcentaje(data.org_nal_pub),  getPorcentaje(data.mun)];
            switch (typeDefault){
                case 1:{

                    circlemap = document.getElementById('circlemap').getContext('2d');
                    circlemapChart = new Chart(circlemap, {
                        type: 'pie',
                        data: circleMapData,
                        options : circlemapConfig,
                    });
                    break;
                }
                case 2:{
                    circlemap3 = document.getElementById('circlemap3').getContext('2d');
                    circlemap3Chart = new Chart(circlemap3, {
                        type: 'pie',
                        data: circleMapData,
                        options : circlemapConfig,
                    });
                }
            }
        }
    }, function (error){

    });


    api.getVieEjeIndicativo1({}, function (data){
        console.log(data);

        var AMBIENTAL = data.find(x => x.eje === "AMBIENTAL");
        var GOBERNANZA =  data.find(x => x.eje === "GOBERNANZA");
        var ECONOMICO =  data.find(x => x.eje === "ECONOMICO");
        var SOCIAL = data.find(x => x.eje === "SOCIAL");

        if(!AMBIENTAL){
            AMBIENTAL = {total : 0};
        }

        if(!GOBERNANZA){
            GOBERNANZA = {total : 0};
        }

        if(!ECONOMICO){
            ECONOMICO = {total : 0};
        }

        if(!SOCIAL){
            SOCIAL = {total : 0};
        }

        api.dataEjeInidicativo1 = {
            AMBIENTAL,
            GOBERNANZA,
            ECONOMICO,
            SOCIAL
        };
        // Doughnut chart



        if (data && data[0].ano_carge) {
            console.log(data);



            chDonutData1.datasets[0].data = [
                getPorcentaje(api.dataEjeInidicativo1["AMBIENTAL"].total,100),
                getPorcentaje(api.dataEjeInidicativo1["GOBERNANZA"].total,100),
                getPorcentaje(api.dataEjeInidicativo1["ECONOMICO"].total,100),
                getPorcentaje(api.dataEjeInidicativo1["SOCIAL"].total,100),
            ];


            switch (typeDefault) {
                case 1: {

                    circlemap1 = document.getElementById("circlemap1").getContext('2d');
                    if (circlemap1) {
                        circlemap1Chart = new Chart(circlemap1, {
                            type: 'pie',
                            data: chDonutData1,
                            options: donutOptions1
                        });
                    }
                    break;
                }
                case 2:{

                    chDonut3 = document.getElementById("circlemap4").getContext('2d');
                    if (chDonut3) {
                        chDonut3Chart = new Chart(chDonut3, {
                            type: 'pie',
                            data: chDonutData1,
                            options: donutOptions1
                        });
                    }
                    break;
                }
            }




        }
    }, function (error){

    });



   api.getVieEjeIndicativo3({},function (data){
      console.log(data)
   });

}



function getPorcentaje(data, value = 1000000){
    return Math.round(data/value)
}


