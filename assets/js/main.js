var config1 = liquidFillGaugeDefaultSettings();
// config1.circleColor = "blue";
// config1.textColor = "white";
// config1.waveTextColor = "#FFAAAA";
// config1.waveColor = "#FFDDDD";
// config1.circleThickness = 0.1;
// config1.circleFillGap = 0.0;
// config1.textVertPosition = 0.2;

var gauge2 = loadLiquidFillGauge("fillgauge2", 6.12, config1);
var config2 = liquidFillGaugeDefaultSettings();
config2.waveColor = "#a5db48";
var gauge3 = loadLiquidFillGauge("fillgauge3", 60.44, config2);
var config3 = liquidFillGaugeDefaultSettings();
config3.waveColor = "orangered";
var gauge5 = loadLiquidFillGauge("fillgauge5", 18.54, config3);


function NewValue() {
    if (Math.random() > .5) {
        return Math.round(Math.random() * 100);
    } else {
        return (Math.random() * 100).toFixed(1);
    }
}

var repTimer;
var bm1Timer;
var bm2Timer;
var kRep = 0.15;
var kBm1 = 0.25;
var kBm2 = 0.05;


function changeRepBar(k) {

    d3.select("#replicationProg").call(drawCircularProgressBar, k);

    if (kRep > 1) {
        clearInterval(repTimer);
    }
}

function changeBm1Bar(k) {
    d3.select("#bm1Prog").call(drawCircularProgressBar, k);
}

function changeBm2Prog(k) {
    d3.select("#bm2Prog").call(drawCircularProgressBar, k);
}

repTimer = setInterval(function () {
    kRep += 0.01;
    if (kRep <= 1) {
        changeRepBar(kRep);
    } else {
        changeRepBar(1)
    }
}, 100);


d3.select("#replicationProg").call(drawCircularProgressBar, kRep);
d3.select("#bm1Prog").call(drawCircularProgressBar, kBm1);
d3.select("#bm2Prog").call(drawCircularProgressBar, kBm2);


function fix(k) {
    var t0, t1 = k * 2 * Math.PI;

    // Solve for theta numerically.
    if (k > 0 && k < 1) {
        t1 = Math.pow(12 * k * Math.PI, 1 / 3);
        for (var i = 0; i < 10; ++i) {
            t0 = t1;
            t1 = (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) / (1 - Math.cos(t0));
        }
        k = (1 - Math.cos(t1 / 2)) / 2;
    }
    return k;
}

function drawCircularProgressBar(selection, k) {
    if (selection) {
        var r = 240; // radius of the ball

        var h = 0;
        var zero = 0;
        var one = 0;
        var text = "N/A";
        if (k >= 0) {
            var fixed = fix(k);
            h = r * 2 * (1 - fixed);
            zero = 1;
            one = k;
            text = parseInt(k * 100) + "%";
        }

        selection.selectAll("svg").remove();
        selection.append("svg").attr("width", "100%").attr("height", "100%")
            .attr("viewBox", "0 0 " + r * 2 + " " + r * 2)
            .call(function (e) {
                var defs = e.append("defs")
                var clip = defs.append("clipPath").attr("id", "clip")
                    .append("rect").attr("x", "-" + r).attr("y", "-" + r)
                    .attr("width", r * 2).attr("height", h);

                g = e.append("g").attr("transform", "translate(" + r + "," + r + ")");
                g.append("circle").attr("r", r).attr("class", "na");
                g.append("circle").attr("r", r).style("fill-opacity", zero).attr("class",
                    "zero");
                g.append("circle").attr("r", r).style("fill-opacity", one).attr("class", "one");
                g.append("circle").attr("r", r).style("fill", "#333").style("fill-opacity", 0.5)
                    .attr(
                        "clip-path", "url(#clip)");
                g.append("text").attr("class", "value").attr("text-anchor", "middle").attr(
                    "font-size", "100").style("fill", "white").style("fill-opacity", .7).text(
                    text);
            });
    }
}