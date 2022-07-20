# Demo: Send Messages with Node.js

## Setup

1. Install the Courier SDK
   
   * In terminal: `npm install @trycourier/courier`
   * Access SDK in index.js:
   ```javascript
   const { CourierClient } = require("@trycourier/courier")
   ```
   
   [Learn more >](https://www.courier.com/docs/guides/getting-started/nodejs/#using-the-sdk)

2. Get your API key

   * Save your API Key in a .env file by adding `API_KEY="[insert-api-key]"` in a .env file. For protection, add the .env file in your .gitignore.
   * Install the [dotenv npm package](https://www.npmjs.com/package/dotenv) to access the API Key by running the `npm install dotenv --save` command in terminal.
   * Access your API Key in index.js:
   ```javascript
   const courier = CourierClient({ authorizationToken: process.env.API_KEY });
   ```
   
   [Learn more >](https://www.courier.com/docs/guides/getting-started/nodejs/#getting-your-api-keys)

## Single Channel Send

1. Save the email of your recipient in the .env file as `EMAIL="example@email.com"`

2. Add an asynchronous function in your index.js file, which encloses the send request:
   ```javascript
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
   ```

Example email received:

<img width="1293" alt="0-email" src="https://user-images.githubusercontent.com/28051494/179698659-55f4e35b-da44-41ec-847f-89cad2188f9f.png">


## Multi-Channel Send

1. Update the routing object within the send request:
   * Provide options for multiple channels and allow Courier to send to the first channel that successfully complete:
   ```javascript
   sync function send() {
       const { requestId } = await courier.send({
           message: {
             to: {
               email: process.env.EMAIL,
               //**NEW**
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
               //**NEW**
               method: "single",
               channels: ["email", "sms"],
             },
           },
         });

         console.log(requestId)
   }

   send()
   ```

   * Send to all listed channels:
   ```javascript
   sync function send() {
       const { requestId } = await courier.send({
           message: {
             to: {
               email: process.env.EMAIL,
               //**NEW**
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
               //**NEW**
               method: "all",
               channels: ["email", "sms"],
             },
           },
         });

         console.log(requestId)
   }

   send()
   ```

Example SMS received:

<img width="603" alt="0-sms" src="https://user-images.githubusercontent.com/28051494/179704311-975122dd-ade0-41c1-a43c-d2b2506ce26f.png">
