import { useParams, Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext1";
import toast from "react-hot-toast";
import { useState } from "react";

// تقدر تجيب نفس المنتجات من ملف products.js مستقل وتستورده هنا
import kit1 from "../../../images/starter1.webp";
import kit2 from "../../../images/starter2.webp";
import kit3 from "../../../images/starter3.jpeg";
import kit4 from "../../../images/starter4.jpg";
import eliquid1 from "../../../images/eliquid1.webp";
import eliquid2 from "../../../images/eliquid2.jpg";
import coil1 from "../../../images/coil1.jpg";
import charger1 from "../../../images/charger1.jpg";

const products = [
  { id: 1, brand: "SMOK", title: "SMOK Novo 4 Starter Kit | 800mAh | 2mL", price: 900, image: kit1 },
  { id: 2, brand: "VAPORESSO", title: "Vaporesso XROS 3 Mini Starter Kit | 1000mAh", price: 1100, image: kit2 },
  { id: 3, brand: "UWELL", title: "Uwell Caliburn A3 Starter Kit | 15W | 2mL", price: 950, image: kit3 },
  { id: 4, brand: "GEEKVAPE", title: "GeekVape Wenax K1 SE Starter Kit | 600mAh", price: 850, image: kit4 },
  { id: 5, brand: "Cool Mist", title: "Mint Chill E-Liquid | 60mL | 3mg Nicotine", price: 250, image: eliquid1 },
  { id: 6, brand: "Berry Blast", title: "Berry Blast E-Liquid | 60mL | 6mg Nicotine", price: 280, image: eliquid2 },
  { id: 7, brand: "SMOK", title: "SMOK Replacement Coils Pack - 5 pcs", price: 150, image: coil1 },
  { id: 8, brand: "Generic", title: "Vape Battery Charger", price: 150, image: charger1 },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2 className="text-white p-10">Product not found</h2>;

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 700));
    addToCart(product);
    setLoading(false);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <section className="text-white px-6 py-12 bg-black min-h-screen">
      <div className="grid md:grid-cols-2 gap-10">
        <img src={product.image} alt={product.title} className="w-full h-96 object-contain rounded-lg bg-[#111]" />

    <div className="flex flex-col justify-center text-left">
  <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
  <p className="text-gray-400 mb-2">{product.brand}</p>
  <p className="text-[#FD0000] text-xl font-semibold mb-6">{product.price} EGP</p>

  <button
    onClick={handleAddToCart}
    disabled={loading}
    className="bg-[#FD0000] px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
  >
    {loading ? "Adding..." : "Add to Cart"}
  </button>
</div>

      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h3 className="text-xl font-bold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="bg-[#111] p-4 rounded-lg border border-gray-700 hover:shadow-lg transition"
            >
              <img src={p.image} alt={p.title} className="h-40 w-full object-contain mb-4" />
              <h4 className="text-sm text-gray-400">{p.brand}</h4>
              <p className="text-base text-white font-medium line-clamp-2">{p.title}</p>
              <span className="text-[#FD0000] font-semibold">{p.price} EGP</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
