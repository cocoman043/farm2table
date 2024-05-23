function EditProductModal({ product, edit }) {
    const editProduct = (event) => {
        edit(event, product._id);
    };

    return(
        <dialog id={product._id} className="modal">
            <div className="modal-box rounded-2xl">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    <h3 className="font-bold text-2xl">Edit Product</h3>
                </form>

                <form method="dialog" onSubmit={editProduct} className="mt-5 grid gap-5">
                    <label className="flex flex-col font-inter text-base">
                        Name
                        <input type="text" name="name" className="input input-bordered" placeholder="Eggplant" defaultValue={product.name}/>
                    </label>
                    
                    <label className="flex flex-col font-inter text-base">
                        Description
                        <textarea name="description" className="textarea textarea-bordered grow pt-3 font-inter text-base" placeholder="This is an eggplant" defaultValue={product.description}></textarea>
                    </label>

                    <label className="flex flex-col font-inter text-base">
                        Type
                        <input type="text" name="type" className="input input-bordered" placeholder="i.e. crop, poultry item" defaultValue={product.type}/>
                    </label>

                    <label className="flex flex-col font-inter text-base">
                        Price
                        <input type="number" name="price" className="input input-bordered" placeholder="90" defaultValue={product.price}/>
                    </label>

                    <label className="flex flex-col font-inter text-base">
                        Stock
                        <input type="number" name="stock" className="input input-bordered" placeholder="200" defaultValue={product.stock}/>
                    </label>

                    <button type="submit" className="self-end btn rounded-2xl bg-farmgreen w-full text-xl text-white flex hover:bg-farmgreen" onClick={()=>document.getElementById('my_modal_3').close()}>     
                        Submit
                    </button>
                </form>
            </div>
        </dialog>
    )
};

export default EditProductModal;
