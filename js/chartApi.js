var ChartApi ={};
var helpers = Chart.helpers;

Chart.defaults.global.animation.duration = 3000;

Chart.plugins.register({
    beforeUpdate: function(chart) {
        if (chart.options.sort) {
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

            meta.data.forEach((a, i) => {
                newMeta[dataIndexes[i]] = a;
                newLabels[dataIndexes[i]] = chart.data.labels[i];
            });

            meta.data = newMeta;
            chart.data.datasets[0].data = dataArray;
            chart.data.labels = newLabels;
        }
    }
});




function getParticipacionAportante(){




    api.getVieEjeIndicativo({}, function (data){

        if(data && data.ano_carge) {
            console.log(data);

            $total = parseInt(data.gob);
            $total += parseInt(data.inter);
            $total += parseInt(data.org_nal_pri);
            $total += parseInt(data.org_nal_pub);
            $total += parseInt(data.mun);
            $total += parseInt(data.com);
            $total += parseInt(data.rp);
            $total += parseInt(data.fonc);

            var $dataAPortante = {
                "gob": getPorcentaje(data.gob,$total, 100),
                "inter": getPorcentaje(data.inter,$total, 100),
                "privado": getPorcentaje(data.org_nal_pri,$total, 100),
                "publica": getPorcentaje(data.org_nal_pub,$total, 100),
                "mun": getPorcentaje(data.mun,$total, 100),
                "fonc" : getPorcentaje(data.fonc,$total, 100),
                "comunidad" : getPorcentaje(data.com,$total, 100,6),
                "rp" : getPorcentaje(data.rp,$total, 100),
            };

            $("#comunidad").html($dataAPortante.comunidad+"%");
            $("#gob").html($dataAPortante.gob+"%");
            $("#inter").html($dataAPortante.inter+"%");
            $("#mun").html($dataAPortante.mun+"%");
            $("#privado").html($dataAPortante.privado+"%");
            $("#rpp").html($dataAPortante.rp+"%");
            $("#foncc").html($dataAPortante.fonc+"%");
            $("#publica").html($dataAPortante.publica+"%");


            console.log($dataAPortante);


            if(ChartApi["participacion-inversion-por-aportante"] != null){
                ChartApi["participacion-inversion-por-aportante"].data.datasets =[];
                ChartApi["participacion-inversion-por-aportante"].update();
            }

            ChartApi["participacion-inversion-por-aportante"]  = new Chart(document.getElementById("participacion-inversion-por-aportante"), {
                type: "doughnut",
                data: {
                    labels: [
                        'Comunidad',
                        'Gobernaciones',
                        'Entidadad Internacional',
                        'Municipios',
                        'Organización Nacionales Privadas',
                        'Recursos Propios',
                        'FoNC',
                        'Organización Nacionales públicas'
                    ],
                    datasets: [
                        {
                            label: "label",
                            data: [
                                $dataAPortante.comunidad,
                                $dataAPortante.gob,
                                $dataAPortante.inter,
                                $dataAPortante.mun,
                                $dataAPortante.privado,
                                $dataAPortante.tercero,
                                $dataAPortante.fonc,
                                $dataAPortante.publica,
                            ],
                            backgroundColor: [
                                '#FFCE56',
                                '#ff2929',
                                '#1d9221',
                                '#1c6020',
                                '#9ea99e',
                                '#616961',
                                '#5d7fc8',
                                '#700e24',
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


        var AMBIENTAL = data.find(x => x.eje === "AMBIENTAL");
        var GOBERNANZA =  data.find(x => x.eje === "GOBERNANZA");
        var ECONOMICO =  data.find(x => x.eje === "ECONOMICO");
        var SOCIAL = data.find(x => x.eje === "SOCIAL");

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
            console.log(data);



            $total = parseInt(api.dataEjeInidicativo1["AMBIENTAL"].total);
            $total += parseInt(api.dataEjeInidicativo1["GOBERNANZA"].total);
            $total += parseInt(api.dataEjeInidicativo1["ECONOMICO"].total);
            $total += parseInt(api.dataEjeInidicativo1["SOCIAL"].total);
            console.log($total);

            $dataEje = [
                {"AMBIENTAL" : getPorcentaje(api.dataEjeInidicativo1["AMBIENTAL"].total, $total,100)},
                {"GOBERNANZA" :getPorcentaje(api.dataEjeInidicativo1["GOBERNANZA"].total, $total, 100)},
                {"ECONOMICO": getPorcentaje(api.dataEjeInidicativo1["ECONOMICO"].total,  $total,100)},
                {"SOCIAL" : getPorcentaje(api.dataEjeInidicativo1["SOCIAL"].total,  $total,100)},
            ];



            $dataEje = $dataEje.sort(function(a, b) {
                if (a[Object.keys(a)] > b[Object.keys(b)]) return 1;
                return -1;
            });

            $labelEje = [];
            $dataValue = [];

            $dataEje.forEach(x => {
                $labelEje.push(Object.keys(x)[0]);
            });


            $dataEje.forEach(x => {
                $dataValue.push(x[Object.keys(x)]);

            });


            if(ChartApi["participacion-inversion-por-eje"] != null){
                ChartApi["participacion-inversion-por-eje"].data.datasets = [];
                ChartApi["participacion-inversion-por-eje"].update();
            }

            ChartApi["participacion-inversion-por-eje"] = new Chart(document.getElementById('participacion-inversion-por-eje'), {
                type: 'bar',
                data: {
                    labels:$labelEje,
                    datasets: [
                        {
                            data: $dataValue,
                            backgroundColor: [
                                '#0d1c45',
                                '#259261',
                                '#0c8ecf',
                                '#960303'
                            ],
                            order: 1
                        }
                    ],
                    order: 1
                },
                options: {
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
                                    stepSize: 15
                                }
                            }
                        ]
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
                                console.log(tooltipModel);
                                var innerHtml = '<thead>';
                                let url = "";
                                titleLines.forEach(function(title) {
                                    console.log(title);
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
                                console.log(bodyLines);
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








