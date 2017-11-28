const StoryProdBasePath = "https://api.story-ai.com";
const StoryDevBasePath = "http://localhost:4000";

const StoryDevServices = {
  material: `${StoryDevBasePath}`,
  user: `${StoryDevBasePath}`
};

const StoryProdServices = {
  material: `${StoryProdBasePath}/material`,
  user: `${StoryProdBasePath}/user`
};

export const StoryServices =
  process.env.NODE_ENV === "production" ? StoryProdServices : StoryDevServices;
