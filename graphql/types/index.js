import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import ClientModel from "../../models/client.js";

export const Client = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

export const Project = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: Client,
      resolve(parent, args) {
        return ClientModel.findById(parent.clientId);
      },
    },
  }),
});
