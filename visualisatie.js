const sel = document.getElementById("cursus-select");
var vakken = null;
$(document).ready (function(){
    console.log("in");

    fetch('cgi-bin/courses.py')
        .then(res => res.json())
        .then(res => {
            vakken = res;
            for (let course in res) {

                var option = document.createElement("option");
                option.text = res[course];
                option.value = course;
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

                let studenten = [];
                let aantallen = [];
                for (let student_id in res) {
                    studenten.push('Student ' + student_id);
                    aantallen.push(res[student_id])
                }

                Highcharts.chart('container', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: '10 studenten met de meeste fouten'
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





