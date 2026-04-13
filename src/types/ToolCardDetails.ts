import type { ToolCard } from "./ToolCard"

export interface ToolCardDetails extends ToolCard{
toolTags? :string[];
subCategory?: string;
}