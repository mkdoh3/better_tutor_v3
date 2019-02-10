// const https = require("https");

// const data = JSON.stringify({
//   name: "John"
// });

// const options = {
//   hostname: "hookb.in",
//   port: 443,
//   path: "/XkqoV1GWVLCbobmZEWba",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Content-Length": data.length
//   }
// };
// {
//   "status": 200,
//   "statusText": "OK",
//   "httpVersion": "HTTP/1.1",
//   "headers": [
//     {
//       "name": "X-TOKEN",
//       "value": "BFKNPPBBMF4MMAJANSMZSQRJXWVW7RVO"
//     }
//   ],
//   "cookies": [],
//   "content": {
//     "mimeType": "text/plain",
//     "text": "[\"invitee.created\",\"invitee.canceled\"]"
//   }
// }

// const req = https.request(options, res => {
//   console.log(`status: ${res.statusCode}`);
// });

// req.write(data);
// req.end();

// const processSomething = callback => {
//   setTimeout(callback, 20000);
// }

// router.post("/hook", (req, res, next) => {
//   processSomething(() => {
//       res.status(200).send({
//           id: "ABC123",
//           message: "New record added!"
//       });
//   });
// });

// module.exports = router;

// const processSomething = callback => {
//   setTimeout(callback, 20000);
// }

// router.post("/hook", (req, res, next) => {
//   processSomething(() => {
//     const webhookUrl = req.params.url;

//     /**
//      * Your Kafka action or something else. There
//      * you should collect info about success or
//      * fail of client's action.
//      */

//     /**
//      * Your API call to webhookUrl with
//      * your defined body about status of event
//      */
//   });

//   res.status(200).send('OK')
// });

// BFKNPPBBMF4MMAJANSMZSQRJXWVW7RVO

// curl --header "X-TOKEN: <your_token>" https://calendly.com/api/v1/hooks/<hook_id>

// {
//   "data":[
//     {
//       "type":"hooks",
//       "id":12345,
//       "attributes":{
//         "url":"http://foo.bar/1",
//         "created_at":"2016-08-23T19:15:24Z",
//         "state":"active",
//         "events":[
//           "invitee.created",
//           "invitee.canceled"
//         ]
//       }
//     }
//   ]
// }
