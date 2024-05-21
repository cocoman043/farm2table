import { useState } from "react";
import Navbar from "../../components/Navbar"
import ProductCard from "../../components/ProductCard"

function Shop() {
    const [products, setProducts] = useState([
        {
            name: "Talong",
            description: "Sariwa't mahahaba, bagong ani",
            type: "crop",
            price: 20.00,
            stock: 10,
            img: "https://lunti.ph/cdn/shop/products/eggplant_530x@2x.jpg?v=1618037768"
        },
        {
            name: "Kamatis",
            description: "Sariwa't matatambok, bagong ani",
            type: "crop",
            price: 7.00,
            stock: 20,
            img: "https://upload.wikimedia.org/wikipedia/bcl/1/14/Kamatis_.jpg"
        },
        {
            name: "Sibuyas",
            description: "Sariwa't matitigas, bagong ani",
            type: "crop",
            price: 20.00,
            stock: 5,
            img: "https://palengkego.shop/cdn/shop/products/164_640x.jpg?v=1627823888"
        },
        {
            name: "Manok",
            description: "Bagong katay",
            type: "poultry item",
            price: 120.00,
            stock: 20,
            img: "https://leesfreshmarketnc.com/wp-content/uploads/2022/05/WHOLE-CHICKEN.jpg"
        },
        {
            name: "Grower",
            description: "Mainam na patuka sa mga lumalaking manok asdsdsdsdsdsdsdsdsdsdsdsdasdasdasdasdasdasdasdasdasdasdasdasdasd",
            type: "poultry item",
            price: 80.00,
            stock: 15,
            img: "https://ph-test-11.slatic.net/p/d111b4ee96804e521fa4c9720950664b.jpg"
        }
    ])

    const [carts, setCarts] = useState({});

    function addToCart(product) {
        setCarts(prevCarts => {
            console.log("add")
            const newCarts = { ...prevCarts };
            const item = { ...newCarts[product.name] };

            if (newCarts.hasOwnProperty(product.name)) {
                newCarts[product.name] = { unitprice: product.price, quantity: item.quantity + 1, total: item.total + product.price }
            } else {
                newCarts[product.name] = { unitprice: product.price, quantity: 1, total: product.price};
            }
            return newCarts;
        });
    }

    function editCart(cart, edit) {
        setCarts(prevCarts => {
            console.log("edit")
            const newCarts = { ...prevCarts };
            const item = { ...newCarts[cart] };

            if (edit == "-") {
                if(newCarts[cart].quantity == 1) {
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
                                    <ProductCard key={index} product={product} add={() => addToCart(product)}/>
                                )
                            })}
                    
                        </div>
                    </div>

                    <div className="p-3 min-w-fit flex flex-col gap-5">
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
                                            return(
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
