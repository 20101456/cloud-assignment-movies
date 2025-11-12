#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("aws-cdk-lib/core"));
const cdk_stack_1 = require("../lib/cdk-stack");
const app = new cdk.App();
new cdk_stack_1.CdkStack(app, 'CdkStack', {
/* If you don't specify 'env', this stack will be environment-agnostic.
 * Account/Region-dependent features and context lookups will not work,
 * but a single synthesized template can be deployed anywhere. */
/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
/* Uncomment the next line if you know exactly what Account and Region you
 * want to deploy the stack to. */
// env: { account: '123456789012', region: 'us-east-1' },
/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQXdDO0FBQ3hDLGdEQUE0QztBQUU1QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLG9CQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRTtBQUM1Qjs7aUVBRWlFO0FBRWpFO21FQUNtRTtBQUNuRSw2RkFBNkY7QUFFN0Y7a0NBQ2tDO0FBQ2xDLHlEQUF5RDtBQUV6RCw4RkFBOEY7Q0FDL0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxyXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWIvY29yZSc7XHJcbmltcG9ydCB7IENka1N0YWNrIH0gZnJvbSAnLi4vbGliL2Nkay1zdGFjayc7XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xyXG5uZXcgQ2RrU3RhY2soYXBwLCAnQ2RrU3RhY2snLCB7XHJcbiAgLyogSWYgeW91IGRvbid0IHNwZWNpZnkgJ2VudicsIHRoaXMgc3RhY2sgd2lsbCBiZSBlbnZpcm9ubWVudC1hZ25vc3RpYy5cclxuICAgKiBBY2NvdW50L1JlZ2lvbi1kZXBlbmRlbnQgZmVhdHVyZXMgYW5kIGNvbnRleHQgbG9va3VwcyB3aWxsIG5vdCB3b3JrLFxyXG4gICAqIGJ1dCBhIHNpbmdsZSBzeW50aGVzaXplZCB0ZW1wbGF0ZSBjYW4gYmUgZGVwbG95ZWQgYW55d2hlcmUuICovXHJcblxyXG4gIC8qIFVuY29tbWVudCB0aGUgbmV4dCBsaW5lIHRvIHNwZWNpYWxpemUgdGhpcyBzdGFjayBmb3IgdGhlIEFXUyBBY2NvdW50XHJcbiAgICogYW5kIFJlZ2lvbiB0aGF0IGFyZSBpbXBsaWVkIGJ5IHRoZSBjdXJyZW50IENMSSBjb25maWd1cmF0aW9uLiAqL1xyXG4gIC8vIGVudjogeyBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULCByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTiB9LFxyXG5cclxuICAvKiBVbmNvbW1lbnQgdGhlIG5leHQgbGluZSBpZiB5b3Uga25vdyBleGFjdGx5IHdoYXQgQWNjb3VudCBhbmQgUmVnaW9uIHlvdVxyXG4gICAqIHdhbnQgdG8gZGVwbG95IHRoZSBzdGFjayB0by4gKi9cclxuICAvLyBlbnY6IHsgYWNjb3VudDogJzEyMzQ1Njc4OTAxMicsIHJlZ2lvbjogJ3VzLWVhc3QtMScgfSxcclxuXHJcbiAgLyogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vY2RrL2xhdGVzdC9ndWlkZS9lbnZpcm9ubWVudHMuaHRtbCAqL1xyXG59KTtcclxuIl19