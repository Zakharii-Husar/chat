using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;

namespace API.Controllers.Messages
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetChat : ControllerBase
    {
        // GET: api/<GetMessages>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            //var messagesWithUsers = AppDbContext.Messages
            //    .Include(m => m.Sender)
            //    .Include(m => m.Receiver)
            //    .ToList();

            return new string[] { "value1", "value2" };
        }
    }
}
