
Credits: 
All the FAQ used for building the knowledge base is sourced from the MedQuad repo. 
	https://github.com/abachaa/MedQuAD  

Due to Zoho subscription plans, some features related to the chatbot and the analyze page will stop being available after May, 2022.

# NLP and Web-based Healthcare System
## Project Source Code: 
- https://github.com/arunhiremath92/Healthcare-Chatbot

We have three 4 different services and all source code is hosted in one repository. 
Backend is in https://github.com/arunhiremath92/Healthcare-Chatbot/tree/main/webapp/backend
- All Front end components https://github.com/arunhiremath92/Healthcare-Chatbot/tree/main/webapp/frontend
- DialogFlow Agents:
	- Megar-agent: CMPE295Healthcare 
	- Sub-agents: Health-Diagnosis, Healthcare-InformationSearch, Healthcare-UserService, 
- WebHooks Implementation:
	- Chatbot diagnosis: https://us-central1-chatbot-333116.cloudfunctions.net/dialogflowFirebaseFulfillment
	- Chatbot search information: https://cmpe295-healthcarebot.herokuapp.com/fulfillment
	

## Steps to run locally:
NOTE: All these instructions to kick start the application from a local-machine. The repo is auto linked to a heroku server to build and deploy automatically when a push is made. 

- Clone the repository: git clone https://github.com/arunhiremath92/Healthcare-Chatbot.git
- Setup Backend Services:
	
$ cd Healthcare-Chatbot/webapp/backend

- Install the required repositories using pip install -r requirements.txt
	- Run the migrations and start the server:
			$ python manage.py makemigrations --noinput
			$ python manage.py collectstatic --noinput
			$ python manage.py migrate --noinput
			$ python manage.py runserver
- Setup DialogFlow Agents:
	- Signup to create an account with Google DialogFlow, follow the instructions on the page https://cloud.google.com/dialogflow
	- Once the account import the agents present in the external folder of the repo. [https://github.com/arunhiremath92/Healthcare-Chatbot/external]

- Setting up the frontend for web application
- Start user web application: 
	- Under webapp\frontend\healthcare-frontend folder, run the following command:
		 `npm install`
		 `npm start`
- Start doctor web application:
	- Under webapp\frontend\doctor-frontend folder, run the following command:
		 `npm install`
		 `npm start`
- Start administrator web application:
	- Under webapp\frontend\admin-frontend folder, run the following command:
		 `npm install`
		 `npm start`
## Known Issues for setup.
CORS Error: To get an exaception request an access to the demo server using the below link https://cors-anywhere.herokuapp.com/corsdemo

## ZOHO account setup:

- Request Auth tokens using the below link . To authorize access to the Zoho data:

https://accounts.zoho.com/oauth/v2/auth?client_id=1000.Y56XI7KWMLJUE90D2SXME2ZKQ1FL0R&response_type=token&scope=SalesIQ.chattranscript.READ&redirect_uri=https://digitalhealthcare-frontend.herokuapp.com/
https://accounts.zoho.com/oauth/v2/auth?client_id=1000.Y56XI7KWMLJUE90D2SXME2ZKQ1FL0R&response_type=token&scope=SalesIQ.chatdetails.READ&redirect_uri=https://digitalhealthcare-frontend.herokuapp.com/
https://accounts.zoho.com/oauth/v2/auth?client_id=1000.Y56XI7KWMLJUE90D2SXME2ZKQ1FL0R&response_type=token&scope=SalesIQ.visitordetails.READ&redirect_uri=https://digitalhealthcare-frontend.herokuapp.com/
https://accounts.zoho.com/oauth/v2/auth?client_id=1000.Y56XI7KWMLJUE90D2SXME2ZKQ1FL0R&response_type=token&scope=SalesIQ.operators.READ&redirect_uri=https://digitalhealthcare-frontend.herokuapp.com/
https://accounts.zoho.com/oauth/v2/auth?client_id=1000.Y56XI7KWMLJUE90D2SXME2ZKQ1FL0R&response_type=token&scope=SalesIQ.feedbacks.READ&redirect_uri=https://digitalhealthcare-frontend.herokuapp.com/

- To access the Zoho: our department name is sjsu
	https://salesiq.zoho.com/sjsu/liveview. Signup and request access. Only users who are given permission can become the operators in Zoho


