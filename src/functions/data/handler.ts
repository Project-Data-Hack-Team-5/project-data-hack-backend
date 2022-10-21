import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/middyfy';
import rawData from './data.json';
import { Handler } from 'aws-lambda';

const data: Handler = async (event) => {
  return formatJSONResponse({
    data: rawData,
    event
  });
};

export const main = middyfy(data);
