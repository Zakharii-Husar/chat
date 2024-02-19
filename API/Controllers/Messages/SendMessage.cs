using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers.Messages
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMessage : ControllerBase
    {
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }
    }
}
