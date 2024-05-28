import "./scrollbar.css";

function EditUserModal({ user, edit, closeModal }) {
    const editUser = (event)  => {
        edit(event, user._id);
    };

    return (
        <dialog id = {`edit-modal-${user._id}`} className = "modal text-white" open>
            <div className = "modal-box rounded-lg scrollbar">
                <form method = "dialog">
                    <button
                        className = "btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        type = "button"
                        onClick = {closeModal}
                    >
                        ✕
                    </button>
                    <h3 className = "font-bold text-2xl">Edit User</h3>
                </form>

                <form method = "dialog" onSubmit = {editUser} className = "mt-5 grid gap-3">
                    <label className = "flex flex-col font-inter text-base">
                        Name
                        <input
                        type = "text"
                        name = "name"
                        className = "input input-bordered"
                        placeholder = "John Doe"
                        defaultValue = {user.name}
                        />
                    </label>

                    <label className = "flex flex-col font-inter text-base">
                        Permission Level
                        <input
                        type = "text"
                        name = "type"
                        className = "input input-bordered"
                        placeholder = "user"
                        defaultValue = {user.permissions}
                        />
                    </label>

                    <button
                        type = "submit"
                        className = "self-end btn rounded-2xl bg-farmgreen w-full text-xl text-white flex hover:bg-farmgreen"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </dialog>
    );
}

export default EditUserModal;
