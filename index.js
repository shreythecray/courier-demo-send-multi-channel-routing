require('dotenv').config();

const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({ authorizationToken: process.env.API_KEY });

async function send() {
    const { requestId } = await courier.send({
        message: {
          to: {
            email: process.env.EMAIL,
            phone_number: process.env.PHONE
          },
          content: {
            title: "Welcome!",
            body: "Thanks for signing up, {{name}}",
          },
          data: {
            name: "@shreythecray",
          },
          routing: {
            method: "all",
            channels: ["email", "sms"],
          },
        },
      });
      
      console.log(requestId)
}

send()