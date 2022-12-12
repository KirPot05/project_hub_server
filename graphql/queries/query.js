import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import ClientModel from "../../models/client.js";
import ProjectModel from "../../models/project.js";
import { Client, Project } from "../types/index.js";

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

export default RootQueryType;
