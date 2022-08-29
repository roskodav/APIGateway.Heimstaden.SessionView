using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using APIGateway.Core.Encryption;
using APIGateway.Core.MluviiClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace APIGateway.Heimstaden.SessionView.Controllers
{
    [ApiController]
    [Route("SessionView")]
    public class SessionViewController : ControllerBase
    {

        private readonly ServiceOptions _serviceOption;
        private readonly MluviiClient client;
        private readonly IEncryption _encryption;
        private readonly ILogger<SessionViewController> _log;

        public SessionViewController(MluviiClient client, IEncryption encryption, IOptions<ServiceOptions> serviceOption, ILogger<SessionViewController> log)
        {
            _serviceOption = serviceOption.Value;
            this.client = client;
            _encryption = encryption;
            _log = log;
        }

        // GET: SessionViewController
        [HttpGet]
        public async Task<ActionResult> Get(string id, string token)
        {

#if DEBUG
            var encrypted = _encryption.Encrypt(id);
            encrypted = HttpUtility.UrlEncode(encrypted);
#endif
            try
            {
                // Decrypt Session API and Convert to Long
                var DSession = Convert.ToUInt32(_encryption.Decrypt(token));

                // Get Session Values From API
                var SessionData = await client.GetSession(DSession);
                if (SessionData.value == null)
                {
                    return NotFound();
                }

                var value = SessionData.value;

                for (int i = 0; i < value.Recordings?.Count; i++)
                {
                    value.Recordings.ToList()[i].DownloadUrl = _serviceOption.ExternalUrl + "recording?token=" + HttpUtility.UrlEncode(_encryption.Encrypt(value.Recordings.ToList()[i].DownloadUrl));
                }

                var serializerSettings = new JsonSerializerSettings();
                serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                var serialized = JsonConvert.SerializeObject(SessionData.value, serializerSettings);
                return Ok(serialized);
            }
            catch (Exception ex)
            {
                _log.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
