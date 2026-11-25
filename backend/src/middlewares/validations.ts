import { celebrate, Joi, Segments } from 'celebrate';
import { Types } from 'mongoose';

export const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" должно быть заполнено',
      }),
    image: Joi.object()
      .keys({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      })
      .required(),
    category: Joi.string().required(),
    description: Joi.string().allow('', null),
    price: Joi.number().allow(null),
  }),
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required().messages({
      'any.only': 'Поле "payment" должно быть одним из: card, online',
      'any.required': 'Поле "payment" должно быть заполнено',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Поле "email" должно быть валидным email-адресом',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    phone: Joi.string().required().messages({
      'any.required': 'Поле "phone" должно быть заполнено',
    }),
    address: Joi.string().required().messages({
      'any.required': 'Поле "address" должно быть заполнено',
    }),
    total: Joi.number().required().messages({
      'any.required': 'Поле "total" должно быть заполнено',
    }),
    items: Joi.array()
      .items(Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'ObjectId validation'))
      .min(1)
      .required()
      .messages({
        'array.min': 'Массив "items" не должен быть пустым',
        'any.required': 'Поле "items" должно быть заполнено',
      }),
  }),
});
