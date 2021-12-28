Highcharts.chart('chart_div', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Comuidades Delimitadas Por Projecto'
    },
    subtitle: {
        text: 'Source: <a href="https://datastudio.google.com/u/0/reporting/70f61679-2ae6-4795-a03d-442eb2cde332/page/SXViB">CaVaTeCo</a>'
    },
    xAxis: {
        categories: ['Cesc Niassa', 'NANA-Novo Madal', 'Nitidae Zambézia', 'ANAM Ile', 'ANAM Coastal', 'Gras HVP', 'Gras Nampula', 'Gras Zambézia', 'Gras Niassa', 'WCS Niassa'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Comuidades',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
            name: 'Total Comunidades',
            data: [8, 14, 6, 59, 19, 2, 19, 14, 12, 0]
        }
        // , {
        //     name: 'Year 1900',
        //     data: [133, 156, 947, 408, 6]
        // }, {
        //     name: 'Year 2000',
        //     data: [814, 841, 3714, 727, 31]
        // }, {
        //     name: 'Year 2016',
        //     data: [1216, 1001, 4436, 738, 40]
        // }
    ]
});