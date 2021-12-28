var map = L.map("map", {
    center: [-19.26966529650232, 35.92578125],
    zoom: 6,
    loadingControl: true,
    attributionControl: false,
});

L.control
    .attribution({
        prefix: "Interactive Mapping by david chamussa | Terra Firma, Ltd.",
    })
    .addTo(map);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var googleStreets = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);

var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);

var baseMaps = {
    OSM: osm,
    "Google Street": googleStreets,
    "Google Satellite": googleSat,
};

var overlayMaps = {
    // Marker: marker,
    // "Building Layer": buLayer,
    // "World Cities": geoJson1,
    // oram_ile_parcels: geoJson3,
};

//Make the spiner for loading layers  invisible
// $('#layer_loading_div').css({
//     display: 'none'
// });
//end//

L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);

var left_sidebar = L.control.sidebar("sidebar", {
    position: "left",
});

map.addControl(left_sidebar);

// Show sidebar
left_sidebar.show();

// // Hide left_sidebar
// left_sidebar.hide();

// Toggle left_sidebar visibility
$('.sidebar_toggler').on("click", function() {
    left_sidebar.toggle();
});

// // Check left_sidebar visibility
// var visible = left_sidebar.isVisible();

// setTimeout(function () {
//     left_sidebar.show();
// }, 500);


//**************************************right sidebar******************/
var right_sidebar = L.control.sidebar("details_panel", {
    position: "right",
});

map.addControl(right_sidebar);


// map.on('click', function() {
//     right_sidebar.hide();
// });

// Show sidebar
//right_sidebar.show();

// // Hide right_sidebar
// right_sidebar.hide();

// Toggle right_sidebar visibility
// $('.sidebar_toggler').on("click", function() {
//     left_sidebar.toggle();
// });

// // Check left_sidebar visibility
// var visible = left_sidebar.isVisible();

// setTimeout(function () {
//     left_sidebar.show();
// }, 500);

my_warehouse.forEach((element) => {
    $(".left-sidebar").append(
        layerCardGenerator_warehouse(
            element.l1_name,
            element.l2_name,
            element.l3_name,
            element.thumbnailUrl,
            element.projectName,
            element.id_for_button_uncheckAll,
            element.id_for_button_query,
            element.description,
            element.code,
            element.id_for_button_switch_color,
            element.parcels_url,
            element.povoados_url,
            element.lideres_url,
            element.l1_defaultCheck,
            element.l2_defaultCheck,
            element.lastUpdate
        )
    );
});

//random_colouring
function getColor() {
    var color;
    var color_code = Math.floor(Math.random() * 15);
    switch (color_code) {
        case 0:
            color = "#99d8c9";
            break;
        case 1:
            color = "#8856a7";
            break;
        case 2:
            color = "#43a2ca";
            break;
        case 3:
            color = "#e34a33";
            break;
        case 4:
            color = "#2b8cbe";
            break;
        case 5:
            color = "#1c9099";
            break;
        case 6:
            color = "#dd1c77";
            break;
        case 7:
            color = "#d95f0e";
            break;
        case 8:
            color = "#fde0dd";
            break;
        case 9:
            color = "#fec44f";
            break;
        case 10:
            color = "#006d2c";
            break;
        case 11:
            color = "#edf8fb";
            break;
        case 12:
            color = "#edf8b1";
            break;
        case 13:
            color = "#bfd3e6";
            break;
        case 14:
            color = "#800026";
    }

    console.log(color_code);
    return color;
}

//operation layers
var l1;

function loadOperationLayers(url, myTag) {
    var opacidade;
    var fillColor;
    if (myTag.endsWith('povoados')) {
        opacidade = 1;
        fillColor = "#99d8c9";
    } else {
        opacidade = 0.2;
        fillColor = '#9ebcda'
    }
    $.ajax({
        //async: false,
        url: url,
        success: function(data) {
            l1 = new L.geoJson(data, {
                style: {
                    fillColor: fillColor,
                    color: "#232323",
                    fillOpacity: opacidade,
                    weight: 1.2,
                },
                onEachFeature: function(feature, layer) {
                    layer.myTag = myTag; // removing layers using checkbox

                    if (myTag.endsWith("lideres")) {
                        //here verify the string refering to the photo_chief_face

                        if (
                            `${myTag}` === `cavateco_oram_ile:form_b_dados_lideres` ||
                            `${myTag}` === `cavateco_oram_coastal:form_b_dados_lideres` ||
                            `${myTag}` === `cavateco_nitidae:form_b_dados_lideres`
                        ) {
                            layer.bindPopup(
                                `<p>Lider Name: <b>${feature.properties.given_name} ${feature.properties.family_name}</p></b><img class=' image' alt='lider comunitário' src=${feature.properties.raw_chief_face} style:'width:350px'; height = 200px;>`
                            );
                        } else {
                            layer.bindPopup(
                                `<p>Lider Name: <b>${feature.properties.given_name} ${feature.properties.family_name}</p></b><img class=' image' alt='lider comunitário' src=${feature.properties.photo_chief_face} style:'width:350px'; height = 200px;>`
                            );
                        }

                        layer
                            .bindTooltip(
                                ` Village name:  <b>${feature.properties.village_name} </b>`
                            )
                            .openTooltip();

                        layer.on("mouseover", function() {
                            layer.openPopup();
                        });
                    } else if (myTag.endsWith("povoados")) {
                        layer
                            .bindTooltip(
                                `Comunidade:<b> ${
                                    feature.properties.name
                                         }</b><br> Area (ha): <b> ${parseFloat(
                                        feature.properties.area
                                 ).toFixed(3)}</b>`
                            )
                            .openTooltip();

                        layer.on("click", function() {
                            if (`${feature.properties.meet_image_url}` === 'null' || `${feature.properties.raw_image_url}` === 'null') {
                                var texto = `Sem submissão de encontro de nível comunitário`;
                                $('#details_panel').html(`
                                        <small>${feature.properties.name_provinces}</small><br>
                                        <strong><b><h3><span class='nome'>${feature.properties.name}</span></h3></b></strong><br>
                                        <div class="card">
                                        <div class="card-header">
                                            Informação
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><i class="fas fa-map-marker-alt" style='font-size: 30px; color: #1c9099;'>
                                              </i>&emsp;&emsp;Loc: <b>Lat:  ${parseFloat(layer.getBounds().getCenter().lat).toFixed(3)}, Long: ${parseFloat(layer.getBounds().getCenter().lng).toFixed(3)} </b></li>
                                            <li class="list-group-item">
                                                <img src="./img/icon_area.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px; background-color: #76b4fd; ">&emsp; Area:<b> ${parseFloat(
                                              feature.properties.area
                                      ).toFixed(3)} ha</b> </li>
                                            <li class="list-group-item">
                                                <img src="./img/icon_elevation.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px; background-color: #e2843a; ">&emsp; Average Elevation:<b> ${parseFloat(
                                              feature.properties.altitude
                                      ).toFixed(3)} meters</b> </li>
                                            <li class="list-group-item">
                                                <i class="fas fa-draw-polygon" style='font-size: 30px; color: #2ca25f;'></i>&emsp; Parcelas: <b>NULL</b></li>
                                            <li class="list-group-item">
                                                <img src="./img/assoc1.png" style="width: 30px; height: 30px;"> &emsp; Associação: <b>${feature.properties.name_assoc}</b></li>
                                        </ul>
                                    </div>
                                        <br>
                                        <div class="card">
                                            <img src="${feature.properties.meet_image_url}" class="card-img-top" alt="meet_image">
                                            <div class="card-body">
                                                <p class="card-text"> ${texto}.</p>
                                            </div>
                                        </div>                 
                                    `);
                            } else
                            if (`${myTag}` === `cavateco_nitidae:povoados`) {

                                function participacao() {
                                    var participacao_lider = null;
                                    if (`${feature.properties.participation_leader}` === 'medium') {
                                        participacao_lider = 'média';
                                    } else if (`${feature.properties.participation_leader}` === 'v_high') {
                                        participacao_lider = 'muito alta';
                                    } else if (`${feature.properties.participation_leader}` === 'high') {
                                        participacao_lider = 'alta';
                                    } else {
                                        participacao_lider = 'baixa';
                                    }
                                    return participacao_lider;
                                }

                                function project() {
                                    var project = null;
                                    if (`${feature.properties.project}` === 'null') {
                                        project = 'ORAM ILE';
                                    } else {
                                        project = `${feature.properties.project.toUpperCase()}`
                                    }
                                    return project;
                                }


                                function parcels_per_povoado() {
                                    var param_parcels = `${myTag.split(":")[0]}`;
                                    var parcels_tag = param_parcels.concat(':parcels');
                                    var parcelas_digitalizadas;

                                    $.get({
                                        async: false,
                                        url: `http://cavateco.terrafirma.co.mz:8090/geoserver/cavateco_nitidae/ows?service=WFS&version=1.0.0&request=GetFeature&cql_filter=
                                            assoc_name='${feature.properties.assoc_name}'&typeName=${parcels_tag}&maxFeatures=1&outputFormat=application%2Fjson`,
                                        success: function(data) {
                                            parcelas_digitalizadas = data.numberMatched;
                                        },
                                    });
                                    console.log(`${parcelas_digitalizadas} parcelas em ${feature.properties.assoc_name} `)
                                    return `${parcelas_digitalizadas}`
                                }

                                $('#details_panel').html(`
                                <div class='row'>
                                <div class='col-md-5'><small>Provincia de ${feature.properties.name_provinces}</small></div>
                                <div class='col-md-7' style='text-align: justify'><small>&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; ${project()}</small></div>
                            </div>
                            <strong><b><h3><span class='nome'>${feature.properties.name}</span></h3></b></strong><br>
                            <div class="card">
                                <div class="card-header">
                                    Informação
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><i class="fas fa-map-marker-alt" style='font-size: 30px; color: #1c9099;'>
                                  </i>&emsp;&emsp;Loc: <b>Lat:  ${parseFloat(layer.getBounds().getCenter().lat).toFixed(3)}, 
                                  Long: ${parseFloat(layer.getBounds().getCenter().lng).toFixed(3)} </b></li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_area.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius: 
                                        25px; border-radius: 25px; background-color: #76b4fd; ">&emsp; Area:<b> ${parseFloat(
                                  feature.properties.area
                          ).toFixed(3)} ha</b> </li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_elevation.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius:
                                         25px; border-radius: 25px; background-color: #e2843a; ">&emsp; Average Elevation:<b> ${parseFloat(
                                  feature.properties.altitude
                          ).toFixed(3)} meters</b> </li>
                                    <li class="list-group-item">
                                        <div class='row'>
                                            <div class='col-md-7'><i class="fas fa-draw-polygon" style='font-size: 33px; color: #2ca25f;'></i>
                                                <span>&emsp; Parcelas Delimitadas: </span></div>
                                            <div class='col-md-3'>
                                                <div class="card border-success text-success text-center font-weight-light">
                                                    <span style='font-size: 23px;'> <b>${parcels_per_povoado()}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <img src="./img/assoc1.png" style="width: 30px; height: 30px;"> &emsp; Associação: <b>${feature.properties.name_assoc}</b></li>
                                </ul>
                            </div>
                            <br>
                            <div class="card">
                                <img src="${feature.properties.raw_image_url}" class="card-img-top" alt="meet_image">
                                <div class="card-body">
                                    <p class="card-text"> ${feature.properties.meet_type}.</p>
                                </div>
                            </div>
                            <div class='font-weight-normal mt-1 mb-5'>
                                Povodo de ${feature.properties.name}<br> Encontro ocorrido no âmbido da delimitação do povoado.<br> 
                                Este encontro teve lugar na vila de <span style='color:#2171b5; font-size: 15px'>${feature.properties.single_village_name}</span>.<br> Participaram
                                do encontro cerca de
                                <span style='color:#2171b5; font-size: 15px'>${(feature.properties.attendies_m)+(feature.properties.attendies_f)}</span> membros da comunidade, dos quais <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_m}</span> Homens
                                e
                                <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_f}</span> Mulheres.<br> A participação do lider comunitário foi <span style='color:#2171b5; font-size: 15px'>${participacao()}</span>.<br> O encontro terminou com seguinte
                                observação:
                                <br> <span style='color:#2171b5; font-size: 15px'>${feature.properties.observations}</span>.
                        
                            </div>                         
                                `);
                            } else
                            if (`${myTag}` === `cavateco_oram_ile:povoados`) {


                                function participacao() {
                                    var participacao_lider = null;
                                    if (`${feature.properties.participation_leader}` === 'medium') {
                                        participacao_lider = 'média';
                                    } else if (`${feature.properties.participation_leader}` === 'v_high') {
                                        participacao_lider = 'muito alta';
                                    } else if (`${feature.properties.participation_leader}` === 'high') {
                                        participacao_lider = 'alta';
                                    } else {
                                        participacao_lider = 'baixa';
                                    }
                                    return participacao_lider;
                                }

                                function project() {
                                    var project = null;
                                    if (`${feature.properties.project}` === 'null') {
                                        project = 'ORAM ILE';
                                    } else {
                                        project = `${feature.properties.project.toUpperCase()}`
                                    }
                                    return project;
                                }


                                function parcels_per_povoado() {
                                    var param_parcels = `${myTag.split(":")[0]}`;
                                    var parcels_tag = param_parcels.concat(':parcels');
                                    var parcelas_digitalizadas;

                                    $.get({
                                        async: false,
                                        url: `http://cavateco.terrafirma.co.mz:8090/geoserver/cavateco_oram_ile/ows?service=WFS&version=1.0.0&request=GetFeature&cql_filter=
                                            assoc_name='${feature.properties.assoc_name}'&typeName=${parcels_tag}&maxFeatures=1&outputFormat=application%2Fjson`,
                                        success: function(data) {
                                            parcelas_digitalizadas = data.numberMatched;
                                        },
                                    });
                                    console.log(`${parcelas_digitalizadas} parcelas em ${feature.properties.assoc_name} `)
                                    return `${parcelas_digitalizadas}`
                                }

                                $('#details_panel').html(`
                                <div class='row'>
                                <div class='col-md-5'><small>Provincia de ${feature.properties.name_provinces}</small></div>
                                <div class='col-md-7' style='text-align: justify'><small>&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; ${project()}</small></div>
                            </div>
                            <strong><b><h3><span class='nome'>${feature.properties.name}</span></h3></b></strong><br>
                            <div class="card">
                                <div class="card-header">
                                    Informação
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><i class="fas fa-map-marker-alt" style='font-size: 30px; color: #1c9099;'>
                                  </i>&emsp;&emsp;Loc: <b>Lat:  ${parseFloat(layer.getBounds().getCenter().lat).toFixed(3)}, 
                                  Long: ${parseFloat(layer.getBounds().getCenter().lng).toFixed(3)} </b></li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_area.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius: 
                                        25px; border-radius: 25px; background-color: #76b4fd; ">&emsp; Area:<b> ${parseFloat(
                                  feature.properties.area
                          ).toFixed(3)} ha</b> </li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_elevation.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius:
                                         25px; border-radius: 25px; background-color: #e2843a; ">&emsp; Average Elevation:<b> ${parseFloat(
                                  feature.properties.altitude
                          ).toFixed(3)} meters</b> </li>
                                    <li class="list-group-item">
                                        <div class='row'>
                                            <div class='col-md-7'><i class="fas fa-draw-polygon" style='font-size: 33px; color: #2ca25f;'></i> 
                                            <span>&emsp; Parcelas Delimitadas: </span></div>
                                            <div class='col-md-3'>
                                                <div class="card border-success text-success text-center font-weight-light">
                                                    <span style='font-size: 23px;'> <b>${parcels_per_povoado()}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <img src="./img/assoc1.png" style="width: 30px; height: 30px;"> &emsp; Associação: <b>${feature.properties.name_assoc}</b></li>
                                </ul>
                            </div>
                            <br>
                            <div class="card">
                                <img src="${feature.properties.raw_image_url}" class="card-img-top" alt="meet_image">
                                <div class="card-body">
                                    <p class="card-text"> ${feature.properties.meet_type}.</p>
                                </div>
                            </div>
                            <div class='font-weight-normal mt-1 mb-5'>
                                Povodo de ${feature.properties.name}<br> Encontro ocorrido no âmbido da delimitação do povoado.<br> 
                                Este encontro teve lugar na vila de <span style='color:#2171b5; font-size: 15px'>${feature.properties.single_village_name}</span>.<br> 
                                Participaram do encontro cerca de
                                <span style='color:#2171b5; font-size: 15px'>${(feature.properties.attendies_m)+(feature.properties.attendies_f)}</span> 
                                membros da comunidade, dos quais <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_m}</span> Homens
                                e
                                <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_f}</span> Mulheres.<br> 
                                A participação do lider comunitário foi <span style='color:#2171b5; font-size: 15px'>${participacao()}</span>.<br> 
                                O encontro terminou com seguinte
                                observação:
                                <br> <span style='color:#2171b5; font-size: 15px'>${feature.properties.observations}</span>.
                        
                            </div>                            
                                `);



                            } else
                            if (`${myTag}` === `cavateco_oram_coastal:povoados`) {

                                function participacao() {
                                    var participacao_lider = null;
                                    if (`${feature.properties.participation_leader}` === 'medium') {
                                        participacao_lider = 'média';
                                    } else if (`${feature.properties.participation_leader}` === 'v_high') {
                                        participacao_lider = 'muito alta';
                                    } else if (`${feature.properties.participation_leader}` === 'high') {
                                        participacao_lider = 'alta';
                                    } else {
                                        participacao_lider = 'baixa';
                                    }
                                    return participacao_lider;
                                }

                                function project() {
                                    var project = null;
                                    if (`${feature.properties.project}` === 'null') {
                                        project = 'ORAM COASTAL';
                                    } else {
                                        project = `${feature.properties.project.toUpperCase()}`
                                    }
                                    return project;
                                }


                                function parcels_per_povoado() {
                                    var param_parcels = `${myTag.split(":")[0]}`;
                                    var parcels_tag = param_parcels.concat(':parcels');
                                    var parcelas_digitalizadas;

                                    $.get({
                                        async: false,
                                        url: `http://cavateco.terrafirma.co.mz:8090/geoserver/cavateco_oram_coastal/ows?service=WFS&version=1.0.0&request=GetFeature&cql_filter=
                                            assoc_name='${feature.properties.name_assoc}'&typeName=${parcels_tag}&maxFeatures=1&outputFormat=application%2Fjson`,
                                        success: function(data) {
                                            parcelas_digitalizadas = data.numberMatched;
                                        },
                                    });
                                    console.log(`${parcelas_digitalizadas} parcelas em ${feature.properties.name_assoc} `)
                                    return `${parcelas_digitalizadas}`
                                }

                                $('#details_panel').html(`
                                <div class='row'>
                                <div class='col-md-5'><small>Provincia de ${feature.properties.name_provinces}</small></div>
                                <div class='col-md-7' style='text-align: justify'><small>&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; ${project()}</small></div>
                            </div>
                            <strong><b><h3><span class='nome'>${feature.properties.name}</span></h3></b></strong><br>
                            <div class="card">
                                <div class="card-header">
                                    Informação
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><i class="fas fa-map-marker-alt" style='font-size: 30px; color: #1c9099;'>
                                  </i>&emsp;&emsp;Loc: <b>Lat:  ${parseFloat(layer.getBounds().getCenter().lat).toFixed(3)}, 
                                  Long: ${parseFloat(layer.getBounds().getCenter().lng).toFixed(3)} </b></li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_area.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius: 
                                        25px; border-radius: 25px; background-color: #76b4fd; ">&emsp; Area:<b> ${parseFloat(
                                  feature.properties.area
                          ).toFixed(3)} ha</b> </li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_elevation.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius:
                                         25px; border-radius: 25px; background-color: #e2843a; ">&emsp; Average Elevation:<b> ${parseFloat(
                                  feature.properties.altitude
                          ).toFixed(3)} meters</b> </li>
                                    <li class="list-group-item">
                                        <div class='row'>
                                            <div class='col-md-7'><i class="fas fa-draw-polygon" style='font-size: 33px; color: #2ca25f;'></i> 
                                            <span>&emsp; Parcelas Delimitadas: </span></div>
                                            <div class='col-md-3'>
                                                <div class="card border-success text-success text-center font-weight-light">
                                                    <span style='font-size: 23px;'> <b>${parcels_per_povoado()}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <img src="./img/assoc1.png" style="width: 30px; height: 30px;"> &emsp; Associação: <b>${feature.properties.name_assoc}</b></li>
                                </ul>
                            </div>
                            <br>
                            <div class="card">
                                <img src="${feature.properties.raw_image_url}" class="card-img-top" alt="meet_image">
                                <div class="card-body">
                                    <p class="card-text"> ${feature.properties.meet_type}.</p>
                                </div>
                            </div>
                            <div class='font-weight-normal mt-1 mb-5'>
                                Povodo de ${feature.properties.name}<br> Encontro ocorrido no âmbido da delimitação do povoado.<br> 
                                Este encontro teve lugar na vila de <span style='color:#2171b5; font-size: 15px'>${feature.properties.single_village_name}</span>.<br> 
                                Participaram do encontro cerca de
                                <span style='color:#2171b5; font-size: 15px'>${(feature.properties.attendies_m)+(feature.properties.attendies_f)}</span> 
                                membros da comunidade, dos quais <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_m}</span> Homens
                                e
                                <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_f}</span> Mulheres.<br> 
                                A participação do lider comunitário foi <span style='color:#2171b5; font-size: 15px'>${participacao()}</span>.<br> 
                                O encontro terminou com seguinte
                                observação:
                                <br> <span style='color:#2171b5; font-size: 15px'>${feature.properties.observations}</span>.
                        
                            </div>                            
                                `);
                            } else {
                                function participacao() {
                                    var participacao_lider = null;
                                    if (`${feature.properties.participation_leader}` === 'medium') {
                                        participacao_lider = 'média';
                                    } else if (`${feature.properties.participation_leader}` === 'v_high') {
                                        participacao_lider = 'muito alta';
                                    } else if (`${feature.properties.participation_leader}` === 'high') {
                                        participacao_lider = 'alta';
                                    } else {
                                        participacao_lider = 'baixa';
                                    }
                                    return participacao_lider;
                                }

                                function project() {
                                    var project = null;
                                    if (`${feature.properties.project}` === 'null') {
                                        project = 'ORAM ILE';
                                    } else {
                                        project = `${feature.properties.project.toUpperCase()}`
                                    }
                                    return project;
                                }


                                function parcels_per_povoado() {
                                    var verifica_parcelas;
                                    var param_project = `${myTag.split(":")[0]}`;
                                    var parcels_tag = param_project.concat(':parcels');
                                    var parcelas_digitalizadas;

                                    $.get({
                                        async: false,
                                        url: `http://cavateco.terrafirma.co.mz:8090/geoserver/${param_project}/ows?service=WFS&version=1.0.0&request=GetFeature&cql_filter=
                                            assoc_name='${feature.properties.name_assoc}'&typeName=${parcels_tag}&maxFeatures=1&outputFormat=application%2Fjson`,
                                        success: function(data) {
                                            parcelas_digitalizadas = data.numberMatched;

                                        },
                                    });

                                    if (`${parcelas_digitalizadas}` === `undefined`) {
                                        verifica_parcelas = 0;
                                    } else {
                                        verifica_parcelas = parcelas_digitalizadas;

                                    }
                                    return verifica_parcelas;

                                }

                                $('#details_panel').html(`
                                <div class='row'>
                                <div class='col-md-5'><small>Provincia de ${feature.properties.name_provinces}</small></div>
                                <div class='col-md-7' style='text-align: justify'><small>&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; ${project()}</small></div>
                            </div>
                            <strong><b><h3><span class='nome'>${feature.properties.name}</span></h3></b></strong><br>
                            <div class="card">
                                <div class="card-header">
                                    Informação
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><i class="fas fa-map-marker-alt" style='font-size: 30px; color: #1c9099;'>
                                  </i>&emsp;&emsp;Loc: <b>Lat:  ${parseFloat(layer.getBounds().getCenter().lat).toFixed(3)}, 
                                  Long: ${parseFloat(layer.getBounds().getCenter().lng).toFixed(3)} </b></li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_area.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius: 
                                        25px; border-radius: 25px; background-color: #76b4fd; ">&emsp; Area:<b> ${parseFloat(
                                  feature.properties.area
                          ).toFixed(3)} ha</b> </li>
                                    <li class="list-group-item">
                                        <img src="./img/icon_elevation.png" style="width: 30px; height: 30px; -webkit-border-radius: 25px; -moz-border-radius:
                                         25px; border-radius: 25px; background-color: #e2843a; ">&emsp; Average Elevation:<b> ${parseFloat(
                                  feature.properties.altitude
                          ).toFixed(3)} meters</b> </li>
                                    <li class="list-group-item">
                                        <div class='row'>
                                            <div class='col-md-7'><i class="fas fa-draw-polygon" style='font-size: 33px; color: #2ca25f;'></i>
                                                <span>&emsp; Parcelas Delimitadas: </span></div>
                                            <div class='col-md-3'>
                                                <div class="card border-success text-success text-center font-weight-light">
                                                    <span style='font-size: 23px;'> <b>${parcels_per_povoado()}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <img src="./img/assoc1.png" style="width: 30px; height: 30px;"> &emsp; Associação: <b>${feature.properties.name_assoc}</b></li>
                                </ul>
                            </div>
                            <br>
                            <div class="card">
                                <img src="${feature.properties.meet_image_url}" class="card-img-top" alt="meet_image">
                                <div class="card-body">
                                    <p class="card-text"> ${feature.properties.meet_type}.</p>
                                </div>
                            </div>
                            <div class='font-weight-normal mt-1 mb-5'>
                                Povodo de ${feature.properties.name}<br> Encontro ocorrido no âmbido da delimitação do povoado.<br> 
                                Este encontro teve lugar na vila de <span style='color:#2171b5; font-size: 15px'>${feature.properties.single_village_name}</span>.<br> 
                                Participaram do encontro cerca de
                                <span style='color:#2171b5; font-size: 15px'>${(feature.properties.attendies_m)+(feature.properties.attendies_f)}</span> membros da comunidade, 
                                dos quais <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_m}</span> Homens
                                e
                                <span style='color:#2171b5; font-size: 15px'>${feature.properties.attendies_f}</span> Mulheres.<br> 
                                A participação do lider comunitário foi <span style='color:#2171b5; font-size: 15px'>${participacao()}</span>.<br> O encontro terminou com seguinte
                                observação:
                                <br> <span style='color:#2171b5; font-size: 15px'>${feature.properties.observations}</span>.
                        
                            </div>                         
                                `);

                            }

                            right_sidebar.show();
                            left_sidebar.hide();
                            on_off_sidebar.state('open-sidebar');


                        });


                        //select the feature while mouseover the detalis panel
                        $('#details_panel').on({
                            'mouseover': function() {
                                var nome = $('.nome').text();

                                if (feature.properties.name === nome) {

                                    layer.setStyle({
                                        weight: 5,
                                        color: "#ef3b2c",
                                        dashArray: "",
                                    });
                                }


                            },
                            'mouseout': function() {

                                layer.setStyle({
                                    //fillColor: "#829ae4",
                                    color: "#232323",
                                    // fillOpacity: opacity,
                                    weight: 1,
                                })
                            }

                        });

                        layer.on("mouseover", function() {
                            layer.setStyle({
                                weight: 5,
                                color: "#FED976",
                                dashArray: "",
                            });
                        });

                        layer.on("mouseout", function() {
                            layer.setStyle({
                                //fillColor: "#829ae4",
                                color: "#232323",
                                // fillOpacity: opacity,
                                weight: 1,
                            });
                        });
                    } else {
                        //costumize the icons for diferrent use principles
                        if (feature.properties.use_principle === 'cropping' || feature.properties.use_principle === 'permanent_crop' || feature.properties.use_principle === 'mixed_farming') {
                            layer
                                .bindTooltip(
                                    `<i class="fas fa-user-edit" style="font-size:15px"></i> Digitizer: <b> ${
                  feature.properties.digitizer
                } </b><br><i class="fas fa-seedling" style='color:#41ae76; font-size:15px;'></i> Use Principle:<b>  ${
                  feature.properties.use_principle
                }</b><br>
                  <i class="fas fa-ruler" style="font-size:15px;"></i> Area (ha): <b> ${feature.properties.area_hectares.toFixed(
                    3
                  )}</b> 
                 `
                                )
                                .openTooltip();

                            layer.on("mouseover", function() {
                                layer.setStyle({
                                    weight: 5,
                                    color: "#e31a1c",
                                    dashArray: "",
                                });
                            });

                            layer.on("mouseout", function() {
                                layer.setStyle({
                                    //fillColor: "#829ae4",
                                    color: "#232323",
                                    //fillOpacity: opacity,
                                    weight: 1,
                                });
                            });
                        } else if (feature.properties.use_principle === 'residential_holiday' || feature.properties.use_principle === 'residential') {
                            layer
                                .bindTooltip(
                                    `<i class="fas fa-user-edit" style="font-size:15px;"></i> Digitizer: <b> ${
              feature.properties.digitizer
            } </b><br><i class="fas fa-home" style='color:#225ea8; font-size:15px;'></i> Use Principle:<b>  ${
              feature.properties.use_principle
            }</b><br>
            <i class="fas fa-ruler" style="font-size:15px;"></i> Area (ha): <b> ${feature.properties.area_hectares.toFixed(
                3
              )}</b> 
             `
                                )
                                .openTooltip();

                            layer.on("mouseover", function() {
                                layer.setStyle({
                                    weight: 5,
                                    color: "#e31a1c",
                                    dashArray: "",
                                });
                            });

                            layer.on("mouseout", function() {
                                layer.setStyle({
                                    //fillColor: "#829ae4",
                                    color: "#232323",
                                    //fillOpacity: opacity,
                                    weight: 1,
                                });
                            });
                        } else {

                            layer
                                .bindTooltip(
                                    `<i class="fas fa-user-edit" style="font-size:15px;"></i> Digitizer: <b> ${
          feature.properties.digitizer
        } </b><br><i class="fas fa-warehouse" style='color:#225ea8; font-size:15px;'></i> Use Principle:<b>  ${
          feature.properties.use_principle
        }</b><br>
        <i class="fas fa-ruler" style="font-size:15px;"></i> Area (ha): <b> ${feature.properties.area_hectares.toFixed(
            3
          )}</b> 
         `
                                )
                                .openTooltip();

                            layer.on("mouseover", function() {
                                layer.setStyle({
                                    weight: 5,
                                    color: "#e31a1c",
                                    dashArray: "",
                                });
                            });

                            layer.on("mouseout", function() {
                                layer.setStyle({
                                    //fillColor: "#829ae4",
                                    color: "#232323",
                                    //fillOpacity: opacity,
                                    weight: 1,
                                });
                            });

                        }



                    }
                },
                // function(feature, layer) {
                //     layer.bindPopup(feature.properties.name + "<br>");
            }).addTo(map);

            if (data.features.length > 0) {
                map.fitBounds(l1.getBounds());
                console.log(data);

            } else {

                $('.alert').slideDown("fast");
                $('.alert').html(`Não existem delimitações neste projecto!!! <i class="fas fa-ban" style="font-size:15px;"></i>`);
                setTimeout(function() {
                    $('.alert').slideUp("slow");
                }, 5000);

            }

            map.removeControl(spinerControl);
        },
    });
}

var warning_div = L.control();
warning_div.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'alert alert-danger text-center');
    div.setAttribute('role', 'alert');
    div.style.height = '40px';
    div.style.width = '400px';
    div.style.right = '600px';
    div.style.top = '-100px';
    div.style.display = 'none';
    return div;
}

warning_div.addTo(map);






//On and Off the layers
$(".form-check-input").on("change", function() {
    var url = $(this).attr("layer_url");
    var myTag = $(this).attr("layer_name");

    if ($(this).is(":checked")) {
        map.addControl(spinerControl);
        loadOperationLayers(url, myTag);
    } else {
        map.eachLayer(function(layer) {
            if (layer.myTag && layer.myTag === myTag) {
                map.removeLayer(layer);
            }
        });
    }
});

//Uncheck all checkboxes
$(".uncheck_btn").on("click", function() {
    var tag1 = $(this).attr("tag1");
    var tag2 = $(this).attr("tag2");
    var tag3 = $(this).attr("tag3");

    map.eachLayer(function(layer) {
        if (layer.myTag && layer.myTag === tag1) {
            map.removeLayer(layer);
            $(`#${tag1.replace(":", "_")}`).prop("checked", false);
        }
        if (layer.myTag && layer.myTag === tag2) {
            map.removeLayer(layer);
            $(`#${tag2.replace(":", "_")}`).prop("checked", false);
        }
        if (layer.myTag && layer.myTag === tag3) {
            map.removeLayer(layer);
            $(`#${tag3.replace(":", "_")}`).prop("checked", false);
        }
    });
    map.setView([-19.26966529650232, 35.92578125], 7);
});

//Opacity control

$(".opacity").on("change", function() {
    var layerName = $(this).attr("layer_povoados");
    var opacity = $(this).val() / 100;

    console.log(layerName, opacity);

    map.eachLayer(function(layer) {
        if (layer.myTag && layer.myTag === layerName) {
            layer.setStyle({ fillOpacity: opacity });
        }
    });
});

$(".styleControler").on("change", function() {
    var id = $(this).attr("id");

    if ($(this).is(":checked")) {
        alert(id);
    }
});

// // Switch color button
$(".switch_color").on("click", function() {
    var layerName1 = $(this).attr("layer_parcels");
    var layerName2 = $(this).attr("layer_povoados");



    var color = getColor();

    //if ($(`#${layerName2.replace(':', '_')}`).is(":checked")) { alert(`${layerName2}`) }

    map.eachLayer(function(layer) {
        if (layer.myTag && layer.myTag === layerName2) {
            layer.setStyle({
                fillColor: color,
                color: "#232323",
                //fillOpacity: opacity,
                weight: 1,
            });
        } else if (layer.myTag && layer.myTag === layerName1) {
            layer.setStyle({
                fillColor: color,
                color: "#232323",
                //fillOpacity: opacity,
                weight: 1,
            });
        }
    });
});


//easy button for on_off sidebar

var on_off_sidebar = L.easyButton({

    position: 'topleft',

    states: [{
        stateName: 'close-sidebar', // name the state
        icon: 'fa-angle-double-left', // and define its properties
        title: 'Close sidebar', // like its title
        onClick: function(btn, map) { // and its callback
            left_sidebar.hide();
            btn.state('open-sidebar'); // change state on click!
        }


    }, {
        stateName: 'open-sidebar',
        icon: 'fa-angle-double-right',
        icon: 'fa-stream',
        title: 'Open siderbar',
        onClick: function(btn, map) {

            left_sidebar.show();
            btn.state('close-sidebar');
            right_sidebar.hide();
        }
    }]
});

on_off_sidebar.addTo(map);

$('.leaflet-sidebar.left .close ').on('click', function() {
    on_off_sidebar.state('open-sidebar');
});

//geojson with parramenters as options

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// var rootUrl = "http://cavateco.terrafirma.co.mz:8090/geoserver/ows";

// var defaultParameters = {
//   service: "WFS",
//   version: "1.0.0",
//   request: "GetFeature",
//   typeName: "dev_ops_cesc_niassa:parcels",
//   maxFeatures: 3000,
//   outputFormat: "text/javascript",
//   format_options: "callback: getJson",
// };

// var parameters = L.Util.extend(defaultParameters);

// $.ajax({
//   url: rootUrl + L.Util.getParamString(parameters),
//   dataType: "jsonp",
//   jsonpCallback: "getJson",
//   success: handleJson,
// });

// function handleJson(data) {
//   layer = L.geoJson(data, {
//     onEachFeature: onEachFeature,
//     // ,
//     // pointToLayer: function(feature, latlng) {
//     //     return L.circleMarker(latlng, geojsonMarkerOptions);
//     //     //return L.marker(latlng);
//     // }
//   }).addTo(map);
//   map.fitBounds(layer.getBounds());
// }

// //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// $.ajax("http://cavateco.terrafirma.co.mz:8090/geoserver/ows", {
//   type: "GET",
//   data: {
//     service: "WFS",
//     version: "1.1.0",
//     request: "GetFeature",
//     typename: "cavateco_cesc_niassa:parcels",
//     srsname: "EPSG:4326",
//     outputFormat: "text/javascript",
//   },

//   dataType: "jsonp",
//   jsonpCallback: "callback:handleJson",
//   jsonp: "format_options",
// });

// // the ajax callback function
// function handleJson(data) {
//   var selectedArea = L.geoJson(data, {

//   }).addTo(map);
//   map.fitBounds(selectedArea.getBounds());
//   console.log(selectedArea);
// }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// layer on/off checkbox
// $(".layer-card-cb").on("change", function () {
//   if ($(this).is(":checked")) {
//     buLayer.addTo(map);
//   } else {
//     map.removeLayer(buLayer);
//   }
// });

// function handleLayer(layerName) {
//     var layer = L.tileLayer.betterWms(
//         "http://cavateco.terrafirma.co.mz:8090/geoserver/wms", {
//             layers: layerName,
//             transparent: true,
//             format: "image/png",
//             zIndex: 1000,
//         }
//     );

//     return layer;
// }

//Layer card in left-sidebar
// layersFromGeoserver.map((layer) => {
//     $(".left-sidebar").append(
//         layerCardGenerator(
//             layer.layerTitle,
//             layer.layerName,
//             layer.defaultCheck,
//             layer.thumbnailUrl,
//             layer.description
//         )
//     );
// });

//Default layer on switch
// layersFromGeoserver.map((layer) => {
//     if (layer.defaultCheck === "checked") {
//         handleLayer(layer.layerName).addTo(map);
//         // $(".legend").append(wmsLegendControl(layer.layerName, layer.layerTitle));
//     }
// });

//CescNiassa_form_b_lideres cardbody
// $(".form-check-input").on("change", function() {
//     var url = $(this).attr("layer_url");
//     //var layerTitle = $(this).attr("name");
//     if ($(this).is(":checked")) {

//         // loadOperationLayers(url);
//         console.log(url);

//     } else {
//         map.removeLayer(l1);

//     }
// });

// Layer on/off switch
$(".layer-card-cb").on("change", function() {
    var layerName = $(this).attr("id");
    var layerTitle = $(this).attr("name");

    console.log(layerName);
    alert(layerName);

    if ($(this).is(":checked")) {
        window[layerName] = handleLayer(layerName).addTo(map);

        //  $(".legend").append(wmsLegendControl(layerName, layerTitle));
    } else {
        map.eachLayer(function(layer) {
            if (layer.options.layers === layerName) {
                map.removeLayer(layer);
            }
        });
        var className = layerName.split(":")[1];

        // $(`.legend .${className}`).remove();
    }
});

//Opacity control for WMS layer

// $(".opacity").on("change", function () {
//   var layerName = $(this).attr("code");

//   var opacity = $(this).val() / 100;

//   console.log(layerName, opacity);

//   map.eachLayer(function (layer) {
//     if (layer.options.layers === layerName) {
//       layer.setOpacity(opacity);
//     }
//   });
// });

// //legend control function
// function wmsLegendControl(layerName, layerTitle) {
//     var className = layerName.split(":")[1];
//     var url = `http://maps.biodiversityatlaskenya.org/geoserver/geonode/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`;
//     var legend = `<p class="${className}" style='margion-top:10px; font-weight: bold'>${layerTitle}</p>`;
//     legend += `<p><img class="${className}" src=${url} /><br class=${className} /></p> `;
//     return legend;
// }

//mouse coordinate
map.on("mousemove", function(e) {
    $(".map-coordinate").html(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
});

//map scale
L.control.scale().addTo(map);

//Default map view
$(".default-view").on("click", function() {
    map.setView([-19.26966529650232, 35.92578125], 6);
});

//View map in full browser
function fullScreenToggler() {
    var doc = document,
        elm = document.getElementById("map");

    if (elm.requestFullscreen) {
        !doc.fullscreenElement ? elm.requestFullscreen() : doc.exitFullscreen();
    } else if (elm.mozRequestFullScreen) {
        !doc.mozFullScreen ? elm.mozRequestFullScreen() : doc.mozCancelFullScreen();
    } else if (elm.msRequestFullscreen) {
        !doc.msFullscreenElement ?
            elm.msRequestFullscreen() :
            doc.msExitFullscreen();
    } else if (elm.webkitRequestFullscreen) {
        !doc.webkitIsFullscreen ?
            elm.webkitRequestFullscreen() :
            doc.webkitCancelFullscreen();
    } else {
        console.log("Fullscreen support not detected.");
    }
}

$(".full-screen").click(fullScreenToggler);

//Browser print
L.control.browserPrint().addTo(map);
$(".print-map").click(function() {
    var printMode = L.control.browserPrint.mode.landscape();
    map.printControl.print(printMode);
});

$(".leaflet-control-browser-print").css({
    display: "none",
});

const container = document.querySelector("#sidebar");
const container2 = document.querySelector("#details_panel");
const ps = new PerfectScrollbar(container);
const ps1 = new PerfectScrollbar(container2);

var measureControl = new L.Control.Measure({
    position: "topleft",
    primaryLengthUnit: "meters",
    secondaryLengthUnit: "kilometers",
    primaryAreaUnit: "hectares",
    secondaryAreaUnit: undefined,
    activeColor: "#ABE67E",
    completedColor: "#C8F2BE",
});
measureControl.addTo(map);

// search geojson layer
// var searchControl = new L.Control.Search({
//     layer: l1,
//     propertyName: "name",
//     marker: false,
//     textPlaceholder: "Pesq comunidades...",
//     moveToLocation: function(latlng, title, map) {
//         //map.fitBounds( latlng.layer.getBounds() );
//         var zoom = map.getBoundsZoom(latlng.layer.getBounds());
//         map.setView(latlng, zoom); // access the zoom
//     },
// });

// searchControl
//     .on("search:locationfound", function(e) {
//         //console.log('search:locationfound', );

//         //map.removeLayer(this._markerSearch)

//         e.layer.setStyle({ fillColor: "#3f0", color: "#0f0" });
//         if (e.layer._popup) e.layer.openPopup();
//     })
//     .on("search:collapsed", function(e) {
//         l1.eachLayer(function(layer) {
//             //restore feature color
//             l1.resetStyle(layer);
//         });
//     });

// map.addControl(searchControl);

//converting getCapabilities XML to json in order to getbounds to wms

// var wms_url =
//   "http://cavateco.terrafirma.co.mz:8090/geoserver/cavateco_nitidae/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=cavateco_nitidae%3Aparcels&resultType=hits&AcceptFormats=application/json";

// axios.get(wms_url).then((res) => console.log(res.data));

// axios.get(wms_url).then((res) => {
//   // For convert the xml to JSON
//   const json = new WMSCapabilities(res.data).toJSON();
//   console.log(json);

//   // GetCapabilities provides all the layers so we need to filter the required one.
//   const layers = json?.Capability?.Layer?.Layer;
//   var workspace = "my_spatia";
//   var layer_name = "countries";
//   const layer = layers?.filter((l) => l.Name === layerName2)[0];
//   console.log(layer);

//   // To get the bounding box of the layer
//   const bbox = layer?.LatLonBoundingBox;
//   console.log(layer.BoundingBox);
//   var posicao1 = layer.BoundingBox[0];

//   // // Use this bounding box to zoom to the layer,
//   map.fitBounds([
//     [posicao1.extent[1], posicao1.extent[0]],
//     [posicao1.extent[3], posicao1.extent[2]],
//   ]);
//});

// const xmlSample = `<wfs:FeatureCollection xmlns:xs=http://www.w3.org/2001/XMLSchema" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" numberOfFeatures="905" timeStamp="2021-09-16T23:06:34.113Z" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"/>`;
// console.log(parseXmlToJson(xmlSample));

// function parseXmlToJson(xml) {
//   const json = {};
//   for (const res of xml.matchAll(
//     /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm
//   )) {
//     const key = res[1] || res[3];
//     const value = res[2] && parseXmlToJson(res[2]);
//     json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
//   }
//   return json;
// }
// alert(parcels_cesc.features.length);