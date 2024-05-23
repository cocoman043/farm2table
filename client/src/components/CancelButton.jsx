function CancelButton({ id, status, updateTableData }) {

  const cancelOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3000/order/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (response.ok) {
        console.log('Successfully canceled order');
        updateTableData(id);
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error(`An error occurred while cancelling the order: ${error.message}`);
    }
  };

  if (status === 'pending') {
    return <button className="text-white btn btn-error" onClick={cancelOrder}>Cancel</button>;
  } else {
    return null;
  }
};

export default CancelButton;
