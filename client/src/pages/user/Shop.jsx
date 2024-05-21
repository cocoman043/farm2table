import { useState } from "react";
import Navbar from "../../components/Navbar"
import ProductCard from "../../components/ProductCard"

function Shop() {
    const [products, setProducts] = useState([
        {
            name: "Talong",
            desciption: "Sariwa't mahahaba, bagong ani",
            type: "crop",
            price: 20.00,
            stock: 10,
            img: "https://lunti.ph/cdn/shop/products/eggplant_530x@2x.jpg?v=1618037768"
        },
        {
            name: "Kamatis",
            desciption: "Sariwa't matatambok, bagong ani",
            type: "crop",
            price: 7.00,
            stock: 20,
            img: "https://upload.wikimedia.org/wikipedia/bcl/1/14/Kamatis_.jpg"
        },
        {
            name: "Sibuyas",
            desciption: "Sariwa't matitigas, bagong ani",
            type: "crop",
            price: 20.00,
            stock: 5,
            img: "https://palengkego.shop/cdn/shop/products/164_640x.jpg?v=1627823888"
        },
        {
            name: "Manok",
            desciption: "Bagong katay",
            type: "poultry item",
            price: 120.00,
            stock: 20,
            img: "https://leesfreshmarketnc.com/wp-content/uploads/2022/05/WHOLE-CHICKEN.jpg"
        },
        {
            name: "Grower",
            desciption: "Mainam na patuka sa mga lumalaking manok asdsdsdsdsdsdsdsdsdsdsdsdasdasdasdasdasdasdasdasdasdasdasdasdasd",
            type: "poultry item",
            price: 80.00,
            stock: 15,
            img: "https://ph-test-11.slatic.net/p/d111b4ee96804e521fa4c9720950664b.jpg"
        }
    ])

    const [carts, setCarts] = useState({});

    function addToCart(product) {
        setCarts(prevCarts => {
            const newCarts = { ...prevCarts };
            if (newCarts.hasOwnProperty(product.name)) {
                newCarts[product.name] += 1;
            } else {
                newCarts[product.name] = 1;
            }
            return newCarts;
        });

        console.log(carts);
    }

    function editCart(cart, edit) {
        setCarts(prevCarts => {
            const newCarts = { ...prevCarts };
            if (edit == "-") {
                if(newCarts[cart] == 1) {
                    delete newCarts[cart]
                } else {
                    newCarts[cart] -= 1;
                }
            } else {
                newCarts[cart] += 1;
            }
            return newCarts;
        });

        console.log(carts);
    }

    return (
        <>
            <Navbar />
            <div className="p-4 w-full flex flex-col items-center">
                <div className="max-w-[1440px] w-full text-md flex flex-col-reverse lg:flex-row">
                    {/* Products */}
                    <div className="p-3 flex flex-col gap-5">
                        <h1 className="font-inter font-bold text-4xl">Product</h1>

                        <div className="p-3 shadow-xl border-4 border-farmgreen rounded-2xl overflow-hidden grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">

                            {products.map((product, index) => {
                                return(
                                    <ProductCard key={index} product={product} add={addToCart}/>
                                )
                            })}
                    
                        </div>
                    </div>

                    <div className="p-3 min-w-[450px] flex flex-col gap-5">
                        <h1 className="font-inter font-bold text-4xl">Cart</h1>

                        <div className="shadow-xl border-4 border-farmgreen rounded-2xl overflow-x-auto">
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
                                {/* row 1 */}
                                {JSON.stringify(carts) == '{}' 
                                    ? 
                                        <tr className="h-14">
                                            <td>No items</td>
                                        </tr> 
                                    :
                                        Object.keys(carts).map((cart) => {
                                            return(
                                                <tr className="h-14">
                                                    <td>{cart}</td>
                                                    <td>
                                                        <div className="w-fit h-10 border-2 border-gray-300 rounded-2xl overflow-hidden flex items-center">
                                                            <div className="flex-1 w-10 border-r-2 border-r-gray-300 overflow-hidden flex justify-center">
                                                                <button className="btn btn-square bg-white rounded-none text-lg" onClick={() => editCart(cart, "-")}>
                                                                    -
                                                                </button>
                                                            </div>
                                                            <div className="flex-none w-10 overflow-hidden flex justify-center">
                                                                {carts[cart]}
                                                            </div>
                                                            <div className="flex-none w-10 border-l-2 border-l-gray-300 overflow-hidden flex justify-center">
                                                                <button className="btn btn-square bg-white rounded-none text-lg" onClick={() => editCart(cart, "+")}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Blue</td>
                                                </tr>
                                            )
                                        })}
                                

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
