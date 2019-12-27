import express from "express";
import express_graphql from "express-graphql";
import { buildSchema } from "graphql";

// GraphQL schema
const schema = buildSchema(`
    type Query {
        destination(id: Int!): Destination
        destinations(country: String): [Destination]
    },
    type Destination {
        id: Int
        location: String
        country: String
    }
`);

const destinationData = [
  {
    id: 1,
    location: "Toledo",
    country: "Spain"
  },
  {
    id: 2,
    location: "Paris",
    country: "France"
  },
  {
    id: 3,
    location: "Munich",
    country: "Germany"
  },
  {
    id: 4,
    location: "Florence",
    country: "Italy"
  }
];

const getDestination = function(args) {
  var id = args.id;
  return destinationData.filter(destination => {
    return destination.id == id;
  })[0];
};

const getDestinations = function(args) {
  if (args.country) {
    const country = args.country;
    return destinationData.filter(
      destination => destination.country === country
    );
  }
  return destinationData;
};

const root = {
  destination: getDestination,
  destinations: getDestinations
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
