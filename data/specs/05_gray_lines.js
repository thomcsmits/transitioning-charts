var spec = {
  "layout": "circular",
  "static": true,
  "spacing": 1,
  "centerRadius": 0.3,
  "alignment": "stack",
  "tracks": [
    {
      "data": {
        "type": "bigwig",
        "url": "https://s3.amazonaws.com/gosling-lang.org/data/Astrocytes-insertions_bin100_RIPnorm.bw",
        "column": "position",
        "value": "peak"
      },
      "mark": "bar",
      "x": {"field": "position", "type": "genomic", "axis": "top"},
      "y": {"field": "peak", "type": "quantitative", "axis": "right"},
      "color": {"value": "#EEEDA1"},
      "width": 700,
      "height": 60
    },
    {
      "data": {
        "url": "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
        "type": "csv",
        "chromosomeField": "Chromosome",
        "genomicFields": ["chromStart", "chromEnd"]
      },
      "mark": "rect",
      "color": {
        "field": "Stain",
        "type": "nominal",
        "domain": [
          "gneg",
          "gpos25",
          "gpos50",
          "gpos75",
          "gpos100",
          "gvar",
          "acen"
        ],
        "range": [
          "white",
          "#D9D9D9",
          "#979797",
          "#636363",
          "black",
          "#F0F0F0",
          "#8D8D8D"
        ]
      },
      "x": {"field": "chromStart", "type": "genomic"},
      "xe": {"field": "chromEnd", "type": "genomic"},
      "stroke": {"value": "lightgray"},
      "strokeWidth": {"value": 0.5},
      "width": 700,
      "height": 30
    },
    {
      "alignment": "overlay",
      "data": {
        "url": "https://raw.githubusercontent.com/vigsterkr/circos/master/data/5/segdup.txt",
        "type": "csv",
        "headerNames": ["id", "chr", "p1", "p2"],
        "chromosomePrefix": "hs",
        "chromosomeField": "chr",
        "genomicFields": ["p1", "p2"],
        "separator": " ",
        "longToWideId": "id"
      },
      "opacity": {"value": 0.4},
      "tracks": [
        {
          "dataTransform": [
            {"type": "filter", "field": "chr", "oneOf": ["hs1"], "not": true}
          ],
          "mark": "withinLink",
          "x": {"field": "p1", "type": "genomic"},
          "xe": {"field": "p1_2", "type": "genomic"},
          "x1": {"field": "p2", "type": "genomic"},
          "x1e": {"field": "p2_2", "type": "genomic"},
          "stroke": {"value": "lightgray"},
          "strokeWidth": {"value": 1}
        },
      ],
      "width": 700,
      "height": 300
    }
  ]
} 
export { spec }; 
