import * as d3 from "../../node_modules/d3";
import { generateSeqData, extendSeqData, changeToStack, returnTestData } from "./data";

// sizing
const width = 600;
const height = 300;
const margin = {left: 30, right: 30, top: 30, bottom: 30};

// data
// const dataRaw = generateSeqData();
const dataRaw = returnTestData();
const data = extendSeqData(dataRaw);
const subgroups = ['A', 'G', 'C', 'T'];
const stackedData = changeToStack(data);
const stackedDataUnpacked = stackedData.flat();

// x axis
const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.x))
    .padding(0.02)

 // y axis
 const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, Math.max(...data.map(d => d.total))])

// color axis
const colorscale = ['#21994e', '#f7b536', '#345e95', '#d83541'] // A: green, G: yellow, C: blue, T: red
let color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(colorscale)


export function getChartBase(element) {
    // append an svg object to the body of the page
    let svg = d3.select(element)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("class", "main")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    svg.append("g")
        .call(d3.axisLeft(y))

    return svg;
}

// Bar Chart
const svgBar = getChartBase('#seqlogo-barchart', data);
svgBar.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function(d) {return x(d.x)})
        .attr("y", function(d) {return y(d.total)})
        .attr("width", x.bandwidth())
        .attr("height", function(d) {return height - y(d.total)})
        .attr("fill", "#000000")


// Stacked Bar Chart

const svgBarStack = getChartBase('#seqlogo-stacked-barchart', data);
svgBarStack.append("g")
    .selectAll("bars")
    .data(stackedDataUnpacked)
    .enter().append("rect")
        .attr("x", function(d) {return x(d.x)})
        .attr("y", function(d) {return y(d.ymax)})
        .attr("width", x.bandwidth())
        .attr("height", function(d) {return y(d.ymin) - y(d.ymax)})
        .attr("fill", function(d) {return color(d.letter)})


// Sequence Logo

// display it twice
const svgSeqLogoTop = getChartBase('#seqlogo-top', data);
const svgSeqLogoFull = getChartBase('#seqlogo-full', data);

function getSeqLogo(svgSeqLogo) {
    svgSeqLogo.append("g")
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
}
getSeqLogo(svgSeqLogoTop);
getSeqLogo(svgSeqLogoFull)


// data
const tableElement = document.getElementById('seqlogo-data');
const dataDisplay = dataRaw.map((d, i) => [i, d.A, d.G, d.C, d.T, d.A+d.G+d.C+d.T]);

// create table elements
const tbl = document.createElement('table');
const thead = document.createElement('thead')
const tbody = document.createElement('tbody')

// add table header
const theadtitle = ['x', 'A', 'G', 'C', 'T', 'y total']
const tr = thead.insertRow();
for (let j = 0; j < 6; j++) {
    const th = tr.insertCell();
    th.appendChild(document.createTextNode(theadtitle[j]));
    th.style.border = '4px solid black';
}

// add table body
for (let i = 0; i < data.length; i++) {
    const tr = tbody.insertRow();
    for (let j = 0; j < 6; j++) {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(dataDisplay[i][j]));
        td.style.border = '1px solid black';
    }
}

tbl.appendChild(thead);
tbl.append(tbody);
tableElement.appendChild(tbl);


// Bar chart setup

function setUp(data, stackedDataUnpacked) {
    const animation = getChartBase('#animation');
    const dataNew = [...data, ...data,...data,...data]
    dataNew.sort((a,b) => a.x - b.x)

    // add letters
    animation.append("g")
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
            })

    // add black bars
    animation.selectAll("rect")
        .data(dataNew)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.total); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.total); })
            .attr("fill", "#000000");

    setUpButtons(animation, stackedDataUnpacked);
    return animation;
}


// Create transition functions
function transition1(animation, stackedDataUnpacked) {
    animation.selectAll("rect")
    .data(stackedDataUnpacked)
    // .enter()
    .transition()
    .duration(3000)
    .attr("x", function(d) { return x(d.x); })
    .attr("y", function(d) { return y(d.ymax); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return y(d.ymin) - y(d.ymax); })
    .attr("fill", function(d) { return color(d.letter); });
}

function transition2(animation) {
    // fade out rectangles
    animation.selectAll("rect")
        .transition()
        .delay(3000)
        .duration(3000)
        .style("opacity", 0);
}

function transition(animation, stackedDataUnpacked) {
    transition1(animation, stackedDataUnpacked);
    transition2(animation);
}

function setUpButtons(animation, stackedDataUnpacked) {
    const button = document.getElementById("animation-button");

    button.style.backgroundColor = "#4CAF50";
    button.style.border = "none";
    button.style.color = "white";
    button.style.padding = "10px 20px";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.display = "inline-block";
    button.style.fontSize = "16px";
    button.style.margin = "10px 2px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.style.transition = "background-color 0.3s ease";

    button.onmouseover = function() {
        button.style.backgroundColor = "#45a049"; // Darker green on hover
    };

    button.onmouseout = function() {
        button.style.backgroundColor = "#4CAF50"; // Return to original color
    };

    button.addEventListener("click", () => transition(animation, stackedDataUnpacked))
    console.log("button", button)


    const button2 = document.getElementById("reset-button");

    button2.style.backgroundColor = "#f44336";
    button2.style.border = "none";
    button2.style.color = "white";
    button2.style.padding = "10px 20px";
    button2.style.textAlign = "center";
    button2.style.textDecoration = "none";
    button2.style.display = "inline-block";
    button2.style.fontSize = "16px";
    button2.style.margin = "10px 2px";
    button2.style.cursor = "pointer";
    button2.style.borderRadius = "5px";
    button2.style.transition = "background-color 0.3s ease";

    button2.onmouseover = function() {
        button2.style.backgroundColor = "#e53935"; // Darker red on hover
    };

    button2.onmouseout = function() {
        button2.style.backgroundColor = "#f44336"; // Return to original color
    };

    
    button2.addEventListener("click", () => {
        d3.select("#animation").select("svg").remove();
        const animation2 = setUp(data, stackedDataUnpacked);
    })
}

const animation = setUp(data, stackedDataUnpacked);
