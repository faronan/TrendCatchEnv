import trending from "trending-github";
import { slackBot } from "../slack/lib/bot";
import { translateText } from "../api/translate"

type Repository = {
  name: string;
  href: string;
  description: string;
  language: string;
};

export const githubTrendNotifyToSlack = (
  key: string,
  bot: slackBot,
  channel: string
) => {
  //前のPromiseの結果を次のPromiseから参照するやり方が分からなかった苦肉の策
  let repos: Repository[] = [];
  const Delimiter = "###";

  trending()
    .then((response) => {
      repos = response as Repository[];
      // 区切り文字で区切って一行にして一括翻訳、その後同じ文字で分割し直す
      const descOneLinear = repos
        .map((repo) => repo.description)
        .join(Delimiter);
      return translateText(key,descOneLinear);
    })
    .then((value: string[]) => {
      const translated = value[0].split(Delimiter);
      const text = repos
        .slice(0, 10)
        .map((repo, index) => {
          return `*${index + 1}:${repo.name}*\n【${repo.language}】\n>${
            translated[index]
          }\n${repo.href}`;
        })
        .join("\n");
      bot.sendMessage(channel, text);
    });
};
