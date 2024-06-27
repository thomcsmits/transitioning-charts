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
// svg.append("g")
//     .selectAll("bars")
//     .data(stackedDataUnpacked)
//     .enter().append("rect")
//         .attr("x", function(d) {return x(d.x)})
//         .attr("y", function(d) {return y(d.ymax)})
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) {return y(d.ymin) - y(d.ymax)})
//         .attr("fill", function(d) {return color(d.letter)})



// const temp = svg.append("g")
//     .selectAll("text")
//     .data(stackedDataUnpacked)
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.x) + x.bandwidth() / 2; }) // Center the letter horizontally
//         .attr("y", function(d) { return y(d.ymax); }) // Position the letter at the top of the segment
//         .attr("dy", function(d) { return (y(d.ymin) - y(d.ymax)) / 2; }) // Center the letter vertically within the segment
//         .attr("text-anchor", "middle") // Center the text
//         .attr("alignment-baseline", "middle") // Center the text vertically
//         .text(function(d) { return d.letter; })
//         .style("font-size", function(d) {
//             // Calculate font size based on the height of the segment
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             return `${segmentHeight}px`;
//         })
//         .attr("fill", function(d) { return color(d.letter); }); // Use color scale for text color


// const temp = svg.append("g")
//     .selectAll("text")
//     .data(stackedDataUnpacked)
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.x); })
//         .attr("y", function(d) { return y(d.ymax); })
//         .attr("dy", "0") // Adjust if needed to position text correctly within the rectangle
//         .attr("text-anchor", "start") // Anchor text to the start
//         .attr("alignment-baseline", "hanging") // Align text to the top of the rectangle
//         .text(function(d) { return d.letter; })
//         .attr("transform", function(d) {
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             const scaleX = x.bandwidth() / this.getBBox().width;
//             const scaleY = segmentHeight / this.getBBox().height;
//             const scale = Math.min(scaleX, scaleY); // Scale uniformly
//             return `translate(${x(d.x)}, ${y(d.ymax)}) scale(${scale})`;
//         })
//         .style("fill", function(d) { return color(d.letter); });
// const temp = svg.append("g")
//     .selectAll("text")
//     .data(stackedDataUnpacked)
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.x); })
//         .attr("y", function(d) { return y(d.ymax); })
//         .attr("text-anchor", "middle") // Center the text horizontally within the segment
//         .attr("alignment-baseline", "hanging") // Align text to the top of the rectangle
//         .text(function(d) { return d.letter; })
//         .style("fill", function(d) { return color(d.letter); })
//         .style("font-size", function(d) {
//             // Calculate font size based on the height of the segment
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             return `${segmentHeight}px`;
//         })
//         .attr("transform", function(d) {
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             const segmentWidth = x.bandwidth();
//             // Calculate scale factor to fit text within the width of the segment
//             const scale = Math.min(segmentWidth / this.getBBox().width, segmentHeight / this.getBBox().height);
//             const offsetX = x(d.x) + segmentWidth / 2; // Center horizontally
//             const offsetY = y(d.ymax) + segmentHeight / 2; // Center vertically
//             return `translate(${offsetX}, ${offsetY}) scale(${scale}) translate(-${this.getBBox().width / 2}, -${this.getBBox().height / 2})`;
//         });


// const temp = svg.append("g")
//     .selectAll("text")
//     .data(stackedDataUnpacked)
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.x) + x.bandwidth() / 2; }) // Center the letter horizontally
//         .attr("y", function(d) { return y(d.ymax); }) // Position the letter at the top of the segment
//         .attr("text-anchor", "middle") // Center the text horizontally
//         .attr("alignment-baseline", "hanging") // Align text to the top of the rectangle
//         .text(function(d) { return d.letter; })
//         .style("fill", function(d) { return color(d.letter); })
//         .style("font-size", function(d) {
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             return `${segmentHeight}px`;
//         })
//         .attr("transform", function(d) {
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             const segmentWidth = x.bandwidth();
//             // Set font size first to get correct bounding box
//             d3.select(this).style("font-size", `${segmentHeight}px`);
//             const bbox = this.getBBox();
//             const scaleX = segmentWidth / bbox.width;
//             const scaleY = segmentHeight / bbox.height;
//             const scale = Math.min(scaleX, scaleY);
//             const offsetX = x(d.x) + segmentWidth / 2 - bbox.width / 2 * scale;
//             const offsetY = y(d.ymax) + segmentHeight / 2 - bbox.height / 2 * scale;
//             return `translate(${offsetX}, ${offsetY}) scale(${scale})`;
//         });

// const temp = svg.append("g")
//     .selectAll("g")
//     .data(stackedDataUnpacked)
//     .enter().append("g")
//         .attr("transform", function(d) { 
//             return `translate(${x(d.x)}, ${y(d.ymax)})`; 
//         })
//     .each(function(d) {
//         const group = d3.select(this);
//         group.append("text")
//             .attr("x", 0)
//             .attr("y", 0)
//             .attr("text-anchor", "start")
//             .attr("alignment-baseline", "hanging")
//             .text(d.letter)
//             .style("fill", color(d.letter))
//             .style("font-size", function(d) {
//                 // Calculate font size based on the height of the segment
//                 const segmentHeight = y(d.ymin) - y(d.ymax);
//                 return `${segmentHeight}px`;
//             })
//             .attr("transform", function(d) {
//                 const segmentHeight = y(d.ymin) - y(d.ymax);
//                 const segmentWidth = x.bandwidth();
//                 // Set font size first to get correct bounding box
//                 d3.select(this).style("font-size", `${segmentHeight}px`);
//                 const bbox = this.getBBox();
//                 const scaleX = segmentWidth / bbox.width;
//                 const scaleY = segmentHeight / bbox.height;
//                 const scale = Math.min(scaleX, scaleY);
//                 return `scale(${scale})`;
//             });
//     });


// console.log(temp)




// const temp = svg.append("g")
//     .selectAll("text")
//     .data(stackedDataUnpacked)
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.x); }) // Position at the left side of the rectangle
//         .attr("y", function(d) { return y(d.ymax); }) // Position at the top of the rectangle
//         .attr("text-anchor", "start") // Align text to the start
//         .attr("alignment-baseline", "hanging") // Align text to the top of the rectangle
//         .text(function(d) { return d.letter; })
//         .style("fill", function(d) { return color(d.letter); })
//         .style("font-size", function(d) {
//             if (d.value === 0) {
//                 return "0px";
//             } else {
//                 return "10px";
//             }
//         })
//         .each(function(d) {
//             if (d.value !== 0) {
//                 const bbox = this.getBBox();
//                 const scaleX = x.bandwidth() / bbox.width;
//                 const scaleY = (y(d.ymin) - y(d.ymax)) / bbox.height;
//                 d3.select(this)
//                     .attr("transform", `translate(${x(d.x)}, ${y(d.ymax)}) scale(${scaleX}, ${scaleY})`)
//                     .attr("x", 0)
//                     .attr("y", 0);
//             }
//         })

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
                const segmentHeight = y(d.ymin) - y(d.ymax);
                const textHeight = this.getBBox().height;
                const scaleY = segmentHeight / textHeight;
                d3.select(this)
                    .attr("transform", `translate(${x(d.x)}, ${y(d.ymax)}) scale(1, ${scaleY*1.5})`)
                    .attr("x", 0)
                    .attr("y", 0);
            }
        });


  // .style("font-size", function(d) {
        //     // Set font size to fill the y-space of the rectangle
        //     const segmentHeight = y(d.ymin) - y(d.ymax);
        //     return `${segmentHeight}px`;
        // })

console.log(stackedDataUnpacked)
// const temp = svg.append("g")
//     .selectAll("text")
//     .data(stackedDataUnpacked)
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.x); }) // Position at the left side of the rectangle
//         .attr("y", function(d) { return y(d.ymax); }) // Position at the top of the rectangle
//         .attr("text-anchor", "start") // Align text to the start
//         .attr("alignment-baseline", "hanging") // Align text to the top of the rectangle
//         .text(function(d) { return d.letter; })
//         .style("fill", function(d) { return color(d.letter); })
//         .style("font-size", function(d) {
//             // Set an initial font size based on the height of the rectangle
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             return `${segmentHeight * 1.2}px`; // Scale up a bit to ensure the text fills the space
//         })
//         .each(function(d) {
//             const segmentHeight = y(d.ymin) - y(d.ymax);
//             const bbox = this.getBBox();
//             const scaleY = segmentHeight / bbox.height;
//             d3.select(this).attr("transform", `scale(1, ${scaleY})`);
//         });



// old

// svg.append("g")
//     .selectAll("bars")
//     .data(stackedData)
//     .enter().append("g")
//       .attr("fill", function(d) {return color(d.key)})
//       .selectAll("rect")
//       .data(function(d) {return d})
//       .enter().append("rect")
//         .attr("x", function(d) {return x(d.data.x)})
//         .attr("y", function(d) {return y(d[1])})
//         .attr("width",x.bandwidth())
//         .attr("height", function(d) {return y(d[0]) - y(d[1])})


// svg.append("g")
//     .selectAll("bars")
//     .data(stackedData)
//     .enter().append("g")
//       .attr("fill", function(d) {return color(d.key)})
//       .selectAll("rect")
//       .data(function(d) {return d})
//       .enter().append("g")
//         .attr("transform", function(d) { 
//             return `translate(${x(d.data.x)},${y(d[1])}`; 
//         })
        
//         .attr("x", function(d) {return x(d.data.x)})
//         .attr("y", function(d) {return y(d[1])})
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) {return y(d[0]) - y(d[1])})
//         .attr("transform", function(d) { 
//             return `translate(${x(d.data.x)},${y(d[1])}scale(${x.bandwidth()})`; 
//         })
//         .append("text")
//             .attr("x", 0)
//             .attr("y", height)
//             .attr("width", 10)
//             .attr("height", 10)
//             .text(function (d) {return 'H'})

// const smth = svg.append("g")
//     .selectAll("bars")
//     .data(stackedData)
//     .enter().append("g")
//       .attr("fill", function(d) {return color(d.key)})


// smth.append("text")
//       .text(function(d) {return d.key})

    
// smth.selectAll("rect")
//       .data(function(d) {return d})
//       .enter().append("rect")
//         .attr("x", function(d) {return x(d.data.x)})
//         .attr("y", function(d) {return y(d[1])})
//         .attr("width",x.bandwidth())
//         .attr("height", function(d) {return y(d[0]) - y(d[1])})



// const groups = svg.append("g")
//     .selectAll("bars")
//     .data(stackedData)
//     .enter().append("g")
//       .attr("fill", function(d) {return color(d.key)})
//     //   .text(function(d) {return d.key})


// groups.selectAll("rect")
//       .data(function(d) {return d})
//       .enter().append("rect")
//         .attr("x", function(d) {return x(d.data.x)})
//         .attr("y", function(d) {return y(d[1])})
//         .attr("width",x.bandwidth())
//         .attr("height", function(d) {return y(d[0]) - y(d[1])})


// groups.selectAll("text")
//     .data(function(d) { return {"d": d, "key": d.key }})
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.d.data.x) + x.bandwidth() / 2; })
//         .attr("y", function(d) { return y(d.d[1]) + (y(d.d[0]) - y(d.d[1])) / 2; })
//         .attr("dy", "0.35em")  // vertical alignment
//         .attr("text-anchor", "middle")  // horizontal alignment
//         .text(function(d) {return d.key})
//         .style("font-size", function(d) { return Math.min(x.bandwidth(), (y(d.d[0]) - y(d.d[1]))) + "px"; });

// // // Append the text elements for each subgroup
// groups.selectAll("text")
//     .data(function(d) { return d; })  // d represents each SeriesPoint object
//     .enter().append("text")
//         .attr("x", function(d) { return x(d.data.x) + x.bandwidth() / 2; })
//         .attr("y", function(d) { return y(d[1]) + (y(d[0]) - y(d[1])) / 2; })
//         .attr("dy", "0.35em")  // vertical alignment
//         .attr("text-anchor", "middle")  // horizontal alignment
//         .text(function(d) { return d.key; })  // Display the key (A, T, C, G)
//         .style("font-size", function(d) { return Math.min(x.bandwidth(), (y(d[0]) - y(d[1]))) + "px"; });


// groups.selectAll("text")
//     .data(function(d) { return d; })
//     .enter().append("text")
//         .attr("x", function(d) { 
//             console.log(d)
//             return x(d.data.x) + x.bandwidth() / 2; })
//         .attr("y", function(d) { return y(d[1]) + (y(d[0]) - y(d[1])) / 2; })
//         .attr("dy", "0.35em")  // vertical alignment
//         .attr("text-anchor", "middle")  // horizontal alignment
//         .text(function(d) { return d.data[d3.select(this.parentNode).datum().key]; })
//         .style("font-size", function(d) { return Math.min(x.bandwidth(), (y(d[0]) - y(d[1]))) + "px"; });





// // Append the text labels for each subgroup
// groups.selectAll("g")
//     .data(function(d) { return d; })
//     .enter().append("g")
//         .attr("transform", function(d) {
//             var rectWidth = x.bandwidth();
//             var rectHeight = y(d[0]) - y(d[1]);
//             var centerX = x(d.data.x) + rectWidth / 2;
//             var centerY = y(d[1]) + rectHeight / 2;
//             return "translate(" + centerX + "," + centerY + ")";
//         })
//     .append("text")
//         .attr("text-anchor", "middle")
//         .attr("dy", "0.35em")  // vertical alignment
//         .text(function(d, i, nodes) {
//             // Use the parent data to determine the letter
//             var parentData = d3.select(nodes[i].parentNode).datum();
//             return parentData.key;
//         })
//         .attr("transform", function(d) {
//             var rectWidth = x.bandwidth();
//             var rectHeight = y(d[0]) - y(d[1]);
//             return "scale(" + (rectWidth / this.getBBox().width) + "," + (rectHeight / this.getBBox().height) + ")";
//         })
//         // .style("fill", "white");






// const groups = svg.append("g")
//     .selectAll("bars")
//     .data(stackedData)
//     .enter().append("g")
//         .attr("fill", function(d) {return color(d.key)})

// const groups2 = groups.selectAll("rect")
//       .data(function(d) {return d})
//       .enter().append("g")
        
// groups2.append("rect")
//         .attr("width", x.bandwidth())
//         .attr("x", function(d) {return x(d.data.x)})
//         .attr("y", function(d) {return y(d[1])})
//         .attr("height", function(d) {return y(d[0]) - y(d[1])})

// groups2.append("text")
//         .text("H")
//         .attr("width", x)
//         .attr("height", barHeight - 1);

