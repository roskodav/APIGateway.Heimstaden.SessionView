using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspNetCore.Proxy;

namespace APIGateway.Heimstaden.SessionView.Controllers
{
    public class StorageProxy : Controller
    {
        [Route("proxy/{**rest}")]
        public Task ProxyStorageAll(string rest)
        {
            // If you don't need the query string, then you can remove this.
            var queryString = this.Request.QueryString.Value;
            return this.HttpProxyAsync($"https://app.mluvii.com/Storage/{rest}{queryString}");
        }
    }
}
