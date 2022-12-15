import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} from "graphql";
import { Client, Project } from "../types/index.js";
import ClientModel from "../../models/client.js";
import ProjectModel from "../../models/project.js";

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

    addProject: {
      type: Project,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "project_status",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve(parent, { name, clientId, description, status }) {
        return ProjectModel.create({
          name,
          description,
          clientId,
          status,
        });
      },
    },

    deleteProject: {
      type: Project,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ProjectModel.findByIdAndDelete(args.id);
      },
    },

    updateProject: {
      type: Project,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "project_status_update",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return ProjectModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export default mutations;
