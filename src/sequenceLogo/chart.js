import * as d3 from "d3";
import { generateSeqData } from "./data";

// sizing
const width = 600;
const height = 300;
const margin = {left: 30, right: 30, top: 30, bottom: 30};

// append an svg object to the body of the page
let svg = d3.select("#app")
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("class", "main")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

const data = generateSeqData();

// x axis
const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.x))
    .padding(0.02)

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

// y axis
const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, Math.max(...data.map(d => d.total))])

svg.append("g")
    .call(d3.axisLeft(y))

// // rectangles
// svg.selectAll("bar")
//     .data(data)
//     .enter()
//     .append("rect")
//         .attr("x", function(d) {return x(d.x)})
//         .attr("y", function(d) {return y(d.total)})
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) {return height - y(d.total)})
//         .attr("fill", "#69b3a2")


// rectangles
svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function(d) {return x(d.x)})
        .attr("y", function(d) {return y(d.total)})
        .attr("width", x.bandwidth())
        .attr("height", function(d) {return height - y(d.total)})
        .attr("fill", "#69b3a2")


const subgroups = ['A', 'G', 'C', 'T'];
const colorscale = ['#21994e', '#f7b536', '#345e95', '#d83541']
let color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(colorscale)

var stackedData = d3.stack().keys(subgroups)(data)

svg.append("g")
    .selectAll("bars")
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) {return color(d.key)})
      .selectAll("rect")
      .data(function(d) {return d})
      .enter().append("rect")
        .attr("x", function(d) {return x(d.data.x)})
        .attr("y", function(d) {return y(d[1])})
        .attr("width",x.bandwidth())
        .attr("height", function(d) {return y(d[0]) - y(d[1])})