import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
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

    deleteClient: {
      type: Client,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ClientModel.findByIdAndDelete(args.id);
      },
    },

    updateClient: {
      type: Client,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, name, email, phone }) {
        return ClientModel.findByIdAndUpdate(id, {
          name,
          email,
          phone,
        });
      },
    },
  },
});

export default mutations;
