import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';

// ✅ Apollo and GraphQL imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authMiddleware } from './services/auth.js';
import { typeDefs } from './schemas/typeDefs.js'; // (You will create this file next)
import { resolvers } from './schemas/resolvers.js'; // (You will create this file next)

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Apollo Server initialization
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Start Apollo Server asynchronously
async function startApolloServer() {
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

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 API server running on port ${PORT}!`);
      console.log(`🚀 Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
