import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Filter = createParamDecorator((_data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const filter = request.query;

  if ('sort' in filter) filter.sort = filter.sort;
  if ('query' in filter) filter.query = filter.query;
  if ('skip' in filter) filter.skip = parseInt(filter.skip);
  if ('limit' in filter) filter.limit = parseInt(filter.limit);
  if ('projection' in filter) filter.projection = filter.projection;

  if (!filter.query) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { limit, skip, sort, projection, ...query } = request.query;
    filter.query = query;
  }

  return filter;
});
