import { initMongoose } from "../../backend/mongoose";
import Product from "../../models/product";

export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handle(req, res) {
  await initMongoose();
  const { ids } = req.query;
  if (ids) {
    res.json(await Product.find({ _id: { $in: ids.split(",") } }).exec());
  } else {
    res.json(await findAllProducts());
  }
}
