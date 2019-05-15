const sel = document.getElementById("cursus-select");
var vakken = null;
$(document).ready (function(){
    console.log("in");

    fetch('cgi-bin/courses.py')
        .then(res => res.json())
        .then(res => {
            vakken = res;
            for (let k in res) {

                var option = document.createElement("option");
                option.text = res[k];
                option.value = k;
                sel.add(option);
            }
        })

});

$(function () {
    var chart;
    $("#update-knop").click(function () {
        console.log(sel.options[sel.selectedIndex].value);

        fetch('cgi-bin/submissions.py?data=' + sel.options[sel.selectedIndex].value.toString())
            .then(res => res.json())
            .then(res => {

                processed_json = [];
                let totaal = 0;
                for (let student_id in res) {
                    totaal += res[student_id];
                }

                for (let student_id in res) {
                    processed_json.push({name: "Student " + student_id, y: res[student_id] / totaal * 100});
                    console.log(res[student_id] / totaal * 100);
                }


                Highcharts.chart('container', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        title: 'Inzendingen per student'
                    },

                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Inzendingen',
                        colorByPoint: true,
                        data: processed_json
            }]
            });


            });
    });
});





