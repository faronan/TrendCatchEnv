import { WebClient } from "@slack/web-api";

export class slackBot {
  web: WebClient;
  constructor(web: WebClient) {
    this.web = web;
  }
  sendMessage = (channel: string, content: string) => {
    (async () => {
      await this.web.chat.postMessage({
        channel: channel,
        text: content,
      });
    })();
  };
}
