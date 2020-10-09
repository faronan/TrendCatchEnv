import * as functions from "firebase-functions";
import { expressReceiver, githubTrendNotify } from "./slack/app";

export const slack = functions.https.onRequest(expressReceiver.app);

export const githubTrendSchedule = functions.pubsub
  .schedule("0 9 * * *")
  .timeZone("Asia/Tokyo")
  .onRun((_) => {
    githubTrendNotify();
  });
