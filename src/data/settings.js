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
  clientServiceSchedule: [
    {
      name: 'Amanda',
      phone: '678.243.8455',
      availableFrom: '08:00',
      availableTo: '12:00',
    },
    {
      name: 'Tobias',
      phone: '278.443.6443',
      availableFrom: '12:00',
      availableTo: '16:00',
    },
    {
      name: 'Helena',
      phone: '167.280.3970',
      availableFrom: '16:00',
      availableTo: '22:00',
    },
    {
      availableFrom: '22:00',
      availableTo: '08:00',
    },
  ],
};

settings.clientServiceSchedule.filter(contact => !contact.phone)[0].message = 'The office opens at 8:00 UTC';

export default settings;
