import * as functions from "firebase-functions";
import { App, ExpressReceiver } from "@slack/bolt";
import { useHelloCommand } from "./commands/hello";

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

useHelloCommand(app);
