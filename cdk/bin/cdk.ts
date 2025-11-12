#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { MoviesApiStack } from '../lib/movies-api-stack';

console.log('[cdk bin] running');

const app = new App();

new MoviesApiStack(app, 'MoviesApiStack', {
  env: { account: '431136221268', region: 'eu-west-1' },
});
