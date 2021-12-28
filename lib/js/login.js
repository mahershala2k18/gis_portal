function login(options) {
    // url del servlet del geoserver
    var url = options.server + "/geoserver/j_spring_security_check";
    // parametros para el login
    params = "username=" + options["user"] + "&password=" +
        options["password"];

    var contentType = "application/x-www-form-urlencoded";
    //se inicializa la petición ajax
    var ajax = $.ajax({
        data: params,
        type: "POST",
        contentType: contentType,
        url: url
    });
    // se ejecuta cuando la peticion finaliza
    ajax.done(function() {

        if ($.cookie("JSESSIONID") != null && options && options.success) {
            options.success();
        }
    });
    // si ocurrio un error al realizar la peticion
    ajax.fail(function(data) {
        if (options && options.failure) {
            options.failure(data);
        }
    });
    // se ejecuta siempre al final de la petición, sin importar que esta
    // haya fallado
    ajax.always(function() {
        if (options && options.always) {
            options.always();
        }
    });
};

login({
    user: "user", //geoserver user
    password: "password",
    server: "http://cavateco.terrafirma.co.mz:8090", //geoserver host
    success: function() {
        alert("Login OK!");
    },
    failure: function() {
        alert("Login fail!");
    }
});