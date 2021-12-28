var customControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.style.backgroundColor = '#fafafa';
        container.style.backgroundImage = "url(./img/ajax-loader.gif)";
        container.style.backgroundSize = "auto";
        container.style.width = '34px';
        container.style.height = '34px';

        container.onclick = function() {
            console.log('buttonClicked');
        }

        return container;
    }

});

var spinerControl = new customControl();