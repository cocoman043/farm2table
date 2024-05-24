import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Navbar from "../../components/AdminNavbar"
import ProductCard from "../../components/ProductCard"
import AddProductModal from "../../components/AddProductModal";
import EditProductModal from "../../components/EditProductModal";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

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

  

  const addProduct = async (event) => {
    event.preventDefault();

    const name = event.target.name.value
    const description = event.target.description.value
    const type = event.target.type.value
    const price = event.target.price.value
    const stock = event.target.stock.value
    const img = event.target.img.value

    try {
      const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, description, type, price, stock, img })
      });

      console.log('Successfully added product');
    } catch (error) {
      console.error(`An error occurred while adding the product: ${error.message}`);
    }

    document.getElementById('my_modal_3').close()
  };

  
  const editProduct = async (event, id) => {
    event.preventDefault();

    const name = event.target.name.value
    const description = event.target.description.value
    const type = event.target.type.value
    const price = event.target.price.value
    const stock = event.target.stock.value
    const img = event.target.img.value

    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, description, type, price, stock, img })
      });

      console.log('Successfully edited product');
    } catch (error) {
      console.error(`An error occurred while adding the product: ${error.message}`);
    }

    document.getElementById(id).close()
  }

  return (
    <>
      <Navbar />
      <div className="p-4 w-full flex flex-col items-center">
        <div className="max-w-[1440px] w-full flex flex-col-reverse lg:flex-row">
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

            <div className="p-3 border-farmgreen shadow-xl border-4 rounded-2xl overflow-hidden grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              {products.map((product, index) => {
                return (
                  <div key={index}>
                    <ProductCard product={product} onClick={() => document.getElementById(product._id).showModal()} button="Edit Product"/>
                    <EditProductModal product={product} edit={editProduct}/>
                  </div>
                )
              })}
            </div>

            <button className="self-end btn btn-circle mt-4 w-48 h-16 bg-farmgreen shadow-xl text-xl text-white flex hover:bg-farmgreen" onClick={()=>document.getElementById('my_modal_3').showModal()}>     
                <FaPlus />
                Add Product
            </button>

            <AddProductModal add={addProduct}/>

          </div>

        </div>
      </div>

      
    </>
  );
}

export default AdminDashboard;
