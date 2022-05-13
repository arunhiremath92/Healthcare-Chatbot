// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {


  let dfRequest = request.body;
  let action = dfRequest.queryResult.action;
  
  
  switch (action) {
    case 'handle-symptom-collection':
        handleSequence(dfRequest, response);
      break;
    case 'call-symptom-checker':
        requestDiagnosis(dfRequest, response);
      break;
    case 'single-followup-question-response':
        single_followup_response(dfRequest, response);
        break;
      
    default:
      response.json({
        fulfillmentText: `Webhook for action "${action}" not implemented.`
      });
  }

});

function single_followup_response(request, response) {
  const headers = { 
    'App-Id': '5b65dcd2',
    'App-Key': "6c2dbb3e3c5afa5f09252cc71919f6e1",
    'Content-Type': 'application/json' 
  };
  ctxtData  = getOutputContext(request, 'health-diagnosis-rrqy.single-followup-question')
  console.log(ctxtData)
  
}


function handleSequence(request, response) {
  console.log(request)
  response.json({
    followupEventInput: {
      name: 'collect-symptoms-data',
      parameters: {
        name: 'Arun',
      }
    }
  });

}



function getOutputContext(request, name) {
  return request.queryResult.outputContexts.find(
      context => context.name.endsWith(`/contexts/${name}`)
  );
}

function requestDiagnosis(request, response) {

  const headers = { 
    'App-Id': '5b65dcd2',
    'App-Key': "6c2dbb3e3c5afa5f09252cc71919f6e1",
    'Content-Type': 'application/json' 
  };
  queryParams = request.queryResult.parameters
  let person_details = getOutputContext(request, 'health-diagnosis-rrqy.patient-details');
 
  if(!person_details.hasOwnProperty('parameters')){
    response.json({
      followupEventInput: {
        name: 'collect-symptoms-data',
        parameters: {
          name: person_details.parameters.personName[0],
        }
      }
    });
    return
  }

  const data = {
    "sex": person_details.parameters.gender,
    "age": {
      "value": person_details.parameters.age[0].amount,
    },
    "evidence": [
      {
        "id": queryParams.symptom_1,
        "choice_id": "present",
        "source": "initial"
      },
      {
        "id": queryParams.symptom_2,
        "choice_id": "present"
      },
    ]
  }
  console.log(data)
  axios.post('https://api.infermedica.com/v3/diagnosis', data, { headers })
      .then((externalResponse) => {
        symptomResponse = externalResponse.data
        console.log(symptomResponse)
        if(symptomResponse.hasOwnProperty('should_stop') == "true"){
          let condition = symptomResponse.conditions[0]
          response.json({
              followupEventInput: {
                name: 'symptom-diagnosis-completion',
                parameters: {               
                  "response" : "Our analysis says this could be " + condition.name + " We suggest book an appointment with us."
                }
              }
            });  
  
        }
        else if (symptomResponse.question.type != "group_single"){
          response.json({
            fulfillmentText: "currently this diagnosis is not supported, try again later"
          });
  
        }else{
            // Its a single-followup-question, 
           followupText = symptomResponse.question.text
           symptomResponse.items.forEach(function(item) {
             followupText = followupText + "\n" + item.name
          });
          console.log(followupText);
          response.json({
            followupEventInput: {
              name: 'single-followup-question',
              parameters: {               
                 "followup_question" : followupText,
              }
            }
          });  
        }
      }).catch((e)=> {
        console.log(e) 
        response.json({
          fulfillmentText: "Something went wrong with server, please try again"
        });
      });
}
