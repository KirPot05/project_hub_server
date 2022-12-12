import { GraphQLSchema } from "graphql";
import mutations from "../graphql/mutations/index.js";
import RootQuery from "../graphql/queries/query.js";

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
