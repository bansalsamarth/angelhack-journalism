//Need to validate data according to required template
//No validation added for now

var topo_data = {
  "india" : 'india_topojson.txt',
  "us"    : 'us_topojson.txt',
  "world" : 'world_topojson.txt',
}
var mapData ={};

var generate_chloropleth = function(mapData, region, mapLabel, fill_data, projection_data, new1){
  if(new1){
     $("#country-map").fadeOut();
     $("#country-map").remove();
     $("#outer").append('<div id="country-map" style="height:600px" ></div>');
  }


  // console.log(mapData)
  window.mapData = mapData;
  var projectionFunc = function(element) {
    var projection = d3.geo.mercator()
      .center(projection_data['coords'])
      .scale(projection_data['scale'])
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

    var path = d3.geo.path().projection(projection);
    return {path: path, projection: projection};
  }

  var popupTemplateFunc = function(geo) {
    popString = '<div class="hoverinfo"><strong>' + geo.properties.name + '</strong>';
      console.log(geo.id,window.mapData[geo.id]);
     var data = window.mapData[geo.id][values];
     console.log("data",data)
    for (i in data){
      label = data[i]['label'];
      value = data[i]['val'];
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