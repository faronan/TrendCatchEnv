import * as functions from "firebase-functions";
import { App, ExpressReceiver } from "@slack/bolt";
import { WebClient } from "@slack/web-api";
import { useHelloCommand } from "./commands/hello";
import { slackBot } from "./lib/bot";
import { githubTrendNotifyToSlack } from "../github/trend";

const config = functions.config();

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.bot_token,
});

const web = new WebClient(config.slack.bot_token);

useHelloCommand(app);

export const githubTrendNotify = () => {
  const key = config.gcloud.translate.key;
  const channel = "C01C2M6V8AG";
  const bot = new slackBot(web);
  githubTrendNotifyToSlack(key, bot, channel);
};
//他のスケジューリングを追加する際は、別の関数を切っていく
