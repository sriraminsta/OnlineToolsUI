import type {ToolCard} from '../types/ToolCard';

export const PDFToolsList : ToolCard[] = [
  { id:1,
       name:'Merge PDF',                description:'Combine multiple PDF files into one',               icon:'📎',  status:'COMING SOON',    url:'./pdf-tools/merge-pdf'               },
  {id:2,
     name:'Split PDF',                description:'Split PDF into pages or page ranges',               icon:'✂️',  status:'COMING SOON',          url:'./pdf-tools/split-pdf'               },
  { id:3,
   
    name:'Rotate PDF',               description:'Rotate PDF pages 90°, 180° or 270°',               icon:'🔄',   status:'COMING SOON',        url:'./pdf-tools/rotate-pdf'              },
  {id:4,
     
    name:'JPG to PDF',               description:'Convert images to a PDF document',                  icon:'📸',   status:'COMING SOON',    url:'./pdf-tools/jpg-to-pdf'              },
  { id:5,
   
    name:'Unlock PDF',               description:'Remove password protection from PDF',               icon:'🔓',   status:'COMING SOON',        url:'./pdf-tools/unlock-pdf'              },
  { id:6,
    name:'Protect PDF',              description:'Add password protection to a PDF',                  icon:'🔒',   status:'COMING SOON',       url:'./pdf-tools/protect-pdf'             },
  { id:7,
    
    name:'Add Watermark to PDF',     description:'Stamp text or image on every PDF page',             icon:'💧',  status:'COMING SOON',         url:'./pdf-tools/watermark-pdf'           },
  { id:8,
   
    name:'Add Page Numbers',         description:'Stamp page numbers on every PDF page',              icon:'🔢',   status:'COMING SOON',         url:'./pdf-tools/page-numbers'            },
  { id:9,
     
    name:'Extract PDF Pages',        description:'Pick specific pages from a PDF',                    icon:'📋',   status:'COMING SOON',       url:'./pdf-tools/extract-pages'           },
  { id:10,

    name:'Reorder PDF Pages',        description:'Drag and drop to reorder PDF pages',                icon:'↕️',  status:'COMING SOON',     url:'./pdf-tools/reorder-pdf'             },
]