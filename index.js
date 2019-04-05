'use strict';
const Twitter = require('twit');
const cron = require('cron').CronJob;
const moment = require('moment-timezone');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
});

function sendDirectMessage(message) {
client.post('direct_messages/events/new', {
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
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

const savedTweetsMap = new Map();

function getHomeTimeLine() {
    console.log('cron came!');
    client.get('statuses/home_timeline', { count: 5 }, function(error, tweets, response) {
      if (error) {
          console.log(error);
          return;
      }

      // 初回起動時は取得するだけで終了
      if (savedTweetsMap.size === 0) {
          tweets.forEach(function(homeTimeLineTweet, key) {
              savedTweetsMap.set(homeTimeLineTweet.id, homeTimeLineTweet); // マップに追加
          });
          //console.log(savedTweetsMap);

          return;
      }

      // 新しいツイートを追加
      for (let j = 0; j < tweets.length; j++) {
          if (savedTweetsMap.has(tweets[j].id) === false) {
              savedTweetsMap.set(tweets[j].id, tweets[j]);
          }
      }
      //console.log(savedTweetsMap);

    });
}

const cronJob = new cron({
  cronTime: '00 */2 * * * *', // 2分ごとに実行
  start: true, //new した後即時実行するかどうか
  onTick: function() {
      getHomeTimeLine();
  }
});
getHomeTimeLine();