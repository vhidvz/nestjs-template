'use strict';

// graphql.config.js
module.exports = {
  projects: {
    app: {
      schema: ['src/schema.graphql'],
      documents: ['**/*.{graphql,gql,js,ts}'],
    },
  },
};
