var modalArray = [];

$(document).ready(function () {
    $("#results_table").DataTable().destroy();
    $.ajax({
        type: "GET",
        url: "/task/response",
        success: function (result) {

            $("#response_content tr").remove();
            for (var i = 0; i < result.results.length; i++) {
                if (i === 0) {
                    $("#response_content").append("<tr class='resTableRow'><td>" + result.results[i].process_id +
                        "</td><td>" + result.results[i].description + "</td><td>" +
                        result.results[i].visualization + "</td><td>" +
                        result.results[i].process_name + "</td><td>" +
                        result.results[i].process_user + "</td><td>" +
                        result.results[i].process_date +
                        "</td><td><div class='btn-toolbar'><button style='padding: 0.4vh 4vh; font-weight: bolder;' type='button' class='btn btn-success btn-xs viewres' onclick='getMyCharts(" +
                        result.results[i].process_id + ")'>View</button></div></td></tr>");
                }
                else {
                    if (result.results[i].process_id != result.results[i - 1].process_id)
                        $("#response_content").append("<tr class='resTableRow'><td>" + result.results[i].process_id +
                            "</td><td>" + result.results[i].description + "</td><td>" +
                            result.results[i].visualization + "</td><td>" +
                            result.results[i].process_name + "</td><td>" +
                            result.results[i].process_user + "</td><td>" +
                            result.results[i].process_date +
                            "</td><td><div class='btn-toolbar'><button style='padding: 0.4vh 4vh; font-weight: bolder;' type='button' class='btn btn-success btn-xs viewres' onclick='getMyCharts(" +
                            result.results[i].process_id + ")'>View</button></div></td></tr>");
                }
            }
            $("#results_table").DataTable({
                "order": [[0, "desc"]]
            });
        },
        error: function () {
            showAlert("Server Error", "Could not retrieve responses");
        }
    });


});
$(".getReport").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/getReport",

    });
    console.log("hello richard");
});
var taskChoicesArray = ["BENCHMARKING_I", "BENCHMARKING_II", "REPLICATION"];

function getMyCharts(id) {
    modalArray = [];
    resetModalTabs();
    resetModalContent();

    $.ajax({
        type: "GET",
        url: "/task/response",
        success: function (result) {
            for (var i = 0; i < result.results.length; i++) {
                if (result.results[i]["process_id"] == id) {
                    modalArray.push(result.results[i]);
                }
            }
            console.log(modalArray);
            var t = modalArray[0].process_name;
            var u = t.toUpperCase();
            $(".whichTask").html(u);
            if (u === taskChoicesArray[0] || u === taskChoicesArray[1]) {
                renderBenchmarkTabs();
            }
            else if (u === taskChoicesArray[2]) {
                renderReplicationTabs();
            }
            $("#myModal").modal();

        },
        error: function () {
            showAlert("Server Error", "Could not retrieve responses");
        }
    });


}

var list1 = $(".list1Tab");
var list2 = $(".list2Tab");
var list3 = $(".list3Tab");
var list4 = $(".list4Tab");


var buttonContainerTab1 = $(".buttonContainerTab1");
var buttonContainerTab2 = $(".buttonContainerTab2");
var buttonContainerTab3 = $(".buttonContainerTab3");
var buttonContainerTab4 = $(".buttonContainerTab4");

function renderBenchmarkTabs() {
    $(".yaxisDiv").css("right", "-24%");
    list3.addClass("hidden");
    list4.addClass("hidden");
    renderBenchmarkTabOne();
    renderBenchmarkTabTwo();


}

function renderBenchmarkTabOne() {
    var button1 = $("<button>");
    var button2 = $("<button>");
    $(".listTitle1").text("COMPARISON");
    button1.text("ROC/AUC");
    button1.addClass("subTab duo roc/auc");
    button1.attr("id", "out_of_time_testing");
    button2.text("Variable Importance");
    button2.addClass("subTab duo var_imp");
    button2.attr("id", "var_imp_h2o");
    buttonContainerTab1.append(button1).append(button2);
}

function renderBenchmarkTabTwo() {
    var button1 = $("<button>");
    $(".listTitle2").text("DIAGNOSTICS");
    button1.text("1D Partial Dependence");
    button1.addClass("subTab uno pdp");
    button1.attr("id", "MAS");
    buttonContainerTab2.append(button1);
}


function renderReplicationTabs() {
    $(".yaxisDiv").css("right", "-17%");
    list3.removeClass("hidden");
    list4.removeClass("hidden");
    renderReplicationTab1();
    renderReplicationTab2();
    renderReplicationTab3();
    renderReplicationTab4();
}

function renderReplicationTab1() {
    var button1 = $("<button>");
    var button2 = $("<button>");
    $(".listTitle1").text("REGRESSION COMPARISON");
    button1.text("regression");
    button1.addClass("subTab duo regcomp");
    button1.attr("id", "regcomp-reg");
    button2.text("standard error");
    button2.addClass("subTab duo regcomp");
    button2.attr("id", "regcomp-std");
    buttonContainerTab1.append(button1).append(button2);

}

function renderReplicationTab2() {
    var button1 = $("<button>");
    var button2 = $("<button>");
    var button3 = $("<button>");
    $(".listTitle2").text("DIFF IN PREDICTED PROBABILITIES");
    button1.text("In-time-training");
    button1.addClass("subTab trio predProb");
    button1.attr("id", "predProbdprob-tr");
    button2.text("In-time-test");
    button2.addClass("subTab trio predProb");
    button2.attr("id", "predProbdprob-ts");
    button3.text("Out-time-test");
    button3.addClass("subTab trio predProb");
    button3.attr("id", "predProbdprob-oot");
    buttonContainerTab2.append(button1).append(button2).append(button3);

}

function renderReplicationTab3() {
    var button1 = $("<button>");
    var button2 = $("<button>");
    var button3 = $("<button>");
    $(".listTitle3").text("OTHER PERFORMANCE METRICS");
    button1.text("In-time-training");
    button1.addClass("subTab trio compClass");
    button1.attr("id", "compClsdprob-tr");
    button2.text("In-time-test");
    button2.addClass("subTab trio compClass");
    button2.attr("id", "compClsdprob-ts");
    button3.text("Out-time-test");
    button3.addClass("subTab trio compClass");
    button3.attr("id", "compClsdprob-oot");
    buttonContainerTab3.append(button1).append(button2).append(button3);

}

function renderReplicationTab4() {
    var button1 = $("<button>");
    var button2 = $("<button>");
    var button3 = $("<button>");
    $(".listTitle4").text("DIAGNOSTICS");
    button1.text("In-time-training");
    button1.addClass("subTab trio Diag");
    button1.attr("id", "diagdprob-tr");
    button2.text("In-time-test");
    button2.addClass("subTab trio Diag");
    button2.attr("id", "diagdprob-ts");
    button3.text("Out-time-test");
    button3.addClass("subTab trio Diag");
    button3.attr("id", "diagdprob-oot");
    buttonContainerTab4.append(button1).append(button2).append(button3);

}

function resetModalTabs() {
    buttonContainerTab1.empty();
    buttonContainerTab2.empty();
    buttonContainerTab3.empty();
    buttonContainerTab4.empty();
}

function resetModalContent() {
    $(".implosion").empty();

}

// onclick function that appends graph to main div


// $("button").on("click", function () {
//     var tempArray = [];
//     var clickedVal = $(this)[0].attributes[0].value;
//     var regcomp = $(this).hasClass("regcomp");
//     var predProb = $(this).hasClass("predProb");
//     var compClass = $(this).hasClass("compClass");
//     var Diag = $(this).hasClass("Diag");
//
//     console.log(tempArray);
//     for (var i = 0; i < modalArray.length; i++) {
//         if (modalArray[i].visualization === clickedVal) {
//             tempArray.push(modalArray[i]);
//         }
//     }
//
//     if (regcomp) {
//         $(".implosion").empty();
//         $("#regCompDiv").html(tempArray[0].response_content);
//         regcomp === false;
//         tempArray = [];
//     }

// if (predProb) {
//     $(".implosion").empty();
//     console.log("im in");
//     for (var i = 0; i < tempArray.length; i++) {
//         if (tempArray[i].description === "predprob") {
//             $("#diffProbTableSummary").html(tempArray[i].response_content);
//         }
//         if (tempArray[i].description === "boxplot") {
//             $("#diffProbBox").html(tempArray[i].response_content);
//         }
//         if (tempArray[i].description === "roc/auc") {
//             $("#diffProbRoc").html(tempArray[i].response_content);
//         }
//     }
//     predProb === false;
//     tempArray = [];
// }
//
// if (compClass) {
//     $(".implosion").empty();
//     console.log("im in");
//     for (var i = 0; i < tempArray.length; i++) {
//         console.log("---------------------------------------------");
//         if (tempArray[i].description === "ks_stat") {
//             $("#compClassks_stat").html(tempArray[i].response_content);
//         }
//         if (tempArray[i].description === "ks_table") {
//             $("#compClassks_table").html(tempArray[i].response_content);
//         }
//         if (tempArray[i].description === "ks_chart") {
//             $("#compClassks_chart").html(tempArray[i].response_content);
//         }
//         if (tempArray[i].description === "gains_chart") {
//             $("#compClassgains_chart").html(tempArray[i].response_content);
//         }
//         if (tempArray[i].description === "gains_table") {
//             $("#compClassBox").html(tempArray[i].response_content);
//         }
//         if (tempArray[i].description === "odds_ratio") {
//             $("#compClassodds_ratio").html(tempArray[i].response_content);
//         }
//     }
//     tempArray = [];
//     compClass === false;
// }

// if (Diag) {
//     $(".implosion").empty();
//     console.log("im in");
//     for (var i = 0; i < tempArray.length; i++) {
//         if (tempArray[i].description === "predgk") {
//             $("#diagDiv").html(tempArray[i].response_content);
//         }
//     }
//     tempArray = [];
//     Diag === false;
// }


// });


$(".listEvent").on("click", ".subTab", function () {

    var tempArray = [];
    var clickedVal = $(this)[0].id;
    console.log(clickedVal);

    for (var i = 0; i < modalArray.length; i++) {
        if (modalArray[i].description === clickedVal || modalArray[i].visualization === clickedVal) {
            tempArray.push(modalArray[i]);
        }
    }
    console.log(tempArray);
    switch (clickedVal) {
        case "out_of_time_testing":
            displayRocAucBm(tempArray);
            break;
        case "var_imp_h2o":
            displayVarImportBm(tempArray);
            break;
        case "MAS":
            displayPartDepBm(tempArray);
            break;
        case "regcomp-reg":
            displayRegressionReg(tempArray);
            break;
        case "regcomp-std":
            displayRegressionStd(tempArray);
            break;
        case "predProbdprob-tr":
            displayPredProbTr(tempArray);
            break;
        case "predProbdprob-ts":
            displayPredProbTs(tempArray);
            break;
        case "predProbdprob-oot":
            displayPredProbOot(tempArray);
            break;
        case "compClsdprob-tr":
            displayCompClassTr(tempArray);
            break;
        case "compClsdprob-ts":
            displayCompClassTs(tempArray);
            break;
        case "compClsdprob-oot":
            displayCompClassOot(tempArray);
            break;
        case "diagdprob-tr":
            displayDiagTr(tempArray);
            break;
        case "diagdprob-ts":
            displayDiagTs(tempArray);
            break;
        case "diagdprob-oot":
            displayDiagOot(tempArray);
            break;
        default:
            console.log("didn't get in switch block");
    }
});

// ERIND BM_II  ERIND BM_II  ERIND BM_II  ERIND BM_II
function displayRocAucBm(tempArray) {
    resetModalContent();
    console.log("roc/auc");
    console.log(tempArray);
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab1Content").append(tempArray[i].response_content);
        $("#tab1Content").append(tempArray[i].response_content);
        $("#tab1Content").append(tempArray[i].response_content);
    }
}

function displayVarImportBm(tempArray) {
    resetModalContent();
    console.log("variable importance");
    console.log(tempArray);
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab1Content").append(tempArray[i].response_content);
        $("#tab1Content").append(tempArray[i].response_content);

    }

}

function displayPartDepBm(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
        $("#tab2Content").append(tempArray[i].response_content);
    }

}

function displayRegressionReg(tempArray) {
    console.log(tempArray);
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab1Content").append(tempArray[i].response_content);
    }

}

function displayRegressionStd(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab1Content").append(tempArray[i].response_content);
    }
}

function displayPredProbTr(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab2Content").append(tempArray[i].response_content);
    }

}

function displayPredProbTs(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab2Content").append(tempArray[i].response_content);
    }

}

function displayPredProbOot(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab2Content").append(tempArray[i].response_content);
    }

}

function displayCompClassTr(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab3Content").append(tempArray[i].response_content);
    }

}

function displayCompClassTs(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab3Content").append(tempArray[i].response_content);
    }

}

function displayCompClassOot(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab3Content").append(tempArray[i].response_content);
    }

}

function displayDiagTr(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab4Content").append(tempArray[i].response_content);
    }

}

function displayDiagTs(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab4Content").append(tempArray[i].response_content);
    }

}

function displayDiagOot(tempArray) {
    resetModalContent();
    for (var i = 0; i < tempArray.length; i++) {
        $("#tab4Content").append(tempArray[i].response_content);
    }

}






