import React from 'react';
import './Payment.css';

const Payment = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500,
          currency: 'INR',
          receipt: 'receipt#1',
        }),
      });

      const order = await response.json();

      const options = {
        key: 'rzp_test_lK3ct7IlOGDMqU',
        amount: order.amount,
        currency: order.currency,
        name: 'Hospital Management System',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: order.id,
        handler: function (response) {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert(`Signature: ${response.razorpay_signature}`);
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(`Error Code: ${response.error.code}`);
        alert(`Description: ${response.error.description}`);
        alert(`Source: ${response.error.source}`);
        alert(`Step: ${response.error.step}`);
        alert(`Reason: ${response.error.reason}`);
        alert(`Order ID: ${response.error.metadata.order_id}`);
        alert(`Payment ID: ${response.error.metadata.payment_id}`);
      });

      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="payment-container">
      <div className="card1">
        <h1>Make a Payment</h1>
        <p>Pay for your medical services securely through Razorpay</p>
        <button className="pay-button" onClick={handlePayment}>
          Pay INR 500
        </button>
      </div>
    </div>
  );
};

export default Payment;
