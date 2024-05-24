import "./scrollbar.css"

function AddProductModal({add}) {
    return(
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box rounded-lg scrollbar">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <h3 className="font-bold text-2xl">Add Product</h3>
            </form>

            <form method="dialog" onSubmit={add} className="mt-5 grid gap-5">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" name="name" className="grow font-inter text-base" placeholder="Name" required/>
                </label>
                
                <textarea name="description" className="textarea textarea-bordered grow pt-3 font-inter text-base" placeholder="Description" required></textarea>

                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" name="type" className="grow font-inter text-base" placeholder="Type (i.e crop, poultry item)" required/>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <input type="number" name="price" className="grow font-inter text-base" placeholder="Price" required/>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <input type="number" name="stock" className="grow font-inter text-base" placeholder="Stock" required/>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" name="img" className="grow font-inter text-base" placeholder="Image Link"/>
                </label>

                <button type="submit" className="self-end btn rounded-2xl bg-farmgreen w-full text-xl text-white flex hover:bg-farmgreen">     
                    Submit
                </button>
            </form>
            </div>
        </dialog>
    )
};

export default AddProductModal;
