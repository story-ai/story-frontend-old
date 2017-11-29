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

export const CENTURY_API_BASE = "https://app.century.tech/learn/api";
