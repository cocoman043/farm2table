function DeleteButton({ onClick }) {
    
    return (
        <button className="text-white btn btn-error" onClick={onClick}>
        ✕
        </button>
    );
}

export default DeleteButton;