"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useInventory } from '@/context/inventory-context';
import type { Supplier } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const supplierSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().email({ message: "Please enter a valid email." }),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

interface SupplierDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  supplier: Supplier | null;
}

export default function SupplierDialog({ isOpen, setIsOpen, supplier }: SupplierDialogProps) {
  const { addSupplier, updateSupplier } = useInventory();
  const { toast } = useToast();
  
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: '',
      contact: '',
    },
  });

  useEffect(() => {
    if (supplier) {
      form.reset(supplier);
    } else {
      form.reset({
        name: '',
        contact: '',
      });
    }
  }, [supplier, form, isOpen]);

  const onSubmit = (data: SupplierFormValues) => {
    if (supplier) {
      updateSupplier({ ...supplier, ...data });
      toast({ title: "Supplier Updated", description: `"${data.name}" has been successfully updated.` });
    } else {
      addSupplier(data);
      toast({ title: "Supplier Added", description: `"${data.name}" has been successfully added.` });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">{supplier ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
          <DialogDescription>
            {supplier ? 'Update the details of the existing supplier.' : 'Fill in the details for the new supplier.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Global Electronics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g. sales@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit">Save Supplier</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
