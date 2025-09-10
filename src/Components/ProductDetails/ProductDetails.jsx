import { useParams, useLocation, Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext1";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const productsArray = location.state?.productsArray;

  if (!productsArray) return <h2 className="text-white p-10">No products data available</h2>;

  const product = productsArray.find((p) => p.id === id || p.id === parseInt(id));

  if (!product) return <h2 className="text-white p-10">Product not found</h2>;

  const relatedProducts = productsArray.filter((p) => p.id !== product.id).slice(0, 4);

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
              state={{ productsArray }} // نعيد ارسال نفس الـ array
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
