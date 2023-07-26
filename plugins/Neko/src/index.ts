import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro"
import { storage } from '@vendetta/plugin';

export default {
    onLoad: () => {
       const commands = registerCommand({ 
            name: "neko",
            displayName: "Neko",
            displayDescription: "Get a neko pics",
            description: "Get a neko pics",

            options: [
                {
                    name: "emotion",
                    description: "emotion for neko",
                    type: 3,
                    required: false,
                    displayName: "Emotion",
                    displayDescription: "Chooice emotion for you neko",
                }
            ],

            execute: gifCommand,
             // @ts-ignore
            applicationId: "-1",
            inputType: 1,
            type: 1,
        });
    },
    onUnload: () => {
       commands.unregisterCommands();
    },
}

async function gifCommand(args, ctx) {
    const emotion = args[0].value;

    const gifurl = await getGif(emotion);
    console.log(gifurl)
    sendMessage(ctx.channel.id, gifurl)
}

function sendMessage(channelID, content) {
    const channel = channelID ?? Channels?.getChannelId?.();
    const message = MessageActions.sendMessage(channel, content)
}

async function getGif(emotion) {
          console.log(emotion)
          let response;
          if(emotion == undefined){
            response = await fetch(
            `https://tenor.googleapis.com/v2/search?q=neko&key=AIzaSyDy2fnAUloDkGFCC1IEtRkcqrFxAfLqB_Q&limit=20`
          );
          }
          else{
            response = await fetch(
              `https://tenor.googleapis.com/v2/search?q=neko ${emotion}&key=AIzaSyDy2fnAUloDkGFCC1IEtRkcqrFxAfLqB_Q&limit=20`
          );
          }
          if (!response.ok){ 
            console.log(response)
            return};
          const data = await response.json();
          const GIF = Object.values(data.results)[LibraryUtils.randomNo(0, 10)];
          return GIF.media[0].gif.url
           
        }