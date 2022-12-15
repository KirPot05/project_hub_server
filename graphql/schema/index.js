import { GraphQLSchema } from "graphql";
import mutations from "../mutations/index.js";
import RootQuery from "../queries/query.js";

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
