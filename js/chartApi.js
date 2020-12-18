var ChartApi ={};
var helpers = Chart.helpers;

Chart.defaults.global.animation.duration = 3000;



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




function getParticipacionAportante(){




    api.getVieEjeIndicativo({}, function (data){

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

            $("#comunidad").html($dataAPortante.comunidad+"%");
            $("#gob").html($dataAPortante.gob+"%");
            $("#inter").html($dataAPortante.inter+"%");
            $("#mun").html($dataAPortante.mun+"%");
            $("#privado").html($dataAPortante.privado+"%");
            $("#rpp").html($dataAPortante.rp+"%");
            $("#foncc").html($dataAPortante.fonc+"%");
            $("#publica").html($dataAPortante.publica+"%");
            $("#especiales").html($dataAPortante.especiales+"%");

            if($dataAPortante.comunidad == 0){
                $("#comunidad").parent().parent().hide();
            }else{
                $("#comunidad").parent().parent().show();
            }

            if($dataAPortante.gob == 0){
                $("#gob").parent().parent().hide();
            }else{
                $("#gob").parent().parent().show();
            }

            if($dataAPortante.inter == 0){
                $("#inter").parent().parent().hide();
            }else{
                $("#inter").parent().parent().show();
            }


            if($dataAPortante.mun == 0){
                $("#mun").parent().parent().hide();
            }else{
                $("#mun").parent().parent().show();
            }

            if($dataAPortante.privado == 0){
                $("#privado").parent().parent().hide();
            }else{
                $("#privado").parent().parent().show();
            }

            if($dataAPortante.rp == 0){
                $("#rpp").parent().parent().hide();
            }else{
                $("#rpp").parent().parent().show();
            }

            if($dataAPortante.fonc == 0){
                $("#foncc").parent().parent().hide();
            }else{
                $("#foncc").parent().parent().show();
            }

            if($dataAPortante.publica == 0){
                $("#publica").parent().parent().hide();
            }else{
                $("#publica").parent().parent().show();
            }

            if($dataAPortante.comunidad == 0){
                $("#especiales").parent().parent().hide();
            }else{
                $("#especiales").parent().parent().show();
            }

            if($dataAPortante.especiales == 0){
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
                    labels: [
                        'Comunidad',
                        'Gobernaciones',
                        'Entidadad Internacional',
                        'Municipios',
                        'Recursos Propios',
                        'FoNC',
                        'Especie',
                        'organizaciones Nacionales públicas',
                        'Organizaciones Nacionales Privadas'
                        
                    ],
                    datasets: [
                        {
                            label: "label",
                            data: [
                                $dataAPortante.comunidad,
                                $dataAPortante.gob,
                                $dataAPortante.inter,
                                $dataAPortante.mun,
                                $dataAPortante.tercero,
                                $dataAPortante.fonc,
                                $dataAPortante.especiales,
                                $dataAPortante.publica,
                                $dataAPortante.privado,
                            ],
                            backgroundColor: [
                                '#f36868',
                                '#d74747',
                                '#c43535',
                                '#ae1e1e',
                                '#ac1212',
                                '#990a0a',
                                '#8d0505',
                                '#700000',
                                '#9d1111',
                            ]
                        }
                    ]
                },
                options:  {

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
                        },
                        position: 'left',

                    },
                },
            });


        }

    });
}

function getParticipacionEje(){
    api.getVieEjeIndicativo1({}, function (data){


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

        if (data && data[0].ano_carge) {




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
                $dataEje += ""+title+":"+total+":"+color+",";
            });


            //var data = "{GOBERNANZA:0.36},{AMBIENTAL:3.86},{SOCIAL:44.86},{ECONOMICO:50.92}".split(",");
            let dataValue = [];
            let dataLabel = [];
            let dataColor = [];
            $dataEje.split(",").forEach(x => {
                let d = x.split(":");
                if(d[0] != "" && d[1] != 0){
                    dataValue.push(parseFloat(d[1]));
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



            if(ChartApi["participacion-inversion-por-eje"] != null){
                ChartApi["participacion-inversion-por-eje"].data.datasets = [];
                ChartApi["participacion-inversion-por-eje"].clear();
            }

            ChartApi["participacion-inversion-por-eje"] = new Chart(document.getElementById('participacion-inversion-por-eje'), {
                type: 'bar',
                data: {
                    labels:dataLabel,
                    datasets: [
                        {
                            data: dataValue,
                            backgroundColor: dataColor,
                            order: 1
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
                                    stepSize: 25
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
                                titleLines.forEach(function(title) {

                                    innerHtml += '<tr><th>' + title + '</th></tr>';
                                    if(title.toLowerCase().includes("económico")){
                                        url = "https://federaciondecafeteros.org/sostenibilidad/eje-economico/";
                                    }else if(title.toLowerCase().includes("social")){
                                        url = "https://federaciondecafeteros.org/sostenibilidad/eje-social/";
                                    }
                                    else if(title.toLowerCase().includes("gobernanza")){
                                        url = "https://federaciondecafeteros.org/sostenibilidad/eje-gobernaza/";
                                    }
                                    else if(title.toLowerCase().includes("ambiental")){
                                        url = "https://federaciondecafeteros.org/sostenibilidad/eje-ambiental/";
                                    }
                                });
                                innerHtml += '</thead><tbody>';

                                let html = "<hr><span>Buscamos Contribuir a la rentabilidad del caficultor" +
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
        }
    });
}








