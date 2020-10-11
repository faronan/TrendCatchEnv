import trending from "trending-github";

export type Repository = {
  name: string;
  href: string;
  description: string;
  language: string;
};

const isRepos = (repos: any): repos is Repository[] =>
  repos.every(
    (repo: Repository) =>
      repo.name != undefined &&
      repo.href != undefined &&
      repo.description != undefined &&
      repo.language != undefined
  );

export const getTrend = async () => {
  const response = await trending();
  const repos = isRepos(response) ? response : [];
  return repos;
};
