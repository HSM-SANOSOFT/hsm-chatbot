import 'dotenv/config';

import * as process from 'node:process';

import * as joi from 'joi';

interface EnvVars {
  ENVIRONMENT: string;
  APP_NAME: string;
  PLAYGROUND_SERVICE_URL: string;
}

const EnvSchema = joi
  .object({
    ENVIRONMENT: joi.string().required(),
    APP_NAME: joi.string().default('hsm-chatbot-main'),
    M365_AGENTS_PLAYGROUND_SERVICE_URL: joi
      .string()
      .default('http://hsm-chatbot-tester:56150'),
  })
  .unknown()
  .required();

const validation = EnvSchema.validate(process.env);

if (validation.error) {
  throw new Error(`Config validation error: ${validation.error.message}`);
}

const envVars: EnvVars = validation.value as EnvVars;

export const envs = Object.freeze({
  ENVIRONMENT: envVars.ENVIRONMENT,
  APP_NAME: envVars.APP_NAME,
  PLAYGROUND_SERVICE_URL: envVars.PLAYGROUND_SERVICE_URL,
} as const);
export type Envs = Readonly<typeof envs>;
