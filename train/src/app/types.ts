export type Item = {
  id: number;
  full_name: string;
  owner: {
    avatar_url: string;
  };
  topics: string[];
  forks: number;
  language: string;
  watchers_count: number;
  html_url: string;
};
