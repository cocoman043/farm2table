function ConfirmButton({ id, status, updateTableData }) {

  const confirmOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3000/order/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'confirmed' }),
      });

      if (response.ok) {
        console.log('Successfully confirmed order');
        updateTableData(id, 'confirmed');
      } else {
        console.error('Failed to confirm order');
      }
    } catch (error) {
      console.error(`An error occurred while confirming the order: ${error.message}`);
    }
  };

  if (status === 'pending') {
    return <button className="text-white btn btn-success" onClick={confirmOrder}>Confirm</button>;
  } else {
    return null;
  }
};

export default ConfirmButton;
