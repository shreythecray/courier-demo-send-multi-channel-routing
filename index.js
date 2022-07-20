require('dotenv').config();

const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({ authorizationToken: process.env.API_KEY });

async function send_one_channel() {
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
            name: "Peter Parker",
          },
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      });
      
      console.log(requestId)
}

async function send_any_channel() {
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
          name: "Peter Parker",
        },
        routing: {
          method: "single",
          channels: ["sms", "email"],
        },
      },
    });
    
    console.log(requestId)
}

async function send_multi_channel() {
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
          name: "Peter Parker",
        },
        routing: {
          method: "all",
          channels: ["email", "sms"],
        },
      },
    });
    
    console.log(requestId)
}

send_multi_channel()