using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using APIGateway.Core.Encryption;
using APIGateway.Core.MluviiClient;
using Microsoft.AspNetCore.Mvc;

namespace APIGateway.Heimstaden.SessionView.Controllers
{
    /// <summary>
    /// This service provide access to recordinf for unregistered users in FAMA
    /// </summary>
    [ApiController]
    [Route("recording")]
    public class Recording : ControllerBase
    {
        private readonly MluviiClient _client;
        private readonly IEncryption _encryption;

        public Recording(MluviiClient client,
            IEncryption encryption)
        {
            _client = client;
            _encryption = encryption;
        }

        public async Task<IActionResult> Index(string token)
        {
            // Decrypt Session API and Convert to Long
            var url = _encryption.Decrypt(token);
            Regex reg = new Regex("[*'\",_&#^@/:%=?.]");

            var name = reg.Replace(url, string.Empty);
            var path = $"./recordings/{name}.mp3";

            await _client.DownloadRecording(url, stream =>
            {
                if (!Directory.Exists("./recordings"))
                {
                    Directory.CreateDirectory("./recordings");
                }

                var fileStream = System.IO.File.Create(path);
                stream.CopyTo(fileStream);
                fileStream.Close();
            });
            var res = File(System.IO.File.OpenRead(path), "audio/mp3");
            res.EnableRangeProcessing = true;
            return res;

        }
    }
}
