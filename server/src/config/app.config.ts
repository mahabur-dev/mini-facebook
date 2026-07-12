export const appConfig = () => ({
  name: process.env.APP_NAME ?? "Mini Facebook API",
  url: process.env.APP_URL ?? "http://localhost:4000",
});
