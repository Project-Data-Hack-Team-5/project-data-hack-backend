import type { AWS } from '@serverless/typescript';

import schema from '@functions/hello/schema';

const serverlessConfiguration: AWS = {
  service: 'project-data-hack-team-5',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    }
  },
  // import the function via paths
  functions: {
    hello: {
      handler: './src/functions/hello/handler.hello',
      events: [
        {
          http: {
            method: 'post',
            path: 'hello',
            request: {
              schemas: {
                'application/json': schema
              }
            },
            cors: true
          }
        }
      ]
    },
    data: {
      handler: './src/functions/data/handler.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'data',
            cors: true
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    }
  }
};

module.exports = serverlessConfiguration;
