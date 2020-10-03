import { App } from "@slack/bolt";

export const useHelloCommand = (app: App) => {
  app.command("/hello", async ({ command, ack, say }) => {
    await ack();
    await say(`Hello "${command.text}"`);
  });
};
