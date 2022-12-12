import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { Client } from "../types/index.js";
import ClientModel from "../../models/client.js";

const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    addClient: {
      type: Client,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { name, email, phone }) {
        return ClientModel.create({
          name,
          email,
          phone,
        });
      },
    },
  },
});

export default mutations;
