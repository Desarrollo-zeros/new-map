var dependencia;
var title = "Mapa Ejecución de Proyectos Sostenibles";
$description = null;
$menuTooltip = null;



var afroId = $("#afroDiv");
var hombresId = $("#hombresDiv");
var indigenas = $("#indigenasDiv");
var jovenId = $("#jovenDiv");
var mujeresId = $("#mujerDiv");
var ninosId = $("#ninosDiv");
var otrosId = $("#otroDiv");

var $selectorDpto = null;

var nameDpto;
var nameMunicipio;

var clickDpto;


function cargarMunicipios() {
    var arr = Array.prototype.slice.call($("svg path"));
    for (var i in arr) {
        let name = $(arr[i]).attr("name");
        if (name != undefined) {
            let municipio = $municipios.find(x => x.municipio.toLowerCase().includes(name.toLowerCase()));
            if (municipio != null) {
                $(arr[i]).css("fill", "#d2d2e6");
            }
        }
    }
}

$(document).on('mousemove', function (e) {
    if ($description) {
        $description.css({
            left: e.pageX - 100,
            top: e.pageY - 400,
            height: "60px",

        });
    }

    /*if($menuTooltip){
        $menuTooltip.css({
            left:  e.pageX - 1100,
            top:   e.pageY - 450,
            height : "60px",
        });
    }*/



});


$municipios = [];

$(document).ready(function () {


    api.post("get_data_nfc", {
        "type": 3, "table": "view_municipios_cateferos"
    }, function (data) {
        $municipios = data;
    }, function (error) {

    })



    $("#btnAtras").click(function () {

        $description.removeClass('active');

        if (nameMunicipio != null) {
            nameMunicipio = null;

            $("#dependenciasRow").removeClass("scrollerY");
            $("#apalancamiento-table tbody").removeClass("scrollerY");

            loaderInversion();

            loaderDepedencia();

            loaderApalancamiento();

            loaderProyecto();

            loaderBeneficio();


            getParticipacionEje();

            getParticipacionAportante();

            loaderIndicativo();

            loaderApalancamiento();

            $("#divCircular").show();
            $("#divBarra").show();
            $("#colombia").load("img/departamentos/" + nameDpto + ".svg", function (selector) {
                cargarMunicipios()
                $("#noticiasDiv").hide();
                $("#idTituloMapa").show();
                $("#indicadoresDiv").show();
                $("#separadorCiudad").hide();
                $("#divProyectoNoticia").hide();
                $("#changeTitleDpto").html(nameDpto.toUpperCase());
                $('[data-id="dependencia-hover"]').show();
                $('[data-id="apalancamiento-hover"]').show();

                $description = $(".description");
                var style = null;
                $('path.cls-1').hover(function () {

                    var name = $(this).attr('name');
                    style = $(this).attr("style")

                    if (style != "fill: rgb(210, 210, 230);") {
                        return;
                    }
                    $(this).css("fill", "#6ef35e");
                    if ($selectorDpto) {
                        $($selectorDpto).css("fill", "#960303");
                    }
                    if (!name.toLowerCase().includes("xxx")) {
                        $description.addClass('active');
                        $description.html(name);
                    }
                }, function () {
                    if (style != "fill: rgb(210, 210, 230);") {
                        return;
                    }
                    $(this).attr("style", style);

                    if ($selectorDpto) {
                        $($selectorDpto).css("fill", "#960303");
                    }
                    $description.removeClass('active');
                });

                $("path.cls-1").click(function (event) {
                    $description.removeClass('active');
                    $selectorDpto = this;
                    nameMunicipio = $(this).attr("name");
                    if (nameMunicipio.toLowerCase().includes("xxx")) {
                        return;
                    }

                    loaderInversion();

                    loaderProyecto();

                    loaderBeneficio();

                    //$("#colombia svg path").hide();
                    $("#colombia path").hide();
                    var selector = this;
                    $(this).show();
                    $("#indicadoresDiv").hide();
                    $("#divCircular").hide();
                    $("#divBarra").hide();
                    $('[data-id="dependencia-hover"]').hide();
                    $('[data-id="apalancamiento-hover"]').hide();


                    $("#divProyectoNoticia").show();
                    $("#separadorCiudad").show();

                    $("#nameCiudad").html(nameMunicipio);
                    //$("path.cls-1").css("fill", "#ebebef");
                    $(this).css("fill", "#960303");
                    var selectorId = selector.id;




                    let data = {};
                    data.anio = $("#selectAnoCargue").val();
                    data.type = 0;
                    data.table = "view_proyecto";
                    data.dpto = nameDpto;
                    data.municipio = nameMunicipio;
                    api.post("get_data_nfc", data, function (response) {
                        console.log(response);
                        debugger
                        let str = "";
                        for (var i in response) {
                            str += "<h3 style=\"font-size: 12px\"><span style=\"font-weight: bold;\">" + response[i].nombre_proyecto + "</span></h3>";
                        }
                        $("#proyectosDiv").append(str);
                    }, function () {

                    })
                    $("#colombia").load("img/departamentos/prueba.svg", function () {
                        $("#viewPrueba").append($(selector)[0])
                        $("#colombia svg path").show()
                        zoomState(selectorId, "viewPrueba")
                        clickDpto = false;
                    });

                });
            });
        }
        else {
            if (nameDpto != null) {
                nameDpto = null;
                $("#dependenciasRow").removeClass("scrollerY");
                $("#apalancamiento-table tbody").removeClass("scrollerY");
                $("#indicadoresDiv").hide();
                loaderInversion();

                loaderDepedencia();

                loaderApalancamiento();

                loaderProyecto();

                loaderBeneficio();


                getParticipacionEje();

                getParticipacionAportante();

                loaderIndicativo();



                $("#noticiasDiv").show();
                $("#idTituloMapa").hide();
                $("#atras").hide();
                $("#colombia").load("img/Colombia.svg", function (selector) {


                    //$(this).find("path").attr("filter","url(#dropShadow)");


                    $("path.cls-1").click(function () {
                        clickDpto = true;
                        var url = $(this).attr("url");
                        $selectorDpto = this;
                        nameDpto = $(this).attr("url");

                        loaderInversion

                        loaderDepedencia();

                        loaderApalancamiento();

                        loaderProyecto();

                        loaderBeneficio();


                        getParticipacionEje();

                        getParticipacionAportante();

                        loaderIndicativo();
                        $("#divCircular").show();
                        $("#divBarra").show();
                        $("#col-th-apalancamiento").css("left","60%");
                        $("#colombia").load("img/departamentos/" + url + ".svg", function (selector) {
                            cargarMunicipios()
                            $("#atras").show();
                            $("#noticiasDiv").hide();
                            $("#idTituloMapa").show();
                            $("#indicadoresDiv").show();
                            $("#divProyectoNoticia").hide();
                            $("#changeTitleDpto").html(url.toUpperCase());
                            $('[data-id="dependencia-hover"]').show();
                            $('[data-id="apalancamiento-hover"]').show();


                            $description = $(".description");
                            var style = null;
                            $('path.cls-1').hover(function () {
                                var name = $(this).attr('name');
                                style = $(this).attr("style")

                                if (style != "fill: rgb(210, 210, 230);") {
                                    return;
                                }

                                $(this).css("fill", "#6ef35e");
                                if ($selectorDpto) {
                                    $($selectorDpto).css("fill", "#960303");
                                }
                                if (!name.toLowerCase().includes("xxx")) {
                                    $description.addClass('active');
                                    $description.html(name);
                                }
                            }, function () {
                                if (style != "fill: rgb(210, 210, 230);") {
                                    return;
                                }
                                $(this).attr("style", style);
                                //$(this).css("fill", "#ebebef");
                                if ($selectorDpto) {
                                    $($selectorDpto).css("fill", "#960303");
                                }
                                $description.removeClass('active');
                            });

                            $("path.cls-1").click(function (event) {
                                clickDpto = true;
                                $description.removeClass('active');
                                $selectorDpto = this;
                                nameMunicipio = $(this).attr("name");

                                if (nameMunicipio.toLowerCase().includes("xxx")) {
                                    return;
                                }

                                loaderInversion();

                                loaderProyecto();

                                loaderBeneficio();

                                //$("#colombia svg path").hide();
                                $("#colombia path").hide();
                                var selector = this;
                                $(this).show();
                                $("#indicadoresDiv").hide();
                                $("#divCircular").hide();
                                $("#divBarra").hide();
                                $('[data-id="dependencia-hover"]').hide();
                                $('[data-id="apalancamiento-hover"]').hide();
                                $("#divProyectoNoticia").show();
                                $("#separadorCiudad").show();

                                $("#nameCiudad").html(nameMunicipio);
                                //$("path.cls-1").css("fill", "#ebebef");
                                $(this).css("fill", "#960303");
                                var selectorId = selector.id;




                                let data = {};
                                data.anio = $("#selectAnoCargue").val();
                                data.type = 0;
                                data.table = "view_proyecto";
                                data.dpto = nameDpto;
                                data.municipio = nameMunicipio;
                                api.post("get_data_nfc", data, function (response) {
                                    console.log(response)

                                    let str = "";

                                    for (var i in response) {
                                        str += "<h3 style=\"font-size: 12px\"><span style=\"font-weight: bold;\">" + response[i].nombre_proyecto + "</span></h3>";
                                    }

                                    $("#proyectosDiv").append(str);

                                }, function () {

                                })


                                $("#colombia").load("img/departamentos/prueba.svg", function () {
                                    $("#viewPrueba").append($(selector)[0])
                                    $("#colombia svg path").show()
                                    zoomState(selectorId, "viewPrueba")
                                    clickDpto = false;

                                });

                            });

                        });


                    });

                    $description = $(".description");

                    $('path.cls-1').hover(function () {
                        $(this).attr("class", "cls-1 heyo");
                        $description.addClass('active');
                        $description.html($(this).attr('title'));

                        if ($(this).attr('title') == "Cundinamarca") {
                            $("#path6475").css("fill", "#CC2929");
                            $("#path6415").css("fill", "#CC2929");
                        }
                    }, function () {
                        if ($(this).attr('title') == "Cundinamarca") {
                            $("#path6475").css("fill", "#d2d2e6");
                            $("#path6415").css("fill", "#d2d2e6");
                        }
                        $description.removeClass('active');
                    });


                });
            }
        }
    });


    $("#inversion").attr("src", "img/iconos/Inversion.png");


    $("#dependencia").attr("src", "img/iconos/Dependencia.png");

    $("#apalancamiento").attr("src", "img/iconos/Apalancamiento.png");

    $("#proyecto").attr("src", "img/iconos/Proyectos.png");

    $("#beneficio").attr("src", "img/iconos/Beneficiarios.png");

    $("#selectAnoCargue").val("2019");

    $("#changeTitle").html(title);

    $("#selectAnoCargue").change(function () {
        $description.removeClass('active');
        if (dependencia && dependencia.alias != null) {
            $("#changeTitle").html(title + " " + dependencia.alias + " " + $("#selectAnoCargue").val());
        }

        loaderInversion();

        loaderDepedencia();

        loaderApalancamiento();

        loaderProyecto();

        loaderBeneficio();


        getParticipacionEje();

        getParticipacionAportante();

        loaderIndicativo();



    });

    $("#idTituloMapa").hover(function () {
        $description.removeClass('active');
    });


    $menuTooltip = $(".table-tooltip");

    loaderInversion();

    loaderDepedencia();

    loaderApalancamiento();

    loaderProyecto();

    loaderBeneficio();


    getParticipacionEje();

    getParticipacionAportante();


    afroId.load(afroId.attr("src"), function () {

    });
    hombresId.load(hombresId.attr("src"), function () {

    });
    indigenas.load(indigenas.attr("src"), function () {

    });
    jovenId.load(jovenId.attr("src"), function () {

    });
    mujeresId.load(mujeresId.attr("src"), function () {

    });
    ninosId.load(ninosId.attr("src"), function () {

    });
    otrosId.load(otrosId.attr("src"), function () {

    });


    $("#colombia").load("img/Colombia.svg", function (selector) {


        //$(this).find("path").attr("filter","url(#dropShadow)");


        $("path.cls-1").click(function () {
            clickDpto = true;
            var url = $(this).attr("url");
            $selectorDpto = this;
            nameDpto = $(this).attr("url");

            loaderInversion();

            loaderDepedencia();

            loaderApalancamiento();

            loaderProyecto();

            loaderBeneficio();


            getParticipacionEje();

            getParticipacionAportante();

            loaderIndicativo();

            $("#dependenciasRow").removeClass("scrollerY");
            $("#apalancamiento-table tbody").removeClass("scrollerY");

            $("#colombia").load("img/departamentos/" + url + ".svg", function (selector) {
                cargarMunicipios()
                $description.removeClass('active');

                $("#noticiasDiv").hide();
                $("#idTituloMapa").show();
                $("#indicadoresDiv").show();

                $("#changeTitleDpto").html(url.toUpperCase());

                $description = $(".description");
                var style = null;
                $('path.cls-1').hover(function () {
                    var name = $(this).attr('name');
                    style = $(this).attr("style")

                    if (style != "fill: rgb(210, 210, 230);") {
                        return;
                    }
                    //$(this).css("fill","#6ef35e");
                    if ($selectorDpto) {
                        $($selectorDpto).css("fill", "#960303");
                    }
                    if (!name.toLowerCase().includes("xxx")) {
                        $description.addClass('active');
                        $description.html(name);
                    }
                }, function () {
                    if (style != "fill: rgb(210, 210, 230);") {
                        return;
                    }
                    $(this).attr("style", style);
                    if ($selectorDpto) {
                        //$($selectorDpto).css("fill","#960303");
                    }
                    $description.removeClass('active');
                });

                $("path.cls-1").click(function (event) {
                    clickDpto = false;
                    $("#col-th-apalancamiento").css("left","60%");
                    $description.removeClass('active');
                    $selectorDpto = this;
                    nameMunicipio = $(this).attr("name");

                    if (nameMunicipio.toLowerCase().includes("xxx")) {
                        return;
                    }

                    loaderInversion();

                    loaderProyecto();

                    loaderBeneficio();

                    //$("#colombia svg path").hide();
                    $("#colombia path").hide();
                    var selector = this;
                    $(this).show();
                    $("#indicadoresDiv").hide();
                    $("#divCircular").hide();
                    $("#divBarra").hide();
                    $('[data-id="dependencia-hover"]').hide();
                    $('[data-id="apalancamiento-hover"]').hide();
                    $("#divProyectoNoticia").show();
                    $("#separadorCiudad").show();

                    $("#nameCiudad").html(nameMunicipio);
                    $("path.cls-1").css("fill", "#ebebef");
                    $(this).css("fill", "#960303");
                    var selectorId = selector.id;




                    let data = {};
                    data.anio = $("#selectAnoCargue").val();
                    data.type = 0;
                    data.table = "view_proyecto";
                    data.dpto = nameDpto;
                    data.municipio = nameMunicipio;
                    api.post("get_data_nfc", data, function (response) {
                        console.log(response);

                        let str = "";

                        for (var i in response) {
                            str += "<h3 style=\"font-size: 12px\"><span style=\"font-weight: bold;\">" + response[i].nombre_proyecto + "</span></h3>";
                        }

                        $("#proyectosDiv").append(str);

                    }, function () {

                    })


                    $("#colombia").load("img/departamentos/prueba.svg", function () {
                        $("#viewPrueba").append($(selector)[0])
                        $("#colombia svg path").show()
                        zoomState(selectorId, "viewPrueba")
                        clickDpto = false;
                    });

                });

            });


        });

        $description = $(".description");

        $('path.cls-1').hover(function () {
            $(this).attr("class", "cls-1 heyo");
            $description.addClass('active');
            $description.html($(this).attr('title'));

            if ($(this).attr('title') == "Cundinamarca") {
                $("#path6475").css("fill", "#CC2929");
                $("#path6415").css("fill", "#CC2929");
            }
        }, function () {
            if ($(this).attr('title') == "Cundinamarca") {
                $("#path6475").css("fill", "#d2d2e6");
                $("#path6415").css("fill", "#d2d2e6");
            }
            $description.removeClass('active');
        });


    });


    function loaderIndicativo() {

        let data = {};
        data.anio = $("#selectAnoCargue").val();
        data.type = 6;
        data.table = "view_indicadores_dpta";
        data.dpto = nameDpto;
        data.municipio = nameMunicipio;
        api.post("get_data_nfc", data, function (data) {


            let str = "";



            for (var i in data) {
                if (data[i].indicador_nu.replace('.00', '') != "0") {
                    str += "<h3 style=\"font-size: 12px\"><div class='row'><div class='col-md-3'><span style=\"font-weight: bold;\">" + data[i].indicador_nu.replace('.00', '') + "</span></div> <div class='col-md-9'><span>" + data[i].indicador + "</span> </div> </div></h3>";
                }
            }

            $("#scrollerIndicativo").append(str);


        }, function () {

        })

    }

    function loaderInversion() {
        $('[data-id="inversion-hover"]').hover(function () {
            $(this).find("path").css("fill", "#960303");
            $(this).find("div").css("color", "#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("inversion", $menuTooltip, "")

            $menuTooltip.css({
                right: 200,
                top: -40,
                height: 50,
            });

        }, function () {
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill", "#717171");
            $(this).find("div").css("color", "#717171");
        });


        api.getInversion({}, function (data) {

            if (data && data.ano_carge) {
                api.dataInversion = {
                    "total_ejecucion": data.total_ejecucion,
                    "rp": data.rp,
                    "fonc": data.fonc,
                    "tercero": data.tercero
                };

                api.dataInversion.total_ejecucion = parseFloat(api.dataInversion.rp) +
                    parseFloat(api.dataInversion.fonc) +  parseFloat(api.dataInversion.tercero)

                if(parseInt(api.dataInversion.rp) == 0){
                    $("#rp").parent().hide();
                }else{
                    $("#rp").parent().show();
                }

                if(parseInt(api.dataInversion.fonc) == 0){
                    $("#fonc").parent().hide();
                }else{
                    $("#fonc").parent().show();
                }


                if(parseInt(api.dataInversion.tercero) == 0){
                    $("#terceros").parent().hide();
                }else{
                    $("#terceros").parent().show();
                }

                $("#inversionTotal").html(format(api.dataInversion.total_ejecucion, 1000000, "$") + " MM");
            }
        }, function (error) {

        });
    }

    function loaderDepedencia() {
        $('[data-id="dependencia-hover"]').hover(function () {
            $(this).find("path").css("fill", "#960303");
            $(this).find("div").css("color", "#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("dependencia", $menuTooltip, "")

            $menuTooltip.css({
                right: 200,
                top: 80,
                height: 50,
                zIndex: 99
            });

        }, function () {
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill", "#717171");
            $(this).find("div").css("color", "#717171");
        });

        api.post("get_data_nfc", { "table": "view_dependencias", "type": 3 }, function (data) {
            api.dataDependencia = data;



            var data  = api.dataDependencia;
            if (nameDpto != null) {
                data = data.filter(x => x.dpta.replaceAll(" ","").toLowerCase().includes(nameDpto.replaceAll(" ","").toLowerCase()));
            }


            let dependencia = "";
            let dpto = [];
            for (var i in data) {
                if (dpto.find(x => x == data[i].dependencia) == undefined) {
                    dpto.push(data[i].dependencia);
                    dependencia += "<div class='col-md-12'><span>" + data[i].dependencia + "</span></div>";
                }

            }

            if (data.length == 0) {
                $menuTooltip.removeClass('active');
            }

            $("#depedenciaTotal").html(dpto.length);

            $("#dependenciasRow").html(dependencia);


        }, function () {
            //$menuTooltip.removeClass('active');
        })

    }



    function loaderApalancamiento() {
        $('[data-id="apalancamiento-hover"]').hover(function () {
            $(this).find("path").css("fill", "#960303");
            $(this).find("div").css("color", "#960303");
            $menuTooltip.addClass('active');


            getHtmlTable("apalancamiento", $menuTooltip, "");

            $menuTooltip.css({
                right: 150,
                top: 80,
                height: 50,
            });

            if(clickDpto){
                $("#col-th-apalancamiento").css("left","60%");
            }



        }, function () {
            //$menuTooltip.removeClass('active');
            $(this).find("path").css("fill", "#717171");
            $(this).find("div").css("color", "#717171");
        });


        let data = {};
        data.anio = $("#selectAnoCargue").val();
        data.type = 0;
        data.table = "view_apalancamiento";
        data.dpto = nameDpto;
        data.municipio = nameMunicipio;

        api.post("get_data_nfc", data, function (data) {




            let str = "";
            let total = 0;
            for (var i in data) {
                if (data[i].fonc != parseInt(0)) {
                    let sum = (parseFloat(data[i].tercero) + parseFloat(data[i].rp)) / parseFloat(data[i].fonc);
                    if (sum != "Infinity" && parseFloat(sum) != 0) {
                        str += "<tr style=''>\n" +
                            "<td><div class='col-12'>"+ data[i].dependencia +" </div></td>\n" +
                            "<td><div class='col-12'>" + format(sum.toFixed(2), 1, "") + "</div></td>\n" +
                            "</tr>";
                        total += parseFloat(sum.toFixed(2));
                    }
                }

            }


            $("#apalancamiento-table tbody").html(str);
            $("#apalancamientoValue").html(format(total, 1, "") + "");

        }, function () {
            $menuTooltip.removeClass('active');
        })


    }

    function loaderProyecto() {
        $('[data-id="proyecto-hover"]').hover(function () {
            $(this).find("path").css("fill", "#960303");
            $(this).find("div").css("color", "#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("proyecto", $menuTooltip, "")


            $menuTooltip.css({
                right: 150,
                top: 125,
                height: 50,
            });

        }, function () {
           // $menuTooltip.removeClass('active');
            $(this).find("path").css("fill", "#717171");
            $(this).find("div").css("color", "#717171");
        });

        api.getVectores({}, function (data) {

            if (data && data["vectores"] && data["vectores"][0].ano_carge) {
                if (!data["proyectos"]) {
                    data["proyectos"] = { total: 0 }
                }

                if (!data["vectores"]) {
                    data["vectores"] = { total: 0 }
                }

                api.dataVectores = {
                    //total_proyecto: data["proyectos"].total,
                    vectores : data["vectores"]
                }
                let total = 0;
                data["vectores"].forEach(x=> {
                   total += parseFloat(x.total);
                });

                $("#total_proyecto").html(format(total, 1, ""));

            }
        }, function (error) {

        });
    }

    function loaderBeneficio() {
        $('[data-id="beneficio-hover"]').hover(function () {
            $(this).find("path").css("fill", "#960303");
            $(this).find("div").css("color", "#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("beneficio", $menuTooltip, "");

            $menuTooltip.css({
                right: 150,
                top: 125,
                height: 50,
            });


        }, function () {
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill", "#717171");
            $(this).find("div").css("color", "#717171");
        });



        api.getBeneficiarios({}, function (data) {
            console.log(data);
            if (data && data.ano_carge) {
                api.dataBeneficiarios = {
                    "total_beneficiario": data.total,
                    "afroValue": data.afros,
                    "hombresValue": data.hombres,
                    "indigenasValue": data.indigenas,
                    "jovenValue": data.jovenes,
                    "mujerValue": data.mujeres,
                    "ninosValue": data.ninos,
                    "otroValue": data.otro
                };
                $("#total_beneficiario").html(format(api.dataBeneficiarios.total_beneficiario, 1, ""));


            }
        }, function (error) {

        });
    }








});



function getHtmlTable(id, selector, type = "") {

    switch (id){
        case "inversion":{

            if(parseInt(api.dataInversion.rp) == 0){
                $("#rp").parent().hide();
            }else{
                $("#rp").parent().show();
            }

            if(parseInt(api.dataInversion.fonc) == 0){
                $("#fonc").parent().hide();
            }else{
                $("#fonc").parent().show();
            }


            if(parseInt(api.dataInversion.tercero) == 0){
                $("#terceros").parent().hide();
            }else{
                $("#terceros").parent().show();
            }


            $("#inversionTotal").html(format(api.dataInversion.total_ejecucion, 1000000, "$") + " MM");
            $("#rp" + type).html(format(api.dataInversion.rp, 1000000, "$") + " MM")
            $("#fonc" + type).html(format(api.dataInversion.fonc, 1000000, "$") + " MM")
            $("#terceros" + type).html(format(api.dataInversion.tercero, 1000000, "$") + " MM");



            break;
        }
        case "beneficio":{
            $("#total_beneficiario" + type).html(format(api.dataBeneficiarios.total_beneficiario));
            var vconf = { style: "color: #000000"};

            if(parseInt(api.dataBeneficiarios.afroValue) == 0){
                $("#afroDiv").parent().parent().hide();
            }else{
                $("#afroDiv").parent().parent().show();
            }
            if(parseInt(api.dataBeneficiarios.hombresValue) == 0){
                $("#hombresDiv").parent().parent().hide();
            }else{
                $("#hombresDiv").parent().parent().show();
            }
            if(parseInt(api.dataBeneficiarios.indigenasValue) == 0){
                $("#indigenasDiv").parent().parent().hide();
            }else{
                $("#indigenasDiv").parent().parent().show();
            }
            if(parseInt(api.dataBeneficiarios.jovenValue) == 0){
                $("#jovenDiv").parent().parent().hide();
            }else{
                $("#jovenDiv").parent().parent().show();
            }
            if(parseInt(api.dataBeneficiarios.mujerValue) == 0){
                $("#mujerDiv").parent().parent().hide();
            }else{
                $("#mujerDiv").parent().parent().show();
            }
            if(parseInt(api.dataBeneficiarios.ninosValue) == 0){
                $("#ninosDiv").parent().parent().hide();
            }else{
                $("#ninosDiv").parent().parent().show();
            }
            if(parseInt(api.dataBeneficiarios.otroValue) == 0){
                $("#otroDiv").parent().parent().hide();
            }else{
                $("#otroDiv").parent().parent().show();
            }

            $("#afroValue" + type).html($("<span>", vconf).html(format(api.dataBeneficiarios.afroValue)));
            $("#hombresValue" + type).html($("<span>", vconf).html(format(api.dataBeneficiarios.hombresValue)));
            $("#indigenasValue" + type).html($("<span>", vconf).html(format(api.dataBeneficiarios.indigenasValue)));
            $("#jovenValue" + type).html($("<span>", vconf).html(format(api.dataBeneficiarios.jovenValue)));
            $("#mujerValue" + type).html($("<span>", vconf).html(format(api.dataBeneficiarios.mujerValue)));
            $("#ninosValue" + type).html($("<span>", vconf).html(format(api.dataBeneficiarios.ninosValue)));
            $("#otroValue" + type).html($("<span>", vconf).html(format(api.dataBeneficiarios.otroValue)));
            break;
        }
        case "proyecto":{
            let proyectosRows = $("#proyectosRows tbody");
            proyectosRows.html("");
            api.dataVectores.vectores.forEach(x => {
                proyectosRows.append(
                    $("<tr>").append(
                        $("<td>", {"class":"col-12"}).html(x.vector),
                        $("<td>", {"class":"col-12"}).html(x.total),
                    )
                )
            });
            break;
        }
        case "dependencia":{
            var data  = api.dataDependencia;
            if (nameDpto != null) {
                data = data.filter(x => x.dpta.replaceAll(" ","").toLowerCase().includes(nameDpto.replaceAll(" ","").toLowerCase()));
            }


            let dependencia = "";
            let dpto = [];
            for (var i in data) {
                if (dpto.find(x => x == data[i].dependencia) == undefined) {
                    dpto.push(data[i].dependencia);
                    dependencia += "<div class='col-md-12'><span>" + data[i].dependencia + "</span></div>";
                }

            }

            if (data.length == 0) {
                $menuTooltip.removeClass('active');
            }

            $("#depedenciaTotal").html(dpto.length);

            $("#dependenciasRow").html(dependencia);
            break;
        }

    }


    selector.html($("#" + id + "-table-table-tooltip" + type).html());

    /*$("#inversionTotal").html(format(api.dataInversion.total_ejecucion, 1000000, "$") + " MM");

    $("#rp" + type).html(format(api.dataInversion.rp, 1000000, "$") + " MM")
    $("#fonc" + type).html(format(api.dataInversion.fonc, 1000000, "$") + " MM")
    $("#terceros" + type).html(format(api.dataInversion.tercero, 1000000, "$") + " MM");


    $("#total_proyecto" + type).html(format(api.dataVectores.total_proyecto, 1, ""));
    $("#infraestructuraValue" + type).html("Infraestructura <br><span style='color: #000000'>" + format(api.dataVectores.infraestructuraValue.total, 1, "") + "</span>");

    */
}


SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function (toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

function formatCurrency(locales, currency, number, fractionDigits = 0, mm = 0) {

    number = mm == 0 ? number : number / mm;

    /*number =  (new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
    }).format(number));*/

    return format(number);

}


function format(value, div = 1, signo = "") {
    if (div == 1) {
        var v = value
    } else {
        var v = Math.round(value / div)
    }

    return signo + " " + new Intl.NumberFormat(["ban", "id"]).format(v)
}


function positionElementToCenter(element, nameParent, move) {

    var bbox = element.getBBox(),
        svg = document.getElementById(nameParent),
        viewBox = svg.getAttribute('viewBox');

    viewBox = viewBox.split(' ');

    var cx = parseFloat(viewBox[0]) + (parseFloat(viewBox[2]) / 2);
    var cy = parseFloat(viewBox[1]) + (parseFloat(viewBox[3]) / 2);

    if (move == null) {
        var x = cx - bbox.x - ((bbox.width / 2) + 1); // 30 is offset
        var y = cy - bbox.y - ((bbox.height / 2) + 10); // 20 is offset
    } else {
        var x = cx - bbox.x - ((bbox.width / 2) + 1); // 30 is offset
        var y = cy - bbox.y - ((bbox.height / 2) + parseInt(move)); // 20 is offset
    }


    return { x: x, y: y };
}


function zoomState(state, nameParent) {
    var zoomState = document.getElementById(state),
        tl = new TimelineMax();

    var scale = $(zoomState).attr("scale");
    var move = $(zoomState).attr("move");


    var svg1 = zoomState;
    var rect = svg1.getBoundingClientRect();

    var nscale = 0; //Establecer nuevo scale automatico, ignora SVG
    if (rect.width > rect.height) {
        nscale = 450 / rect.width;
    } else {
        nscale = 450 / rect.height;
    }
    move = 0; //Anular el move asignado en el SVG


    tl
        .set(zoomState, {
            visibility: "visible"
        })
        .set(zoomState, {
            transformOrigin: "50% 50%"
        })
        .to(zoomState, 0.7, {
            scale: nscale,
            x: positionElementToCenter(zoomState, nameParent, move).x,
            y: positionElementToCenter(zoomState, nameParent, move).y,
            ease: Power2.easeInOut
        });
    tl.pause;

    $('.state-details').on('click', function () {
        tl.reverse();
    });

}