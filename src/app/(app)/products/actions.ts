"use server";

import { generateReorderSuggestions } from "@/ai/flows/generate-reorder-suggestions";
import type { GenerateReorderSuggestionsInput, GenerateReorderSuggestionsOutput } from "@/ai/flows/generate-reorder-suggestions";

export async function generateReorderSuggestionAction(input: GenerateReorderSuggestionsInput): Promise<GenerateReorderSuggestionsOutput> {
    try {
        const output = await generateReorderSuggestions(input);
        return output;
    } catch(error) {
        console.error("Error generating reorder suggestions:", error);
        throw new Error("Failed to generate reorder suggestion.");
    }
}
