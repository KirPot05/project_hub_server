import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema/index.js";
import connectDB from "./utils/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  connectDB();
});
