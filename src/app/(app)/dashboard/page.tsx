"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useInventory } from '@/context/inventory-context';
import { Package, AlertTriangle, Truck } from 'lucide-react';
import type { Product } from '@/lib/types';

function DashboardCard({ title, value, icon: Icon, description }: { title: string, value: string | number, icon: React.ElementType, description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function LowStockAlert({ lowStockProducts, getSupplierName }: { lowStockProducts: Product[], getSupplierName: (id: string | null) => string }) {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="text-destructive" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Reorder Point</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{getSupplierName(product.supplierId)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="destructive">{product.stock}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{product.reorderPoint}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No products with low stock.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { products, suppliers, getSupplierName } = useInventory();
  
  const lowStockProducts = products.filter(p => p.stock <= p.reorderPoint);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard 
          title="Total Products"
          value={products.length}
          icon={Package}
          description="Number of unique products"
        />
        <DashboardCard 
          title="Total Suppliers"
          value={suppliers.length}
          icon={Truck}
          description="Number of registered suppliers"
        />
        <DashboardCard 
          title="Low Stock Items"
          value={lowStockProducts.length}
          icon={AlertTriangle}
          description="Items at or below reorder point"
        />
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <LowStockAlert lowStockProducts={lowStockProducts} getSupplierName={getSupplierName} />
      </div>
    </div>
  );
}
