function layerCardGenerator_for_geojson(
    l1_name,
    l2_name,
    l3_name,
    box1,
    box2,
    box3,
    thumbnailUrl,
    projectName,
    id_for_button_uncheckAll,
    description,
    code,
    id_for_button_switch_color,
    parcels_url,
    povoados_url,
    lideres_url,
    l1_defaultCheck,
    l2_defaultCheck
    //defaultCheck
) {
    var layerCard = `
  <div class="card-body layer-card">
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-4 thumbnails">
          <img
            src="${thumbnailUrl}"
            alt="${projectName}"
            class="img-fluid"
          />
        </div>
        <div class="col-8" style="text-align: right">
          <span class="d-block mt-0 layer-title" style="text-align: right"
            >${projectName}</span
          >
        </div>
      </div>

      <div class="layer-check-list">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="${box1}"
            layer_url="${parcels_url}"
            layer_name="${l1_name}"
            value="option1"
          />
          <label class="form-check-label" for="${box1}">Parcelas</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="${box2}"
            layer_url="${povoados_url}"
            layer_name="${l2_name}"
            value="option2"
          />
          <label class="form-check-label" for="${box2}">Povoados</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="${box3}"
            layer_url="${lideres_url}"
            layer_name="${l3_name}"
            value="option3"
          />
          <label class="form-check-label" for="${box3}">Líderes</label>
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

      <div
        id="button_uncheck"
        class="d-grid gap-2 d-md-flex justify-content-md-end"
      >
        <button
          type="button"
          class="btn btn-outline-success btn-sm uncheck_btn"
          id="${id_for_button_uncheckAll}"
        >
          Uncheck All
        </button>
      </div>
      <div>${description}</div>
    </div>
  </div>

  <div style="display: flex">
    <label for="opacity">
      <b class="mr-5 mt-2">Opacity:</b>
    </label>
    <input
      type="range"
      class="form-control-range opacity"
      value="100"
      min="0"
      max="100"
      data-toggle="tooltip"
      title="Opacity"
      layer_parcels="${l1_name}"
      layer_povoados="${l2_name}"
      layer_lideres="${l3_name}"
    />
  </div>

  <div class="row">
    <div class="col-md-7">
      Layer Style Controler:<br>

        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked>
          <label class="form-check-label" for="inlineRadio1">1</label>
       </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
        <label class="form-check-label" for="inlineRadio2">2</label>
      </div>
    </div>
    <div class="col-md-5 d-grid gap-2 d-md-flex justify-content-md-end" id="switch_color_btn">
        <button
          type="button"
          class="btn btn-outline-success btn-sm switch_color"
          id="${id_for_button_switch_color}"
          layer_povoados="${l2_name}"
          layer_parcels="${l1_name}"
        >
          Switch Color
        </button>
        </div>
    </div>
  
</div>
      `;

    return layerCard;
}