var parcelas_digitalizadas;
var parcelas_por_digitalizar;
var parcelas_reclamadas;
var total_povoados;
var actualizacao;
var date;
var hora;

console.log("Calculando  metricas de cada projecto");

document.addEventListener("readystatechange", (event) => {
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
    if (event.target.readyState === "complete") {
        metrics_array.forEach((element) => {
            $.get({
                async: false, // have to use synchronous here, else the function
                // will return before the data is fetched
                url: element.parcels_url,
                success: function(data) {
                    parcelas_digitalizadas = data.numberMatched;
                    actualizacao = data.timeStamp.split("T");
                    date = actualizacao[0];
                    hora = actualizacao[1].substr(0, 8);

                    $(`#${element.projectName.replace(" ", "")}`).text(
                        `today at ${hora}`
                    );
                    $(`#span_${element.l1_name.replace(":", "_")}`).text(
                        ` ${parcelas_digitalizadas}`
                    );

                    console.log(`#${element.projectName.replace(" ", "")}`);
                    // console.log(
                    //     `#${element.l1_name.replace(":", "_")} : ${parcelas_digitalizadas}`
                    // );
                },
            });

            //parcelas por delimitar

            $.get({
                async: false, // have to use synchronous here, else the function
                // will return before the data is fetched
                url: element.form_p_parcel,
                success: function(data) {
                    parcelas_reclamadas = data.numberMatched;
                    parcelas_por_digitalizar =
                        parcelas_reclamadas - parcelas_digitalizadas;
                    $(`#deficit_parcels${element.l2_name.replace(":", "_")}`).text(
                        `${parcelas_por_digitalizar}`
                    );

                    //console.log(data);
                },
            });

            $.get({
                async: false, // have to use synchronous here, else the function
                // will return before the data is fetched
                url: element.povoados_url,
                success: function(data) {
                    total_povoados = data.numberMatched;

                    $(`#span_${element.l2_name.replace(":", "_")}`).text(
                        ` ${total_povoados}`
                    );

                    console.log(data);
                },
            });

            setTimeout(fade_out, 30000);

            function fade_out() {
                $(`#${element.lastUpdate}`).fadeOut().empty();
            }

            $(`#${element.lastUpdate}`).fadeOut(70000);

            // $(`#${element.l1_name.replace(":", "_")}`).on("mouseover", function() {
            //     $(`#${element.lastUpdate}`).hide();
            // });
        });

        $('#spiner_div').hide();
    }
});