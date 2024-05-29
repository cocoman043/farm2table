import { useEffect, useState, useRef } from "react";
import { useIsMount } from '../../components/FirstRender';
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../../components/UserNavbar"
import ProductCard from "../../components/ProductCard"

function Shop() {
  const user_id = localStorage.getItem("userId");
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [carts, setCarts] = useState({});
  const firstRender = useIsMount();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetch(`http://localhost:3000/product?name=${filter}`);

        const products = await result.json();
        setProducts(products);
      } catch (error) {
        console.error(`An error occured while fetching products: ${error.message}`);
      }
    };

    getProducts();
  }, [filter]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetch(`http://localhost:3000/user/${user_id}`);

        const user = await result.json();
        if(user.cart != null || user.cart != undefined)
          setCarts(user.cart);

        console.log("get cart: ", carts);
      } catch (error) {
        console.error(`An error occured while fetching user cart: ${error.message}`);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const putUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${user_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart: carts })
        });
  
        if (response.ok) {
          console.log('Successfully updated user cart');
        } else {
          console.error('Failed to update user cart');
        }
      } catch (error) {
        console.error(`An error occurred while updating user cart: ${error.message}`);
      }
    };

    if (firstRender) {
      console.log("first render")
    } else {
      putUser();
    }
  }, [carts]);

  function addToCart(product) {
    setCarts(prevCarts => {
      const newCarts = { ...prevCarts };
      const item = { ...newCarts[product.name] };

      if (newCarts.hasOwnProperty(product.name)) {
        newCarts[product.name] = { product: product, quantity: item.quantity + 1, total: item.total + product.price }
      } else {
        newCarts[product.name] = { product: product, quantity: 1, total: product.price };
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
          newCarts[cart] = { product: item.product, quantity: item.quantity - 1, total: item.total - item.product.price }
        }
      } else {
        newCarts[cart] = { product: item.product, quantity: item.quantity + 1, total: item.total + item.product.price }
      }
      return newCarts;
    });
  }

  const checkout = async () => {
    const order = await postOrder();
    const transaction = await postTransaction(order);
  };

  const postOrder = async () => {
    try {
      const response = await fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id })
      });

      var order = await response.json();
      if (response.ok) {
        console.log('Successfully added order');
        return order;
      } else {
        console.error('Failed to add order');
        return null;
      }
    } catch (error) {
      console.error(`An error occurred while adding the order: ${error.message}`);
      return null;
    }
  }

  const postTransaction = async (order) => {
    try {
      for (const key in carts) {
        const item = carts[key]

        if(item.product.stock < item.quantity)
          continue;

        const response = await fetch('http://localhost:3000/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ product_id: item.product._id, quantity: item.quantity, order_id: order._id })
        });

        if (response.ok) {
          console.log('Successfully added transaction');
          deleteItem(key);
          updateStock(item.product, item.quantity);
        } else {
          console.error('Failed to add transaction');
        }
      }
    } catch (error) {
      console.error(`An error occurred while adding the transaction: ${error.message}`);
    }
  }

  const deleteItem = (key) => {
    setCarts(prevCarts => {
      const newCarts = { ...prevCarts };
      delete newCarts[key];
      return newCarts;
    });
  }

  const updateStock = async (product, quantity) => {
    try {
      const response = await fetch(`http://localhost:3000/product/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: product.stock - quantity })
      });

      if (response.ok) {
        console.log('Successfully updated product stock');
      } else {
        console.error('Failed to update product stock');
      }
    } catch (error) {
      console.error(`An error occurred while updating the product stock: ${error.message}`);
    }
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
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => { setFilter(document.getElementById("search").value) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </button>
              </label>
            </div>

            <div className="p-3 shadow-xl border-4 border-farmgreen rounded-2xl overflow-hidden grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">

              {products.map((product, index) => {
                return (
                  <ProductCard key={index} product={product} onClick={() => addToCart(product)} button="Add to cart" />
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

            <button className="btn bg-farmgreen rounded-2xl text-lg text-white hover:bg-farmgreen" onClick={checkout}>
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
