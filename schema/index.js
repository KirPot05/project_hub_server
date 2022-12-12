import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from "graphql";
import ClientModel from "../models/client.js";
import ProjectModel from "../models/project.js";

const Client = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const Project = new GraphQLObjectType({
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

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(Client),
      resolve(parent, args) {
        return ClientModel.find();
      },
    },
    projects: {
      type: new GraphQLList(Project),
      resolve(parent, args) {
        return ProjectModel.find();
      },
    },
    client: {
      type: Client,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ClientModel.find();
      },
    },
    project: {
      type: Project,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectModel.findById(args.id);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
