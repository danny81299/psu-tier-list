
"use strict";
var ORIGDATA = [];

/* -------------------------

    makes data request with arguments site, callback, and callbackArgs
    site: url to get
    callback: function to use following completion of function, takes arguments
        callback(data,callbackArgs)
        where callbackArgs is an array with one json object as follows [{name:value,name:value}]
        callback function can use callbackArgs[0] as object
            var args = callbackArgs[0];
            if(args.type == reqType) {code;};

------------------------- */

function request(site, callback, callbackArgs) {
    "use strict";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", site, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            callback(data, callbackArgs);
        }
    };
    xmlhttp.send();
}

/* -------------------------

    filters array based on parameters and their arguments
    parameters
        [parameter1,parameter2,parameter3,...]
    args
        [[p1arg1,p1arg2],[p2arg1,p2arg2],[p3arg1,p3arg2],...]
    args treated as OR, parameters treated as AND

------------------------- */

/*function filterArray(arr, param, args) {

    // var el = arr;
    // this thing needs to be able to handle the different params as && and the different args as ||

    // AND filter

    var andResult = [];
    var workingData = arr;

    for (var j = 0; j < param.length; j++) {
        // OR filter
        var orResult = [];

        for (var i = 0; i < workingData.length; i++) {
            for (var k = 0; k < args[j].length; k++) {
                if (workingData[i][param[j]] == args[j][k]) {
                    orResult.push(workingData[i]);
                }
            }
        }

        workingData = orResult;
    }

    return workingData;
}*/

function filterArray(arr, param, args) {
    "use strict";
    var workingData = arr;
    var orResult;

    param.forEach(function (parameter, paramIndex) {
        // console.log("Checking parameter " + parameter + " with index " + paramIndex);
        orResult = [];

        workingData.forEach(function (entry) {
            // console.log("Checking entry " + entry.toString() + " with index " + index_2);
            args[paramIndex].forEach(function (argument, indivArgIndex) {
                // console.log("Checking arg " + args[paramIndex] + " with individual index " + indivArgIndex);
                // console.log(entry[parameter] + ', ' + argument);
                // format for wattage args is low,hi
                if (parameter === "wattage") {
                    if (!indivArgIndex) {
                        if (entry[parameter] >= argument && entry[parameter] <= args[paramIndex][indivArgIndex + 1]) {
                            orResult.push(entry);
                        }
                    }
                } else {
                    // for each argument in the args[paramIndex] check whether value matches the entry
                    // entry.parameter where parameter is the current property being checked
                    if (entry[parameter] === argument) {
                        orResult.push(entry);
                    }
                }

            });
        });

        workingData = orResult;

    });
    return orResult;
}

// filter example
// {["brand":[148,52]]}

/*function filterPsu(arr, filterSet) {

    var workingData = arr;
    var filteredData = [];

    for (var i = 0; i < filterSet.brand.length; i++) {
        for (var j = 0; j < workingData.length; j++) {
            if (workingData[j].brand == filterSet.brand[i]) {
                filteredData.push(workingData[j]);
            }
        }
    }
    workingData = filteredData;

    for (var i = 0; i < filterSet.platformOEM.length; i++) {
        for (var j = 0; j < workingData.length; j++) {
            if (workingData[j].platformOEM == filterSet.platformOEM[i]) {
                filteredData.push(workingData[j]);
            }
        }
    }
    workingData = filteredData;

    return filteredData;

}*/

/* -------------------------

    Needed functions:
        brand/number conversion
        efficiency conversion
        pcpartpicker search
        regular search
    Additions to JSON + program:
        modularity - probably not as it's not completely required?

------------------------- */

function storeData(data, argsArr) {
    "use strict";
    if (argsArr) {return;}
    ORIGDATA = data;
    return data;
}

request("json/psu.json", storeData, []);