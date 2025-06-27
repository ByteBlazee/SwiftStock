// use server'

/**
 * @fileOverview This file defines a Genkit flow for generating reorder suggestions for products based on current stock levels and sales history.
 *
 * - generateReorderSuggestions - A function that triggers the reorder suggestion flow.
 * - GenerateReorderSuggestionsInput - The input type for the generateReorderSuggestions function.
 * - GenerateReorderSuggestionsOutput - The output type for the generateReorderSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReorderSuggestionsInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  currentStockLevel: z.number().describe('The current stock level of the product.'),
  salesHistory: z.string().describe('A summary of the sales history for the product.'),
  reorderPoint: z.number().describe('The reorder point for the product.'),
  leadTime: z.number().describe('The lead time in days for the product.'),
});
export type GenerateReorderSuggestionsInput = z.infer<typeof GenerateReorderSuggestionsInputSchema>;

const GenerateReorderSuggestionsOutputSchema = z.object({
  reorderQuantity: z.number().describe('The suggested reorder quantity for the product.'),
  reasoning: z.string().describe('The reasoning behind the suggested reorder quantity.'),
});
export type GenerateReorderSuggestionsOutput = z.infer<typeof GenerateReorderSuggestionsOutputSchema>;

export async function generateReorderSuggestions(input: GenerateReorderSuggestionsInput): Promise<GenerateReorderSuggestionsOutput> {
  return generateReorderSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReorderSuggestionsPrompt',
  input: { schema: GenerateReorderSuggestionsInputSchema },
  output: { schema: GenerateReorderSuggestionsOutputSchema },
  prompt: `You are an expert warehouse manager. Analyze the current stock levels, sales history, reorder point, and lead time to suggest an optimal reorder quantity for the product.

Product Name: {{{productName}}}
Current Stock Level: {{{currentStockLevel}}}
Sales History: {{{salesHistory}}}
Reorder Point: {{{reorderPoint}}}
Lead Time (days): {{{leadTime}}}

Consider these factors to minimize stockouts and reduce excess inventory costs. Provide a clear reasoning for your suggested reorder quantity.
`,
});

const generateReorderSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateReorderSuggestionsFlow',
    inputSchema: GenerateReorderSuggestionsInputSchema,
    outputSchema: GenerateReorderSuggestionsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
