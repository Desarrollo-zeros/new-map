var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];
var name;
var monedaDiv = $("#monedaDiv");
var crecimientoDiv = $("#crecimientoDiv");
var marcadorDiv =$("#marcadorDiv");
var equipoDiv = $("#equipoDiv");
var graficoDiv = $("#graficoDiv");

var afroId=$("#afroDiv");
var hombresId=$("#hombreDiv");
var mujeresId=$("#mujerDiv");
var jovenId=$("#jovenDiv");




function mostrarMunicipio(){
    
    document.getElementById("departamentoDiv").style.display="none";
    document.getElementById("departamentoDiv1").style.display="none";
    document.getElementById("departamentoDiv2").style.display="none";
    $("#mapa1").load("img/departamentos/"+name+".svg");
    document.getElementById("municipioDiv").style.display="block";
    document.getElementById("municipioDiv2").style.display="block";

    $("#departsv").find("svg").attr("viewBox","0 0 30 33");

    setTimeout(function (){
        $("path").attr("filter","url(#dropShadow1)");
        $("#mapa1").css("width","170%");
    },1000)

}
function mostrarDepartamento(){
    //reemplazo2();no se usa ya
    document.getElementById("departamentoDiv1").style.display="block";
    document.getElementById("departamentoDiv2").style.display="block";
    document.getElementById("departamentoDiv").style.display="block";
    $("#mapa1").load("img/Colombia.svg");
    document.getElementById("municipioDiv").style.display="none";
    document.getElementById("municipioDiv2").style.display="none";
    $("#mapa1").css("width","160%");
}


$(document).ready(function (){



    monedaDiv.load(monedaDiv.attr("src"));
    crecimientoDiv.load(crecimientoDiv.attr("src"));
    marcadorDiv.load(marcadorDiv.attr("src"));
    equipoDiv.load(equipoDiv.attr("src"));
    graficoDiv.load(graficoDiv.attr("src"));

    afroId.load(afroId.attr("src"));
    hombresId.load(hombresId.attr("src"));
    mujeresId.load(mujeresId.attr("src"));
    jovenId.load(jovenId.attr("src"));



    document.getElementById("municipioDiv").style.display="none";
    document.getElementById("municipioDiv2").style.display="none";
  

    $("#mapa1").load("img/Colombia.svg");


    //datos variables
    var anio="2019";
    document.getElementById("spanY").innerHTML = anio.toString();
    


    var items = document.querySelectorAll('.circle-menu-box a.menu-item');

    for(var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = (40 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

        items[i].style.top = (40 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
    }

    setTimeout(function (){


        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        name = urlParams.get("name");
        var idDpta = urlParams.get("id");
        $("#"+idDpta).css("fill","#960303");

        $("#departsv").load("img/departamentos/"+name+".svg");
        document.getElementById("departamentoSpan").innerHTML=name;

        $("path.cls-1").on("mouseover",function(){
            $("path.cls-1").css("fill", "#ebebef");
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            $(this).css("fill", "#"+randomColor);
            $("#"+idDpta).css("fill","#960303");
        })

        $("path.cls-1").click(function(){
            var url = $(this).attr("url");
            $("#colombia").css("width","90%");
            //console.log("img/departamentos/"+$(this).attr("url"));
            //$("#colombia").load("img/departamentos/"+$(this).attr("url")+".svg");
            window.location.href = "departamento.html?name="+$(this).attr("url")+"&id="+$(this).attr("id")
            return;
        });


        $description = $(".description");

        $('path.cls-1').hover(function() {
            $(this).attr("class", "cls-1 heyo");
            $description.addClass('active');
            $description.html($(this).attr('title'));
        }, function() {
            $description.removeClass('active');
        });

        $(document).on('mousemove', function(e){
            $description.css({
                left:  e.pageX-250,
                top:   e.pageY - 100,
                height : "60px"
            });

            $tableTooltip.css({
                left:  e.pageX-1200,
                top:   e.pageY - 150,
                height : "60px"
            });
        });


        
        $("#municipioDiv3").find("svg").attr("viewBox","0 0 10 13");
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
            $tableTooltip.addClass('active');
            getHtmlTable(id,$tableTooltip)



        },function() {
            $(".ee a").find("b").css("color","#7a7979")
            $("svg.icons#moneda  > g path").css("fill","#717171");
            $("svg.icons > .st0").css("fill","#717171");
            $tableTooltip.removeClass('active');
        });


        function getHtmlTable(id, selector){
            selector.html($("#"+id+"-table-table-tooltip").html());
        }
    },1000)


    setTimeout(function (){
        $("path").attr("filter","url(#dropShadow)")
    },2000)

});
