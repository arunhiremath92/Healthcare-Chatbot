const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const mysql = require('mysql');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
})

// const db = mysql.createPool({
//     host: 'us-cdbr-east-04.cleardb.com',
//     user: 'b536f1008c7b3d',
//     password: '75cb702f',
//     database: 'heroku_dbbf0cd6e62d49c'
// });

// db.getConnection((err) => {
//     if(err){
//       throw err;
//     } else{
//       console.log("connect to db");
//     }
//     //TEST
//     db.query('SELECT * FROM heroku_dbbf0cd6e62d49c.medicine', (err, results)=>{
//       if (err) throw err;
//       console.log(results);
//     })
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

    function welcome(agent) {
        agent.add(`Hi! How are you doing? I am your virtual assistant chatbot. Ask me any questions!`);
        agent.add(new Suggestion(`I'm not feeling well`));
        agent.add(new Suggestion(`Search Medicine`));
        agent.add(new Suggestion(`Take a Quiz`));
        agent.add(new Suggestion(`Search Disease`));
        agent.add(new Suggestion(`Book an Appointment`));
    }
        
    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    function connectionToMysql() {
        const connection = mysql.createConnection({
            host: 'us-cdbr-east-04.cleardb.com',
            user: 'b536f1008c7b3d',
            password: '75cb702f',
            database: 'heroku_dbbf0cd6e62d49c'
        });
        return new Promise((resolve, reject) => {
            connection.connect();
            resolve(connection);
        });
    }
        
    function queryMedicine(connection){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from heroku_dbbf0cd6e62d49c.medicine', (error, results, fields) => {
                resolve(results);
            });
        });
    }
        
    function queryDisease(connection){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from heroku_dbbf0cd6e62d49c.disease', (error, results, fields) => {
                resolve(results);
            });
        });
    }

    function medicineHandler(agent) {
        const medicine_name = agent.parameters.medicine_name;
        return connectionToMysql().then(connection => {
            return queryMedicine(connection).then(result => {
                result.map(medicine => {
                    if(medicine_name === medicine.name){
                        // agent.add(`Description: ${medicine.description}`);
                        // agent.add(`Url: ${medicine.url}`);
                        agent.add(new Card({
                            title: `Medicine: ${medicine.name}`,
                            text: `Description: ${medicine.description}`,
                            buttonText: `More Information`,
                            buttonUrl: `${medicine.url}`
                            })
                        );
                        agent.add(new Suggestion(`Search Medicine`));
                        agent.add(new Suggestion(`Search Disease`));
                    }
                });
                connection.end();
            });
        });
    }
        
    function diseaseHandler(agent) {
        const disease_name = agent.parameters.disease_name;
        return connectionToMysql().then(connection => {
            return queryDisease(connection).then(result => {
                result.map(disease=> {
                    if(disease_name === disease.name){
                        if(disease.description) {
                            agent.add(new Card({
                                title: `Disease: ${disease.name}`,
                                text: `Description: ${disease.description}`,
                                buttonText: `More Information`,
                                buttonUrl: `${disease.url}`
                                })
                            );
                        }
                        // if(disease.description) agent.add(`Description: ${disease.description}`);
                        // agent.add(`Url: ${disease.url}`);
                        if(disease.symptoms) agent.add(`Symptoms: ${disease.symptoms}`);
                        if(disease.causes) agent.add(`Causes: ${disease.causes}`);
                        if(disease.riskfactors) agent.add(`Risk Factors: ${disease.riskfactors}`);
                        if(disease.treatment) agent.add(`Treatment: ${disease.treatment}`);
                        if(disease.medication) agent.add(`Medication: ${disease.medication}`);
                        if(disease.homeremedy) agent.add(`Home Remedies: ${disease.homeremedy}`);
                        
                        agent.add(new Suggestion(`Search Medicine`));
                        agent.add(new Suggestion(`Search Disease`));
                    }
                });
                connection.end();
            });
        });
    }

    // // Uncomment and edit to make your own intent handler
    // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function yourFunctionHandler(agent) {
    //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    //   agent.add(new Card({
    //       title: `Title: this is a card title`,
    //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! ??`,
    //       buttonText: 'This is a button',
    //       buttonUrl: 'https://assistant.google.com/'
    //     })
    //   );
    //   agent.add(new Suggestion(`Quick Reply`));
    //   agent.add(new Suggestion(`Suggestion`));
    //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    // }

    // // Uncomment and edit to make your own Google Assistant intent handler
    // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }
    // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
    // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Medicine-Description', medicineHandler);
    intentMap.set('Disease-Description', diseaseHandler);
    agent.handleRequest(intentMap);
}