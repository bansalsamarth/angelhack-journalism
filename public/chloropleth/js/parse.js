    var demodata = {
      'IN.AN' : {fillKey: 'one', values: [{"label": "recom", "val": 10}, {"label": "exp", "val": 11}]},
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
      'IN.MH': {fillKey: 'three', values: [{"label": "recom", "val": 10}, {"label": "exp", "val": 11}]},
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
var fill_data_demo = {
  defaultFill: '#e41a1c',
  one   :'#e41a1c',
  two   :'#377eb8',
  three :'#4daf4a',
}
$(function(){
            generate_chloropleth(demodata, region, mapLabel, fill_data_demo, projection);
})



    $('#button').click(function(event) {
      event.preventDefault();
      $($('#uploadForm')).ajaxSubmit({

        error: function(xhr) {
          console.log('Error: ' + xhr.status);
        },

        success: function(response) {
          var map_data = parse(response);
          generate_chloropleth(map_data, region, mapLabel, fill_data, projection, true);
        }
      });
      return false;
    });

    var parse = function(data1) {
      data = data1['1']
      total = data[0].length;
      val_keys = [];

      // for (var i = 2; i < total; i++) {
      //   val_keys.push(data[0][i])
      // }

      dataStr = {};
      for (var i = 1; i < data.length; i++) {
        val = data[i];
        dataStr[val[0]] = { "fillKey": val[1], "values": []};
        //dataStr += "'" + val[0] + "' : {fillKey: '" + val[1] + "', values:[";
        for (var j = 2; j < total; j++) {
          dataStr[val[0]].values.push({'val': val[j],'label':data[0][j]  });
          // if (j == total - 1) {
          //   dataStr += "{'val': " + "'" + val[j] + "', 'label':'"+data[0][j]+"'}"
          // } else {
          //   dataStr += "{'val': " + "'" + val[j] + "', 'label':'"+data[0][j]+"'},"
          // }
        }
      }
      return dataStr
    }

     //'IN.AN' : {fillKey: 'one', values: [{"label": "recom", "val": 10}, {"label": "exp", "val": 11}]},