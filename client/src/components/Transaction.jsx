function TransactionCard({ name, price, quantity, img }) {
  const total = price * quantity;
  console.log(img);

  return (
    <>
      <div className="card card-side bg-white shadow-xl max-w-96 min-w-96 drop-shadow">
        <figure className="w-1/2"><img className="object-cover h-full" src={img} alt="transaction-image" /></figure>
        <div className="card-body flex justify-between w-1/2">
          <div className="text-black">{name || 'Sir JM'}</div>
          <div className="font-bold text-black flex justify-between">
            <div>P{price}</div>
            <div>Qty: {quantity}</div>
          </div>
          <div className="flex justify-end text-black align-text-bottom">Total ({quantity} items): {total}</div>
        </div>
      </div>
    </>
  );
}

export default TransactionCard;
