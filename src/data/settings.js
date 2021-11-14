const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    endpoint: {
      orders: 'orders',
    },
  },
  messages: {
    error: 'Sorry, you have to type your name and contact info before you order.',
    success: 'Your order has been sent successfully.',
  },
};

export default settings;
