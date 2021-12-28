// //=====================ile======================================//

// var parcels_ile_ = L.geoJson(parcels_ile);
// var povoados_ile_ = L.geoJson(povoados_ile, {
//   style: {
//     fillColor: "#85b66f",
//     color: "#232323",
//     fillOpacity: 0.8,
//     weight: 1,
//   },
//   onEachFeature: function (feature, layer) {
//     // layer.bindPopup(
//     //   `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//     // );

//     layer
//       .bindTooltip(
//         `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//       )
//       .openTooltip();

//     layer.on({
//       mouseover: function () {
//         layer.setStyle({
//           weight: 5,
//           color: "#FED976",
//           dashArray: "",
//         });
//         //layer.openPopup();
//       },
//       mouseout: function () {
//         var opacity = $(".ile_opacity").val() / 100;
//         layer.setStyle({
//           //fillColor: "#85b66f",
//           color: "#232323",
//           fillOpacity: opacity,
//           weight: 1,
//         });
//       },
//     });
//   },
// });

// var lideres_ile_ = L.geoJson(lideres_ile, {
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(
//       `<p><b>Lider Name: ${feature.properties.given_name} ${feature.properties.family_nam}</p></b> <img class=' image' alt='lider comunitário' src=${feature.properties.photo_chie} style:'width:350px'; height = 200px;>`
//     );
//     layer
//       .bindTooltip(
//         "<b> Village name:  " + feature.properties.village_na + "</b>"
//       )
//       .openTooltip();

//     // layer.on('mouseover', function() {
//     //     layer.openPopup();
//     // });
//   },
// });

// $("#ile_box1").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(parcels_ile_);
//     map.fitBounds(parcels_ile_.getBounds());
//   } else {
//     map.removeLayer(parcels_ile_);
//   }
// });

// $("#ile_box2").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(povoados_ile_);
//     map.fitBounds(povoados_ile_.getBounds());
//   } else {
//     map.removeLayer(povoados_ile_);
//   }
// });

// $("#ile_box3").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(lideres_ile_);
//     map.fitBounds(lideres_ile_.getBounds());
//   } else {
//     map.removeLayer(lideres_ile_);
//   }
// });

// $("#ile_uncheckbtn").on("click", function () {
//   $("#ile_box1").prop("checked", false);
//   $("#ile_box2").prop("checked", false);
//   $("#ile_box3").prop("checked", false);

//   map.removeLayer(parcels_ile_);
//   map.removeLayer(povoados_ile_);
//   map.removeLayer(lideres_ile_);

//   map.setView([-19.26966529650232, 35.92578125], 6);
// });

// $(".ile_opacity").on("change", function () {
//   var opacity = $(this).val() / 100;
//   povoados_ile_.setStyle({ fillOpacity: opacity });
// });

// $("#ile_color").on("click", function () {
//   var opacity = $(".ile_opacity").val() / 100;
//   povoados_ile_.setStyle({
//     fillColor: getColor(),
//     color: "#232323",
//     fillOpacity: opacity,
//     weight: 1,
//   });
// });

// //=====================coastal======================================//

// var parcels_coastal_ = L.geoJson(parcels_coastal);

// var povoados_coastal_ = L.geoJson(povoados_coastal, {
//   style: {
//     fillColor: "#829ae4",
//     color: "#232323",
//     fillOpacity: 0.8,
//     weight: 1,
//   },
//   onEachFeature: function (feature, layer) {
//     // layer.bindPopup(
//     //   `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//     // );

//     layer
//       .bindTooltip(
//         `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//       )
//       .openTooltip();

//     layer.on("mouseover", function () {
//       layer.setStyle({
//         weight: 5,
//         color: "#FED976",
//         dashArray: "",
//       });
//     });

//     layer.on("mouseout", function () {
//       var opacity = $(".coastal_opacity").val() / 100;
//       layer.setStyle({
//         //fillColor: "#829ae4",
//         color: "#232323",
//         fillOpacity: opacity,
//         weight: 1,
//       });
//     });
//   },
// });

// var lideres_coastal_ = L.geoJson(lideres_coastal, {
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(
//       `<p><b>Lider Name: ${feature.properties.given_name} ${feature.properties.family_nam}</p></b><img class=' image' alt='lider comunitário' src=${feature.properties.photo_chie} style:'width:350px'; height = 200px;>`
//     );
//     layer
//       .bindTooltip(`<b> Village name:  ${feature.properties.village_na} </b>`)
//       .openTooltip();
//     layer.on("mouseover", function () {
//       layer.openPopup();
//     });
//   },
// });

// $("#coastal_box1").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(parcels_coastal_);
//     map.fitBounds(parcels_coastal_.getBounds());
//   } else {
//     map.removeLayer(parcels_coastal_);
//   }
// });

// $("#coastal_box2").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(povoados_coastal_);
//     map.fitBounds(povoados_coastal_.getBounds());
//   } else {
//     map.removeLayer(povoados_coastal_);
//   }
// });

// $("#coastal_box3").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(lideres_coastal_);
//     map.fitBounds(povoados_coastal_.getBounds());
//   } else {
//     map.removeLayer(lideres_coastal_);
//   }
// });

// $("#coastal_uncheckbtn").on("click", function () {
//   $("#coastal_box1").prop("checked", false);
//   $("#coastal_box2").prop("checked", false);
//   $("#coastal_box3").prop("checked", false);

//   map.removeLayer(parcels_coastal_);
//   map.removeLayer(povoados_coastal_);
//   map.removeLayer(lideres_coastal_);

//   map.setView([-19.26966529650232, 35.92578125], 6);
// });
// $(".coastal_opacity").on("change", function () {
//   var opacity = $(this).val() / 100;
//   povoados_coastal_.setStyle({ fillOpacity: opacity });
// });

// $("#coastal_color").on("click", function () {
//   var opacity = $(".coastal_opacity").val() / 100;
//   povoados_coastal_.setStyle({
//     fillColor: getColor(),
//     color: "#232323",
//     fillOpacity: opacity,
//     weight: 1,
//   });
// });

// //=====================madal======================================//
// var parcels_madal_ = L.geoJson(parcels_madal);
// var povoados_madal_ = L.geoJson(povoados_madal, {
//   style: {
//     fillColor: "#e5b636",
//     color: "#232323",
//     fillOpacity: 0.8,
//     weight: 1.4,
//   },
//   onEachFeature: function (feature, layer) {
//     // layer.bindPopup(
//     //   `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//     // );

//     layer
//       .bindTooltip(
//         `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//       )
//       .openTooltip();

//     layer.on("mouseover", function () {
//       layer.setStyle({
//         weight: 5,
//         color: "#636363",
//         dashArray: "",
//       });
//     });

//     layer.on("mouseout", function () {
//       var opacity = $(".madal_opacity").val() / 100;
//       layer.setStyle({
//         // fillColor: "#e5b636",
//         color: "#232323",
//         fillOpacity: opacity,
//         weight: 1,
//       });
//     });
//   },
// });
// var lideres_madal_ = L.geoJson(lideres_madal, {
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(
//       `<p><b>Lider Name: ${feature.properties.given_name} ${feature.properties.family_nam}</p></b><img class=' image' alt='lider comunitário' src=${feature.properties.photo_chie} style:'width:350px'; height = 200px;>`
//     );
//     layer
//       .bindTooltip(`<b> Village name:  ${feature.properties.village_na} </b>`)
//       .openTooltip();

//     layer.on("mouseover", function () {
//       layer.openPopup();
//     });
//   },
// });

// $("#madal_box1").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(parcels_madal_);
//     map.fitBounds(parcels_madal_.getBounds());
//   } else {
//     map.removeLayer(parcels_madal_);
//   }
// });

// $("#madal_box2").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(povoados_madal_);
//     map.fitBounds(povoados_madal_.getBounds());
//   } else {
//     map.removeLayer(povoados_madal_);
//   }
// });

// $("#madal_box3").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(lideres_madal_);
//     map.fitBounds(lideres_madal_.getBounds());
//   } else {
//     map.removeLayer(lideres_madal_);
//   }
// });

// $("#madal_uncheckbtn").on("click", function () {
//   $("#madal_box1").prop("checked", false);
//   $("#madal_box2").prop("checked", false);
//   $("#madal_box3").prop("checked", false);

//   map.removeLayer(parcels_madal_);
//   map.removeLayer(povoados_madal_);
//   map.removeLayer(lideres_madal_);

//   map.setView([-19.26966529650232, 35.92578125], 6);
// });
// $(".madal_opacity").on("change", function () {
//   var opacity = $(this).val() / 100;
//   povoados_madal_.setStyle({ fillOpacity: opacity });
// });

// $("#madal_color").on("click", function () {
//   var opacity = $(".madal_opacity").val() / 100;
//   povoados_madal_.setStyle({
//     fillColor: getColor(),
//     color: "#232323",
//     fillOpacity: opacity,
//     weight: 1,
//   });
// });
// //=====================nitidae======================================//
// var parcels_nitidae_ = L.geoJson(parcels_nitidae);
// var povoados_nitidae_ = L.geoJson(povoados_nitidae, {
//   style: {
//     fillColor: "#89789b",
//     color: "#232323",
//     fillOpacity: 0.8,
//     weight: 1,
//   },
//   onEachFeature: function (feature, layer) {
//     // layer.bindPopup(
//     //   `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//     // );

//     layer
//       .bindTooltip(
//         `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//       )
//       .openTooltip();

//     layer.on("mouseover", function () {
//       layer.setStyle({
//         weight: 5,
//         color: "#f0f0f0",
//         dashArray: "",
//       });
//     });

//     layer.on("mouseout", function () {
//       var opacity = $(".nitidae_opacity").val() / 100;
//       layer.setStyle({
//         //fillColor: "#89789b",
//         color: "#232323",
//         fillOpacity: opacity,
//         weight: 1,
//       });
//     });
//   },
// });
// var lideres_nitidae_ = L.geoJson(lideres_nitidae, {
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(
//       `<p><b>Lider Name: ${feature.properties.given_name} ${feature.properties.family_nam}</p></b><img class=' image' alt='lider comunitário' src=${feature.properties.photo_chie} style:'width:350px'; height = 200px;>`
//     );
//     layer
//       .bindTooltip(`<b> Village name:  ${feature.properties.village_na} </b>`)
//       .openTooltip();

//     layer.on("mouseover", function () {
//       layer.openPopup();
//     });
//   },
// });

// $("#nitidae_box1").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(parcels_nitidae_);
//     map.fitBounds(parcels_nitidae_.getBounds());
//   } else {
//     map.removeLayer(parcels_nitidae_);
//   }
// });

// $("#nitidae_box2").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(povoados_nitidae_);
//     map.fitBounds(povoados_nitidae_.getBounds());
//   } else {
//     map.removeLayer(povoados_nitidae_);
//   }
// });

// $("#nitidae_box3").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(lideres_nitidae_);
//     map.fitBounds(lideres_nitidae_.getBounds());
//   } else {
//     map.removeLayer(lideres_nitidae_);
//   }
// });

// $("#nitidae_uncheckbtn").on("click", function () {
//   $("#nitidae_box1").prop("checked", false);
//   $("#nitidae_box2").prop("checked", false);
//   $("#nitidae_box3").prop("checked", false);

//   map.removeLayer(parcels_nitidae_);
//   map.removeLayer(povoados_nitidae_);
//   map.removeLayer(lideres_nitidae_);

//   map.setView([-19.26966529650232, 35.92578125], 6);
// });

// $(".nitidae_opacity").on("change", function () {
//   var opacity = $(this).val() / 100;
//   povoados_nitidae_.setStyle({ fillOpacity: opacity });
// });

// $("#nitidae_color").on("click", function () {
//   var opacity = $(".nitidae_opacity").val() / 100;
//   povoados_nitidae_.setStyle({
//     fillColor: getColor(),
//     color: "#232323",
//     fillOpacity: opacity,
//     weight: 1,
//   });
// });
// // =====================cesc==================================//
// var parcels_cesc_ = L.geoJson(parcels_cesc);
// var povoados_cesc_ = L.geoJson(povoados_cesc, {
//   style: {
//     fillColor: "#99d8c9",
//     color: "#232323",
//     fillOpacity: 0.8,
//     weight: 1,
//   },
//   onEachFeature: function (feature, layer) {
//     // layer.bindPopup(`<div class="pop-tipe" style = "text-align:left"><strong>POVOADO ${feature.properties.name.toUpperCase()}  </strong></div>
//     //  <hr><br><b>Comunidade: </b> ${
//     //    feature.properties.name
//     //  } <br><b> Area (ha): </b> ${feature.properties.area}`);

//     layer
//       .bindTooltip(
//         `<b>Comunidade: </b> ${feature.properties.name} <br><b> Area (ha): </b> ${feature.properties.area}`
//       )
//       .openTooltip();

//     layer.on("mouseover", function () {
//       layer.setStyle({
//         weight: 5,
//         color: "#2ca25f ",
//         dashArray: "",
//       });
//     });

//     layer.on("mouseout", function () {
//       var opacity = $(".cesc_opacity").val() / 100;
//       layer.setStyle({
//         //fillColor: "#99d8c9",
//         color: "#232323",
//         fillOpacity: opacity,
//         weight: 1,
//       });
//     });
//   },
// });
// var lideres_cesc_ = L.geoJson(lideres_cesc, {
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(
//       `<p><b>Lider Name: ${feature.properties.given_name} ${feature.properties.family_nam}</p></b><img class=' image' alt='lider comunitário' src=${feature.properties.photo_chie} style:'width:350px'; height = 200px;>`
//     );
//     layer
//       .bindTooltip(`<b> Village name:  ${feature.properties.village_na} </b>`)
//       .openTooltip();

//     layer.on("mouseover", function () {
//       layer.openPopup();
//     });
//   },
// });

// $("#cesc_box1").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(parcels_cesc_);
//     map.fitBounds(parcels_cesc_.getBounds());
//   } else {
//     map.removeLayer(parcels_cesc_);
//   }
// });

// $("#cesc_box2").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(povoados_cesc_);
//     map.fitBounds(povoados_cesc_.getBounds());
//   } else {
//     map.removeLayer(povoados_cesc_);
//   }
// });

// $("#cesc_box3").on("change", function () {
//   if ($(this).is(":checked")) {
//     map.addLayer(lideres_cesc_);
//     map.fitBounds(lideres_cesc_.getBounds());
//   } else {
//     map.removeLayer(lideres_cesc_);
//   }
// });

// $("#cesc_uncheckbtn").on("click", function () {
//   $("#cesc_box1").prop("checked", false);
//   $("#cesc_box2").prop("checked", false);
//   $("#cesc_box3").prop("checked", false);

//   map.removeLayer(parcels_cesc_);
//   map.removeLayer(povoados_cesc_);
//   map.removeLayer(lideres_cesc_);

//   map.setView([-19.26966529650232, 35.92578125], 6);
// });

// $(".cesc_opacity").on("change", function () {
//   var opacity = $(this).val() / 100;
//   povoados_cesc_.setStyle({ fillOpacity: opacity });
// });

// $("#cesc_color").on("click", function () {
//   var opacity = $(".cesc_opacity").val() / 100;
//   povoados_cesc_.setStyle({
//     fillColor: getColor(),
//     color: "#232323",
//     fillOpacity: opacity,
//     weight: 1,
//   });
// });
