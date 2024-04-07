﻿using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.MessagesController
{
    public partial class MessagesController
    {
        [HttpPatch("{messageId}/MarkAsDeleted")]
        public async Task<IActionResult> MarkAsDeleted(int messageId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var currentUser = await userManager.GetUserAsync(User);
            var participantsIds = await chatsService.GetMembersIdsAsync(model.ChatId);
            if (!participantsIds.Contains(currentUser!.Id)) return Unauthorized();
            var insertedMessage = await messagesService.InsertAsync(model, currentUser.Id);
            if (insertedMessage == null) return StatusCode(500);
            await conmanService.BroadcastMessage(insertedMessage, participantsIds);
            conmanService.PrintConnections();
            return Ok();
        }
    }
}
