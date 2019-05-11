$(document).ready (function(){
    console.log("in");

    fetch('cgi-bin/courses2.cgi')
        .then(res => res.json())
        .then(res => {
            for (let k in res) {
                var sel = document.getElementById("course-select");
                var option = document.createElement("option");
                option.text = res[k];
                option.value = k;
                sel.add(option);
            }
        })

});