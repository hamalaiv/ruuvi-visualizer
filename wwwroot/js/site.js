﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// var modelData is declared in another file and
// it contains all data from a device

var tempData = modelData.map(x => {
    return { x: moment.utc(x.timestamp).toDate(), y: x.temperature };
});
var humdData = modelData.map(x => {
    return { x: moment.utc(x.timestamp).toDate(), y: x.humidity };
});

var currentTemp = document.getElementById("current-temp");
currentTemp.innerHTML = tempData[tempData.length - 1].y + "°C";

var currentHumd = document.getElementById("current-humd");
currentHumd.innerHTML = humdData[humdData.length - 1].y + "%";

// animations disabled for performance reasons
var chartOptions =  {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0 // general animation time
    },
    hover: {
        animationDuration: 0 // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
    downsample: {
        enabled: true,
        threshold: 50 // max number of points to display per dataset
    },
    elements: {
        line: {
            tension: 0.2
        }
    },
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
                beginAtZero: false
            }
        }]
    }
};

var ctxTemp = document.getElementById('chart-temp').getContext('2d');
var chartTemp = new Chart(ctxTemp, {
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
            data: tempData
        }]
    },
    options: chartOptions
});

var ctxHumd = document.getElementById('chart-humd').getContext('2d');
var chartHumd = new Chart(ctxHumd, {
    type: 'line',
    data: {
        datasets: [
        {
            label: 'humidity %',
            borderColor: "#17a2b8",
            backgroundColor: "#17a2b8",
            fill: false,
            pointRadius: 0,
            pointHitRadius: 5,
            data: humdData
        }]
    },
    options: chartOptions
});

$("#chart-temp-controls :input").change(e => {
    switch(e.target.id){
        case "chart-temp-all":
            chartTemp.data.datasets[0].data = tempData;
            chartTemp.update();
            break;
        case "chart-temp-month":
            chartTemp.data.datasets[0].data = tempData.filter(d => moment(d.x).isAfter(moment.utc().add(-1, "M")));
            chartTemp.update();
            break;
        case "chart-temp-week":
            chartTemp.data.datasets[0].data = tempData.filter(d => moment(d.x).isAfter(moment.utc().add(-7, "d")));
            chartTemp.update();
            break;
        case "chart-temp-today":
            chartTemp.data.datasets[0].data = tempData.filter(d => moment(d.x).isAfter(moment.utc().add(-1, "d")));
            chartTemp.update();
            break;
    }
});

$("#chart-humd-controls :input").change(e => {
    switch(e.target.id){
        case "chart-humd-all":
            chartHumd.data.datasets[0].data = humdData;
            chartHumd.update();
            break;
        case "chart-humd-month":
            chartHumd.data.datasets[0].data = humdData.filter(d => moment(d.x).isAfter(moment.utc().add(-1, "M")));
            chartHumd.update();
            break;
        case "chart-humd-week":
            chartHumd.data.datasets[0].data = humdData.filter(d => moment(d.x).isAfter(moment.utc().add(-7, "d")));
            chartHumd.update();
            break;
        case "chart-humd-today":
            chartHumd.data.datasets[0].data = humdData.filter(d => moment(d.x).isAfter(moment.utc().add(-1, "d")));
            chartHumd.update();
            break;
    }
});