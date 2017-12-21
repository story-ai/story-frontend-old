const StoryProdBasePath = "https://api.story-ai.com";
const StoryDevBasePath = "http://localhost";

const StoryDevServices = {
  material: `${StoryDevBasePath}:4000`,
  user: `${StoryDevBasePath}:4001`
};

const StoryProdServices = {
  material: `${StoryProdBasePath}/material`,
  user: `${StoryProdBasePath}/user`
};

export const StoryServices =
  process.env.NODE_ENV === "production" ? StoryProdServices : StoryDevServices;

export const CENTURY_LEARN_API = "https://app.century.tech/learn/api";
export const CENTURY_ACCOUNT_API = "https://api.century.tech/accounts/v2";
