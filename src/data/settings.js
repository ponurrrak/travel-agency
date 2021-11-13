const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    endpoint: {
      orders: 'orders',
    },
  },
  message: 'Sorry, you have to type your name and contact info before you order.',
};

export default settings;
