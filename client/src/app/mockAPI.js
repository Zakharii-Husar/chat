export const mockAPI = {
  users: [
    {
      "id": 1,
      "nickName": "Zakharii"
    },
    {
      "id": 2,
      "nickName": "Paul"
    },
    {
      "id": 3,
      "nickName": "Brian"
    },
    {
      "id": 4,
      "nickName": "Cari"
    },
    {
      "id": 5,
      "nickName": "J.R."
    },
    {
      "id": 6,
      "nickName": "Rona"
    },
    {
      "id": 7,
      "nickName": "Jason"
    },
    {
      "id": 8,
      "nickName": "Jack"
    },
    {
      "id": 9,
      "nickName": "Lina"
    },
    {
      "id": 10,
      "nickName": "Jenny"
    }
  ],
  messages: [

    {
      "id": 1,
      "sender": 1,
      "reciever": 2,
      "content": "Hi, Paul",
      "time": "mon",
      "isRead": true,
      "replyToMsg": null,
      "likedBy": null
    },
    {
      "id": 2,
      "sender": 2,
      "reciever": 1,
      "content": "Hi. How's going?",
      "time": "mon",
      "isRead": false,
      "replyToMsg": 1,
      "likedBy": null
    },
    {
      "id": 3,
      "sender": 1,
      "reciever": 9,
      "content": "Sry Lina",
      "time": "Tue",
      "isRead": true,
      "replyToMsg": null,
      "likedBy": null
    },
    {
      "id": 4,
      "sender": 9,
      "reciever": 1,
      "content": "Luv U",
      "time": "Tue",
      "isRead": true,
      "replyToMsg": 3,
      "likedBy": null
    },
    {
      "id": 5,
      "sender": 1,
      "reciever": 7,
      "content": "Whatever",
      "time": "11:02",
      "isRead": true,
      "replyToMsg": 3,
      "likedBy": null
    },
    {
      "id": 6,
      "sender": 7,
      "reciever": 1,
      "content": "Okay",
      "time": "11:04",
      "isRead": true,
      "replyToMsg": 3,
      "likedBy": null
    },
    {
      "id": 7,
      "sender": 1,
      "reciever": 9,
      "content": "This HTML file is a template.If you open it directly in the browser",
      "time": "Tue",
      "isRead": true,
      "replyToMsg": null,
      "likedBy": null
    },
    {
      "id": 8,
      "sender": 9,
      "reciever": 1,
      "content": "This HTML file is a template.If you open it directly in the browser, you will see an empty page.You can add webfonts, meta tags, or analytics to this file.The build step will place the bundled scripts into the <body> tag.To begin the development, run npm start or yarn start.To create a production bundle, use npm run build or yarn build",
      "time": "Tue",
      "isRead": true,
      "replyToMsg": 3,
      "likedBy": null
    },
    {
      "id": 9,
      "sender": 1,
      "reciever": 9,
      "content": "This HTML file is a template.If you open it directly in the browser",
      "time": "Tue",
      "isRead": true,
      "replyToMsg": null,
      "likedBy": null
    }
  ]

}
