//Need to validate data according to required template
//No validation added for now

var topo_data = {
  "india" : 'india_topojson.txt',
  "us"    : 'us_topojson.txt',
  "world" : 'world_topojson.txt',
}

var generate_chloropleth = function(mapData, region, mapLabel, fill_data, projection_data){
  
  var projectionFunc = function(element) {
    var projection = d3.geo.mercator()
      .center(projection_data['coords'])
      .scale(projection_data['scale'])
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

    var path = d3.geo.path().projection(projection);
    return {path: path, projection: projection};
  }

  var popupTemplateFunc = function(geo, data) {
    popString = '<div class="hoverinfo"><strong>' + geo.properties.name + '</strong>';
    for (i in data.values){
      label = data.values[i]['label'];
      value = data.values[i]['val'];
      popString+='<br><em>' + label + ': </em>' + value 
    }

    return popString;

  }


  var map = new Datamap({
    element: document.getElementById('country-map'),
    geographyConfig: {
    dataUrl: topo_data[region], 
    popupTemplate: popupTemplateFunc,
    },

    scope: 'region',
    fills: fill_data,
    data: mapData,
    setProjection: projectionFunc,

  });

}