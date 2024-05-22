function CancelButton({ id, status }) {

  const cancelOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3000/order/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      console.log('Successfully canceled order');
    } catch (error) {
      console.error(`An error occurred while cancelling the order: ${error.message}`);
    }
  }


  if (status == 'pending') {
    return <button className="btn btn-error" onClick={cancelOrder}>Cancel</button>;
  } else {
    return <></>;
  }
};

export default CancelButton;
