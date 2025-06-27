import type { Product, Supplier } from './types';

export const initialSuppliers: Supplier[] = [
  { id: 'sup1', name: 'Global Electronics', contact: 'sales@globalelectronics.com' },
  { id: 'sup2', name: 'Office Supreme', contact: 'contact@officesupreme.com' },
  { id: 'sup3', name: 'Gadget-Tronics Inc.', contact: 'support@gadgetronics.com' },
];

export const initialProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Quantum Laptop 16"',
    description: 'High-performance laptop with 16GB RAM and 1TB SSD.',
    stock: 25,
    supplierId: 'sup1',
    salesHistory: 'Consistent sales, average 10 units per week.',
    reorderPoint: 10,
    leadTime: 14,
  },
  {
    id: 'prod2',
    name: 'Ergo-Comfort Mouse',
    description: 'Ergonomic wireless mouse for all-day comfort.',
    stock: 8,
    supplierId: 'sup3',
    salesHistory: 'Sells quickly when in stock, especially during promotions.',
    reorderPoint: 15,
    leadTime: 7,
  },
  {
    id: 'prod3',
    name: 'Mechanical Keyboard',
    description: 'RGB Mechanical Keyboard with customizable keys.',
    stock: 40,
    supplierId: 'sup1',
    salesHistory: 'Steady sales, popular with gamers and developers.',
    reorderPoint: 20,
    leadTime: 10,
  },
  {
    id: 'prod4',
    name: 'Premium Leather Notebook',
    description: 'A5 leather-bound notebook for professionals.',
    stock: 150,
    supplierId: 'sup2',
    salesHistory: 'Bulk orders are common for corporate clients.',
    reorderPoint: 50,
    leadTime: 21,
  },
  {
    id: 'prod5',
    name: '4K Ultra HD Monitor',
    description: '27-inch 4K monitor with vibrant colors.',
    stock: 5,
    supplierId: 'sup3',
    salesHistory: 'High demand, currently experiencing a stockout.',
    reorderPoint: 5,
    leadTime: 14,
  },
];
