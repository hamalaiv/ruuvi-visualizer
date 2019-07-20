// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
function test1(apiKey, tempDeviceId){
    console.log(`apiKey: ${apiKey}, tempDeviceId: ${tempDeviceId}`);
    $.get(`https://ruuvi-collector-func2.azurewebsites.net/api/HttpTriggerCSharp/id/${tempDeviceId}?code=${apiKey}`, data => {
        console.log(data);
    });   
}