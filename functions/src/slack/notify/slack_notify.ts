import { WebClient } from "@slack/web-api";

export const slackNotify = (
  web: WebClient,
  channel: string,
  content: string
) => {
  (async () => {
    await web.chat.postMessage({
      channel: channel,
      text: content
    });
  })();
};
