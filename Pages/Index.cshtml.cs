using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using System.Globalization;

namespace ruuvi_visualizer.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _env;

        public string ApiKey { get; }
        public string TempDeviceId{ get; }

        public string Data { get; set; }

        public IndexModel(IConfiguration config, IHostingEnvironment env)
        {
            _config = config;
            _env = env;
            ApiKey = _config["Secrets:ApiKey"];
            TempDeviceId = _config["Secrets:TempDeviceId"];
        }

        static readonly HttpClient client = new HttpClient();

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if(id == null)
            {
                return Page();
            }

            if(_env.IsDevelopment())
            {
                // Sample data without http request in development mode
                Data = GenerateData();
            }
            else
            {
                try
                {
                    HttpResponseMessage response = await client.GetAsync($"https://ruuvi-collector-func2.azurewebsites.net/api/HttpTriggerCSharp/id/{TempDeviceId}?code={ApiKey}");
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    // Above three lines can be replaced with new helper method below
                    // string responseBody = await client.GetStringAsync(uri);

                    Data = responseBody;
                }  
                catch(HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");	
                    Console.WriteLine("Message :{0} ",e.Message);
                }
            }

            return Page();
        }

        private string GenerateData(){
            string data = "";
            for(int i=100; i>=0; --i){
                double radians = (i * 20 * Math.PI) / 180;
                double temp = 20 + Math.Sin(radians);
                double humd = 40 + Math.Sin(radians) * 10;
                data += GenerateDataObject(DateTime.Now.AddDays(-i).ToString("s"), temp, humd) + ",";
            }
            return $"[{data.Remove(data.Length - 1)}]";
        }

        private string GenerateDataObject(string timestamp, double temp, double humd){
            return "{" + $"\"dataFormat\":3,\"rssi\":-70,\"humidity\":{humd.ToString(CultureInfo.InvariantCulture)},\"temperature\":{temp.ToString(CultureInfo.InvariantCulture)},\"pressure\":100499,\"accelerationX\":17,\"accelerationY\":-31,\"accelerationZ\":1039,\"battery\":3115,\"id\":\"simulator001\",\"timestamp\":\"{timestamp}\"" + "}";
        }
    }
}
