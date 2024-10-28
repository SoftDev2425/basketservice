export const basket = {
  basketId: 'basket_12345',
  contactDetails: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    address: {
      addressLine1: '123 Food St',
      addressLine2: 'Apt 4B',
      city: 'Foodville',
      state: 'CA',
      country: 'US',
      postalCode: '90210',
    },
  },
  items: [
    {
      itemId: 'food_001',
      name: 'Margherita Pizza',
      description: 'A classic pizza with mozzarella and tomato',
      quantity: 2,
      price: 12.99,
    },
    {
      itemId: 'food_002',
      name: 'Spaghetti Carbonara',
      description: 'Traditional Italian pasta dish',
      quantity: 1,
      price: 14.99,
    },
    {
      itemId: 'food_003',
      name: 'Caesar Salad',
      description: 'Fresh romaine with Caesar dressing',
      quantity: 1,
      price: 8.99,
    },
  ],
  paymentDetails: {
    paymentMethod: 'credit_card',
    transactionId: 'txn_67890',
    status: 'completed',
    paymentDate: new Date('2023-10-20T14:30:00Z'), // Changed to Date object
  },
  totalCost: 49.96,
  createdAt: new Date('2023-10-01T10:00:00Z'), // Changed to Date object
  updatedAt: new Date('2023-10-20T15:00:00Z'), // Changed to Date object
  deletedAt: undefined, // Use undefined instead of null
};
