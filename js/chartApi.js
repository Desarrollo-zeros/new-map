var ChartApi ={};
var helpers = Chart.helpers;

$(document).ready(function (){





    ChartApi["participacion-inversion-por-eje"] = new Chart(document.getElementById('participacion-inversion-por-eje'), {
        type: 'bar',
        data: {
            labels:["Económico","Social","Ambiental","Gobernanza"],
            datasets: [
                {

                    data: [55, 45, 20, 5],
                    backgroundColor: [
                        '#FFCE56',
                        '#235270',
                        '#2e8326',
                        '#722323'
                    ]
                }
            ],
            /*datasets: [
                {
                    label:"Económico",
                    data: [55],
                    backgroundColor: [
                        '#FFCE56',
                    ]
                },
                {
                    label:"Social",
                    data: [45],
                    backgroundColor: [
                        '#235270',

                    ]
                },
                {
                    label:"Ambiental",
                    data: [20],
                    backgroundColor: [
                        '#2e8326',

                    ]
                },
                {
                    label:"Gobernanza",
                    data: [5],
                    backgroundColor: [
                        '#722323',

                    ]
                }
            ]*/
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
                position: 'bottom',
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
                    data: [7, 7, 8,14,4,2,22,36],
                    backgroundColor: [
                        '#FFCE56',
                        '#cf1a1a',
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
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                labels: {

                    position: 'outside'
                }
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(2,2,2)',
                    strokeStyle : 'rgb(2,2,2)',
                    padding : 20,
                    boxWidth : 60
                },
                position: 'left',
                align : 'end'
            },
        },
    });

});



