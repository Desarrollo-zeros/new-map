var ChartApi ={};
var helpers = Chart.helpers;

Chart.defaults.global.animation.duration = 3000;



var sites = [
    ""
];




Chart.plugins.register({
    beforeUpdate: function(chart) {

        if (chart.options.sort1) {
            let dataArray = chart.data.datasets[0].data.slice();
            let dataIndexes = dataArray.map((d, i) => i);
            dataIndexes.sort((a, b) => {
                return dataArray[a] - dataArray[b];
            });

            // sort data array as well
            dataArray.sort((a, b) => a - b);

            // At this point dataIndexes is sorted by value of the data, so we know how the indexes map to each other
            let meta = chart.getDatasetMeta(0);
            let newMeta = [];
            let labels = chart.data.labels;
            let newLabels = [];

            chart.data.datasets[0].data.forEach((a, i) => {
                newMeta[dataIndexes[i]] = a;
                newLabels[dataIndexes[i]] = chart.data.labels[i];
            });

            //meta.data = newMeta;
            chart.data.datasets[0].data = dataArray;
            chart.data.labels = newLabels;
        }
    }
});



$dataCircle = null;

function getParticipacionAportante(){
    api.getVieEjeIndicativo({}, function (data){

        if(data && data.ano_carge && !data && data[0] == undefined){
            $("#divCircular").hide();
            return;
        }

        if(data && data[0] != undefined){
            data = data[0];
        }
        if(data && data.ano_carge) {


            $total = parseInt(data.gob);
            $total += parseInt(data.inter);
            $total += parseInt(data.org_nal_pri);
            $total += parseInt(data.org_nal_pub);
            $total += parseInt(data.mun);
            $total += parseInt(data.com);
            $total += parseInt(data.rp);
            $total += parseInt(data.fonc);
            $total += parseInt(data.especiales)

            if($total == 0){
                $("#divCircular").hide();
                return;
            }
            var $dataAPortante = {
                "gob": getPorcentaje(data.gob,$total, 100),
                "inter": getPorcentaje(data.inter,$total, 100),
                "privado": getPorcentaje(data.org_nal_pri,$total, 100),
                "publica": getPorcentaje(data.org_nal_pub,$total, 100),
                "mun": getPorcentaje(data.mun,$total, 100),
                "fonc" : getPorcentaje(data.fonc,$total, 100),
                "comunidad" : getPorcentaje(data.com,$total, 100,2),
                "rp" : getPorcentaje(data.rp,$total, 100),
                "especiales" : getPorcentaje(data.especiales,$total, 100),
            };




            $dataCircle = $dataAPortante;

            let d = [
                $dataAPortante.gob+";gob;Gobernaciones",
                $dataAPortante.inter+";inter;Entidades Internacionales",
                $dataAPortante.privado+";privado;Org. N. Privadas'",
                $dataAPortante.publica+";publica;Org. N. públicas",
                $dataAPortante.mun+";mun;Municipios",
                $dataAPortante.fonc+";fonc;FoNC",
                $dataAPortante.comunidad+";comunidad;Comunidad",
                $dataAPortante.rp+";rp;Recursos Propios",
                $dataAPortante.especiales+";especiales;Especie",

            ];

            let color = [
                '#f36868',
                '#d74747',
                '#c43535',
                '#ae1e1e',
                '#ac1212',
                '#9d1111',
                '#990a0a',
                '#8d0505',
                '#700000',
            ];


            d = d.sort(function(a, b) {
                return  parseFloat(a.split(";")[0])  - parseFloat(b.split(";")[0]);
            });



            let indice = 1;
            let html = "";
            let dataCircle = [];
            let labelCircle = [];
            for(let i in d){
                if(parseFloat(d[i].split(";")[0])  == 0){
                    continue;
                }
                dataCircle.push(d[i].split(";")[0]);
                labelCircle.push(d[i].split(";")[2])
                if(indice == 1){
                    html += "<div>";
                }
                if(indice == 6){
                    html += "</div><div>";
                }
                switch (d[i].split(";")[1]){
                    case "gob" :{
                            html +=  `<div  class="" style="text-align: left;font-weight: bold;">
                                            <li style="border-left: thick solid ${color[i]};">
                                                <span style="color:  #717171;">Gobernaciones</span>
                                             <br>
                                             <span style="color:  #717171;" id="gob">${d[i].split(";")[0]}%</span>
                                        </li>
                                   </div>`;
                        break;
                    }
                    case "inter" :{
                        html += `<div  class="" style="text-align: left;font-weight: bold;">
                            <li style="border-left: thick solid  ${color[i]};">
                                <span style="color: #717171">Entidades</span>
                                    <br>
                                    <span style="color: #717171">Internacionales</span>
                                    <br>
                                    <span style="color: #717171" id="inter">${d[i].split(";")[0]}%</span>
                            </li>
                        </div>`;
                        break;
                    }
                    case "privado":{
                        html += `<div class="" style="text-align: left;font-weight: bold;">
                                                    <li style="border-left: thick solid ${color[i]};">
                                                        <span style="color: #717171">Organizaciones</span>
                                                        <br>
                                                        <span style="color: #717171">Nacionales</span>
                                                        <br>
                                                        <span style="color: #717171">Privada</span>
                                                        <br>
                                                        <span style="color: #717171" id="privado">${d[i].split(";")[0]}%</span>
                                                    </li>
                                                </div>`;
                        break;
                    }
                    case "publica":{
                        html += `<div class="" style="text-align: left;font-weight: bold;">
                                                    <li style="border-left: thick solid  ${color[i]};">
                                                        <span style="color: #717171">Organizaciones</span>
                                                        <br>
                                                        <span style="color: #717171">Nacionales</span>
                                                        <br>
                                                        <span style="color: #717171">Públicas</span>
                                                        <br>
                                                        <span style="color: #717171" id="publica">${d[i].split(";")[0]}%</span>
                                                    </li>
                                                </div>`;
                        break;
                    }
                    case "mun":{
                        html += `<div class="" style="text-align: left;font-weight: bold;">
                                                    <li style="border-left: thick solid  ${color[i]};">
                                                        <span style="color: #717171">Municipios</span>
                                                        <br>
                                                        <span style="color: #717171" id="mun">${d[i].split(";")[0]}%</span>
                                                    </li>
                                                </div>`;
                        break;
                    }
                    case "fonc":{
                        html += `<div class="" style="text-align: left;font-weight: bold;">
                                                    <li style="border-left: thick solid  ${color[i]};">
                                                        <span style="color: #717171">FoNC</span>
                                                        <br>
                                                        <span style="color: #717171" id="foncc">${d[i].split(";")[0]}%</span>
                                                    </li>
                                                </div>`;
                        break;
                    }
                    case "comunidad":{
                        html += `<div  class="" style="text-align: left;font-weight: bold;">
                                                    <li style="border-left: thick solid  ${color[i]};">
                                                        <span style="color: #717171">Comunidad</span>
                                                        <br>
                                                        <span style="color: #717171" id="comunidad">${d[i].split(";")[0]}%</span>
                                                    </li>
                                                </div>`;
                        break;
                    }
                    case "rp":{
                        html += `<div class="" style="text-align: left;font-weight: bold;">
                                                    <li style="border-left: thick solid ${color[i]};">
                                                        <span style="color: #717171">Recursos </span>
                                                        <br>
                                                        <span style="color: #717171">Propios</span>
                                                        <br>
                                                        <span style="color: #717171" id="rpp">${d[i].split(";")[0]}%</span>
                                                    </li>
                                                </div>`;
                        break;
                    }
                    case "especiales":{
                        html += `<div  class="" style="text-align: left;font-weight: bold;">
                                                    <li style="border-left: thick solid  ${color[i]};">
                                                        <span style="color: #717171">Especie</span>
                                                        <br>
                                                        <span style="color: #717171" id="especiales">${d[i].split(";")[0]}%</span>
                                                    </li>
                                                </div>`;
                        break;
                    }
                }
                indice++;

            }





            $("#legend-div-circular").html(html);



            if(parseFloat($dataAPortante.comunidad) == 0 || $dataAPortante.comunidad =="NaN"){
                $("#comunidad").parent().parent().hide();
            }else{
                $("#comunidad").parent().parent().show();
            }

            if(parseFloat($dataAPortante.gob) == 0 || $dataAPortante.gob =="NaN"){
                $("#gob").parent().parent().hide();
            }else{
                $("#gob").parent().parent().show();
            }

            if(parseFloat($dataAPortante.inter) == 0 || $dataAPortante.inter =="NaN"){
                $("#inter").parent().parent().hide();
            }else{
                $("#inter").parent().parent().show();
            }



            if(parseFloat($dataAPortante.mun) == 0 || $dataAPortante.mun =="NaN"){
                $("#mun").parent().parent().hide();
            }else{
                $("#mun").parent().parent().show();
            }

            if(parseFloat($dataAPortante.privado) == 0 || $dataAPortante.privado =="NaN" ){
                $("#privado").parent().parent().hide();
            }else{
                $("#privado").parent().parent().show();
            }

            if(parseFloat($dataAPortante.rp) == 0 || $dataAPortante.rp =="NaN"){
                $("#rpp").parent().parent().hide();
            }else{
                $("#rpp").parent().parent().show();
            }

            if(parseFloat($dataAPortante.fonc) == 0 || $dataAPortante.fonc =="NaN"){
                $("#foncc").parent().parent().hide();
            }else{
                $("#foncc").parent().parent().show();
            }

            if(parseFloat($dataAPortante.publica) == 0 || $dataAPortante.publica =="NaN"){
                $("#publica").parent().parent().hide();
            }else{
                $("#publica").parent().parent().show();
            }

            if(parseFloat($dataAPortante.comunidad) == 0|| $dataAPortante.comunidad =="NaN" ){
                $("#especiales").parent().parent().hide();
            }else{
                $("#especiales").parent().parent().show();
            }

            if(parseFloat($dataAPortante.especiales) == 0 || $dataAPortante.especiales =="NaN"){
                $("#especiales").parent().parent().hide();
            }else{
                $("#especiales").parent().parent().show();
            }

            if(ChartApi["participacion-inversion-por-aportante"] != null){
                ChartApi["participacion-inversion-por-aportante"].data.datasets =[];
                ChartApi["participacion-inversion-por-aportante"].clear();
            }

            ChartApi["participacion-inversion-por-aportante"]  = new Chart(document.getElementById("participacion-inversion-por-aportante"), {
                type: "doughnut",
                data: {
                    labels: labelCircle,
                    datasets: [
                        {
                            label: "label",
                            data: dataCircle,
                            backgroundColor: color
                        }
                    ]
                },
                options:  {
                    tooltips:{
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return (data["labels"][tooltipItem['index']] +" "+ data['datasets'][0]['data'][tooltipItem['index']] + "%")
                            },
                        },
                    },
                    plugins: {
                        labels: {
                            render: function (args) {
                                return '';
                            },
                        }
                    },
                    legend: {
                        display: false,
                        labels: {
                            fontColor: 'rgb(2,2,2)',
                            strokeStyle : 'rgb(2,2,2)',
                            padding : 10,
                            Align : 'left'
                        },
                        //position: 'right',

                    },
                },
            });


        }else{
            $("#divCircular").hide();
        }

    },function (){
        $("#divCircular").hide();
    });
}

function getParticipacionEje(){
    api.getVieEjeIndicativo1({}, function (data){


        if(data.length == 0){
            $("#divBarra").hide();
            return;
        }

        var AMBIENTAL = data.find(x => removeAccents(x.eje) === "AMBIENTAL");
        var GOBERNANZA =  data.find(x => removeAccents(x.eje) === "GOBERNANZA");
        var ECONOMICO =  data.find(x => removeAccents(x.eje) === "ECONOMICO");
        var SOCIAL = data.find(x => removeAccents(x.eje) === "SOCIAL");

        if(!AMBIENTAL){
            AMBIENTAL = {total : 0};
        }

        if(!GOBERNANZA){
            GOBERNANZA = {total : 0};
        }

        if(!ECONOMICO){
            ECONOMICO = {total : 0};
        }

        if(!SOCIAL){
            SOCIAL = {total : 0};
        }

        api.dataEjeInidicativo1 = {
            AMBIENTAL,
            GOBERNANZA,
            ECONOMICO,
            SOCIAL
        };

        if (data && data[0] && data[0].ano_carge) {




            $total = parseInt(api.dataEjeInidicativo1["AMBIENTAL"].total);
            $total += parseInt(api.dataEjeInidicativo1["GOBERNANZA"].total);
            $total += parseInt(api.dataEjeInidicativo1["ECONOMICO"].total);
            $total += parseInt(api.dataEjeInidicativo1["SOCIAL"].total);




            let amb = getPorcentaje(api.dataEjeInidicativo1["AMBIENTAL"].total, $total,100);
            let gob = getPorcentaje(api.dataEjeInidicativo1["GOBERNANZA"].total, $total,100);
            let eco = getPorcentaje(api.dataEjeInidicativo1["ECONOMICO"].total, $total,100);
            let soc = getPorcentaje(api.dataEjeInidicativo1["SOCIAL"].total, $total,100);


            let d = [
                amb+";AMBIENTAL;#259261",
                gob+";GOBERNANZA;#ff7600",
                eco+";ECONÓMICO;#960303",
                soc+";SOCIAL;#0c8ecf"
            ]





            d.sort(function(a, b) {
                return  parseFloat(a.split(";")[0])  - parseFloat(b.split(";")[0]);
            });

            $dataEje =[];

            d.forEach(x => {
                let total = x.split(";")[0];
                let title = x.split(";")[1];
                let color = x.split(";")[2];

                let totalSplit = total.split(".")[1];

                if(totalSplit && totalSplit.split("").length == 1){
                    total = total.toString()+"0";
                }

                $dataEje += ""+title+":"+total+":"+color+",";
            });




            //var data = "{GOBERNANZA:0.36},{AMBIENTAL:3.86},{SOCIAL:44.86},{ECONOMICO:50.92}".split(",");
            let dataValue = [];
            let dataLabel = [];
            let dataColor = [];
            $dataEje.split(",").forEach(x => {
                let d = x.split(":");
                if(d[0] != "" && d[1] != 0){

                    let totalSplit = d[1].split(".")[1];
                    let total = d[1];
                    if(totalSplit && totalSplit.split("").length == 1){
                        total = total.toString()+"0";
                    }

                    dataValue.push(total);
                    dataLabel.push(d[0]);
                    dataColor.push(d[2]);
                }


            });

            console.log(dataValue);
            console.log(dataLabel);
            console.log(dataColor);

            $dataEje = [
                {"AMBIENTAL" : getPorcentaje(api.dataEjeInidicativo1["AMBIENTAL"].total, $total,100)},
                {"GOBERNANZA" :getPorcentaje(api.dataEjeInidicativo1["GOBERNANZA"].total, $total, 100)},
                {"ECONOMICO": getPorcentaje(api.dataEjeInidicativo1["ECONOMICO"].total,  $total,100)},
                {"SOCIAL" : getPorcentaje(api.dataEjeInidicativo1["SOCIAL"].total,  $total,100)},
            ];



            let indexValue = 0;
            dataValue.forEach(x => {
               if(x > 0){
                   indexValue++;
               }
            });
            if(indexValue == 0){
                $("#participacion-inversion-por-eje").hide();
            }
            if(ChartApi["participacion-inversion-por-eje"] != null){
                ChartApi["participacion-inversion-por-eje"].data.datasets = [];
                ChartApi["participacion-inversion-por-eje"].clear();
            }

            ChartApi["participacion-inversion-por-eje"] = new Chart(document.getElementById('participacion-inversion-por-eje'), {
                scaleOverride : true,
                scaleSteps : 10,
                scaleStepWidth : 50,
                scaleStartValue : 0,
                type: 'bar',
                data: {
                    labels:dataLabel,
                    datasets: [
                        {
                            data: dataValue,
                            backgroundColor: dataColor,
                            order: 1,
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                        }
                    ],
                    order: 1
                },
                options: {
                    sort : true,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        labels: [
                            {
                                render: function (args) {
                                    return  args.value + '%';
                                },
                                arc: true,
                                precision: 2
                            }
                        ],

                    },
                    legend: {
                        display: false,
                        labels: {
                            fontColor: 'rgb(2,2,2)',
                            strokeStyle : 'rgb(2,2,2)',
                        },
                        position: 'top',
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    stepSize: 35,
                                    beginAtZero: true

                                },
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                }
                            }
                        ],
                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            }
                        }]
                    },
                    tooltips: {
                        enabled: false,
                        custom: function(tooltipModel) {
                            // Tooltip Element
                            var tooltipEl = document.getElementById('participacion-inversion-por-eje-tooltip');

                            tooltipEl.classList.add("active");

                            function getBody(bodyItem) {
                                return bodyItem.lines;
                            }

                            // Set Text
                            if (tooltipModel.body) {
                                var titleLines = tooltipModel.title || [];
                                var bodyLines = tooltipModel.body.map(getBody);

                                var innerHtml = '<thead>';
                                let url = "";
                                let textUrl = "";

                                var p = getUrlParams()
                                let d = p['dpto'];


                                var section = getUrl().find(x => x.section == d)


                                titleLines.forEach(function(title) {
                                    innerHtml += '<tr><th>' + title + '</th></tr>';
                                    if(title.toLowerCase().includes("económico")){
                                        textUrl = "Contribuimos a la rentabilidad del caficultor";
                                        if(section){
                                            url = section.data["economico"];
                                        }else{
                                            url =  "https://federaciondecafeteros.org/sostenibilidad/eje-economico/";
                                        }
                                    }else if(title.toLowerCase().includes("social")){
                                        textUrl =" Procuramos el desarrollo y la inclusión social y productiva de las familias y comunidades cafeteras";
                                        if(section){
                                            url = section.data["social"];
                                        }else{
                                            url = "https://federaciondecafeteros.org/sostenibilidad/eje-social/";
                                        }
                                    }
                                    else if(title.toLowerCase().includes("gobernanza")){
                                        textUrl ="Trabajamos por fortalecer la unión gremial cafetera";
                                        if(section){
                                            url = section.data["gobernanza"];
                                        }
                                        else{
                                            url = "https://federaciondecafeteros.org/sostenibilidad/eje-gobernaza/";
                                        }
                                    }
                                    else if(title.toLowerCase().includes("ambiental")){
                                        textUrl ="Promovemos la sostenibilidad ambiental en la cadena de producción de café";
                                        if(section){
                                            url = section.data["ambiental"];
                                        }else{
                                            url = "https://federaciondecafeteros.org/sostenibilidad/eje-ambiental/";
                                        }
                                    }
                                });
                                innerHtml += '</thead><tbody>';

                                let html = "<hr><span>" +textUrl+
                                    "<br>" +
                                    "<a style='font-size: 12px; text-decoration: none; color: #ffffff' href='"+url+"' target='_blank'>Enlace a la selección Sostenibilidad</a></span><hr>";
                                bodyLines.forEach(function(body, i) {
                                    var colors = tooltipModel.labelColors[i];
                                    var style = 'background:' + colors.backgroundColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    var span = '<span style="' + style + '"></span>';
                                    innerHtml += '<tr><td>' + span + html + '</td></tr>';
                                });
                                innerHtml += '</tbody>';

                                var tableRoot = tooltipEl.querySelector('table');
                                tableRoot.innerHTML = innerHtml;
                            }

                            // `this` will be the overall tooltip
                            var position = this._chart.canvas.getBoundingClientRect();



                        },
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return  ("Eje"+" "+data['labels'][tooltipItem[0]['index']]).toUpperCase();
                            },
                            label: function(tooltipItem, data) {
                                return data['datasets'][0]['data'][tooltipItem['index']];
                            },
                        },
                        backgroundColor: '#FFF',
                        titleFontSize: 16,
                        titleFontColor: '#0066ff',
                        bodyFontColor: '#000',
                        bodyFontSize: 14,
                        displayColors: false
                    },
                }
            });
        }else{
            $("#divBarra").hide();
        }
    },function (){
        $("#divBarra").hide();
    });
}








