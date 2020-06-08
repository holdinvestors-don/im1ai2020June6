'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');

//
const DialogflowApp = require('actions-on-google'). DialogflowApp;
//                              

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
  	databaseURL: 'https://im1-ai01.firebaseio.com/'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    
  function welcome(agent) {
    const relationship = agent.parameters.relationship;
}
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}
  
  function HandlerReadFromDB(agent) {
  	return admin.database().ref('message').once('value').then((snapshot) =>{
    	const value = snapshot.child('Message').val();
      	if(value !== null){
        	agent.add(`${value}`);
        }    	
    });  
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Readam1ai01 Intent', HandlerReadFromDB);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});