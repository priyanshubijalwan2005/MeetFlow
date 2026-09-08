const IS_PROD = import.meta.env.PROD;

const server = IS_PROD
  ? "https://meetflow-bdol.onrender.com"
  : "http://localhost:5000";

export default server;