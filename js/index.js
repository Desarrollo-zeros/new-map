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

function init_load() {
    $("#inversion").attr("src", "img/iconos/Inversion.png");
    $("#dependencia").attr("src", "img/iconos/Dependencia.png");
    $("#apalancamiento").attr("src", "img/iconos/Apalancamiento.png");
    $("#proyecto").attr("src", "img/iconos/Proyectos.png");
    $("#beneficio").attr("src", "img/iconos/Beneficiarios.png");
    $("#selectAnoCargue").val("2019");
    $("#changeTitle").html(title);
    $('#btnAtras').click(btn_atras);
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
        var div = $("<div>", { id: div_id, class: "div_departamentos" }).load(`img/departamentos/${departamento}.svg`, function(){
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

function Cargar_Municipios(){
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

