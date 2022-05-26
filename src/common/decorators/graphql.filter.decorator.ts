import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Filter = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    args.filter = args.filter || {};

    const filter: { [x: string]: any } = {};
    if ('limit' in args.filter) filter.limit = args.filter.limit;
    if ('skip' in args.filter) filter.skip = args.filter.skip;
    if ('sort' in args.filter) filter.sort = args.filter.sort;
    if ('query' in args.filter) filter.query = args.filter.query;

    if (!args.filter.query) {
      filter.query = {};
    }

    return filter;
  },
);
