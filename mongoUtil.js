
const CONNECTION_URL = "mongodb+srv://livingwithart-admin:livingwithart123@living-with-art.wlxu2.mongodb.net/livingart?retryWrites=true&w=majority";
//const CONNECTION_URL = "mongodb://nodeUser:Nodevisio123@164.52.204.34:27017/?authSource=admin&readPreference=primary&appname=MongoDBCompass&directConnection=true&ssl=false";

const DATABASE_NAME = "livingart";
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const qrcode = require('qrcode-terminal');
var fs = require('fs');
const { Client } = require('whatsapp-web.js');
const client = new Client();
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const connectWhatsapp =() =>{

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!1');
});

client.initialize();
client.on('message', message => {
	console.log(message.body);
});

setTimeout(sendMessage, 5000);
// client.on('ready', async () => {
//   console.log('Client is ready!2');
//   const jsonData = require( './localdata.json' );
//    const number = jsonData.data[0].phone;
//   //const number = "8943471583";
//   const sanitized_number = number.toString().replace(/[- )(]/g, ""); 
//   const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`; 

//   const number_details = await client.getNumberId(final_number);

//   if (number_details) {
//       const sendMessageData = await client.sendMessage(number_details._serialized, jsonData.data[0].message);
//   } else {
//       console.log(final_number, "Mobile number is not registered");
//   }
// });
}
const getWhatsappConnection = () => client;
const sendMessage = async (data) =>{
  console.log('hiiii');
  //client.on('ready', async () => {
    if(data){
    //const res = JSON.stringify(data);
    console.log('Client is ready!2');
    const jsonData = require( './localdata.json' );
     const number = data[0].phone;
    //const number = "8943471583";
    const sanitized_number = number.toString().replace(/[- )(]/g, ""); 
    const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`; 
  
    const number_details = await client.getNumberId(final_number);
  
    if (number_details) {
        console.log('reached here');
        const sendMessageData = await client.sendMessage(number_details._serialized, data[0].message);
    } else {
        console.log(final_number, "Mobile number is not registered");
    }
  
}
 // });
}
module.exports = {
  getDb: function() {
    return db;
  },
  connectWhatsapp,
  getWhatsappConnection,
  sendMessage
};