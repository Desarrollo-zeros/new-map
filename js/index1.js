var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];


var monedaDiv = $("#monedaDiv");
var crecimientoDiv = $("#crecimientoDiv");
var marcadorDiv =$("#marcadorDiv");
var equipoDiv = $("#equipoDiv");
var graficoDiv = $("#graficoDiv");

var afroId=$("#afroDiv");
var hombresId=$("#hombreDiv");
var mujeresId=$("#mujerDiv");
var jovenId=$("#jovenDiv");

//imagenes menu 2
var img1=$("#img1");
var img2=$("#img2");
var img3=$("#img3");

$tableTooltip1 = null;

var typeDefault = 1;

var nameDpto;

var nameMunicipio;
var dataDependencias = [];
var title = "MAPA DE SOSTENIBILIDAD";

var dependencia;

var selectorPathMun;
$description_dpto = null;
$tableTooltip_1 = null;
$tableTooltip = null;
var  _dpto;
var muni;

$(document).ready(function (){

    //linea punteada---------
    $('#line1').hide();
    $('#line2').hide();
    $('#line3').hide();
    $('#line4').hide();


    $('#btn1').hide();
    $('#btn2').hide();
    $('#btn3').hide();

    $('#txt1').hide();
    $('#txt2').hide();
    $('#txt3').hide();

    $('#tn3').hide();
    $('#tn2').hide();
    $('#tn1').hide();



    monedaDiv.load(monedaDiv.attr("src"));
    crecimientoDiv.load(crecimientoDiv.attr("src"));
    marcadorDiv.load(marcadorDiv.attr("src"));
    equipoDiv.load(equipoDiv.attr("src"));
    graficoDiv.load(graficoDiv.attr("src"));

    afroId.load(afroId.attr("src"));
    hombresId.load(hombresId.attr("src"));
    mujeresId.load(mujeresId.attr("src"));
    jovenId.load(jovenId.attr("src"));
    $("#selectAnoCargue").val("2019");

    img1.load("img/iconos/proyecto.svg");
    img2.load("img/iconos/beneficio.svg");
    img3.load("img/iconos/inversion.svg");
   



    api.post("get_data_nfc",{
        "table" : "view_dependencias",
        type : 3
    },function (data){
        dataDependencias = data;
    })

    getLoad();

    //loader Map Colombia
    $("#colombia").load("img/Colombia.svg");

    var items = document.querySelectorAll('.circle-menu-box a.menu-item');



    for(var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = (40 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

        items[i].style.top = (40 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
    }


    $("#selectAnoCargue").change(function (){
        $("#changeTitle").html(title+" "+dependencia.alias+" "+$("#selectAnoCargue").val());
    });




    setTimeout(function(){


    $('#placehd').hide();
 
        $("path").attr("filter","url(#dropShadow)")

        $("path.cls-1").on("mouseover",function(){
            $("path.cls-1").css("fill", "#d2d2e6");
            //var randomColor = Math.floor(Math.random()*16777215).toString(16);
            //$(this).css("fill", "#"+randomColor);#960303
            $(this).css("fill", "#960303");
        })
        $("path.cls-1").click(function(){
            var url = $(this).attr("url");
            $("#colombia").css("width","90%");
            _dpto =  $(this);
            $("#depav")
                .css("width","100%")
                .css("right" , "0%")
                .css("position",'0')
                .css("bottom","0");

            //window.location.href = "departamento.html?name="+$(this).attr("url")+"&id="+$(this).attr("id")
            $(".depav-view").show();
            nameDpto = $(this).attr("url");
            $("#depav").load("img/departamentos/"+nameDpto+".svg");
            $(".grafic1").hide();
            $(".pais-view").removeClass("col-sm-5").addClass("col-sm-3");
            $(".grafic2").show();
            $("#divCirclemap3").show();

            getLoad();

            dependencia = dataDependencias.find(x => x.nombre.trim().toLowerCase() ===  nameDpto.trim().toLowerCase())

            if(!dependencia){
                 dependencia = dataDependencias.find(x => x.nombre.trim().toLowerCase().includes(nameDpto.trim().toLowerCase()))
                 if(!dependencia){
                     dependencia = dataDependencias.find(x => nameDpto.trim().toLowerCase().includes(x.nombre.trim().toLowerCase()))
                 }
            }


            $("#changeTitle").html(title+" "+dependencia.alias+" "+$("#selectAnoCargue").val());

            $("#sectionUno").addClass("uno");
            $("#noticiaDiv").hide();
            $("#indicadoresDiv").show();
            $("#text-noticia").html("Indicadores");

            //Linea punteada--------------------------------------------------------------------
            $('#line1').show();
            $('#line2').show();
            $('#line3').show();
            $('#line4').show();



            
            
            

            typeDefault = 2;
            setTimeout(function (){

                $description_dpto = $(".description-dpto");

                $('path.cls-1').hover(function() {
                    console.log($description_dpto);
                    $(this).attr("class", "cls-1 heyo");
                    $description_dpto.addClass('active');
                    $description_dpto.html($(this).attr('name'));
                    if(selectorPathMun){
                        $(selectorPathMun).css("fill","#960303");
                    }
                }, function() {
                    $description_dpto.removeClass('active');
                    if(selectorPathMun){
                        $(selectorPathMun).css("fill","#960303");
                    }
                });

                $("svg:not('#view_colombia_svg') path").click(function (){
                    $("div#depav svg:not('#view_colombia_svg') path").hide();
                    if($(this).attr("style") == "fill: rgb(150, 3, 3);"){
                        return;
                    }
                     muni = $(this);


                    $("#colombia").load("img/departamentos/"+nameDpto+".svg");

                    setTimeout(function (){
                        $("#colombia svg #"+muni.attr("id")).css("fill","#960303")
                    },1000);


                    //getLoad();
                    $("#changeTitle").html(title+" "+dependencia.alias+" "+$("#selectAnoCargue").val());
                    $("#separadorCiudad").show();
                    nameMunicipio = $(this).attr("name");
                    $("#nameCiudad").append(nameMunicipio);

                    getLoadMunicipios();


                    $(this).css("fill","#960303");
                    $(this).show();

                    $("#depav").css("right", "30%")
                    $("#depav").css("width", "150%")
                    $("#depav").css("bottom", "150px")
                    selectorPathMun = this;


                    $("#divCirclemap3").hide();
                    $("#divCirclemap4").removeClass('col-md-6').addClass('col-md-12');
                    $("#divCirclemap4").css({
                        position: "relative",
                        bottom: "123px",
                        left: "150px",
                    });

                    //menu 2 ---------------------------------------------------------------------------
                    $('#btn1').show();
                    $('#btn2').show();
                    $('#btn3').show();

                    $('#txt1').show();
                    $('#txt2').show();
                    $('#txt3').show();

                    $('#tn3').show();
                    $('#tn2').show();
                    $('#tn1').show();


                    $('#circle-menu-act').hide();
                    $('#placehd').show();

                    $("#sectionUno").removeClass("uno");
                    $("#indicadoresDiv").hide();
                    $("#proyectosDiv").show();
                    $("#text-noticia").html("Proyectos");

                    setTimeout(function (){
                        $("#grafic2").show();
                        $("#circlemap4").click();
                        },1000)
                });



            },1000)

            //$("#colombia").load("img/departamentos/"+$(this).attr("url")+".svg");
        });


        $description = $(".description");


        $('path.cls-1').hover(function() {

            $(this).attr("class", "cls-1 heyo");
            $description.addClass('active');
            $description.html($(this).attr('title'));
            if(selectorPathMun){
                $(selectorPathMun).css("fill","#960303");
            }
        }, function() {
            $description.removeClass('active');
            if(selectorPathMun){
                $(selectorPathMun).css("fill","#960303");
            }

        });

        $(document).on('mousemove', function(e){
            $description.css({
                left:  e.pageX-500,
                top:   e.pageY - 300,
                height : "60px"
            });

            if($description_dpto){
                $description_dpto.css({
                    left:  e.pageX-500,
                    top:   e.pageY - 300,
                    height : "60px"
                });
            }

            if($tableTooltip_1){
                $tableTooltip_1.css({
                    left:  e.pageX-300,
                    top:   e.pageY -100,
                    height : "60px"
                });
            }

            if($tableTooltip){
                $tableTooltip.css({
                    left:  e.pageX-1030,
                    top:   e.pageY -375,
                    height : "60px"
                });
            }

        });







        $tableTooltip_1 = $(".table-tooltip-1");

        $(".btnnewnew").hover(function (){
            var id = $(this).attr("data-id");
            $(".btnnewnew-"+id).css("color","#960303");

            if(id == "moneda"){
                $("svg.icons#moneda  > g path").css("fill","#960303");
            }else{

                $("svg.icons#"+id+">.st0").css("fill","#960303");
            }
            $("#"+id+".table-tooltip").attr("class", "cls-1 heyo");
            if(id != "marcador" && id !="crecimiento"){
                $tableTooltip_1.addClass('active');
                getHtmlTable(id,$tableTooltip_1,"-1")
            }
            if(selectorPathMun){
                $(selectorPathMun).css("fill","#960303");
            }

        },function() {
            var id = $(this).attr("data-id");
            $(".btnnewnew-"+id).css("color","#7a7979")
            $("svg.icons#moneda  > g path").css("fill","#717171");
            $("svg.icons > .st0").css("fill","#717171");
            $tableTooltip_1.removeClass('active');

            if(selectorPathMun){
                $(selectorPathMun).css("fill","#960303");
            }
        });


        $tableTooltip = $(".table-tooltip");
        $(".ee a").hover(function (){
           var id = $(this).attr("data-id");
            $(this).find("b").css("color","#960303")
           if(id == "moneda"){
               $("svg.icons#moneda  > g path").css("fill","#960303");
           }else{

               $("svg.icons#"+id+">.st0").css("fill","#960303");
           }
            $("#"+id+".table-tooltip").attr("class", "cls-1 heyo");
           if(id != "marcador" && id !="crecimiento"){
               $tableTooltip.addClass('active');
               getHtmlTable(id,$tableTooltip)
           }
            if(selectorPathMun){
                $(selectorPathMun).css("fill","#960303");
            }

        },function() {
            $(".ee a").find("b").css("color","#7a7979")
            $("svg.icons#moneda  > g path").css("fill","#717171");
            $("svg.icons > .st0").css("fill","#717171");
            $tableTooltip.removeClass('active');

            if(selectorPathMun){
                $(selectorPathMun).css("fill","#960303");
            }
        });
            
        
        //----------------------


    },1000);





    function getHtmlTable(id, selector, type=""){

        selector.html($("#"+id+"-table-table-tooltip"+type).html());


        $("#inversionTotal"+type).html(formatCurrency("es-CO", "COP", api.dataInversion.total_ejecucion));
        $("#rp"+type).html(formatCurrency("es-CO", "COP", api.dataInversion.rp))
        $("#fonc"+type).html(formatCurrency("es-CO", "COP", api.dataInversion.fonc))
        $("#tercero"+type).html(formatCurrency("es-CO", "COP", api.dataInversion.tercero))

        $("#total_beneficiario"+type).html(formatCurrency("es-CO", "COP", api.dataBeneficiarios.total_beneficiario).replace("$",""));
        $("#afroValue"+type).html(formatCurrency("es-CO", "COP", api.dataBeneficiarios.afroValue));
        $("#joveValue"+type).html(formatCurrency("es-CO", "COP", api.dataBeneficiarios.joveValue))
        $("#mujerValue"+type).html(formatCurrency("es-CO", "COP", api.dataBeneficiarios.mujerValue))
        $("#hombreValue"+type).html(formatCurrency("es-CO", "COP", api.dataBeneficiarios.hombreValue))


        $("#total_proyecto"+type).html(api.dataVectores.total_proyecto);
        $("#infraestructuraValue"+type). html(api.dataVectores.infraestructuraValue.total);
        $("#productividadValue"+type). html(api.dataVectores.productividadValue.total);
        $("#cuidadoRecursosNaturales"+type). html(api.dataVectores.cuidadoRecursosNaturales.total);
        $("#costosProduccion"+type). html(api.dataVectores.costosProduccion.total);

    }











    /*Carga Api*/






});

function formatCurrency (locales, currency, number, fractionDigits = 2) {
    return new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
    }).format(number);
}

// Conclusión
(function() {
    /**
     * Ajuste decimal de un número.
     *
     * @param {String}  tipo  El tipo de ajuste.
     * @param {Number}  valor El numero.
     * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
     * @returns {Number} El valor ajustado.
     */
    function decimalAdjust(type, value, exp) {
        // Si el exp no está definido o es cero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Si el valor no es un número o el exp no es un entero...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();