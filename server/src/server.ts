import express from 'express';
import path from 'node:path';
import routes from './routes/index.js';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authMiddleware } from './services/auth.js';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';

// ✅ Import the connectDB function
import { connectDB } from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Start Apollo Server and MongoDB connection
async function startApolloServer() {
  await connectDB(); // ✅ WAIT for MongoDB FIRST
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  app.listen(PORT, () => {
    console.log(`🌍 API server running on port ${PORT}!`);
    console.log(`🚀 Use GraphQL at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
