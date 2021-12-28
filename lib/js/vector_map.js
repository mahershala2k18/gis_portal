  jQuery(document).ready(function() {


      //   var gdpData = { "1": 16.63, "11": 11.58, "8": 158.97, "3": 158.97 };

      //   var max = 0,
      //       min = Number.MAX_VALUE,
      //       cc,
      //       startColor = '#6baed6',
      //       endColor = '#084594',
      //       colors = {},
      //       hex;
      //   for (cc in gdpData) {
      //       if (parseFloat(gdpData[cc]) > max) {
      //           max = parseFloat(gdpData[cc]);
      //       }
      //       if (parseFloat(gdpData[cc]) < min) {
      //           min = parseFloat(gdpData[cc]);
      //       }
      //   }

      //   //set colors according to values of GDP
      //   for (cc in gdpData) {
      //       if (gdpData[cc] > 0) {
      //           colors[cc] = '#';
      //           for (var i = 0; i < 3; i++) {
      //               hex = Math.round(startColor[i] +
      //                   (endColor[i] -
      //                       startColor[i]) *
      //                   (gdpData[cc] / (max - min))).toString(16);

      //               if (hex.length == 1) {
      //                   hex = '0' + hex;
      //               }

      //               colors[cc] += (hex.length == 1 ? '0' : '') + hex;
      //           }
      //       }
      //   }

      jQuery("#mini_map_div").vectorMap({
          map: "moz_provinces",
          backgroundColor: null, //#6baed6 
          borderColor: "#252525",
          borderOpacity: 0.25,
          borderWidth: 2,
          color: "#edf8fb",
          //colors: colors,
          enableZoom: true,
          hoverColor: "#8856a7",
          hoverOpacity: null,
          normalizeFunction: "linear",
          scaleColors: ["#b6d6ff", "#005ace", "#f4f3f0"],
          selectedColor: "#9ecae1",
          selectedRegions: ["7", "11", "8"],
          showTooltip: true,
          showLabels: false,
          onRegionClick: function(code, region) {
              var message =
                  'You clicked "' +
                  region +
                  '" which has the code: ' +
                  code.toUpperCase();

              $('#div2').text(message);
          },
          onLabelShow: function(event, label, code) {

              switch (code) {
                  case '1':
                      label.text('Cabo Delgado');
                      break;
                  case '2':
                      label.text('Gaza');
                      break;
                  case '3':
                      label.text('Inhambane');
                      break;
                  case '4':
                      label.text('Manica');
                      break;
                  case '5':
                      label.text('Maputo');
                      break;
                  case '6':
                      label.text('Maputo Cidade');
                      break;
                  case '7':
                      label.html(`<b>Nampula</b><br>
                      <span style="font-size: smaller">Gras Nampula<br>
                     Anam Coastal<br>
                     </span>`);
                      break;
                  case '11':
                      label.html(`<b>Zambezia</b><br>
                      <span style="font-size: smaller">Gras Zambezia<br>
                     Nitidae Zambezia<br>
                     NANA-Novo Madal<br>
                     Anam-Ile
                     </span>`);
                      break;
                  case '8':
                      label.html(`<b>Niassa</b><br>
                      <span style="font-size: smaller">
                      Cesc Niassa<br>
                      Gras Niassa<br>
                      Gras HVP<br>
                      WCS Niassa
                      </span>`);
                      break;
              }

          },
      });

      var gdpData = { "1": 16.63, "11": 11.58, "8": 158.97, "3": 158.97 };



  });