"use client";

import React from 'react';
import ProductTable from './product-table';

export default function ProductsPage() {

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Products</h2>
      </div>
      <ProductTable />
    </div>
  );
}
