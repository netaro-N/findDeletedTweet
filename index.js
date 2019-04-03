'use strict';
const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_API_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
});

client.post('direct_messages/events/new.json', {
  event: {
    type: 'message_create',
    message_create: {
      target: {
        recipient_id: '973005325614792704'
      },
      message_data: {
        text: 'Hello World!'
      }
    }
  }
    },true)
    /*
    .then((response) => {
      console.log(response); //,'font-weight: bold; font-size: 24px; color: #22AAFF;'
    })
    .catch((error) => {
      console.log(error);
    });
    */