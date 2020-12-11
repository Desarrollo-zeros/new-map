var dependencia;
var title = "Mapa Ejecución de Proyectos Sostenibles";
$description = null;
$menuTooltip = null;



var afroId=$("#afroDiv");
var hombresId=$("#hombreDiv");
var mujeresId=$("#mujerDiv");
var jovenId=$("#jovenDiv");

var $selectorDpto = null;



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
    $("#changeTitle").html(title);

    $("#selectAnoCargue").change(function (){
        $("#changeTitle").html(title+" "+dependencia.alias+" "+$("#selectAnoCargue").val());
    });





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
            $("#colombia").load("img/departamentos/"+url+".svg",function (selector){
                $("#divBarra").css("bottom","180px");
                $("#divCircular").css("bottom","150px");
                $("#divProyectoNoticia").css("bottom","200px");
                $("#noticiasDiv").hide();
                $("#idTituloMapa").show();
                $("#indicadoresDiv").show();

                $("#changeTitleDpto").html(url.toUpperCase());

                $description = $(".description");

                $('path.cls-1').hover(function() {
                    $("path.cls-1").css("fill","#8a8a8a");
                    $(this).css("fill","#6ef35e");
                    if($selectorDpto){
                        $($selectorDpto).css("fill","#960303");
                    }
                    $description.addClass('active');
                    $description.html($(this).attr('name'));
                }, function() {
                    $("path.cls-1").css("fill","#8a8a8a");
                    if($selectorDpto){
                        $($selectorDpto).css("fill","#960303");
                    }
                    $description.removeClass('active');
                });

                $("path.cls-1").click(function(){
                    $selectorDpto = this;
                    $("path.cls-1").css("fill","#8a8a8a");
                    $(this).css("fill","#960303");

                    $("#indicadoresDiv").hide();
                    $("#divCircular").hide();
                    $("#divBarra").hide();
                    $('[data-id="dependencia-hover"]').hide();
                    $('[data-id="apalancamiento-hover"]').hide();
                    $("#divProyectoNoticia").show();
                    $("#separadorCiudad").show();
                    var name = $(this).attr("name");
                    $("#nameCiudad").html(name);



                });

            });


        });

        $description = $(".description");

        $('path.cls-1').hover(function() {
            $(this).attr("class", "cls-1 heyo");
            $description.addClass('active');
            $description.html($(this).attr('title'));

            if($(this).attr('title') == "Huila"){
                $("#path6475").css("fill","#CC2929");
                $("#path6442").css("fill","#CC2929");
            }
        }, function() {
            if($(this).attr('title') == "Huila"){
                $("#path6475").css("fill","#d2d2e6");
                $("#path6442").css("fill","#d2d2e6");
            }
            $description.removeClass('active');
        });


    });

    $menuTooltip = $(".table-tooltip");
    $("#inversion").load("img/iconos/inversion.svg",function (selector){
        $('[data-id="inversion-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("inversion",$menuTooltip,"")

            $menuTooltip.css({
                right:  400,
                top: -40,
                height : 50,
            });

        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });
    });

    $("#dependencia").load("img/iconos/dependencia.svg",function (selector){
        $('[data-id="dependencia-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            /*$menuTooltip.addClass('active');
            getHtmlTable("dependencia",$menuTooltip,"")

            $menuTooltip.css({
                right:  400,
                top: 50,
                height : 50,
            });*/

        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });
    });

    $("#apalancamiento").load("img/iconos/apalancamiento.svg",function (selector){
        $('[data-id="apalancamiento-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            //$menuTooltip.addClass('active');
            /*getHtmlTable("apalancamiento",$menuTooltip,"");

            $menuTooltip.css({
                right:  400,
                top: 125,
                height : 50,
            });*/


        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });
    });

    $("#proyecto").load("img/iconos/proyecto.svg",function (selector){
        $('[data-id="proyecto-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("proyecto",$menuTooltip,"")


            $menuTooltip.css({
                right:  350,
                top: 125,
                height : 50,
            });




        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });
    });

    $("#beneficio").load("img/iconos/beneficio.svg",function (selector){
        $('[data-id="beneficio-hover"]').hover(function (){
            $(this).find("path").css("fill","#960303");
            $(this).find("div").css("color","#960303");
            $menuTooltip.addClass('active');
            getHtmlTable("beneficio",$menuTooltip,"");

            $menuTooltip.css({
                right:  350,
                top: 125,
                height : 50,
            });


        }, function (){
            $menuTooltip.removeClass('active');
            $(this).find("path").css("fill","#717171");
            $(this).find("div").css("color","#717171");
        });
    });


});



function getHtmlTable(id, selector, type=""){
    console.log(("#"+id+"-table-table-tooltip"+type));
    selector.html($("#"+id+"-table-table-tooltip"+type).html());


}