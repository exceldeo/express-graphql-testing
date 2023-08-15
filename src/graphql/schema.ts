import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    createdat: String!
    updatedat: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedBook {
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
    data: [Book!]!
  }

  input PaginationInput {
    page: Int!
    limit: Int!
  }

  type Query {
    books(pagination: PaginationInput!): PaginatedBook!
    book(id: ID!): Book
  }


  type Mutation {
    createBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String!, author: String!): Book!
    deleteBook(id: ID!): Book
  }
`;

export default typeDefs;