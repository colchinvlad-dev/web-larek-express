import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body;

    const order = {
      payment, email, phone, address, total, items,
    };

    const products = await Product.find({ _id: { $in: order.items } });

    if (products.length !== order.items.length) {
      return next(new BadRequestError('Переданы некорректные id товаров'));
    }

    const hasNullPrice = products.some((product) => product.price === null);
    if (hasNullPrice) {
      return next(new BadRequestError('Один из товаров не продаётся'));
    }

    const calculatedTotal = products.reduce(
      (acc, product) => acc + (product.price || 0),
      0,
    );

    if (calculatedTotal !== order.total) {
      return next(
        new BadRequestError('Стоимость товаров не соответствует total'),
      );
    }

    const orderId = faker.string.uuid();

    return res.status(200).json({
      id: orderId,
      total: order.total,
    });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
