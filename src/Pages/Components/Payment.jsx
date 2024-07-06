import React from 'react';
import './Payment.css';

const Payment = () => {
  const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Enter the Key ID generated from the Dashboard
      amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
      currency: 'INR',
      name: 'Hospital Management System',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo', // Add your logo URL
      order_id: 'order_Ilu0R0H0mU4N4J', // This is a sample Order ID. Replace with your order_id.
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
