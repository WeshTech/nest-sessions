import * as Joi from 'joi';

export const envConfigSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
});
