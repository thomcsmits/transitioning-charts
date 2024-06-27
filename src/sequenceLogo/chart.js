import * as d3 from "d3";
import { generateSeqData, extendSeqData, changeToStack } from "./data";

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

const data = extendSeqData(generateSeqData());

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



const subgroups = ['A', 'G', 'C', 'T'];
const colorscale = ['#21994e', '#f7b536', '#345e95', '#d83541'] // A: green, G: yellow, C: blue, T: red
let color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(colorscale)

const stackedData = changeToStack(data);
const stackedDataUnpacked = stackedData.flat();
// var stackedData = d3.stack().keys(subgroups)(data);


// STACKED BAR

// svg.append("g")
//     .selectAll("bars")
//     .data(stackedDataUnpacked)
//     .enter().append("rect")
//         .attr("x", function(d) {return x(d.x)})
//         .attr("y", function(d) {return y(d.ymax)})
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) {return y(d.ymin) - y(d.ymax)})
//         .attr("fill", function(d) {return color(d.letter)})



// SEQUENCE 
const temp = svg.append("g")
    .selectAll("text")
    .data(stackedDataUnpacked)
    .enter().append("text")
        .attr("x", function(d) { return x(d.x); }) // set to left
        .attr("y", function(d) { return y(d.ymax); }) // set to top
        .attr("text-anchor", "start") // align to left
        .attr("alignment-baseline", "hanging") // align to top
        .text(function(d) { return d.letter; })
        .style("fill", function(d) { return color(d.letter); })
        .style("font-family", "monospace")
        .style("font-size", function(d) {
            if (d.value === 0) {
                return "0px";
            } else {
                return `95px`;
            }
        })
        .each(function(d) {
            if (d.value !== 0) {
                const scaleY = (y(d.ymin) - y(d.ymax)) / this.getBBox().height;
                d3.select(this)
                    .attr("transform", `translate(${x(d.x)}, ${y(d.ymax)}) scale(1, ${scaleY*1.5})`)
                    .attr("x", 0)
                    .attr("y", 0);
            }
        });

console.log(stackedDataUnpacked)

