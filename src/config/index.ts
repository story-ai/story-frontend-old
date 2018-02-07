const prod = process.env.NODE_ENV === "production";
const staging = process.env.STAGING === "true";
console.log("Prod?", prod);
console.log("Staging?", staging);

export const StoryBasePath = prod
  ? staging ? "https://api.staging.story-ai.com" : "https://api.story-ai.com"
  : "http://localhost";

export const StoryServices = {
  material: StoryBasePath + (prod ? "/class" : ":4000")
};

export const CENTURY_LEARN_API = "https://app.century.tech/learn/api";
export const CENTURY_ACCOUNT_API = "https://api.century.tech/accounts/v2";

export const STORY_ORGANISATION_ID = "0adee573-b3e3-46cf-a16b-32980590e2fe";

export const STRIPE_KEY = prod
  ? "pk_live_dYRBP3OX7aJTbFbeZf2F7gpt"
  : "pk_test_1FHvicuh1rLO80YIQQI1g1l8";
