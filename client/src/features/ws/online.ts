import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5190/hub")
  .build();

//   connection.start();

//   connection.on("isOnline", data=>{
//     console.log(data);
//   })