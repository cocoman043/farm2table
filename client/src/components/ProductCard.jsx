function ProductCard(props) {
    const product = props.product;

    return (
        <>
            <div className="flex-1 card card-compact bg-base-100 shadow-xl">
                <figure className="min-h-48 max-h-48 object-contain"><img src={product.img} alt={product.name}/></figure>
                <div className="card-body min-h-36 max-h-36 gap-1">
                    <h2 className="card-title text-lg font-normal">{product.name}</h2>
                    <p className="text-xl font-semibold">₱{product.price.toFixed(2)}</p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-farmgreen text-white hover:bg-farmgreen" onClick={() => props.add(product)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
