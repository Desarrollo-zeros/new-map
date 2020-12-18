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
var vconf = { style: "color: #000000" };
var clickDpto;

$municipios = [];

$(document).ready(function () {
    init_load();
    municipios_load();
    Cargar_Colombia();
});

function init_load() {
    $("#inversion").attr("src", "img/iconos/Inversion.png");
    $("#dependencia").attr("src", "img/iconos/Dependencia.png");
    $("#apalancamiento").attr("src", "img/iconos/Apalancamiento.png");
    $("#proyecto").attr("src", "img/iconos/Proyectos.png");
    $("#beneficio").attr("src", "img/iconos/Beneficiarios.png");
    $("#selectAnoCargue").val("2019");
    $("#changeTitle").html(title);
    $('#btnAtras').click(btn_atras);

    $menuTooltip = $(".table-tooltip");

    detalles_menu()
}
// ???
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
                str += "<h3 style=\"font-size: 12px\"><div class='row'><div class='col-md-3'><span style=\"font-weight: bold;\">" + data[i].indicador_nu.replace('.00', '') + "</span></div> <div class='col-md-9'><span>" + data[i].indicador + "</span> </div> </div></h3>";
            }
        }

        $("#scrollerIndicativo").append(str);


    }, function () {

    })

}
function loaderInversion() {
    api.getInversion({}, function (data) {
        if (data && data.ano_carge) {
            api.dataInversion = {
                "total_ejecucion": data.total_ejecucion,
                "rp": data.rp,
                "fonc": data.fonc,
                "tercero": data.tercero
            };
            api.dataInversion.total_ejecucion = parseFloat(api.dataInversion.rp) + parseFloat(api.dataInversion.fonc) + parseFloat(api.dataInversion.tercero);
            $("#inversionTotal").html(format(api.dataInversion.total_ejecucion, 1000000, "$") + " MM");
            $("#fonc").html(format(api.dataInversion.fonc, 1000000, "$") + " MM")
            $("#terceros").html(format(api.dataInversion.tercero, 1000000, "$") + " MM");
            $("#rp").html(format(api.dataInversion.rp, 1000000, "$") + " MM")
            if (parseInt(api.dataInversion.fonc) == 0) $("#fonc").parent().hide(); else $("#fonc").parent().show();
            if (parseInt(api.dataInversion.tercero) == 0) $("#terceros").parent().hide(); else $("#terceros").parent().show();
            if (parseInt(api.dataInversion.rp) == 0) $("#rp").parent().hide(); else $("#rp").parent().show();
        }
    });
}
function loaderDepedencia() {
    api.post("get_data_nfc", { "table": "view_dependencias", "type": 3 }, function (data) {
        api.dataDependencia = data;
        var data = api.dataDependencia;
        if (nameDpto1 != null) data = data.filter(x => x.dpta.replaceAll(" ", "").toLowerCase().includes(nameDpto1.replaceAll(" ", "").toLowerCase()));
        let dpto = [];
        for (var i in data) {
            if (dpto.find(x => x == data[i].dependencia) == undefined) {
                dpto.push(data[i].dependencia);
                $("#ttdetalles_info .dependencia ul").append(
                    $("<li>").html(data[i].dependencia)
                );
            }
        }
        for (var i in data) {
            if (nameDpto != null) {
                if (data[i].dependencia == "COMITÉ SANTANDER") {
                    if (dpto.find(x => x == data[i].dependencia) == undefined) {
                        dpto.push(data[i].dependencia);
                        $("#ttdetalles_info .dependencia ul").append(
                            $("<li>").html(data[i].dependencia)
                        );
                    }
                    break;
                } else {
                    if (dpto.find(x => x == data[i].dependencia) == undefined) {
                        dpto.push(data[i].dependencia);
                        $("#ttdetalles_info .dependencia ul").append(
                            $("<li>").html(data[i].dependencia)
                        );
                    }
                }
            } else {
                if (dpto.find(x => x == data[i].dependencia) == undefined) {
                    dpto.push(data[i].dependencia);
                    $("#ttdetalles_info .dependencia ul").append(
                        $("<li>").html(data[i].dependencia)
                    );
                }
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



        var str = "";
        var total = 0;
        if (data[0].dpto != undefined) {
            for (var i in data) {

                let t = format(parseFloat(data[i].total_total).toFixed(2));

                if (t != "Infinity" && parseFloat(t) != 0 && t != " NaN") {
                    if (t == null) {
                        t = 0;
                    }
                    total += parseFloat(t);
                }
            }
            if (total == null) {
                total = 0;
            }
            let totalSplit = total.toString().split(",");
            if (totalSplit.length > 1 && totalSplit[1].split("").length < 2) {
                total = total + "0";
            }
            var sum = 0;

            for (var i in data) {
                if (data[i].fonc != parseInt(0)) {
                    let s = (parseFloat(data[i].tercero) + parseFloat(data[i].rp)) / parseFloat(data[i].fonc);
                    if (s != "Infinity" && parseFloat(s) != 0 && s != "NAN") {

                        s = format(parseFloat(s).toFixed(2));
                        let sumSplit = s.toString().split(",");
                        if (sumSplit.length > 1 && sumSplit[1].split("").length < 2) {
                            s = s + "0";
                        }
                        sum += parseFloat(s);
                    }
                }
            }


            if (sum.toString().split(",").length == 1) {
                sum = sum + ",0";
            }

            str += "<tr style=''>\n" +
                "<td><div class='col-12'>" + data[0].dependencia + " </div></td>\n" +
                "<td><div class='col-12' style='position: position: relative;\n" +
                "left: 90px;text-align: right;'>" + sum + "</div></td>\n" +
                "</tr>";


        } else {
            total = format(parseFloat(data[0].total_total).toFixed(2));
            if (total == null) {
                total = 0;
            }
            let totalSplit = total.toString().split(",");
            if (totalSplit.length > 1 && totalSplit[1].split("").length < 2) {
                total = total + "0";
            }

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
                        str += "<tr style=''>\n" +
                            "<td><div class='col-12'>" + data[i].dependencia + " </div></td>\n" +
                            "<td><div class='col-12' style='text-align: right;'>" + sum + "</div></td>\n" +
                            "</tr>";
                    }
                }
            }

        }

        $("#apalancamiento-table tbody").html(str);

        if (total.toString().split(",").length == 1) {
            total = total + ",0";
        }

        $("#apalancamientoValue").html(total);

    }, function () {
        $menuTooltip.removeClass('active');
    })


}
function loaderProyecto() {
    api.getVectores({}, function (data) {
        if (data && data["vectores"] && data["vectores"][0].ano_carge) {
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

            var proyectosRows = $("#proyectosRows tbody");
            proyectosRows.find("tr").remove();
            api.dataVectores.vectores.sort(function(a,b){return b.total - a.total;}).forEach(x => {
                if(nameDpto != undefined){
                   if(api.dataVectores.vectores.length == 1){
                       proyectosRows.append(
                           $("<tr>").append(
                               $("<td>", {style: "position: absolute;padding-right: 10%;"}).html(x.vector ),
                               $("<td>", {style: "position: absolute;padding-left: 80%;"}).html( $("<span>",vconf).html(x.total)),
                           )
                       )
                   }else{
                       proyectosRows.append(
                           $("<tr>").append(
                               $("<td>").html(x.vector),
                               $("<td>", {style: "text-align: right;"}).html($("<span>",vconf).html(x.total)),
                           )
                       )
                   }
               }else{
                   proyectosRows.append(
                       $("<tr>").append(
                           $("<td>").html(x.vector),
                           $("<td>", {style: "text-align: right;"}).html($("<span>",vconf).html(x.total)),
                       )
                   )
               }
            })
        }
    });
}
function loaderBeneficio() {
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
            $("#total_beneficiario").html(format(api.dataBeneficiarios.total_beneficiario));
            console.log(api.dataBeneficiarios);
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
    switch (actual) {
        case "departamentos":
            actual = "pais";
            $("#departamentos, .div_departamentos").hide();
            $("#colombia").show();
            break;
        case "municipios":
            actual = "departamentos";
            $("#municipio").hide();
            $("#departamentos").show();
            break;
        default:

            break;
    }
}

function Cargar_Colombia() {
    actual = "pais";
    $("div#colombia").load("img/Colombia.svg", function () {
        $("div#colombia").on("click", "path.cls-1", Cargar_Departamento)
        $("div#colombia svg > path").each(function () {
            if (($(this).hasClass("cls-2") || $(this).attr("title") == undefined) && !$(this).hasClass("disabled"))
                $(this).addClass("disabled");
        });
    });
    loaderInversion();
    loaderDepedencia();
    loaderApalancamiento();
    loaderProyecto();
    loaderBeneficio();
    getParticipacionEje();
    getParticipacionAportante();
    loaderIndicativo();
}

function Cargar_Departamento() {
    clickDpto = true;
    $selectorDpto = this;
    if($(this).hasClass("disabled")) return;
    var departamento = $(this).attr("url");
    nameDpto = $(this).attr("url");
    nameDpto1 = $(this).attr("title");
    if (nameDpto1 == null) {
        nameDpto1 = nameDpto;
    }
    actual = "departamentos";
    var div_id = `dep_${departamento}`;
    if ($(`#${div_id}`).length == 0) {
        var div = $("<div>", { id: div_id, class: "div_departamentos" }).load(`img/departamentos/${departamento}.svg`, function (data) {
            $(`#${div_id}`).on("click", "path.cls-1", Cargar_Municipios)
            $(`#${div_id} svg > path`).each(function () {
                if ($(this).attr("name").toLowerCase().includes("xxx")) {
                    $(this).addClass("disabled");
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
    loaderInversion();
    loaderDepedencia();
    loaderApalancamiento();
    loaderProyecto();
    loaderBeneficio();
    getParticipacionEje();
    getParticipacionAportante();
    loaderIndicativo();
}

function Cargar_Municipios() {
    if($(this).hasClass("disabled")) return;
    var div = $(this).closest("svg")
    var svgid = $(div).attr("id");
    actual = "municipios";
    var selector = this;
    var selectorId = selector.id;
    var muni = $(selector); 
    $("#viewPrueba").html(muni.clone());
    $("#departamentos").hide();
    $("#municipio").show();
    zoomState(selectorId, svgid);

    loaderInversion();
    loaderDepedencia();
    loaderApalancamiento();
    loaderProyecto();
    loaderBeneficio();
    getParticipacionEje();
    getParticipacionAportante();
    loaderIndicativo();
}

function zoomState(state, nameParent) {
    var zoomState = document.getElementById(state), tl = new TimelineMax();

    var svg1 = zoomState;
    var rect = svg1.getBoundingClientRect();

    var scale = 0; //Establecer nuevo scale automatico, ignora SVG
    console.log(rect);
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
        viewBox = svg.getAttribute('viewBox');
    console.log(viewBox);
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

// Funciones Varias
function format(value, div = 1, signo = "") {
    if (div == 1) var v = value; else var v = Math.round(value / div);
    return signo + " " + new Intl.NumberFormat(["ban", "id"]).format(v)
}

function getHtmlTable(id, selector, type = "") {
    switch (id) {
        case "inversion": {
            if (parseInt(api.dataInversion.rp) == 0) {
                $("#rp").parent().hide();
            } else {
                $("#rp").parent().show();
            }
            if (parseInt(api.dataInversion.fonc) == 0) {
                $("#fonc").parent().hide();
            } else {
                $("#fonc").parent().show();
            }
            if (parseInt(api.dataInversion.tercero) == 0) {
                $("#terceros").parent().hide();
            } else {
                $("#terceros").parent().show();
            }
            $("#inversionTotal").html(format(api.dataInversion.total_ejecucion, 1000000, "$") + " MM");
            $("#rp" + type).html(format(api.dataInversion.rp, 1000000, "$") + " MM")
            $("#fonc" + type).html(format(api.dataInversion.fonc, 1000000, "$") + " MM")
            $("#terceros" + type).html(format(api.dataInversion.tercero, 1000000, "$") + " MM");
            break;
        }
        case "beneficio": {
            $("#total_beneficiario" + type).html(format(api.dataBeneficiarios.total_beneficiario));
            var vconf = { style: "color: #000000" };
            if (parseInt(api.dataBeneficiarios.afroValue) == 0) {
                $("#afroDiv").parent().parent().hide();
            } else {
                $("#afroDiv").parent().parent().show();
            }
            if (parseInt(api.dataBeneficiarios.hombresValue) == 0) {
                $("#hombresDiv").parent().parent().hide();
            } else {
                $("#hombresDiv").parent().parent().show();
            }
            if (parseInt(api.dataBeneficiarios.indigenasValue) == 0) {
                $("#indigenasDiv").parent().parent().hide();
            } else {
                $("#indigenasDiv").parent().parent().show();
            }
            if (parseInt(api.dataBeneficiarios.jovenValue) == 0) {
                $("#jovenDiv").parent().parent().hide();
            } else {
                $("#jovenDiv").parent().parent().show();
            }
            if (parseInt(api.dataBeneficiarios.mujerValue) == 0) {
                $("#mujerDiv").parent().parent().hide();
            } else {
                $("#mujerDiv").parent().parent().show();
            }
            if (parseInt(api.dataBeneficiarios.ninosValue) == 0) {
                $("#ninosDiv").parent().parent().hide();
            } else {
                $("#ninosDiv").parent().parent().show();
            }
            if (parseInt(api.dataBeneficiarios.otroValue) == 0) {
                $("#otroDiv").parent().parent().hide();
            } else {
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
        case "proyecto": {
            let proyectosRows = $("#proyectosRows tbody");
            proyectosRows.html("");
            api.dataVectores.vectores.forEach(x => {
                proyectosRows.append(
                    $("<tr>").append(
                        $("<td>", { "class": "col-12" }).html(x.vector),
                        $("<td>", { "class": "col-12" }).html(x.total),
                    )
                )
            });
            break;
        }
        case "dependencia": {
            var data = api.dataDependencia;
            if (nameDpto1 != null) {
                data = data.filter(x => x.dpta.replaceAll(" ", "").toLowerCase().includes(nameDpto1.replaceAll(" ", "").toLowerCase()));
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
}