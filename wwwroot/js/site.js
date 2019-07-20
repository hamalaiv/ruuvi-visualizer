// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
        {
            label: 'temperature °C',
            borderColor: "#dc3545",
            backgroundColor: "#dc3545",
            fill: false,
            data: temperatureData
        },
        {
            label: 'humidity %',
            borderColor: "#17a2b8",
            backgroundColor: "#17a2b8",
            fill: false,
            data: humidityData
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                }
            }],
            yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});