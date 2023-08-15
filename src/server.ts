import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema"; // Impor skema GraphQL
import resolvers from "./graphql/resolvers"; // Impor resolver
import { createServer } from "http";
import authenticate from "./middleware/authenticate";
import authRouters from "./internal/module/auth/delivery/router";

const app = express();
const port = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }), // Menambahkan context jika diperlukan
});

// Memulai server Apollo sebelum menerapkan middleware Express
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

const httpServer = createServer(app);
startApolloServer();

app.use("/graphql", authenticate); // Gunakan middleware authenticate

const root = express.Router();
app.use("/api", root); // Gunakan rute root

const v1 = express.Router();
root.use("/v1", v1); // Gunakan rute v1

v1.use("/auth", authRouters); // Gunakan rute autentikasi

httpServer.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}/graphql`);
});
