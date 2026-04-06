export type ToolType = 'built' | 'popular' | 'soon';

export interface Tool {
  n: string; // name
  d: string; // description
  i: string; // icon (emoji)
  b: string; // background color
  t: ToolType; // type/category
  u: string; // url
}