import React from "react";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // حساب Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold mb-10 text-[#FD0000] text-center">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-red-800/20 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg mx-auto sm:mx-0"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold">{item.name}</h3>

                  <p className="text-gray-400 mt-1">
                    Price:{" "}
                    <span className="text-green-400 font-bold">
                      EGP {item.price.toFixed(2)}
                    </span>
                  </p>

                  <div className="flex justify-center sm:justify-start items-center gap-2 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-white text-lg"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full text-white text-lg"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-gray-300 mt-2 font-medium">
                    Total:{" "}
                    <span className="text-[#FD0000] font-bold">
                      EGP {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg text-white font-medium self-center sm:self-auto transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg h-fit sticky top-20">
            <h3 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between text-gray-300 text-lg mb-3">
              <span>Subtotal</span>
              <span className="text-white font-semibold">
                EGP {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm mb-6">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>

            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span className="text-[#FD0000]">
                EGP {subtotal.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-center mb-3 transition"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={clearCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
