import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../../components/UserNavbar"
import ProductCard from "../../components/ProductCard"

function Shop() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [carts, setCarts] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetch(`http://localhost:3000/product?name=${filter}`);

        const products = await result.json();
        setProducts(products);
        console.log(products);
      } catch (error) {
        console.error(`An error occured while fetching products: ${error.message}`);
      }
    };

    getProducts();
  }, [filter])

  function addToCart(product) {
    setCarts(prevCarts => {
      const newCarts = { ...prevCarts };
      const item = { ...newCarts[product.name] };

      if (newCarts.hasOwnProperty(product.name)) {
        newCarts[product.name] = { unitprice: product.price, quantity: item.quantity + 1, total: item.total + product.price }
      } else {
        newCarts[product.name] = { unitprice: product.price, quantity: 1, total: product.price };
      }
      return newCarts;
    });
  }

  function editCart(cart, edit) {
    setCarts(prevCarts => {
      const newCarts = { ...prevCarts };
      const item = { ...newCarts[cart] };

      if (edit == "-") {
        if (newCarts[cart].quantity == 1) {
          delete newCarts[cart]
        } else {
          newCarts[cart] = { unitprice: item.unitprice, quantity: item.quantity - 1, total: item.total - item.unitprice }
        }
      } else {
        newCarts[cart] = { unitprice: item.unitprice, quantity: item.quantity + 1, total: item.total + item.unitprice }
      }
      return newCarts;
    });
  }

  function checkout() {
    setCarts({});
  }

  return (
    <>
      <Navbar />
      <div className="p-4 w-full flex flex-col items-center">
        <div className="max-w-[1440px] w-full text-md flex flex-col-reverse lg:flex-row">
          {/* Products */}
          <div className="p-3 flex-1 flex flex-col gap-5">
            <div className="flex justify-between">
              <h1 className="flex-1 font-inter font-bold text-4xl">Product</h1>
              <label className="input input-bordered rounded-2xl flex-1 flex items-center gap-2">
                <input id="search" type="text" className="grow" placeholder="Search" />
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => {setFilter(document.getElementById("search").value)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </button>
              </label>
            </div>

            <div className="p-3 shadow-xl border-4 border-farmgreen rounded-2xl overflow-hidden grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">

              {products.map((product, index) => {
                return (
                  <ProductCard key={index} product={product} onClick={() => addToCart(product)} button="Add to cart"/>
                )
              })}

            </div>
          </div>

          <div className="p-3 lg:min-w-[450px] flex flex-col gap-5">
            <h1 className="font-inter font-bold text-4xl">Cart</h1>

            <div className="shadow-xl border-4 border-farmgreen rounded-2xl overflow-hidden">
              <table className="table font-inter">
                {/* head */}
                <thead className="h-14 bg-farmgreen font-semibold text-black text-xl">
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>

                  {JSON.stringify(carts) == '{}'
                    ?
                    <tr className="h-14">
                      <td></td>
                      <td className="p-4 flex justify-center"><p>No items</p></td>
                      <td></td>
                    </tr>
                    :
                    Object.keys(carts).map((cart, index) => {
                      return (
                        <tr key={index} className="h-14">
                          <td className="px-4 max-w-36 truncate">{cart}</td>
                          <td className="px-4">
                            <div className="w-fit h-10 border-2 border-gray-300 rounded-2xl overflow-hidden flex items-center">
                              <div className="w-10 border-r-2 border-r-gray-300 overflow-hidden flex justify-center">
                                <button className="btn btn-square bg-white rounded-none text-lg" onClick={() => editCart(cart, "-")}>
                                  -
                                </button>
                              </div>
                              <div className="w-10 overflow-hidden flex justify-center">
                                {carts[cart].quantity}
                              </div>
                              <div className="w-10 border-l-2 border-l-gray-300 overflow-hidden flex justify-center">
                                <button className="btn btn-square bg-white rounded-none text-lg" onClick={() => editCart(cart, "+")}>
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 font-bold text-lg">₱{carts[cart].total.toFixed(2)}</td>
                        </tr>
                      )
                    })}

                </tbody>
              </table>
            </div>

            <button className="btn bg-farmgreen rounded-2xl text-lg text-white hover:bg-farmgreen" onClick={() => checkout()}>
              <FaShoppingCart />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
