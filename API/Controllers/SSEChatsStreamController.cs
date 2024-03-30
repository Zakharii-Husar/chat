using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

[Authorize]
[Route("chat-api/[controller]")]
[ApiController]
public class SSEChatsStreamController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        Response.Headers.Add("Content-Type", "text/event-stream");

        while (!cancellationToken.IsCancellationRequested)
        {
            // Create an object to return as JSON
            var dataObject = new { message = "This is a SSE message from the server!" };

            // Write the SSE message to the response
            await Response.WriteAsync("data: " + JsonSerializer.Serialize(dataObject) + "\n\n");
            await Response.Body.FlushAsync();

            // Delay before sending the next message
            await Task.Delay(3000);
        }

        return new EmptyResult();
    }
}