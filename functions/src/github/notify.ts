import { slackBot } from "../slack/lib/bot";
import { getTrend } from "../api/trend";
import { translateText } from "../api/translate";

export const githubTrendNotifyToSlack = (
  key: string,
  bot: slackBot,
  channel: string
) => {
  const Delimiter = "###";
  (async () => {
    const repos = await getTrend();
    const descOneLinear = repos.map((repo) => repo.description).join(Delimiter);
    const translatedDescOneLinear = await translateText(key, descOneLinear);
    const translated = translatedDescOneLinear[0].split(Delimiter);
    const text = repos
      .slice(0, 10)
      .map((repo, index) => {
        return `*${index + 1}:${repo.name}*\n【${repo.language}】\n>${
          translated[index]
        }\n${repo.href}`;
      })
      .join("\n");
    bot.sendMessage(channel, text);
  })();
};
