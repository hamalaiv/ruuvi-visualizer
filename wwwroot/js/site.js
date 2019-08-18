﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// var modelData is declared in another file and
// it contains all data from a device

var filteredData = [];
for(let i=0, len=modelData.length; i<len; i+=4){
    filteredData.push(modelData[i]);
}

var temperatureData = filteredData.map(x => {
    return { t: moment.utc(x.timestamp).toDate(), y: x.temperature };
});
var humidityData = filteredData.map(x => {
    return { t: moment.utc(x.timestamp).toDate(), y: x.humidity };
});

// animations disabled for performance reasons
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
            pointRadius: 0,
            pointHitRadius: 5,
            data: temperatureData
        },
        {
            label: 'humidity %',
            borderColor: "#17a2b8",
            backgroundColor: "#17a2b8",
            fill: false,
            pointRadius: 0,
            pointHitRadius: 5,
            data: humidityData
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    parser: "DD.MM."
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