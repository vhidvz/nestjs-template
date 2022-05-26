import { GraphQLScalarType } from 'graphql';

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validate(uuid: unknown): string | never {
  if (typeof uuid !== 'string' || !regex.test(uuid)) {
    throw new Error('invalid uuid');
  }
  return uuid;
}

export const GraphQLFilter = new GraphQLScalarType({
  name: 'Filter',
  description: 'A simple Filter parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => validate(ast),
});
