type ToolStatus = 'BUILT' | 'POPULAR' | 'COMING SOON';

export interface ToolCard {
    name: string; // name
    description: string; // description
    icon: string; // icon (emoji)
    status: ToolStatus; // background color
    url: string; // url
    id:number;
}
