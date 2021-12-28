function layerCardGenerator_warehouse(
    l1_name,
    l2_name,
    l3_name,
    thumbnailUrl,
    projectName,
    id_for_button_uncheckAll,
    id_for_button_query,
    description,
    code,
    id_for_button_switch_color,
    parcels_url,
    povoados_url,
    lideres_url,
    l1_defaultCheck,
    l2_defaultCheck,
    //defaultCheck
    lastUpdate
) {
    var parcelas_digitalizadas = null;
    var parcelas_por_digitalizar = null;
    var total_povoados = null;
    var actualizacao = null;
    var date = null;
    var hora = null;

    var layerCard = `
    <div class="card-body layer-card">
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-4 thumbnails">
                    <img src="${thumbnailUrl}" alt="${projectName}" class="img-fluid" />
                </div>
                <div class="col-8" style="text-align: right">
                    <span class="d-block mt-0 layer-title" style="text-align: right">${projectName}</span
>
</div>
</div>

<div class="layer-check-list">
 <div class="form-check form-check-inline">
 <input
  class="form-check-input"
  type="checkbox"
  id="${l2_name.replace(":", "_")}"
  layer_url="${povoados_url}"
  layer_name="${l2_name}"
  layerUnderScore="${l2_name.replace(":", "_")}"
  value="option2"
/>
<label class="form-check-label" for="${l2_name.replace(
    ":",
    "_"
  )}">Povoados</label>
</div>
<div class="form-check form-check-inline">
<input
class="form-check-input"
type="checkbox"
id="${l1_name.replace(":", "_")}"
layer_url="${parcels_url}"
layer_name="${l1_name}"
layerUnderScore="${l1_name.replace(":", "_")}"
value="option1"
/>
<label class="form-check-label" for="${l1_name.replace(
    ":",
    "_"
  )}">Parcelas</label>
</div>
<div class="form-check form-check-inline">
<input
  class="form-check-input"
  type="checkbox"
  id="${l3_name.replace(":", "_")}"
  layer_url="${lideres_url}"
  layer_name="${l3_name}"
  value="option3"
/>
<label class="form-check-label" for="${l3_name.replace(
    ":",
    "_"
  )}">Líderes</label>
</div>
<div class="form-check form-check-inline">
<input
  class="form-check-input"
  type="checkbox"
  id="inlineCheckbox3"
  value="option3"
  disabled
/>
<label class="form-check-label" for="inlineCheckbox3">inf</label>
</div>
</div>
<div class="row mt-1 mb-2">
<div class="col-md-6">
<div
id="button_uncheck"
class="d-grid gap-2 d-md-flex justify-content-md-start"
>

</div>
</div>
<div class="col-md-6">
<div
id="button_uncheck"
class="d-grid gap-2 d-md-flex justify-content-md-end"
>
<button
  type="button"
  class="btn btn-outline-success btn-sm uncheck_btn"
  id="${id_for_button_uncheckAll}"
  tag1="${l1_name}"
  tag2="${l2_name}"
  tag3="${l3_name}"
>
  Uncheck All
</button>
</div>
</div>
</div>

<div>${description}

</div>     
        <div>
            <div class="card-deck mb-2 mt-2">
                <div class="card bg-success text-white mr-1 metrics_card">
                    <div class="card-body">
                        <div class="label">Total</div>
                        <div class="value"><span style='font-weight: bold ; font-size: large;' id='span_${l1_name.replace(
                          ":",
                          "_"
                        )}'> ${parcelas_digitalizadas}</span></div>
                <div class="metric">Parcelas Delimitadas</div>
            </div>
        </div>
        <div class="card border-warning text-warning mr-1 metrics_card">
            <div class="card-body">
                <div class="label">Total</div>
                <div class="value"><span style='font-weight: bold; font-size: large;' id='deficit_parcels${l2_name.replace(
                  ":",
                  "_"
                )}'> ${parcelas_por_digitalizar}</span></div>
                <div class="metric">Parcelas por Delimitar</div>
            </div>
        </div>
        <div class="card border-dark text-dark metrics_card">
            <div class="card-body">
                <div class="label">Total</div>
                <div class="value"><span style='font-weight: bold; font-size: large;' id='span_${l2_name.replace(
                  ":",
                  "_"
                )}'> ${total_povoados}<span></div>
                    <div class="metric">Povoados delimitados</div>
                    </div>
                </div>
            </div>
        </div>
        <p class="card-text"><small class="text-muted">Last updated: <span id='${projectName.replace(
          " ",
          ""
        )}'> ${hora}</span></small>
                    </p>

                </div>
            </div>

            <div style="display: flex">
                <label for="opacity">
<b class="mr-5 mt-2">Transparency:</b>
</label>
                <input type="range" class="form-control-range opacity mb-2" id="opacity_${l2_name.replace(
                  " : ",
                  "_ "
                )}" value="100" min="0" max="100" data-toggle="tooltip" title="Opacity" layer_parcels="${l1_name}" layer_povoados="${l2_name}" layer_lideres="${l3_name}" />
            </div>

            <div class="row">
                <div class="col-md-7">

                </div>
                <div class="col-md-5 d-grid gap-2 d-md-flex justify-content-md-end" id="switch_color_btn">
                    <button type="button" class="btn btn-outline-success btn-sm switch_color" id="${id_for_button_switch_color}" layer_povoados="${l2_name}" layer_parcels="${l1_name}">
Switch Color
</button>
                </div>
            </div>

        </div>
  `;

    return layerCard;
}