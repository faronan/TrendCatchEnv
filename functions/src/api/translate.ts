import * as translateAPI from "@google-cloud/translate";

export const translateText = async (key: string,text: string) => {
  const translate = new translateAPI.v2.Translate({
    key: key,
  });
  const target = "ja";
  return translate.translate(text, target);
};