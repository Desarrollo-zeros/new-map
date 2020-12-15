var dependencia;
var title = "Mapa Ejecución de Proyectos Sostenibles";
$description = null;
$menuTooltip = null;



var afroId=$("#afroDiv");
var hombresId=$("#hombreDiv");
var mujeresId=$("#mujerDiv");
var jovenId=$("#jovenDiv");

var $selectorDpto = null;

var nameDpto;
var nameMunicipio;



$(document).on('mousemove', function(e){
    if($description){
        $description.css({
            left:  e.pageX - 100,
            top:   e.pageY - 400,
            height : "60px",

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



$(document).ready(function (){

    $("#btnAtras").click(function (){



        if(nameMunicipio != null){
            nameMunicipio = null;

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
            $("#colombia").load("img/departamentos/"+nameDpto+".svg",function (selector){
                $("#noticiasDiv").hide();
                $("#idTituloMapa").show();
                $("#indicadoresDiv").show();
                $("#separadorCiudad").hide();
                $("#divProyectoNoticia").hide();
                $("#changeTitleDpto").html(nameDpto.toUpperCase());
                $('[data-id="dependencia-hover"]').show();
                $('[data-id="apalancamiento-hover"]').show();

                $description = $(".description");

                $('path.cls-1').hover(function() {
                    var name = $(this).attr('name');
                    $("path.cls-1").css("fill","#8a8a8a");
                    $(this).css("fill","#6ef35e");
                    if($selectorDpto){
                        $($selectorDpto).css("fill","#960303");
                    }
                    if(!name.toLowerCase().includes("xxx")){
                        $description.addClass('active');
                        $description.html(name);
                    }
                }, function() {
                    $("path.cls-1").css("fill","#8a8a8a");
                    if($selectorDpto){
                        $($selectorDpto).css("fill","#960303");
                    }
                    $description.removeClass('active');
                });

                $("path.cls-1").click(function(event){
                    $description.removeClass('active');
                    $selectorDpto = this;
                    nameMunicipio = $(this).attr("name");

                    if(nameMunicipio.toLowerCase().includes("xxx")){
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
                    $("path.cls-1").css("fill","#8a8a8a");
                    $(this).css("fill","#960303");
                    var selectorId = selector.id;




                    let data = {};
                    data.anio = $("#selectAnoCargue").val();
                    data.type = 0;
                    data.table = "view_proyecto";
                    data.dpto = nameDpto;
                    data.municipio = nameMunicipio;
                    api.post("get_data_nfc",data, function (response){


                        let str = "";

                        for(var i in response){
                            str += "<h3 style=\"font-size: 12px\"><span style=\"font-weight: bold;\">"+response[i].nombre_proyecto+"</span></h3>";
                        }

                        $("#proyectosDiv").append(str);

                    },function (){

                    })


                    $("#colombia").load("img/departamentos/prueba.svg",function (){
                        $("#viewPrueba").append($(selector)[0])
                        $("#colombia svg path").show()
                        zoomState(selectorId, "viewPrueba")
                    });

                });
            });
        }
        else{
            if(nameDpto != null){
                nameDpto = null;
                $("#indicadoresDiv").hide();
                loaderInversion();

                loaderDepedencia();

                loaderApalancamiento();

                loaderProyecto();

                loaderBeneficio();


                getParticipacionEje();

                getParticipacionAportante();

                loaderIndicativo();

                loaderApalancamiento();

                $("#noticiasDiv").show();
                $("#idTituloMapa").hide();
                $("#atras").hide();
                $("#colombia").load("img/Colombia.svg",function (selector){


                    $(this).find("path").attr("filter","url(#dropShadow)");


                    $("path.cls-1").click(function(){
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
                        $("#divCircular").show();
                        $("#divBarra").show();
                        $("#colombia").load("img/departamentos/"+url+".svg",function (selector){
                            $("#atras").show();
                            $("#noticiasDiv").hide();
                            $("#idTituloMapa").show();
                            $("#indicadoresDiv").show();
                            $("#divProyectoNoticia").hide();
                            $("#changeTitleDpto").html(url.toUpperCase());
                            $('[data-id="dependencia-hover"]').show();
                            $('[data-id="apalancamiento-hover"]').show();


                            $description = $(".description");

                            $('path.cls-1').hover(function() {
                                var name = $(this).attr('name');
                                $("path.cls-1").css("fill","#8a8a8a");
                                $(this).css("fill","#6ef35e");
                                if($selectorDpto){
                                    $($selectorDpto).css("fill","#960303");
                                }
                                if(!name.toLowerCase().includes("xxx")){
                                    $description.addClass('active');
                                    $description.html(name);
                                }
                            }, function() {
                                $("path.cls-1").css("fill","#8a8a8a");
                                if($selectorDpto){
                                    $($selectorDpto).css("fill","#960303");
                                }
                                $description.removeClass('active');
                            });

                            $("path.cls-1").click(function(event){
                                $description.removeClass('active');
                                $selectorDpto = this;
                                nameMunicipio = $(this).attr("name");

                                if(nameMunicipio.toLowerCase().includes("xxx")){
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
                                $("path.cls-1").css("fill","#8a8a8a");
                                $(this).css("fill","#960303");
                                var selectorId = selector.id;




                                let data = {};
                                data.anio = $("#selectAnoCargue").val();
                                data.type = 0;
                                data.table = "view_proyecto";
                                data.dpto = nameDpto;
                                data.municipio = nameMunicipio;
                                api.post("get_data_nfc",data, function (response){


                                    let str = "";

                                    for(var i in response){
                                        str += "<h3 style=\"font-size: 12px\"><span style=\"font-weight: bold;\">"+response[i].nombre_proyecto+"</span></h3>";
                                    }

                                    $("#proyectosDiv").append(str);

                                },function (){

                                })


                                $("#colombia").load("img/departamentos/prueba.svg",function (){
                                    $("#viewPrueba").append($(selector)[0])
                                    $("#colombia svg path").show()
                                    zoomState(selectorId, "viewPrueba")

                                });

                            });

                        });


                    });

                    $description = $(".description");

                    $('path.cls-1').hover(function() {
                        $(this).attr("class", "cls-1 heyo");
                        $description.addClass('active');
                        $description.html($(this).attr('title'));

                        if($(this).attr('title') == "Cundinamarca"){
                            $("#path6475").css("fill","#CC2929");
                            $("#path6415").css("fill","#CC2929");
                        }
                    }, function() {
                        if($(this).attr('title') == "Cundinamarca"){
                            $("#path6475").css("fill","#d2d2e6");
                            $("#path6415").css("fill","#d2d2e6");
                        }
                        $description.removeClass('active');
                    });


                });
            }
        }
    });


    $("#inversion").attr("src","img/iconos/Inversion.png");


    $("#dependencia").attr("src","img/iconos/Dependencia.png");

    $("#apalancamiento").attr("src","img/iconos/Apalancamiento.png");

    $("#proyecto").attr("src","img/iconos/Proyectos.png");

    $("#beneficio").attr("src","img/iconos/Beneficiarios.png");

    $("#selectAnoCargue").val("2019");

    $("#changeTitle").html(title);

    $("#selectAnoCargue").change(function (){
        $description.removeClass('active');
        if(dependencia && dependencia.alias != null){
            $("#changeTitle").html(title+" "+dependencia.alias+" "+$("#selectAnoCargue").val());
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

    $("#idTituloMapa").hover(function (){
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


    afroId.load(afroId.attr("src"), function (){

    });
    hombresId.load(hombresId.attr("src"), function (){

    });
    mujeresId.load(mujeresId.attr("src"), function (){

    });
    jovenId.load(jovenId.attr("src"), function (){

    });


    $("#colombia").load("img/Colombia.svg",function (selector){


        $(this).find("path").attr("filter","url(#dropShadow)");


        $("path.cls-1").click(function(){
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

            $("#colombia").load("img/departamentos/"+url+".svg",function (selector){

                $("#noticiasDiv").hide();
                $("#idTituloMapa").show();
                $("#indicadoresDiv").show();

                $("#changeTitleDpto").html(url.toUpperCase());

                $description = $(".description");

                $('path.cls-1').hover(function() {
                    var name = $(this).attr('name');
                    $("path.cls-1").css("fill","#8a8a8a");
                    $(this).css("fill","#6ef35e");
                    if($selectorDpto){
                        $($selectorDpto).css("fill","#960303");
                    }
                    if(!name.toLowerCase().includes("xxx")){
                        $description.addClass('active');
                        $description.html(name);
                    }
                }, function() {
                    $("path.cls-1").css("fill","#8a8a8a");
                    if($selectorDpto){
                        $($selectorDpto).css("fill","#960303");
                    }
                    $description.removeClass('active');
                });

                $("path.cls-1").click(function(event){
                    $description.removeClass('active');
                    $selectorDpto = this;
                    nameMunicipio = $(this).attr("name");

                    if(nameMunicipio.toLowerCase().includes("xxx")){
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
                    $("path.cls-1").css("fill","#8a8a8a");
                    $(this).css("fill","#960303");
                    var selectorId = selector.id;




                    let data = {};
                    data.anio = $("#selectAnoCargue").val();
                    data.type = 0;
                    data.table = "view_proyecto";
                    data.dpto = nameDpto;
                    data.municipio = nameMunicipio;
                    api.post("get_data_nfc",data, function (response){


                        let str = "";

                        for(var i in response){
                            str += "<h3 style=\"font-size: 12px\"><span style=\"font-weight: bold;\">"+response[i].nombre_proyecto+"</span></h3>";
                        }

                        $("#proyectosDiv").append(str);

                    },function (){

                    })


                    $("#colombia").load("img/departamentos/prueba.svg",function (){
                        $("#viewPrueba").append($(selector)[0])
                        $("#colombia svg path").show()
                        zoomState(selectorId, "viewPrueba")

                    });

                });

            });


        });

        $description = $(".description");

        $('path.cls-1').hover(function() {
            $(this).attr("class", "cls-1 heyo");
            $description.addClass('active');
            $description.html($(this).attr('title'));

            if($(this).attr('title') == "Cundinamarca"){
                $("#path6475").css("fill","#CC2929");
                $("#path6415").css("fill","#CC2929");
            }
        }, function() {
            if($(this).attr('title') == "Cundinamarca"){
                $("#path6475").css("fill","#d2d2e6");
                $("#path6415").css("fill","#d2d2e6");
            }
            $description.removeClass('active');
        });


    });


    function loaderIndicativo(){

        let data = {};
        data.anio = $("#selectAnoCargue").val();
        data.type = 3;
        data.table = "view_indicadores_dpta";
        data.dpto = nameDpto;
        data.municipio = nameMunicipio;
        api.post("get_data_nfc",data, function (data){
            console.log(data);

            let str = "";

            for(var i in data){
                str += "<h3 style=\"font-size: 12px\"><div class='row'><div class='col-md-2'><span style=\"font-weight: bold;\">"+data[i].indicador_nu.replace('.00','')+"</span></div> <div class='col-md-10'><span>"+data[i].indicador+"</span> </div> </div></h3>";
            }

            $("#scrollerIndicativo").append(str);


        }, function (){

        })

    }

    function loaderInversion(){
        $('[data-id="inversion-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("inversion",$menuTooltip,"")

            $menuTooltip.css({
                right:  200,
                top: -40,
                height : 50,
            });

        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });


        api.getInversion({}, function (data){
            console.log(data);
            if(data && data.ano_carge){


                api.dataInversion = {
                    "total_ejecucion" : data.total_ejecucion,
                    "rp" : data.rp,
                    "fonc" : data.fonc,
                    "tercero" : data.tercero
                };


                $("#inversionTotal").html( format(api.dataInversion.total_ejecucion, 1000000,"$") + " MM");

            }
        }, function (error){
            console.log(error);
        });
    }

    function loaderDepedencia(){
        $('[data-id="dependencia-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("dependencia",$menuTooltip,"")

            $menuTooltip.css({
                right:  200,
                top: 80,
                height : 50,
                zIndex : 99
            });

        }, function (){
            //$menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });

        api.post("get_data_nfc", {"table" : "view_dependencias", "type" : 3}, function (data){

            console.log(data);

            if(nameDpto!=null){
                data = data.filter(x => x.dpta.toLowerCase().includes(nameDpto.toLowerCase()));
            }


            let dependencia = "";
            let dpto = [];
            for(var i in data){
                if(dpto.find(x => x == data[i].dependencia) == undefined){
                    dpto.push(data[i].dependencia);
                    dependencia += "<div class='col-md-12'><span>"+data[i].dependencia+"</span></div>";
                }

            }

            if(data.length == 0){
                $menuTooltip.removeClass('active');
            }

            $("#depedenciaTotal").html(dpto.length);

            $("#dependenciasRow").html(dependencia);
        }, function (){
            $menuTooltip.removeClass('active');
        })

    }

    function loaderApalancamiento(){
        $('[data-id="apalancamiento-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');


            getHtmlTable("apalancamiento",$menuTooltip,"");

            $menuTooltip.css({
                right: 150,
                top: 80,
                height : 50,
            });

        }, function (){
           // $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });


        let data = {};
        data.anio = $("#selectAnoCargue").val();
        data.type = 0;
        data.table = "view_apalancamiento";
        data.dpto = nameDpto;
        data.municipio = nameMunicipio;

        api.post("get_data_nfc",data , function (data){

            console.log(data);


            let str = "";
            let total = 0;
            for(var i in data){
                let sum = (parseInt(data[i].tercero)+parseInt(data[i].rp)) / (data[i].fonc);
                if(sum != "Infinity"){
                    str += "<tr style=''>\n" +
                        "<td>"+data[i].dependencia+"</td>\n" +
                        "<td><div class='col-md-12'>"+format(sum,1,"")+"</div></td>\n" +
                        "</tr>";
                    total += parseFloat(sum);
                }
            }


            $("#apalancamiento-table tbody").html(str);
            $("#apalancamientoValue").html(format(total,1,"") + "");

        }, function (){
            $menuTooltip.removeClass('active');
        })


    }

    function loaderProyecto(){
        $('[data-id="proyecto-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("proyecto",$menuTooltip,"")


            $menuTooltip.css({
                right:  150,
                top: 125,
                height : 50,
            });




        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });

        api.getVectores({}, function (data){
            console.log(data);
            if(data && data["vectores"] && data["vectores"][0].ano_carge){
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
                console.log(api.dataVectores);

                api.dataVectores = {
                    total_proyecto : api.dataVectores.total_proyecto ? api.dataVectores.total_proyecto : {},
                    infraestructuraValue : api.dataVectores.infraestructuraValue ? api.dataVectores.infraestructuraValue : {},
                    productividadValue : api.dataVectores.productividadValue ? api.dataVectores.productividadValue : {},
                    cuidadoRecursosNaturales : api.dataVectores.cuidadoRecursosNaturales ? api.dataVectores.cuidadoRecursosNaturales : {},
                    costosProduccion : api.dataVectores.costosProduccion ? api.dataVectores.costosProduccion : {},
                };

                $("#total_proyecto").html(format(api.dataVectores.total_proyecto,1,""));
            }
        }, function (error){

        });
    }

    function loaderBeneficio(){
        $('[data-id="beneficio-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("beneficio",$menuTooltip,"");

            $menuTooltip.css({
                right:  150,
                top: 125,
                height : 50,
            });


        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });



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


                $("#total_beneficiario").html(format(api.dataBeneficiarios.total_beneficiario,1,""));


            }
        }, function (error){

        });
    }








});



function getHtmlTable(id, selector, type=""){
    if(id=="dependencia"){
        if($("#"+id+"-table-table-tooltip"+type).html().includes("<div id=\"dependenciasRow\" class=\"row\" style=\"overflow-y:scroll;height: 100px\"></div>")){
            $menuTooltip.removeClass('active');
            return;
        }
    }
    console.log(("#"+id+"-table-table-tooltip"+type));
    selector.html($("#"+id+"-table-table-tooltip"+type).html());



    $("#inversionTotal").html( format(api.dataInversion.total_ejecucion, 1000000, "$") + " MM");

    $("#rp"+type).html(format(api.dataInversion.rp , 1000000, "$") + " MM")
    $("#fonc"+type).html(format( api.dataInversion.fonc , 1000000, "$") + " MM")
    $("#terceros"+type).html(format(api.dataInversion.tercero , 1000000, "$") + " MM");

    $("#total_beneficiario"+type).html(format(api.dataBeneficiarios.total_beneficiario));
    $("#afroValue"+type).html(format(api.dataBeneficiarios.afroValue));
    $("#joveValue"+type).html(format(api.dataBeneficiarios.joveValue))
    $("#mujerValue"+type).html(format(api.dataBeneficiarios.mujerValue))
    $("#hombreValue"+type).html(format(api.dataBeneficiarios.hombreValue))


    $("#total_proyecto"+type).html(format(api.dataVectores.total_proyecto,1,""));
    $("#infraestructuraValue"+type). html("Infraestructura "+format(api.dataVectores.infraestructuraValue.total,1,""));
    $("#productividadValue"+type). html("Productividad "+ format(api.dataVectores.productividadValue.total,1,""));
    $("#cuidadoRecursosNaturalesValue"+type). html("Cuidado de Recursos Naturales "+format(api.dataVectores.cuidadoRecursosNaturales.total,1,""));
    $("#costosProduccionValue"+type). html("Costos de Producción"+format(api.dataVectores.costosProduccion.total,1,""));

}


SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

function formatCurrency (locales, currency, number, fractionDigits = 0, mm= 0) {

    number =  mm == 0 ? number :  number / mm;

    /*number =  (new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
    }).format(number));*/

    return format(number);

}


function format(value, div = 1, signo = "")
{
    if(div == 1){
        var v = value;
    }else{
        var v = Math.round(value / div);
    }

    return signo+" "+new Intl.NumberFormat(["ban", "id"]).format(v)
}


function positionElementToCenter(element, nameParent,move) {

    var bbox = element.getBBox(),
        svg = document.getElementById(nameParent),
        viewBox = svg.getAttribute('viewBox');

    viewBox = viewBox.split(' ');

    var cx = parseFloat(viewBox[0]) + (parseFloat(viewBox[2]) / 2);
        var cy = parseFloat(viewBox[1]) + (parseFloat(viewBox[3]) / 2);

        if(move == null){
            var x = cx - bbox.x - ((bbox.width / 2) + 1); // 30 is offset
            var y = cy - bbox.y - ((bbox.height / 2) + 10); // 20 is offset
        }else{
            var x = cx - bbox.x - ((bbox.width / 2) + 1); // 30 is offset
            var y = cy - bbox.y - ((bbox.height / 2)+ parseInt(move)); // 20 is offset
        }


    return { x: x, y: y };
}


function zoomState(state, nameParent) {
    var zoomState = document.getElementById(state),
        tl = new TimelineMax();

   var scale =  $(zoomState).attr("scale");
   var move = $(zoomState).attr("move");
   console.log(scale);
   console.log(move);

    tl
        .set(zoomState, {
            visibility: "visible"
        })
        .set(zoomState, {
            transformOrigin: "50% 50%"
        })
        .to(zoomState, 0.7, {
            scale: scale == null ? 1.5 : parseFloat(scale),
            x: positionElementToCenter(zoomState,nameParent,move).x,
            y: positionElementToCenter(zoomState, nameParent,move).y,
            ease: Power2.easeInOut
        });

    tl.pause;

    $('.state-details').on('click', function() {
        tl.reverse();
    });

}