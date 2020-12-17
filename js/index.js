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
var actual;

$municipios = [];

$(document).ready(function () {
    init_load();
    municipios_load();
    Cargar_Colombia();
});

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
        //$menuTooltip.removeClass('active');
        $(this).find("path").css("fill", "#717171");
        $(this).find("div").css("color", "#717171");
    });

    api.post("get_data_nfc", { "table": "view_dependencias", "type": 3 }, function (data) {



        if (nameDpto != null) {
            data = data.filter(x => x.dpta.toLowerCase().includes(nameDpto.toLowerCase()));
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
        $menuTooltip.removeClass('active');
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

    }, function () {
        // $menuTooltip.removeClass('active');
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
                        "<td>" + data[i].dependencia + "</td>\n" +
                        "<td><div class='col-md-12'>" + format(sum, 1, "") + "</div></td>\n" +
                        "</tr>";
                    total += parseFloat(sum);
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
        $menuTooltip.removeClass('active');
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
                total_proyecto: data["proyectos"].total,
                infraestructuraValue: data["vectores"].find(x => x.vector.toLowerCase() === ("INFRAESTRUCTURA").toLowerCase()),
                productividadValue: data["vectores"].find(x => x.vector.toLowerCase() === ("PRODUCTIVIDAD").toLowerCase()),
                cuidadoRecursosNaturales: data["vectores"].find(x => x.vector.toLowerCase() === ("CUIDADO DE RECURSOS NATURALES").toLowerCase()),
                costosProduccion: data["vectores"].find(x => x.vector.toLowerCase() === ("COSTOS DE PRODUCCION").toLowerCase())
            };


            api.dataVectores = {
                total_proyecto: api.dataVectores.total_proyecto ? api.dataVectores.total_proyecto : 0,
                infraestructuraValue: api.dataVectores.infraestructuraValue ? api.dataVectores.infraestructuraValue : { total: 0 },
                productividadValue: api.dataVectores.productividadValue ? api.dataVectores.productividadValue : { total: 0 },
                cuidadoRecursosNaturales: api.dataVectores.cuidadoRecursosNaturales ? api.dataVectores.cuidadoRecursosNaturales : { total: 0 },
                costosProduccion: api.dataVectores.costosProduccion ? api.dataVectores.costosProduccion : { total: 0 },
            };

            $("#total_proyecto").html(format(api.dataVectores.total_proyecto, 1, ""));
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

function init_load() {
    $("#inversion").attr("src", "img/iconos/Inversion.png");
    $("#dependencia").attr("src", "img/iconos/Dependencia.png");
    $("#apalancamiento").attr("src", "img/iconos/Apalancamiento.png");
    $("#proyecto").attr("src", "img/iconos/Proyectos.png");
    $("#beneficio").attr("src", "img/iconos/Beneficiarios.png");
    $("#selectAnoCargue").val("2019");
    $("#changeTitle").html(title);
    $('#btnAtras').click(btn_atras);

    loaderInversion();
    loaderDepedencia();
    loaderApalancamiento();
    loaderProyecto();
    loaderBeneficio();
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
            actual = "departamento";
            $("#municipio").hide();
            $("#departamentos").show();
            break;
        default:

            break;
    }
}

function Cargar_Colombia() {
    actual = "pais";
    $("#colombia").load("img/Colombia.svg", function (selector) {
        $("#colombia").on("click", "path.cls-1", Cargar_Departamento)
    });
}

function Cargar_Departamento() {
    actual = "departamentos";
    var departamento = $(this).attr("url");
    $selectorDpto = this;
    var div_id = `dep_${departamento}`;
    if ($(`#${div_id}`).length == 0) {
        var div = $("<div>", { id: div_id, class: "div_departamentos" }).load(`img/departamentos/${departamento}.svg`, function () {
            $(`#${div_id}`).on("click", "path.cls-1", Cargar_Municipios)
        });

        $(`#departamentos`).append(div);
        $(`#colombia`).hide();
        $(`#departamentos`).show();
    } else {
        $(`#colombia`).hide();
        $(`#departamentos, #dep_${departamento}`).show();
    }
}

function Cargar_Municipios() {
    var div = $(this).closest("svg")
    var svgid = $(div).attr("id");
    actual = "municipios";
    var selector = this;
    var selectorId = selector.id;

    var muni = $(selector).clone();
    console.log(muni);
    $("#viewPrueba").html(muni);
    $("#departamentos").hide();
    $("#municipio").show();
    zoomState(selectorId, svgid);
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

    tl
        .set(zoomState, {
            visibility: "visible"
        })
        .set(zoomState, {
            transformOrigin: "50% 50%"
        })
        .to(zoomState, 0.7, {
            scale,
            x: positionElementToCenter(zoomState, nameParent, 0).x,
            y: positionElementToCenter(zoomState, nameParent, 0).y,
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

// No usada
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

// Funciones Varias
function format(value, div = 1, signo = "") {
    if (div == 1) var v = value; else var v = Math.round(value / div);
    return signo + " " + new Intl.NumberFormat(["ban", "id"]).format(v)
}