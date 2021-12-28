//*********************not being used its a custom control button */


var customControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom sidebar_toggler');

        container.style.backgroundColor = '#fafafa';
        container.style.backgroundImage = "url(./img/menu3.png)";
        container.style.backgroundSize = "auto";
        container.style.width = '34px';
        container.style.height = '34px';

        return container;
    }

});

var sidebarControl = new customControl();