var margin = {
        top: 20,
        right: 210,
        bottom: 50,
        left: 70
    },
    outerWidth = 1050,
    outerHeight = 750,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(-height)
    .tickFormat("");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(-width)
    .tickFormat("");

var xCat = "x",
    yCat = "y",
    nameCat = "source",
    colorCat = "cluster";

var labels = {
    "source": "Source"
}

var xMax = 50.0,
    xMin = -xMax,
    yMax = 50.0,
    yMin = -yMax;

var color = d3.scale.category20();

var tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function(d) {
        return d[nameCat].replace('\'','');
    });

var currentWeek = 1;

x.domain([xMin, xMax]);
y.domain([yMin, yMax]);

var zoomBeh = d3.behavior.zoom()
    .x(x)
    .y(y)
    .scaleExtent([0, 100])
    .on("zoom", zoom);

d3.csv("data/scatter_W1.csv", function(data) {

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh);
    svg.call(tip);
    svg.append("rect")
        .attr("width", width)
        .attr("height", height);
    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", width)
        .attr("y", margin.bottom - 10)
        .style("text-anchor", "end")
        .text("PC2");
    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("PC1");

    var objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", width)
        .attr("height", height);
    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .attr("transform", "translate(0," + height + ")");
    objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height);
    objects.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .classed("dot", true)
        .attr({
            r: function(d) {
                return 4 * Math.sqrt(10.0 / Math.PI);
            },
            cx: function(d) {
                return x(d[xCat]);
            },
            cy: function(d) {
                return y(d[yCat]);
            }
        })
    .style("fill", function(d) {
        return color(d[colorCat]);
    })
        .on("mouseover", function (d) {highlight(d);})
        .on("mouseout", tip.hide);

    // var legend = svg.selectAll(".legend")
    //     .data(color.domain())
    //     .enter().append("g")
    //     .classed("legend", true)
    //     .attr("transform", function(d, i) {
    //         return "translate(20," + i * 20 + ")";
    //     });
    //
    // legend.append("rect")
    //     .attr("x", width + 10)
    //     .attr("width", 12)
    //     .attr("height", 12)
    //     .style("fill", color);
    //
    // legend.on("click", function(type) {
    //     // dim all of the icons in legend
    //     d3.selectAll(".legend")
    //         .style("opacity", 0.1);
    //     // make the one selected be un-dimmed
    //     d3.select(this)
    //         .style("opacity", 1);
    //     // select all dots and apply 0 opacity (hide)
    //     d3.selectAll(".dot")
    //     // .transition()
    //     // .duration(500)
    //     .style("opacity", 0.0)
    //     // filter out the ones we want to show and apply properties
    //     .filter(function(d) {
    //         return d["cluster"] == type;
    //     })
    //         .style("opacity", 1) // need this line to unhide dots
    //     .style("stroke", "black");
    // });
    //
    // legend.append("text")
    //     .attr("x", width + 26)
    //     .attr("dy", ".65em")
    //     .text(function(d) {
    //         return "Cluster #" + d;
    //     });

    d3.select("button.reset").on("click", change);
});

function zoom() {
    d3.select("#scatter").select(".x.axis").call(xAxis);
    d3.select("#scatter").select(".y.axis").call(yAxis);
    d3.select("#scatter").selectAll(".dot")
        .attr({
            cx: function(d) {
                return x(d[xCat]);
            },
            cy: function(d) {
                return y(d[yCat]);
            }
        })
        // .attr("transform", transform);
}

function change() {

    zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

    var svg = d3.select("#scatter").transition();
    svg.selectAll(".dot").transition().duration(1000)
        .attr({
            r: function(d) {
                return 4 * Math.sqrt(10 / Math.PI);
            },
            cx: function(d) {
                return x(d[xCat]);
            },
            cy: function(d) {
                return y(d[yCat]);
            }
        })
}

function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
}

function highlight(d) {
    tip.show(d);
    d3.select(".cluster").html(processClusterAnnotation(d));
    d3.select("button.reset").on("click", change);
}

function processClusterAnnotation(d) {
    if (clusterAnnotation[currentWeek] !== undefined){
    var annotation = clusterAnnotation[currentWeek][d[colorCat]];
    if (annotation === undefined) { annotation = 'Unknown' };
    return "<button class='reset' style='margin-left: 8%;'>Reset Zoom</button> \
            <button class='button' style='border: none;'>Cluster annotation:<sup><a href='#fn1' id='ref1'>1</a></sup></button> \
            <button class='button' style='pointer-events:none;'>"+annotation+"</button>";
    } else {return "<button class='reset' style='margin-left: 8%;'>Reset Zoom</button>";}
}

function weekSelect(i) {
    currentWeek = i;
    // Get the data again
    d3.csv("data/scatter_W"+currentWeek+".csv", function(error, data) {
    // Make the changes

    var svg = d3.select("#scatter");
    svg.selectAll(".dot")
        .data(data)  // Update with new data
        .transition()  // Transition from old to new
        .duration(1000)  // Length of animation
        .attr({
            r: function(d) {
                return 4 * Math.sqrt(10.0 / Math.PI);
            },
            cx: function(d) {
                return x(d[xCat]);
            },
            cy: function(d) {
                return y(d[yCat]);
            }
        })
        .style("fill", function(d) {
            return color(d[colorCat]);
        });
    });

    var prev = d3.select(".button-primary");
    prev.classed("button-primary", !prev.classed("button-primary"));

    var current = d3.select(".button"+i);
    current.classed("button-primary", !current.classed("button-primary"));

}
