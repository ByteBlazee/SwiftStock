export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  supplierId: string | null;
  salesHistory: string;
  reorderPoint: number;
  leadTime: number; // in days
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
}
