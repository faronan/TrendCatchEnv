import * as functions from "firebase-functions";
import { expressReceiver, githubTrendNotify } from "./slack/app";

export const slack = functions.https.onRequest(expressReceiver.app);

export const githubTrendSchedule = functions.pubsub
  .schedule("every 24 hours")
  .onRun((_) => {
    githubTrendNotify();
  });
