/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
        console.log(JSON.stringify(event));

        getPowerball(function(err, response) {
            console.log(response);
var speechOutput = '<speak>' 
            + response.results.collection1[0].winningAmount
            + ' <audio src="https://flavorofthedaywebapi20160210055920.azurewebsites.net/HowardDeanScreaming.mp3" />'
            + '</speak>';
            console.log(speechOutput);
            context.succeed(buildResponse({}, 
                                        buildSpeechletResponse("Powerball", 
                                                                speechOutput, 
                                                                "", 
                                                                true
                                                            )
                                        )
                            );
                
        });
    } catch (e) {
        context.fail("Exception: " + e);
    }
};


function getPowerball(callback) {
    var http = require('http');
    var endpoint = '[KimonoLabs API]';

    http.get(endpoint, function (response) {
        response.on('data', function (data) {
            callback(undefined, JSON.parse(data));
        });
    }).on('error', function (e) {
        console.log("Communications error: " + e.message);
        callback(new Error(e.message));
    });
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}