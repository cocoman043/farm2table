function TransactionCard({ price, quantity }) {
  const total = price * quantity;

  return (
    <>
      <div className="card card-side bg-white shadow-xl max-w-96 min-w-96 drop-shadow">
        <figure className="w-1/2"><img className="object-cover" src="../../public/sirJM.webp" alt="transaction-image" /></figure>
        <div className="card-body flex justify-between">
          <div className="text-black">Sir JM</div>
          <div className="font-bold text-black flex justify-between">
            <div>P{price}</div>
            <div>Qty: {quantity}</div>
          </div>
          <div className="flex justify-end text-black">Total ({quantity} items): {total}</div>
        </div>
      </div>
    </>
  );
}

export default TransactionCard;
