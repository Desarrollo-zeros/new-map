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
var nameDpto1;
var nameMunicipio;

var actual;
var actual_departamento;
var actual_municipio;

var vconf = { style: "color: #000000" };
var clickDpto;
$typeOffice = 0;

$municipios = [];
var fload = false;

$(document).ready(function () {
    $("#selectAnoCargue").val("2019");

    init_load();
    municipios_load();
    Cargar_Colombia();
});

function init_load() {
    $("#selectAnoCargue").val("2019");
    $("#changeTitle").html(title);
    $('#btnAtras').click(btn_atras);
    $('.detalles_info .close').click(detalles_info_Close);
    $menuTooltip = $(".table-tooltip");

    detalles_menu()


    api.post("get_data_nfc", {
        "type": 3, "table": "view_ano_cargue"
    }, function (data) {
        $("#selectAnoCargue").html("");
        for (var i in data) {
            $("#selectAnoCargue").append(new Option(data[i]["ano_carge"], data[i]["ano_carge"]))
        }
    });

}
function detalles_info_Close(){
    $(this).closest('div').removeClass('mostrar');
}
function loaderProyectos(){
    let data = {};
    data.anio = $("#selectAnoCargue").val();
    data.type = 0;
    data.table = "view_proyecto";
    data.dpto = nameDpto1;
    data.municipio = nameMunicipio;
    if($typeOffice == 1){
        data.table = "view_proyecto_dependencia";
        data.type = 7;
        data.dependencia_id = 18;
    }else if($typeOffice == 2){
        data.table = "view_proyecto_dependencia";
        data.type = 7;
        data.dependencia_id = 1;
    }else{
        data.type = 0;
    }
    api.post("get_data_nfc", data, function (response) {
        console.log(response);

        let str = "";

        for (var i in response) {
            str += "<h3 style=\"font-size: 12px\"><span style=\"font-weight: bold;\">" + response[i].nombre_proyecto + "</span></h3>";
        }

        $("#proyectosDiv").append(str);

    }, function () {

    })
}
function loaderIndicativo() {
    let data = {};
    data.anio = $("#selectAnoCargue").val();
    data.type = 6;
    data.table = "view_indicadores_dpta";
    data.dpto = nameDpto1;
    data.municipio = nameMunicipio;
    api.post("get_data_nfc", data, function (data) {
        let str = "";
        for (var i in data) {
            if (data[i].indicador_nu.replace('.00', '') != "0") {
                $("#scrollerIndicativo").append(
                    $("<h3>", { style: "font-size: 12px" }).append(
                        $("<div>", { class: "row" }).append(
                            $("<div>", { class: "col-3" }).append(
                                $("<span>", { style: "font-weight: bold;" }).html(data[i].indicador_nu.replace('.00', ''))
                            ),
                            $("<div>", { class: "col-9" }).append(
                                $("<span>", { style: "font-weight: bold;" }).html(data[i].indicador)
                            )
                        )
                    )
                )
            }
        }
    });
}
function loaderInversion() {
    api.getInversion({}, function (data) {

        if(data && data[0] != undefined){
            data = data[0];
        }
        if (data && data.ano_carge) {
            api.dataInversion = {
                "total_ejecucion": data.total_ejecucion,
                "rp": data.rp,
                "fonc": data.fonc,
                "tercero": data.tercero
            };
            api.dataInversion.total_ejecucion = parseFloat(api.dataInversion.rp) + parseFloat(api.dataInversion.fonc) + parseFloat(api.dataInversion.tercero);

            if(api.dataInversion.total_ejecucion.toString().replaceAll(".00","").length>9){
                $("#inversionTotal").html(format(api.dataInversion.total_ejecucion, 1000000, "$") + " MM");
            }else{
                $("#inversionTotal").html(format(api.dataInversion.total_ejecucion, 1000000, "$") + " M");
            }

            if(api.dataInversion.fonc.toString().replaceAll(".00","").length>9){
                $("#fonc").html(format(api.dataInversion.fonc, 1000000, "$") + " MM")
            }else{
                $("#fonc").html(format(api.dataInversion.fonc, 1000000, "$") + " M")
            }

            if(api.dataInversion.tercero.toString().replaceAll(".00","").length>9){
                $("#terceros").html(format(api.dataInversion.tercero, 1000000, "$") + " MM");
            }else{
                $("#terceros").html(format(api.dataInversion.tercero, 1000000, "$") + " M");

            }

            if(api.dataInversion.rp.toString().replaceAll(".00","").length>9){
                $("#rp").html(format(api.dataInversion.rp, 1000000, "$") + " MM");
            }else{
                $("#rp").html(format(api.dataInversion.rp, 1000000, "$") + " M");
            }

            if (parseInt(api.dataInversion.fonc) == 0) $("#fonc").parent().hide(); else $("#fonc").parent().show();
            if (parseInt(api.dataInversion.tercero) == 0) $("#terceros").parent().hide(); else $("#terceros").parent().show();
            if (parseInt(api.dataInversion.rp) == 0) $("#rp").parent().hide(); else $("#rp").parent().show();
        } else {
            $("[data-name='inversion']").hide();
        }
    });
}
function loaderDepedencia() {
    api.post("get_data_nfc", { "table": "view_dependencias", "type": 3 }, function (data) {
        $("#ttdetalles_info .dependencia ul").html("");
        api.dataDependencia = data;
        var data = api.dataDependencia;
        if (nameDpto1 != null && $typeOffice == 0) data = data.filter(x => removeAccents(x.dpta.replaceAll(" ", "").toLowerCase()) ===  removeAccents(nameDpto1.replaceAll(" ", "").toLowerCase()));
        let dpto = [];
        if(titleOffice != null){
            data = data.filter(x => removeAccents(x.dependencia.replaceAll(" ", "").toLowerCase()) ===  removeAccents(titleOffice.replaceAll(" ", "").toLowerCase()));
        }else{
            if(nameDpto1 != null){
                data = data.filter(x => removeAccents(x.dependencia.replaceAll(" ", "").toLowerCase()) !==  removeAccents("OFICINA CENTRAL".replaceAll(" ", "").toLowerCase()) && removeAccents(x.dependencia.replaceAll(" ", "").toLowerCase()) !==  removeAccents("CENICAFÉ".replaceAll(" ", "").toLowerCase()));
            }
        }

        for (var i in data) {
            if (dpto.find(x => x == data[i].dependencia) == undefined) {
                dpto.push(data[i].dependencia);
                $("#ttdetalles_info .dependencia ul").append(
                    $("<li>").html(data[i].dependencia)
                );
            }
        }
        $("#depedenciaTotal").html(dpto.length);
    });

}
function loaderApalancamiento() {
    let data = {};
    data.anio = $("#selectAnoCargue").val();
    data.type = 0;
    data.table = "view_apalancamiento";
    data.dpto = nameDpto1;
    data.municipio = nameMunicipio;

    api.post("get_data_nfc", data, function (data) {
        data = data.filter(x => x.dependencia != "OFICINA CENTRAL");
        var str = "";
        var total = 0;

        if (data && data[0] && data.length > 0) {
            if (data[0].dpto != undefined) {
                for (var i in data) {
                    let t = parseFloat(data[i].total_total).toFixed(2);

                    if (t != "Infinity" && t != " NaN") {
                        if (t == null) {
                            t = 0;
                        }
                        total += parseFloat(t);
                    }
                }
                if (total == null) {
                    total = 0;
                }
                total = format(total);

                let totalSplit = total.toString().split(",");
                if (totalSplit.length > 1 && totalSplit[1].split("").length < 2) {
                    total = total + "0";
                }
                var sum = 0;
                for (var i in data) {
                    if (data[i].fonc != parseInt(0)) {
                        let s = (parseFloat(data[i].tercero) + parseFloat(data[i].rp)) / parseFloat(data[i].fonc);
                        if (s != "Infinity" && parseFloat(s) != 0 && s != "NAN") {

                            s = parseFloat(s).toFixed(2);
                            let sumSplit = s.toString().split(",");
                            if (sumSplit.length > 1 && sumSplit[1].split("").length < 2) {
                                s = s + "0";
                            }
                            sum += parseFloat(s);
                        }
                    }
                }
                sum = format(sum);
                if (sum.toString().split(",").length == 1) {
                    sum = sum + ",0";
                }
                let proyectosRows = $("#apalancamiento-table tbody");
                proyectosRows.html("");
                let dependencia = data[0].dependencia;
                proyectosRows.append(
                    $("<tr>").append(
                        $("<td>", { style: "position: absolute;padding-right: 10%;" }).html(dependencia),
                        $("<td>", { style: "position: absolute;padding-left: 80%;" }).html($("<span>", vconf).html(sum)),
                    )
                )
            } else {
                total = format(parseFloat(data[0].total_total).toFixed(2));
                if (total == null) {
                    total = 0;
                }
                let totalSplit = total.toString().split(",");
                if (totalSplit.length > 1 && totalSplit[1].split("").length < 2) {
                    total = total + "0";
                }
                let proyectosRows = $("#apalancamiento-table tbody");
                proyectosRows.html("");
                for (var i in data) {
                    if (data[i].fonc != parseInt(0)) {
                        let sum = (parseFloat(data[i].tercero) + parseFloat(data[i].rp)) / parseFloat(data[i].fonc);
                        if (sum != "Infinity" && parseFloat(sum) != 0) {
                            sum = format(parseFloat(sum).toFixed(2));
                            let sumSplit = sum.toString().split(",");
                            if (sumSplit.length > 1 && sumSplit[1].split("").length < 2) {
                                sum = sum + "0";
                            } else {
                                if (sum.split(",").length == 1) {
                                    sum = sum + ",0";
                                }
                            }
                            let dependencia = data[i].dependencia;
                            proyectosRows.append(
                                $("<tr>").append(
                                    $("<td>").html(dependencia),
                                    $("<td>", { style: "text-align: right;" }).html($("<span>", vconf).html(sum)),
                                )
                            )
                        }
                    }
                }
            }
            if (total.toString().split(",").length == 1) {
                total = total + ",0";
            }
            $("#apalancamientoValue").html(total);
        } else {
            $("[data-name='apalancamiento']").hide();
        }

    });
}
function loaderProyecto() {
    api.getVectores({}, function (data) {
        var proyectosRows = $("#proyectosRows tbody");
        proyectosRows.html("");
        proyectosRows.find("tr").remove();
        if (data && data["vectores"] && data["vectores"][0] && data["vectores"][0].ano_carge && data["proyectos"]) {
            if (!data["proyectos"]) {
                data["proyectos"] = { total: 0 }
            }

            if (!data["vectores"]) {
                data["vectores"] = { total: 0 }
            }

            api.dataVectores = {
                vectores: data["vectores"]
            }
            let total = 0;
            data["vectores"].forEach(x => {
                total += parseFloat(x.total);
            });

            $("#total_proyecto").html(format(total, 1, ""));


            api.dataVectores.vectores.sort(function (a, b) { return b.total - a.total; }).forEach(x => {
                if (nameDpto != undefined) {
                    if (api.dataVectores.vectores.length == 1) {
                        proyectosRows.append(
                            $("<tr>").append(
                                $("<td>", { style: "position: absolute;padding-right: 10%;" }).html(x.vector),
                                $("<td>", { style: "position: absolute;padding-left: 80%;" }).html($("<span>", vconf).html(x.total)),
                            )
                        )
                    } else {
                        proyectosRows.append(
                            $("<tr>").append(
                                $("<td>").html(x.vector),
                                $("<td>", { style: "text-align: right;" }).html($("<span>", vconf).html(x.total)),
                            )
                        )
                    }
                } else {
                    proyectosRows.append(
                        $("<tr>").append(
                            $("<td>").html(x.vector),
                            $("<td>", { style: "text-align: right;" }).html($("<span>", vconf).html(x.total)),
                        )
                    )
                }
            })
        }else{
            data.sort(function (a, b) { return b.total - a.total; }).forEach(x => {
                if (nameDpto != undefined) {
                    if (api.dataVectores.vectores.length == 1) {
                        proyectosRows.append(
                            $("<tr>").append(
                                $("<td>", { style: "position: absolute;padding-right: 10%;" }).html(x.vector),
                                $("<td>", { style: "position: absolute;padding-left: 80%;" }).html($("<span>", vconf).html(x.total)),
                            )
                        )
                    } else {
                        proyectosRows.append(
                            $("<tr>").append(
                                $("<td>").html(x.vector),
                                $("<td>", { style: "text-align: right;" }).html($("<span>", vconf).html(x.total)),
                            )
                        )
                    }
                } else {
                    proyectosRows.append(
                        $("<tr>").append(
                            $("<td>").html(x.vector),
                            $("<td>", { style: "text-align: right;" }).html($("<span>", vconf).html(x.total)),
                        )
                    )
                }
            });
            $("#total_proyecto").html(format(data[0].totalProyectos, 1, ""));
        }
    });
}
function loaderBeneficio() {
    api.getBeneficiarios({}, function (data) {
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
            $("#total_beneficiario").html(format(api.dataBeneficiarios.total_beneficiario));
            if (parseInt(api.dataBeneficiarios.afroValue) == 0) $("#afroValue").closest("li").hide(); else $("#afroValue").closest("li").show();
            if (parseInt(api.dataBeneficiarios.hombresValue) == 0) $("#hombresValue").closest("li").hide(); else $("#hombresValue").closest("li").show();
            if (parseInt(api.dataBeneficiarios.indigenasValue) == 0) $("#indigenasValue").closest("li").hide(); else $("#indigenasValue").closest("li").show();
            if (parseInt(api.dataBeneficiarios.jovenValue) == 0) $("#jovenValue").closest("li").hide(); else $("#jovenValue").closest("li").show();
            if (parseInt(api.dataBeneficiarios.mujerValue) == 0) $("#mujerValue").closest("li").hide(); else $("#mujerValue").closest("li").show();
            if (parseInt(api.dataBeneficiarios.ninosValue) == 0) $("#ninosValue").closest("li").hide(); else $("#ninosValue").closest("li").show();
            if (parseInt(api.dataBeneficiarios.otroValue) == 0) $("#otroValue").closest("li").hide(); else $("#otroValue").closest("li").show();
            $("#afroValue").html($("<span>", vconf).html(format(api.dataBeneficiarios.afroValue)));
            $("#hombresValue").html($("<span>", vconf).html(format(api.dataBeneficiarios.hombresValue)));
            $("#indigenasValue").html($("<span>", vconf).html(format(api.dataBeneficiarios.indigenasValue)));
            $("#jovenValue").html($("<span>", vconf).html(format(api.dataBeneficiarios.jovenValue)));
            $("#mujerValue").html($("<span>", vconf).html(format(api.dataBeneficiarios.mujerValue)));
            $("#ninosValue").html($("<span>", vconf).html(format(api.dataBeneficiarios.ninosValue)));
            $("#otroValue").html($("<span>", vconf).html(format(api.dataBeneficiarios.otroValue)));
        } else {
            $("[data-name='beneficiarios']").hide();
        }
    });
}
function detalles_menu() {
    $("#ttdetalles_menu li").hover(function () {
        $("#ttdetalles_menu li.active").removeClass("active");
        $(this).addClass("active");
        $("#ttdetalles_info .mostrar").removeClass("mostrar");
        switch ($(this).data("name")) {
            case "inversion": $("#ttdetalles_info .inversion").addClass("mostrar");
                break;
            case "dependencia": $("#ttdetalles_info .dependencia").addClass("mostrar");
                break;
            case "apalancamiento": $("#ttdetalles_info .apalancamiento").addClass("mostrar");
                break;
            case "proyectos": $("#ttdetalles_info .proyectos").addClass("mostrar");
                break;
            case "beneficiarios": $("#ttdetalles_info .beneficiarios").addClass("mostrar");
                break;
        }
    })
    $("#ttdetalles_menu li").mouseleave(function () {
        if (!$(this).hasClass('m')) {
            switch ($(this).data("name")) {
                case "inversion": $("#ttdetalles_info .inversion").removeClass("mostrar");
                    break;
                case "dependencia": $("#ttdetalles_info .dependencia").removeClass("mostrar");
                    break;
                case "apalancamiento": $("#ttdetalles_info .apalancamiento").removeClass("mostrar");
                    break;
                case "proyectos": $("#ttdetalles_info .proyectos").removeClass("mostrar");
                    break;
                case "beneficiarios": $("#ttdetalles_info .beneficiarios").removeClass("mostrar");
                    break;
            }
        }
    })

}
function municipios_load() {
    var data = { "type": 3, "table": "view_municipios_cateferos" };
    api.post("get_data_nfc", data, function (data) {
        $municipios = data;
    }, function (error) {
        console.log(error);
    });
}
function btn_atras() {
    $('#ttdetalles_menu li.active').removeClass('active');
    $('#ttdetalles_info .mostrar').removeClass('mostrar');



    switch (actual) {
        case "departamentos":{
            var p = getUrlParams()
            let d = p['dpto'];
            if(d != null){
               window.location.href = "https://federaciondecafeteros.org/mapa-de-proyectos/";
            }
            actual = "pais";
            nameDpto = null;
            nameDpto1 = null;
            $("#departamentos, .div_departamentos, #indicadoresDiv, #departamentos > .div_departamentos, #idTituloMapa").hide();
            $("#colombia").show();

            break;
        }

        case "municipios":
            actual = "departamentos";
            nameMunicipio = null;
            $("#municipio, #separadorCiudad").hide();
            $("#ttdetalles_menu [data-name='dependencia'], #ttdetalles_menu [data-name='apalancamiento'], #divBarra, #indicadoresDiv, #divCircular").show();
            $("#departamentos, #indicadoresDiv").show();
            break;

        case 'Municipio 2':
            actual = 'pais';
            nameDpto = null;
            nameDpto1 = null;
            nameMunicipio = null;
            $typeOffice = 0;
            titleOffice = null;
            $("#colombia").show();
            $("#ttdetalles_menu [data-name='dependencia'], #ttdetalles_menu [data-name='apalancamiento'], #divBarra, #indicadoresDiv, #divCircular").show();
            $("#municipio, #separadorCiudad, #idTituloMapa").hide();
            $("#divProyectoNoticia").removeClass("divProyectosN");
            break;
        default:

            break;
    }
    loaderInversion();
    loaderDepedencia();
    loaderApalancamiento();
    loaderProyecto();
    loaderBeneficio();
    getParticipacionEje();
    getParticipacionAportante();
    loaderIndicativo();
}
function Cargar_Colombia() {
    $("#btnAtras").hide();
    actual = "pais";
    $("div#colombia").load("img/Colombia.svg", function () {
        $("div#colombia").on("click", "path", Colombia_a_Departamento)
        $("div#colombia").on("click", "circle", Colombia_a_departamento_circle)

        var dpto = undefined;
        var fclick = undefined;
        if (!fload) {
            fload = true;
            var p = getUrlParams()
            dpto = p['dpto'];
        }
        $("div#colombia svg > path").each(function () {
            if (($(this).hasClass("cls-2") || $(this).attr("title") == undefined) && !$(this).hasClass("disabled")) {
                $(this).addClass("disabled");
            }
            if (dpto != undefined) {
                if(dpto.toLowerCase() == $(this).attr('url')?.toLowerCase()){
                    fclick = $(this);
                }
            }
        });
        if(fclick != undefined)
        fclick.click();
    });
    loaderInversion();
    loaderDepedencia();
    //loaderApalancamiento();
    loaderProyecto();
    loaderBeneficio();
    getParticipacionEje();
    getParticipacionAportante();
    loaderIndicativo();
}
function Colombia_a_Departamento() {

    if ($(this).hasClass("disabled")) return;
    actual_departamento =  $(this).attr("url").toString().toLowerCase();

    var p = getUrlParams()
    let d = p['dpto'];

    if(d == null && $(this).data("url") != null){
        //aca hay un ejemplo
        window.open($(this).data("url").toString().toLowerCase(), '_blank');
        return;
    }
    Cargar_Departamento(this);
}
function Cargar_Departamento(ele) {
    clickDpto = true;
    $selectorDpto = ele;
    $('#ttdetalles_info .mostrar').removeClass('mostrar');
    $('#ttdetalles_menu li.active').removeClass('active');
    var departamento = actual_departamento;
    nameDpto = $(ele).attr("url").toString().toLowerCase();
    nameDpto1 = $(ele).attr("title");
    if (nameDpto1 == null) {
        nameDpto1 = nameDpto;
    }
    actual = "departamentos";
    $('#idTituloMapa').show();
    $('#changeTitleDpto').html(nameDpto);
    var div_id = `dep_${departamento}`;
    if ($(`#${div_id}`).length == 0) {
        var div = $("<div>", { id: div_id, class: "div_departamentos" }).load(`img/departamentos/${departamento}.svg`, function (data) {
            $(`#${div_id}`).on("click", "path", Departamento_a_municipio); // Declara funcion del click en mapa colombia en los departamentos
            $(`#${div_id} svg > path`).each(function () {
                var ele = this;
                var name = $(ele).attr("name") == undefined ? "" : $(ele).attr("name");
                var dis = $(ele).attr('disabled');
                if (name.toLowerCase().includes("xxx") || dis != undefined) {
                    $(ele).addClass("disabled");
                }
            });
        });

        $(`#departamentos`).append(div);
        $(`#colombia`).hide();
        $(`#departamentos`).show();
    } else {
        $(`#colombia`).hide();
        $(`#departamentos, #dep_${departamento}`).show();
    }

    var p = getUrlParams()
    let d = p['dpto'];
    if(d != null){
        //loaderApalancamiento();

    }
    loaderApalancamiento();
    loaderInversion();
    loaderDepedencia();
    loaderProyecto();
    loaderBeneficio();
    getParticipacionEje();
    getParticipacionAportante();
    loaderIndicativo();

    $("#indicadoresDiv").show();
    $("#btnAtras").show();
}
function Departamento_a_municipio() {

    if ($(this).hasClass("disabled")) return;
    actual_municipio = $(this).attr("name");
    nameMunicipio = $(this).attr("name");
    Cargar_Municipio(this);
}
function Cargar_Municipio(ele) {
    $('#ttdetalles_info .mostrar').removeClass('mostrar');
    $('#ttdetalles_menu li.active').removeClass('active');
    var div = $(ele).closest("svg")
    $("#separadorCiudad").show();
    $("#nameCiudad").html(actual_municipio);
    $("#viewPrueba").html($(ele).clone().attr('id', 'vistaMunicipio'));
    $("#departamentos, #indicadoresDiv").hide();
    $("#municipio, #divProyectoNoticia").show();

    ZoomMunicipio();
    $("#btnAtras").show();

    actual = "municipios";
    $("#ttdetalles_menu [data-name='dependencia'], #ttdetalles_menu [data-name='apalancamiento'], #divBarra, #indicadoresDiv, #divCircular").hide();
    if(!clickcircle){
        loaderInversion();
        loaderProyecto();
        loaderBeneficio();
        loaderProyectos();
        loaderApalancamiento();
        loaderIndicativo();
    }else{
        clickcircle = false;
    }

}



function Colombia_a_departamento_circle() {

    let ele = this;
    nameDpto = $(ele).data("dpto");
    nameDpto1 = $(ele).data("dpto");
    actual_departamento = nameDpto;
    var div_id = `dep_${actual_departamento}`;
    $('#idTituloMapa').show();
    $('#changeTitleDpto').html($(ele).data('municipio'));

    if ($(`#${div_id}`).length == 0) {
        var div = $("<div>", { id: div_id, class: "div_departamentos" }).load(`img/departamentos/${actual_departamento}.svg`, function (data) {
            $(`#${div_id}`).on("click", "path", Departamento_a_municipio);
            $(`#${div_id} svg > path`).each(function () {
                var ele = this;
                var name = $(ele).attr("name") == undefined ? "" : $(ele).attr("name");
                if (name.toLowerCase().includes("xxx")) {
                    $(ele).addClass("disabled");
                }
            });
            departamento_a_municipio_circle(ele);
        });

        $(`#departamentos`).append(div);
        $(`#colombia`).hide();
        //$(`#departamentos`).hide();
        div.hide();
    } else {
        $(`#colombia`).hide();
        $(`#departamentos, #dep_${actual_departamento}`).show();
        departamento_a_municipio_circle(ele);
    }
}
var clickcircle = false;
var titleOffice = null;
function departamento_a_municipio_circle(ele) {
    nameMunicipio = $(ele).data("municipio");
    $typeOffice = $(ele).attr('office');
    actual_municipio = nameMunicipio;
    var r_municipio = null;
    $("#separadorCiudad").show();
    var titulo = $(ele).attr('title');
    $(`#dep_${actual_departamento} svg > path`).each(function () {
        var name = $(this).attr('name');
        if (name == actual_municipio)
            r_municipio = this;
    });
    if (r_municipio == null)
        return alert('No se encontro el municipio.');
    $(r_municipio).click();
    $("#nameCiudad").html(titulo);
    titleOffice = titulo;
    actual = 'Municipio 2';
    clickcircle = true;


    $("[data-name='inversion'], [data-name='dependencia'], [data-name='proyectos'], #divBarra, #divCircular, #divProyectoNoticia").show();
    $("[data-name='beneficiarios']").hide();


    $("#divProyectoNoticia").addClass("divProyectosN");
    loaderInversion();
    loaderProyecto();
    loaderDepedencia();
    loaderIndicativo();
    getParticipacionAportante();
    getParticipacionEje();
    loaderProyectos();
    $("#btnAtras").show();



}




function ZoomMunicipio() {
    var new_ele = document.getElementById('vistaMunicipio');
    var rect = new_ele.getBoundingClientRect(), tl = new TimelineMax();
    var nscale = 0; //Establecer nuevo scale automatico, ignora SVG
    if (rect.width > rect.height) {
        nscale = 400 / rect.width;
    } else {
        nscale = 400 / rect.height;
    }
    var bbox = new_ele.getBBox(),
        svg = document.getElementById('viewPrueba'),
        viewBox = $(svg).attr('viewBox');
    viewBox = viewBox.split(' ');

    var cx = parseFloat(viewBox[0]) + (parseFloat(viewBox[2]) / 2);
    var cy = parseFloat(viewBox[1]) + (parseFloat(viewBox[3]) / 2);
    var x = cx - bbox.x - ((bbox.width / 2));
    var y = cy - bbox.y - ((bbox.height / 2));
    var position = { x: x, y: y };

    tl.set(new_ele, {
        visibility: "visible"
    }).set(new_ele, {
        transformOrigin: "50% 50%"
    }).to(new_ele, 0.7, {
        scale: nscale,
        x: position.x,
        y: position.y,
        ease: Power2.easeInOut
    });
    tl.pause;
}
function zoomState(state, nameParent) {
    var zoomState = document.getElementById(state), tl = new TimelineMax();

    var svg1 = zoomState;
    var rect = svg1.getBoundingClientRect();

    var scale = 0; //Establecer nuevo scale automatico, ignora SVG
    if (rect.width > rect.height) {
        scale = 450 / rect.width;
    } else {
        scale = 450 / rect.height;
    }
    var position = positionElementToCenter(zoomState, nameParent, 0);
    tl
        .set(zoomState, {
            visibility: "visible"
        })
        .set(zoomState, {
            transformOrigin: "50% 50%"
        })
        .to(zoomState, 0.7, {
            scale: 10,
            x: position.x,
            y: position.y,
            ease: Power2.easeInOut
        });
    tl.pause;
    $('.state-details').on('click', function () {
        tl.reverse();
    });
}

function positionElementToCenter(element, nameParent, move) {

    var bbox = element.getBBox(),
        svg = document.getElementById(nameParent),
        viewBox = $(svg).attr('viewBox');
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

SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function (toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

function formatCurrency(locales, currency, number, fractionDigits = 0, mm = 0) {
    number = mm === 0 ? number : number / mm;
    return format(number);
}


function format(value, div = 1, signo = "") {
    if (div === 1) {
        var v = value
    } else {
        var v = Math.round(value / div)
    }
    return signo + " " + new Intl.NumberFormat(["ban", "id"]).format(v)
}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}
function getUrlParams() {
    var url = window.location.href;
    var params = {};
    url.substring(1).replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (str, key, value) {
            params[key] = value;
        });
    return params;
}