"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import type { Product, Supplier } from '@/lib/types';
import { initialProducts, initialSuppliers } from '@/lib/data';

interface InventoryContextType {
  products: Product[];
  suppliers: Supplier[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (supplier: Supplier) => void;
  deleteSupplier: (supplierId: string) => void;
  getSupplierName: (supplierId: string | null) => string;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `prod${Date.now()}` };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier = { ...supplier, id: `sup${Date.now()}` };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
  };

  const deleteSupplier = (supplierId: string) => {
    setProducts(prev => prev.map(p => p.supplierId === supplierId ? { ...p, supplierId: null } : p));
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
  };

  const getSupplierName = (supplierId: string | null) => {
    if (!supplierId) return 'N/A';
    return suppliers.find(s => s.id === supplierId)?.name || 'Unknown Supplier';
  };

  const value = useMemo(() => ({
    products,
    suppliers,
    addProduct,
    updateProduct,
    deleteProduct,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierName
  }), [products, suppliers]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
