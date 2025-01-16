import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "./prisma";
import { buildSchema } from "type-graphql";
import { resolvers } from "@prisma/generated/type-graphql"; 
import { NextRequest } from "next/server";

const schema = await buildSchema({
  resolvers,
  validate: false,
});

const server = new ApolloServer({
  schema,
});

const apolloServer = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => ({ prisma }),
});

export default apolloServer;