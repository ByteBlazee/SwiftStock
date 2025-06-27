"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Lightbulb } from 'lucide-react';
import type { Product } from '@/lib/types';
import { generateReorderSuggestionAction } from './actions';
import { useToast } from '@/hooks/use-toast';

interface ReorderDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: Product;
}

type Suggestion = {
  reorderQuantity: number;
  reasoning: string;
}

export default function ReorderDialog({ isOpen, setIsOpen, product }: ReorderDialogProps) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setSuggestion(null);
    try {
      const result = await generateReorderSuggestionAction({
        productName: product.name,
        currentStockLevel: product.stock,
        salesHistory: product.salesHistory,
        reorderPoint: product.reorderPoint,
        leadTime: product.leadTime,
      });
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate reorder suggestion.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSuggestion(null);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline">
            <Bot /> AI Reorder Suggestion
          </DialogTitle>
          <DialogDescription>
            For product: <span className="font-semibold">{product.name}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {loading && (
             <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
             </Card>
          )}
          {suggestion && (
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-primary text-lg">Suggestion: Reorder {suggestion.reorderQuantity} units</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground flex gap-2">
                        <Lightbulb className="w-4 h-4 flex-shrink-0 mt-1" />
                        <span>{suggestion.reasoning}</span>
                    </p>
                </CardContent>
            </Card>
          )}

           <ul className="text-sm text-muted-foreground space-y-1">
              <li><strong>Current Stock:</strong> {product.stock}</li>
              <li><strong>Reorder Point:</strong> {product.reorderPoint}</li>
              <li><strong>Sales History:</strong> {product.salesHistory}</li>
            </ul>
        </div>
        <DialogFooter className="sm:justify-between gap-2">
           <Button type="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="button" onClick={handleGenerate} disabled={loading}>
            <Bot className="mr-2 h-4 w-4" />
            {loading ? 'Generating...' : 'Generate Suggestion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
