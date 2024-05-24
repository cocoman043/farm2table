function ProductCard({ product, onClick, button }) {
    return (
        <>
            <div className="flex-1 card card-compact bg-base-100 shadow-xl hover:scale-105 ease-in-out duration-200">
                <figure className="min-h-48 max-h-48"><img className="object-cover w-full h-full" src={product.img} alt={product.name}/></figure>
                <div className="card-body min-h-36 max-h-36 gap-1">
                    <h2 className="card-title text-lg font-normal truncate">{product.name}</h2>
                    <p className="text-xl font-semibold">₱{product.price.toFixed(2)}</p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-farmgreen text-white hover:bg-farmgreen" onClick={onClick}>{button}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
