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
        "range": [
          "black",
        ]
      },
      "x": {"field": "chromStart", "type": "genomic"},
      "xe": {"field": "chromEnd", "type": "genomic"},
      "stroke": {"value": "black"},
      "strokeWidth": {"value": 0.5},
      "width": 700,
      "height": 30
    }
  ]
} 
export { spec }; 
