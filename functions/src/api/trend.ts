import trending from "trending-github";

export type Repository = {
  name: string;
  href: string;
  description: string;
  language: string;
};

export const getTrend = async () => {
  const response = await trending();
  const repos = response as Repository[];
  return repos;
};
