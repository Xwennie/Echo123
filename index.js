
/**
 * This code is written by Prawira Genestonlia as an URECA project.
 * It will be used as a virtual personal assistant in XperienceAtEEE - An Escape Room in the school of Electrical and Electronic Engineering
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.5381de78-1fc3-4941-91ff-f7b9265a797c';

const SKILL_NAME = 'Xperience_Echo_Intro';
const WELCOME_MESSAGE = 'Hi! Welcome to the Xperience@ triple E. My name is Echo. I have built this room in order to protect the future. To better prepare you, you have to solve the following questions. . Once you are ready, say I am ready. ';
const WELCOME_REPROMPT = 'Once you are ready, say I am ready. ';
const HELP_MESSAGE = 'You can trigger this conversation from the beginning by saying "Echo, experience assistant".';
const HELP_REPROMPT = 'Try saying "experience assistant".';
const STOP_MESSAGE = 'Goodbye!';

const INTRO_MESSAGE='Hi! Welcome to the Xperience@ triple E. My name is Echo. I have built this room in order to protect the future. To better prepare you, you have to solve the following questions. . Once you are ready, say I am ready. ';
const FIRST_QUESTION='Which school are you in?';
const SECOND_QUESTION='What is ten minus six divided by two plus three?';
const THIRD_QUESTION='I have keys but no locks, I have a space but no room. You can enter but can’t go outside. Who am I?';
const COMPLETION_MESSAGE='HAHA! Fantastic. It is my honour to be talk to you after all these while. To help you solve the puzzle in this room, I can provide you with hints whenever you are stuck. However, please do not abuse me because you will not enjoy the fun if I tell you everything. To ask me puzzle related question, use the key phrase “How to solve the puzzle xxx?” For instance: “Echo, how do you solve the puzzle laser piano?” ';


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.response.speak(WELCOME_MESSAGE)
                    .listen(WELCOME_REPROMPT);
        this.emit(':responseReady');
    },

    'TheAnswerIs': function () {
        const intentObj = this.event.request.intent;
        if (!intentObj.slots.SchoolSlot.value) {
            const slotToElicit = 'SchoolSlot';
            const speechOutput = FIRST_QUESTION;
            const repromptSpeech = FIRST_QUESTION;
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        } else if (intentObj.slots.SchoolSlot.value!='school of electrical and electronic engineering'){
            const slotToElicit = 'SchoolSlot';
            const speechOutput = 'You are wrong. ' + FIRST_QUESTION;
            const repromptSpeech = 'You are wrong. ' + FIRST_QUESTION;
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);  
        } else if (!intentObj.slots.NumberSlot.value) {
            const slotToElicit = 'NumberSlot';
            const speechOutput = 'You are right! Next, ' + SECOND_QUESTION;
            const repromptSpeech = SECOND_QUESTION;
            this.emit(':elicitSlotWithCard', slotToElicit, speechOutput, repromptSpeech);
        } else if (intentObj.slots.NumberSlot.value!='10') {
            const slotToElicit = 'NumberSlot';
            const speechOutput = 'Please try again! ' + SECOND_QUESTION;
            const repromptSpeech = SECOND_QUESTION;
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        } else if (!intentObj.slots.RiddleSlot.value) {
            const slotToElicit = 'RiddleSlot';
            const speechOutput = 'Not bad uh. I will proceed to the last question. ' + THIRD_QUESTION;
            const repromptSpeech = THIRD_QUESTION;
            this.emit(':elicitSlotWithCard', slotToElicit, speechOutput, repromptSpeech);            
        } else if (intentObj.slots.RiddleSlot.value!='keyboard'){
            const slotToElicit = 'RiddleSlot';
            const speechOutput = 'Not quite rite! ' + THIRD_QUESTION;
            const repromptSpeech = THIRD_QUESTION;
            this.emit(':elicitSlotWithCard', slotToElicit, speechOutput, repromptSpeech);                
        } else {
          this.emit(':tell', COMPLETION_MESSAGE);
        }
    },
    
/*
    'TheNumberIs': function (){
        this.response.speak(THIRD_QUESTION).listen(THIRD_QUESTION);
        this.emit(':responseReady');
    },
    'TheRiddleIs': function (){
        this.response.speak(COMPLETION_MESSAGE).listen(COMPLETION_MESSAGE);
        this.emit(':responseReady');
    },    
    
    'TheSchoolIs': function() {
        const intentObj = this.event.request.intent;
        if(intentObj.slots.SchoolSlot.value!='School of Electrical and Electronic Engineering'){
            const slotToElicit = 'SchoolSlot';
            const speechOutput = 'Your answer is wrong.' + FIRST_QUESTION;
            const repromptSpeech = 'Your answer is wrong.' + FIRST_QUESTION;
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        } else {
            this.response.speak(SECOND_QUESTION);
            this.emit(':responseReady');
        }
    },
*/

    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
