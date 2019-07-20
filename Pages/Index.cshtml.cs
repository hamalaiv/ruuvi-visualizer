using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;

namespace ruuvi_visualizer.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IConfiguration _config;

        public string ApiKey { get; }
        public string TempDeviceId{ get; }

        public IndexModel(IConfiguration config)
        {
            _config = config;
        }
        
        public void OnGet()
        {

        }
    }
}
