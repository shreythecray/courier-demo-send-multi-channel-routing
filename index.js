require('dotenv').config();

const { CourierClient } = require("@trycourier/courier");

const courier = CourierClient({ authorizationToken: process.env.API_KEY });

async function send() {
    const { requestId } = await courier.send({
        message: {
          to: {
            email: process.env.EMAIL,
          },
          content: {
            title: "Welcome!",
            body: "Thanks for signing up, {{name}}",
          },
          data: {
            name: "@shreythecray",
          },
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      });
      
      console.log(requestId)
}

send()