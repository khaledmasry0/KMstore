import { useState } from "react";
import { initMongoose } from "../backend/mongoose";
import Product from "../components/Product";
import { findAllProducts } from "./api/products";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  const categoriesNames = [...new Set(products.map((p) => p.category))];
  if (phrase) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(phrase.toLowerCase())
    );
  }
  return (
    <>
      <div className="p-5">
        <input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          type="text"
          placeholder="Search for product..."
          className="bg-gray-100 w-full py-2 px-4 rounded-xl"
        />
        <div>
          {categoriesNames.map((category) => (
            <div key={category.slice(1, 3)}>
              {products.find((p) => p.category === category) && (
                <div>
                  <h2 className="text-xl capitalize py-5">{category}</h2>
                  <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                    {products
                      .filter((p) => p.category === category)
                      .map((product) => (
                        <div key={product._id} className="px-5 snap-start">
                          <Product {...product} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
