var topo_data = {
  "india" : 'india_topojson.txt',
  "us"    : 'us_topojson.txt',
  "world" : 'world_topojson.txt',
}

var map_data = {
      'IN.AN' : {fillKey: 'one', recom:0, exp: 0},
      'IN.AP': {fillKey: 'three', recom:2.13, exp: 0.48},
      'IN.AR': {fillKey: 'four', recom:3.75, exp: 1.32},
      'IN.AS': {fillKey: 'one', recom:0.79, exp: 0.4},
      'IN.BR': {fillKey: 'two', recom:1.77, exp: 0.59},
      'IN.CH': {fillKey: 'one', recom:0.29, exp: 0},
      'IN.CT': {fillKey: 'three', recom:2.21, exp: 0.67},
      'IN.DL': {fillKey: 'two', recom:1.08, exp: 0.39},
      'IN.GA': {fillKey: 'two', recom:1.47, exp: 0.24},
      'IN.HR': {fillKey: 'three', recom:2.68, exp: 0.45},
      'IN.HP': {fillKey: 'three', recom:2.15, exp: 0.7},
      'IN.JK': {fillKey: 'one', recom:0.55, exp: 0.34},
      'IN.JH': {fillKey: 'one', recom:0.39, exp: 0.23},
      'IN.KA': {fillKey: 'two', recom:1.57, exp: 0.48},
      'IN.KL': {fillKey: 'six', recom:7.37, exp: 0.5},
      'IN.MP': {fillKey: 'two', recom:1.82, exp: 0.78},
      'IN.MH': {fillKey: 'three', recom:2.22, exp: 0.39},
      'IN.MN': {fillKey: 'four', recom:3.3, exp: 2.69},
      'IN.ML': {fillKey: 'three', recom:2.28, exp: 1.18},
      'IN.MZ': {fillKey: 'four', recom:3.27, exp: 2.13},
      'IN.NL': {fillKey: 'six', recom:5, exp: 4.6},
      "IN.OR": {fillKey: 'three', recom:2.22, exp: 0.24},
      'IN.PY': {fillKey: 'six', recom:5.38, exp: 0.26},
      'IN.PB': {fillKey: 'three', recom:2.07, exp: 0.92},
      'IN.RJ': {fillKey: 'one', recom:0.61, exp: 0.24},
      'IN.SK': {fillKey: 'six', recom:5.1, exp: 0.05},
      'IN.TN': {fillKey: 'four', recom:3.68, exp: 1.18},
      'IN.TR': {fillKey: 'two', recom:1.25, exp: 1.25},
      'IN.UP': {fillKey: 'two', recom:1.03, exp: 0.35},
      'IN.UT': {fillKey: 'one', recom:0.47, exp: 0.27},
      'IN.WB': {fillKey: 'four', recom:3.5, exp: 1},
}

var region = "india";

var mapLabel = {
  "enable": "yes", 
  "legendTitle": "Samarth", 
  "labelData": {
      one: "0-1",
      two: "1-2",
      three: "2-3",
      four: "3-4",
      five: "4-5",
      six: ">5",
  }
}


var fill_data = {
  defaultFill: '#bada55',
  one   :'#ffffcc',
  two   :'#d9f0a3',
  three :'#addd8e',
  four  :'#78c679',
  five  :'#31a354',
  six   :'#006837',
}

var popupTemplateFunc = function(geo, data) {
  console.log(data);
                return ['<div class="hoverinfo"><strong>'
                        + geo.properties.name,
                        '</strong><br> <em>Average Recommendation:</em>' + data,
                        '<br> <em>Average Expenditure:</em>' + data.exp,
                        '</div>'].join('');
                }  

var projectionFunc = function(element) {
      var projection = d3.geo.mercator()
        .center([87.166667, 22.4444])
        .scale(800)
        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

       var path = d3.geo.path().projection(projection);
       return {path: path, projection: projection};
}

var map = new Datamap({
  element: document.getElementById('country-map'),
  geographyConfig: {
  dataUrl: topo_data[region], 
  popupTemplate: popupTemplateFunc,
  },

  scope: 'region',
  //Set scope of data in topojson to be region for all files

  fills: fill_data,
  data: map_data,
  setProjection: projectionFunc,
});

map.legend({
  legendTitle : mapLabel["legendTitle"],
  labels: mapLabel["label_data"],
});