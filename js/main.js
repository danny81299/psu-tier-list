function request(site, callback, callbackArgs) {
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("GET", site, true);
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            callback(data, callbackArgs);
        }
    }
    
    xmlhttp.send();
    
}

function changeData(data, argsarr) {
    
    var args = argsarr[0], out = "";
    
    for (var i = 0; i < data.length; i++) { // value second part of && represents max length of returned results
        var el = data[i];
        
        out += 'Brand: ' + el.brand + '<br>Series: ' + el.series + '<br><br>';
    }
    
    document.getElementById(args.id).innerHTML = out;
}

function filterArray(arr, param, args) {

    // var el = arr;
    // this thing needs to be able to handle the different params as && and the different args as ||

    for (var i = 0; i < param.length; i++) {
        
        arr.filter(function (data) {

            for (var j = 0; j < param[i].length; j++) {

                data.filter(function(el) {
                    return 
                });

            }

        });

    }

}



request("/json/psu.json", changeData, [{"id":"changeme"}]);