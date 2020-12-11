<!doctype html>
<html lang="es">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/zoom-svg.css">
    <title>FNC</title>
    <script src="js/jquery.js"></script>

</head>
<body>



<article class="map">
    <div class="container">
        <div class="row">


            <div class="col-sm-12">
                <div class="row" >
                    <div >
                        <div class="card-body" style="position: relative;top: -30px;">
                            <br>
                            <div class="">
                                <div class="row">
                                    <div class="col-md-2 text-noticia" style="z-index: 99">
                                        <label>Año de información</label>
                                        <select value="2019" class="form-control" id="selectAnoCargue">
                                            <option>2017</option>
                                            <option>2018</option>
                                            <option value="2019">2019</option>
                                            <option>2020</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12">
                                        <h2><b><span class="text-noticia" id="changeTitle">MAPA DE SOSTENIBILIDAD </span></b></h2>
                                    </div>
                                </div>
                                <br>
                                <span>_____________________________________________________________________________________________________________________________</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div  id="idTituloMapa" class="col-md-12 verticalLine" style="font-size: 15px!important; position: relative; left: 20px; bottom: 30px; display: none">
                <h6><b><span class="text-noticia" id="changeTitleDpto"></span><span id="separadorCiudad" style="display: none;color: #960303;font-size: 50px;position: relative; top: 36px; ">&nbsp;&nbsp;{&nbsp;&nbsp;<span style="font-size: 35px;" id="nameCiudad"></span></span></b></h6>
                <br><br>
            </div>

            <div class="col-sm-7">
                <br><br>
                <div id="colombia">
                </div>
                <div class="description"></div>
            </div>

            <div class="col-sm-5" style="position: relative; left: 180px">
                <div class="table-tooltip"></div>


                <div data-id="inversion-hover" class="row iconos-iconos" style="position: relative;top: 36px;">
                    <div class="col-lg-4">
                        <div  id="inversion">
                        </div>
                    </div>
                    <div style="position: relative;left: 81px;bottom: 45px;">
                        Inversíon en miles de millones
                        <br>
                        <b>$ 264.954</b>
                    </div>


                    <div id="inversion-table-table-tooltip" style="display: none" >
                        <div class="row">
                            <div class="col-md-12">
                                <div class="col-md-12">
                                    <span>FoNC</span><br>
                                    <span>$58.890</span>
                                </div>
                                <div class="col-md-12">
                                    <br>
                                    <span>Productividad</span><br>
                                    <span>$58.890</span>
                                </div>
                                <div class="col-md-12">
                                    <br>
                                    <span>Recursos Propios</span><br>
                                    <span>$58.890</span><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div data-id="dependencia-hover" class="row iconos-iconos">
                    <div class="col-md-4">
                        <div id="dependencia">
                        </div>
                    </div>

                    <div >
                        Dependenica
                        <br>
                        <b>18</b>
                    </div>
                </div>

                <div data-id="apalancamiento-hover" class="row iconos-iconos">
                    <div class="col-md-4">
                        <div id="apalancamiento">
                        </div>
                    </div>
                    <div >
                        Apalancamiento
                        <br>
                        <b>3.67</b>
                    </div>
                </div>


                <div data-id="proyecto-hover" class="row iconos-iconos">
                    <div class="col-md-4">
                        <div id="proyecto">
                        </div>
                    </div>
                    <div style="position: relative;left: 81px;bottom: 45px;">
                        # Proyectos Ejecutados
                        <br>
                        <b>1.314</b>
                    </div>


                    <div id="proyecto-table-table-tooltip" style="display: none">
                        <div class="col-md-6" style="width: 250px!important;">
                            <div class="row">
                                <div class="col-md-12" style="padding-top: 5px">
                                    <span style="text-align: left !important;font-size: 30px;" id="infraestructuraValue"></span><br><span>Infraestructura</span> <span id="infraestructuraValue">$5.000.500 </span>
                                </div>

                                <div class="col-md-12" style="padding-top: 5px">
                                    <span style="text-align: left;font-size: 30px;" id="productividadValue"></span><br><span>Productividad</span> <span id="productividadValue">$8.000.500</span>
                                </div>

                                <div class="col-md-12" style="padding-top: 5px">
                                    <span style="text-align: left; font-size: 30px;" id="cuidadoRecursosNaturales"></span><br><span>Cuidado de Recursos Naturales</span> <span id="cuidadoRecursosNaturalesValue">$5.000.500</span>
                                </div>

                                <div class="col-md-12" style="padding-top: 5px">
                                    <span style="text-align: left;font-size: 30px;" id="costosProduccion"></span><br><span>Costos de Producción</span> <span id="costosProduccionValue">$3.000.500</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


                <div data-id="beneficio-hover" class="row iconos-iconos" style="position: relative; bottom: 25px">
                    <div class="col-md-4">
                        <div id="beneficio">
                        </div>
                    </div>
                    <div >
                        # Beneficiarios
                        <br>
                        <b>735.399</b>
                    </div>

                    <div id="beneficio-table-table-tooltip" style="display: none" >
                        <div class="col-md-6" style="width: 250px!important;">
                            <div class="row">
                                <div class="col-md-4" style="padding-top: 10px">
                                    <div id="afroDiv" src="img/Iconos_Beneficiarios/Etnia.svg"  style="width: 50px;height: 50px;"></div>
                                </div>
                                <div class="col-md-8" style="padding-top: 10px; position: relative; left: 10px">
                                    <span id="afroValue">$8.4300.00</span><br>
                                    <span style="font-weight: bold;">Afro</span>
                                </div>
                                <div class="col-md-4" style="padding-top: 10px">
                                    <div id="jovenDiv" src="img/Iconos_Beneficiarios/chico.svg" style="width: 50px;height: 50px;"></div>
                                </div>
                                <div class="col-md-8" style="padding-top: 10px; position: relative; left: 10px">
                                    <span id="joveValue">$25.315.00</span><br>
                                    <span style="font-weight: bold;">Jóvenes</span>
                                </div>
                                <div class="col-md-4" style="padding-top: 10px">
                                    <div id="mujerDiv" src="img/Iconos_Beneficiarios/mujer.svg" style="width: 50px;height: 50px;"></div>

                                </div>
                                <div class="col-md-8" style="padding-top: 10px; position: relative; left: 10px">
                                    <span id="mujerValue">$700.800.00</span><br>
                                    <span style="font-weight: bold;">Mujeres</span>
                                </div>

                                <div class="col-md-4" style="padding-top: 10px">
                                    <div id="hombreDiv" src="img/Iconos_Beneficiarios/hombre.svg" style="width: 50px;height: 50px;"></div>
                                </div>

                                <div class="col-md-8" style="padding-top: 10px; position: relative; left: 10px">
                                    <span id="hombreValue">$960.000.00</span>
                                    <br>
                                    <span style="font-weight: bold;">Hombres</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


            <div id="divNoticia" class="col-sm-7" style="padding-top: 30px; margin-top: 190px">
                <div id="noticiasDiv" style="position: absolute;left: 248px;display: block">
                    <hr  style="top:3px;left:182px !important ; width: 200px !important;position: absolute !important;z-index: 99; border: 1px groove #ffffff" />
                    <hr  style="top:3px;right:182px !important ; width: 200px !important;position: absolute !important;z-index: 99; border: 1px groove #ffffff" />
                    <button onclick="window.open('https://federaciondecafeteros.org/wp/noticias/','_blank')"  class="btn btn-lg btn-noticias">Ver Noticias</button>

                </div>

                <div id="indicadoresDiv" class="card shadow noticia" style="display: none">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h2><b><span id="text-noticia" class="text-noticia">Indicadores</span></b></h2>
                            </div>
                            <div class="col-md-6 verticalLine">
                                <div id="sectionUno">
                                    <div id="scroller" class="scroller" style="display:block;">
                                        <h3 style="font-size: 12px;left: 20px;"><span style="font-weight: bold;left: 20px;">1.137 </span> <span >Marquesinas Construidas</span> </h3>
                                        <h3 style="font-size: 12px;"><span style="font-weight: bold;left: 20px;">3.295 </span> <span>Hectáreas Fertilizadas</span> </h3>
                                        <h3 style="font-size: 12px"><span style="font-weight: bold;left: 20px;">175   </span> <span>Beneficiaderos Mejorados</span> </h3>
                                        <h3 style="font-size: 12px;"><span style="font-weight: bold;left: 20px;">231   </span> <span>STAR Construidos</span> </h3>
                                        <h3 style="font-size: 12px"><span style="font-weight: bold;left: 20px;">470   </span> <span>Vías Intervenidos</span></h3>
                                        <br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="separatorBarra" style="display: none" class="col-sm-7"></div>

            <div id="divBarra" class="col-sm-5" style="position: relative;bottom: 350px; left: 50px">
                <p><b>Participación de la inversión por eje estratégico</b></p>
                <div>
                    <div id="participacion-inversion-por-eje-tooltip" class="table-tooltip1" >
                        <div>
                            <button onclick="$('#participacion-inversion-por-eje-tooltip').removeClass('active')" style="color: #ffffff" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <table></table>
                        </div>
                    </div>
                    <canvas height="200" width="600" style="width: 600px!important;" id="participacion-inversion-por-eje"></canvas>
                </div>
            </div>

            <div id="divProyectoNoticia" class="col-md-5" style="display: none; position: relative;bottom: 320px;left: 50px">
                <div class="card shadow noticia" >
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h2>
                                    <b>
                                        <span class="linea-card" style="left: 30px">|</span>
                                        <span style="position: relative; left: 14px;  bottom: 55px!important;" id="text-noticia">Proyectos</span>
                                    </b>
                                </h2>
                                <br>
                                <br>
                            </div>
                            <div class="col-md-6">
                                <div id="sectionUno">
                                    <div id="proyectosDiv" class="scroller" style="font-size: 12px; position: relative; right: 114px;width:300px">
                                        <br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                        <span>Prog. Renovacion de cafetales ituango </span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-7">

            </div>

            <div id="divCircular" class="col-sm-5" style="position: relative;bottom: 300px;left: 50px">
                <p><b>Participación de la inversión por tipo de aportante</b></p>
                <div>
                    <canvas  height="300" width="700" style="width: 700px!important;position: relative; left: 120px;top: 20px" id="participacion-inversion-por-aportante"></canvas>
                    <canvas id="myChart" style="display: none"></canvas>
                </div>

                <div id="chartjs-legend" class="noselect" style="font-size: 12px">
                    <ul class="1-legend" style="position: relative;left: 190px;bottom: 190px;">
                       <div class="row">
                           <div class="col-md-3">
                               <div class="row">
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #FFCE56;">
                                           <span style="color: #717171">Comunidad</span>
                                           <br>
                                           <span style="color: #717171">7%</span>
                                       </li>
                                   </div>
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #ff2929;">
                                           <span style="color: #717171">Gobernaciones</span>
                                           <br>
                                           <span style="color: #717171">7%</span>
                                       </li>
                                   </div>
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #1d9221;">
                                           <span style="color: #717171">Entidades.</span>
                                           <br>
                                           <span style="color: #717171">Internacionales</span>
                                           <br>
                                           <span style="color: #717171">8%</span>
                                       </li>
                                   </div>
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #1c6020;">
                                           <span style="color: #717171">Municipios</span>
                                           <br>
                                           <span style="color: #717171">14%</span>
                                       </li>
                                   </div>
                               </div>
                           </div>
                           <div class="col-md-6">
                               <div class="row">
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #9ea99e;">
                                           <span style="color: #717171">Organizaciones</span>
                                           <br>
                                           <span style="color: #717171">Nacionales</span>
                                           <br>
                                           <span style="color: #717171">Privadas 4%</span>
                                       </li>
                                   </div>
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #616961;">
                                           <span style="color: #717171">Recursos</span>
                                           <br>
                                           <span style="color: #717171">Propios 2%</span>
                                       </li>
                                   </div>
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #5d7fc8;">
                                           <span style="color: #717171">FoNC</span>
                                           <br>
                                           <span style="color: #717171">22%</span>
                                       </li>
                                   </div>
                                   <div class="col-md-12" style="text-align: left;font-weight: bold;">
                                       <li style="border-left: thick solid  #700e24;">
                                           <span style="color: #717171">Organizaciones</span>
                                           <br>
                                           <span style="color: #717171">Nacionales</span>
                                           <br>
                                           <span style="color: #717171">Públicas 36%</span>
                                       </li>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </ul>
                </div>
            </div>





        </div>
    </div>
</article>



<scrip src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></scrip>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha256-t9UJPrESBeG2ojKTIcFLPGF7nHi2vEc7f5A2KpH/UBU=" crossorigin="anonymous"></script>
<!-- DevExtreme themes -->
<link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/20.2.4/css/dx.common.css">
<link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/20.2.4/css/dx.light.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.min.js"></script>
<script src="https://emn178.github.io/chartjs-plugin-labels/src/chartjs-plugin-labels.js"></script>
<script src="https://cdn.jsdelivr.net/gh/emn178/chartjs-plugin-labels/src/chartjs-plugin-labels.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/styles/shCore.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/styles/shThemeDefault.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shCore.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shBrushJScript.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shBrushXml.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
<script src="js/index.js"></script>
<script src="js/chartApi.js"></script>



<script>




</body>
</html>
