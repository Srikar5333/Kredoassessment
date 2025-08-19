import { Product, Order } from '../types';

export const getProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  if (!products) {
    // Initialize with sample products
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
        price: 199.99,
        stock: 25,
        category: 'Electronics',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Advanced fitness tracking smartwatch with heart rate monitor',
        price: 299.99,
        stock: 15,
        category: 'Electronics',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Laptop Backpack',
        description: 'Durable laptop backpack with multiple compartments and USB charging port',
        price: 59.99,
        stock: 40,
        category: 'Accessories',
        image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 29.99,
        stock: 50,
        category: 'Electronics',
        image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('products', JSON.stringify(sampleProducts));
    return sampleProducts;
  }
  return JSON.parse(products);
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const saveOrders = (orders: Order[]): void => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const updateProductStock = (productId: string, quantity: number): void => {
  const products = getProducts();
  const updatedProducts = products.map(product =>
    product.id === productId
      ? { ...product, stock: Math.max(0, product.stock - quantity) }
      : product
  );
  saveProducts(updatedProducts);
};