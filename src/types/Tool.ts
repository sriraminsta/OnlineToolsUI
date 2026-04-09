type ToolType = 'built' | 'popular' | 'soon';
type CategoryType = 'financial' | 'image' |'pdf' | 'dev' | 'text' | 'converters' |'health' | 'math' | 'security' | 'date'

export interface Tool {
    name: string; // name
    description: string; // description
    icon: string; // icon (emoji)
    background: string; // background color
    status: ToolType; // type/category
    url: string; // url
    searchTerms: string[];
    id:number;
    category:CategoryType
}
