var spec = {
  "layout": "linear",
  "static": true,
  "spacing": 1,
  "centerRadius": 0.3,
  "alignment": "stack",
  "tracks": [
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
    }
  ]
} 
export { spec }; 
