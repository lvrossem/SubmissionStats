const sel = document.getElementById("cursus-select");

$(document).ready (function(){


    fetch('cgi-bin/courses.py')
        .then(res => res.json())
        .then(res => {

            for (let course in res) {

                let option = document.createElement("option");
                option.text = res[course];
                option.value = course;
                sel.add(option);
            }
        })

});

$(function () {
    var chart;
    $("#update-knop").click(function () {


        fetch('cgi-bin/submissions.py?data=' + sel.options[sel.selectedIndex].value.toString())
            .then(res => res.json())
            .then(res => {

                let studenten = [];
                let aantallen = [];
                for (let student_id in res) {
                    studenten.push('Student ' + student_id);
                    aantallen.push(res[student_id])
                }

                Highcharts.chart('container', {



                    chart: {
                        type: 'bar',
                        backgroundColor: '#232B2B'
                    },
                    title: {
                        text: '10 studenten met de meeste fouten',
                        style: {
                            color: '#808080'
                        }
                    },

                    legend: {
                        enabled: false,
                    },

                    xAxis: {
                        categories: studenten,
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Aantal foute inzendingen',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },

                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },

                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Aantal',
                        data: aantallen
                    }]
            });

            });
    });
});

Highcharts.setOptions({
        colors: ['#DC3D24'],
        plotOptions: {
            column: {
                colorByPoint: true
            }
        }

    });





