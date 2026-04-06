import { useState,useEffect ,useRef} from "react"
type ToolType = 'built' | 'popular' | 'soon';
import {Link} from 'react-router-dom';
 import '../Styles/homepage.css'

interface Tool {
    n: string; // name
    d: string; // description
    i: string; // icon (emoji)
    b: string; // background color
    t: ToolType; // type/category
    u: string; // url
    SearchTerms: string[];
    id:number
}

// Example functions from your original code
/*const tagCls = (t: string) => {
  // return a CSS class based on type
  return t === "pro" ? "tag-pro" : "tag-free";
};

const tagLbl = (t: string) => {
  return t === "pro" ? "Pro" : "Free";
}; */

export default function SearchPage() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchResults,setSearchResults] = useState<Tool[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
      const containerRef = useRef<HTMLDivElement>(null);
    
//    let searchResults : Tool[] = [];
    /*
    const TOOLS :Tool[] =[  
      {n:'EMI Calculator',d:'Loan EMI and amortization',i:'🏠',b:'#ecfdf5',t:'built',u:'./calculator-tools/emi-calculator.html'},
      {n:'PPF Calculator',d:'Public Provident Fund returns',i:'🛡️',b:'#ecfdf5',t:'built',u:'./calculator-tools/ppf-calculator.html'},
      {n:'SWP Calculator',d:'Systematic withdrawal plan',i:'💸',b:'#ecfdf5',t:'built',u:'./calculator-tools/swp-calculator.html'},
      {n:'Background Remover',d:'Remove image backgrounds with AI',i:'✂️',b:'#eef1ff',t:'built',u:'./image-tools/background-remover.html'},
      {n:'QR Code Generator',d:'Create QR codes for any URL',i:'📲',b:'#eef1ff',t:'built',u:'./image-tools/qr-code-generator.html'},
      {n:'Merge PDF',d:'Combine multiple PDFs into one',i:'📎',b:'#fff7ed',t:'popular',u:'./pdf-tools/merge-pdf.html'},
      {n:'JSON Formatter',d:'Beautify and validate JSON data',i:'🔧',b:'#ecfeff',t:'popular',u:'./dev-tools/json-formatter.html'},
      {n:'Base64 Encoder',d:'Encode and decode Base64',i:'🔐',b:'#ecfeff',t:'popular',u:'./dev-tools/base64-encoder.html'},
      {n:'Password Generator',d:'Generate secure passwords',i:'🔑',b:'#ecfeff',t:'popular',u:'./dev-tools/password-generator.html'},
      {n:'BMI Calculator',d:'Body Mass Index calculator',i:'⚖️',b:'#fef2f2',t:'soon',u:'./health-tools/bmi-calculator.html'},
      {n:'Calorie Calculator',d:'Daily calorie needs by goal',i:'🍕',b:'#fef2f2',t:'soon',u:'./health-tools/calorie-calculator.html'},
      {n:'Age Calculator',d:'Exact age from date of birth',i:'🎂',b:'#ecfdf5',t:'soon',u:'./date-tools/age-calculator.html'},
      {n:'Word Counter',d:'Count words, characters, reading time',i:'📊',b:'#f5f3ff',t:'soon',u:'./text-tools/word-counter.html'},
      {n:'Temperature Converter',d:'Celsius, Fahrenheit, Kelvin',i:'🌡️',b:'#fff7ed',t:'soon',u:'./unit-converters/temperature.html'},
      {n:'Percentage Calculator',d:'All percentage calculations',i:'%',b:'#f8f9fc',t:'soon',u:'./math-tools/percentage-calculator.html'},
      {n:'Image Compressor',d:'Reduce image file size',i:'🗜️',b:'#eef1ff',t:'soon',u:'./image-tools/image-compressor.html'},
      {n:'Image Resizer',d:'Resize images to any dimension',i:'📐',b:'#eef1ff',t:'soon',u:'./image-tools/image-resizer.html'},
      {n:'GST Calculator',d:'Add or remove GST from amounts',i:'🧾',b:'#ecfdf5',t:'soon',u:'./calculator-tools/gst-calculator.html'},
      {n:'Income Tax Calculator',d:'Old vs new regime comparison',i:'📋',b:'#ecfdf5',t:'soon',u:'./calculator-tools/income-tax.html'},
      {n:'SHA-256 Generator',d:'Generate SHA-256 hash',i:'🧲',b:'#f5f3ff',t:'soon',u:'./security-tools/sha256.html'},
      {n:'URL Encoder',d:'Encode and decode URLs',i:'🔗',b:'#ecfeff',t:'soon',u:'./dev-tools/url-encoder.html'},
      {n:'Text Case Converter',d:'UPPER, lower, Title, camel',i:'🔡',b:'#f5f3ff',t:'soon',u:'./text-tools/case-converter.html'},
      {n:'Date Difference Calculator',d:'Days between two dates',i:'📆',b:'#ecfdf5',t:'soon',u:'./date-tools/date-difference.html'},
      {n:'Timezone Converter',d:'Convert times across 400+ zones',i:'🌍',b:'#ecfdf5',t:'soon',u:'./date-tools/timezone-converter.html'},
      {n:'Data Storage Converter',d:'B, KB, MB, GB, TB',i:'💾',b:'#fff7ed',t:'soon',u:'./unit-converters/data-storage.html'},
      {n:'Length Converter',d:'km, m, cm, miles, feet',i:'📏',b:'#fff7ed',t:'soon',u:'./unit-converters/length.html'},
      {n:'Scientific Calculator',d:'Trig, log, exp functions',i:'🔢',b:'#f8f9fc',t:'soon',u:'./math-tools/scientific-calculator.html'},
      {n:'JWT Decoder',d:'Decode and inspect JWT tokens',i:'🔑',b:'#f5f3ff',t:'soon',u:'./security-tools/jwt-decoder.html'},
    ];
    
     */

    const KEYWORDS: Tool[] = [
        {
            id:1,
            n: "SIP Calculator",
            SearchTerms: [
                // Core names
                "sip calculator", "sip", "systematic investment plan", "systematic investment plan calculator",
                "sip return calculator", "sip maturity calculator", "sip interest calculator",
                "sip calculator online", "sip calculator india", "free sip calculator",
                // Synonyms / alternatives
                "mutual fund calculator", "mutual fund sip", "monthly investment calculator",
                "recurring investment calculator", "periodic investment calculator",
                "investment return calculator", "wealth calculator", "corpus calculator",
                // Word order variations
                "calculator sip", "investment plan calculator", "plan calculator sip",
                // Abbreviations
                "sip calc", "mf calculator", "mf sip",
                // Action phrases
                "calculate sip returns", "calculate sip maturity", "calculate sip amount",
                "how to calculate sip", "how to calculate mutual fund returns",
                "sip monthly return", "sip yearly return", "sip 10 year return",
                "sip 20 year return", "sip 5 year", "sip 15 year",
                // Natural language
                "how much will sip grow", "how much sip to become crorepati",
                "how much will i get from sip", "will sip make me rich",
                "sip vs lump sum", "lump sum vs sip comparison",
                // Related concepts
                "cagr calculator", "compounding calculator sip", "rupee cost averaging",
                "wealth gained calculator", "maturity value calculator", "nav calculator",
                // Partial / short
                "sip", "invest monthly", "monthly sip", "quarterly sip", "yearly sip",
                // Misspellings
            ],
            d: 'Calculate SIP investment returns', i: '📈', b: '#ecfdf5', t: 'built', u: './calculator-tools/sip-calculator'
        },
        {
            id:2,
            n: 'FD Calculator', d: 'Fixed deposit maturity and interest', i: '🏦', b: '#ecfdf5', t: 'built', u: './calculator-tools/fd-calculator',
            SearchTerms: [    // Core names
                "fd calculator", "fixed deposit calculator", "fd maturity calculator",
                "fd interest calculator", "fd return calculator", "fd calculator online",
                "fd calculator india", "free fd calculator", "fd calculator 2024",
                // Synonyms / alternatives
                "term deposit calculator", "bank deposit calculator", "fixed return calculator",
                "deposit maturity calculator", "bank fd calculator", "fd compound calculator",
                "fd compounding calculator",
                // Word order variations
                "calculator fd", "deposit calculator fixed", "maturity calculator fd",
                // Abbreviations
                "fd calc", "fd", "fixed deposit",
                // Action phrases
                "calculate fd returns", "calculate fd maturity", "calculate fd interest",
                "how to calculate fd interest", "how to calculate fd maturity amount",
                "fd interest rate calculator", "fd principal calculator",
                // Natural language
                "how much will my fd earn", "fd returns after 5 years",
                "best fd calculator", "fd interest per month calculator",
                "how to calculate compound interest fd", "fd with quarterly compounding",
                "fd monthly interest calculator", "fd half yearly compounding",
                // Related concepts
                "compound interest calculator", "bank interest calculator",
                "savings calculator", "investment maturity", "tds on fd",
                "fd vs rd", "fd vs ppf comparison",
                // Compounding types
                "monthly compounding fd", "quarterly compounding fd",
                "annual compounding fd", "half yearly compounding fd",
                // Partial / short
                "fixed deposit", "fd interest", "fd returns", "fd growth",
                // Misspellings
                "fd calculater", "fixed deposite calculator", "fd calulator",
                "fixed deposit calclator", "fd calcultor"]
        },
        {
            id:3,
            n: 'EMI Calculator',
            SearchTerms: [
                "equated monthly installment calculator",
                "emi",
                "home loan emi for 20 years",
                "car loan calculator",
                "calculator emi",
                "emi calculation formula",
                "principal interest breakup",
                "calculate monthly payment",
                "balance transfer calculator",
                "emi calculater",
                "loan interest",
                "loan payment calculator",
                "bike loan calculator",
                "loan tenure calculator",
                "how to calculate emi",
                "emi for 50 lakh home loan",
                "free emi calculator",
                "how to reduce emi",
                "mortgage",
                "loan prepayment calculator",
                "emi calulator",
                "calculate emi",
                "emi calculator india",
                "loan interest calculator",
                "monthly installment calculator",
                "car loan emi for 5 years",
                "total interest payable on loan",
                "amortization schedule calculator",
                "emi calcuator",
                "part payment calculator",
                "emi calculator",
                "monthly loan payment calculator",
                "emi for 10 lakh personal loan",
                "mortgage calculator",
                "education loan calculator",
                "how much emi for 20 lakh home loan",
                "loan payment",
                "business loan calculator",
                "equated monthly installament",
                "home loan",
                "loan amortization calculator",
                "emi calc",
                "loan emi calclator",
                "loan calculator",
                "calculate loan emi",
                "personal loan emi calculator",
                "installment calculator loan",
                "what is my monthly loan payment",
                "home loan emi calculator",
                "car loan emi calculator",
                "how to calculate home loan emi",
                "home loan calculator",
                "loan emi calculator",
                "interest rate comparison",
                "emi calculator online",
                "personal loan",
                "loan repayment schedule",
                "loan repayment calculator",
                "car loan",
                "loan calc"
            ],
            d: 'Loan EMI and amortization', i: '🏠', b: '#ecfdf5', t: 'built', u: './calculator-tools/emi-calculator'
        },
        {
            id:4,
            n: 'PPF Calculator',
            SearchTerms: [
                "ppf investment calculator",
                "how much to invest in ppf",
                "ppf tax saving calculator",
                "calculate ppf interest",
                "ppf lock in period",
                "public pf calculator",
                "ppf scheme calculator",
                "how much will ppf give after 15 years",
                "provident fund",
                "ppf 15 year calculator",
                "calculator ppf",
                "ppf vs fd which is better",
                "free ppf calculator",
                "ppf calcuator",
                "ppf returns after 15 years",
                "ppf interest calculator",
                "ppf loan calculator",
                "ppf calculator india",
                "ppf calc",
                "ppf interest rate calculation",
                "ppf calculater",
                "calculate ppf returns",
                "ppf account calculator",
                "is ppf a good investment",
                "ppf maturity calculator",
                "tax free investment calculator",
                "ppf interest",
                "eee tax status",
                "long term savings calculator",
                "government scheme calculator",
                "ppf calculator",
                "ppf return calculator",
                "provident fund calculator public",
                "ppf growth",
                "ppf extension calculator",
                "public provident fund calulator",
                "ppf",
                "ppf calculator online",
                "80c ppf calculator",
                "public pf",
                "ppf partial withdrawal",
                "fund calculator ppf",
                "ppf tax exemption calculator",
                "sovereign guarantee investment",
                "ppf calclator",
                "public provident fund calculator",
                "calculate ppf maturity",
                "ppf 80c deduction",
                "how to calculate ppf"
            ],
            d: 'Public Provident Fund returns', i: '🛡️', b: '#ecfdf5', t: 'built', u: './calculator-tools/ppf-calculator'
        },
        {
            id:5,
            n: 'SWP Calculator',
            SearchTerms: [
                "swp calculator",
                "swp vs sip comparison",
                "investment sustainability calculator",
                "how much can i withdraw monthly from my investment",
                "retirement corpus calculator",
                "how to calculate swp",
                "mutual fund swp calculator",
                "corpus depletion calculator",
                "sistematic withdrawal plan calculator",
                "plan withdrawal systematic",
                "retirement withdrawal calculator",
                "retirement planning calculator",
                "systematic withdrawal plan calculator",
                "calculator swp",
                "corpus withdrawal planning",
                "corpus withdrawal calculator",
                "swp",
                "corpus",
                "swp calulator",
                "how long will corpus last",
                "swp interest calculation",
                "swp calculator online",
                "calculate monthly withdrawal",
                "how to plan monthly income after retirement",
                "investment withdrawal calculator",
                "how long will my money last if i withdraw monthly",
                "swp calculater",
                "swp return calculator",
                "monthly withdrawal calculator",
                "free swp calculator",
                "withdrawal plan",
                "systematic withdrawl plan",
                "systematic payout calculator",
                "pension withdrawal calculator",
                "swp maturity calculator",
                "withdrawal plan calculator",
                "calculate swp returns",
                "swp calc",
                "monthly income calculator",
                "monthly withdrawal"
            ],
            d: 'Systematic withdrawal plan', i: '💸', b: '#ecfdf5', t: 'built', u: './calculator-tools/swp-calculator'
        },
        {
            id:6,
            n: 'Background Remover',
            SearchTerms: [
                "background remov",
                "backround remover",
                "removebg alternative",
                "bg remove",
                "cutout tool",
                "remove white background",
                "background remove",
                "remove bg",
                "ai background remover",
                "bg remover",
                "remove.bg free alternative",
                "automatic background removal",
                "product photo background remover",
                "free background remover",
                "transparent background maker",
                "background remover",
                "passport photo background remover",
                "image background remover",
                "cut out background",
                "backgroud remover",
                "photo background remover",
                "remove background",
                "remove image background online",
                "erase background",
                "background eraser",
                "remove background from photo",
                "background removal tool"
            ],
            d: 'Remove image backgrounds with AI', i: '✂️', b: '#eef1ff', t: 'built', u: './image-tools/background-remover'
        },
        {
            id:7,
            n: 'QR Code Generator',
            SearchTerms: [
                "create qr code",
                "custom qr code generator",
                "qrcode generator",
                "generate qr code",
                "free qr code generator",
                "qr code png download",
                "qr code for url",
                "qr generator",
                "qr code for email",
                "qr code online",
                "qr code maker",
                "qr code for link",
                "make qr code",
                "qr code generater",
                "qr code generator",
                "qr generator online",
                "qr code for text",
                "download qr code",
                "qr code creator",
                "qr code for wifi"
            ],
            d: 'Create QR codes for any URL', i: '📲', b: '#eef1ff', t: 'built', u: './image-tools/qr-code-generator'
        },
        {
            id:8,
            n: 'Merge PDF',
            SearchTerms: [
                "pdf merger free",
                "pdf combine tool",
                "how to merge pdf files",
                "merg pdf",
                "merge pdf",
                "pdf joiner",
                "merge multiple pdf",
                "combine pdfs into one",
                "pdf combiner",
                "merge pdf documents",
                "join pdf files",
                "append pdf",
                "merge pdf pages",
                "combine pdf",
                "merge pdf online free",
                "pdf merger",
                "merging pdf files",
                "merge pdf files",
                "join pdf",
                "combine pdfs",
                "combine pdf files"
            ],
            d: 'Combine multiple PDFs into one', i: '📎', b: '#fff7ed', t: 'popular', u: './pdf-tools/merge-pdf'
        },
        {
            id:9,
            n: 'JSON Formatter',
            SearchTerms: [
                "json formmater",
                "json online validator",
                "validate json",
                "json formater",
                "json validater",
                "json editor",
                "format json",
                "json beautifier",
                "json beautify",
                "json prettify",
                "json formatter free",
                "json minifier",
                "format json online",
                "json pretty print",
                "jsonformatter",
                "json checker",
                "json viewer",
                "json parser",
                "json formatter",
                "json lint",
                "json validator",
                "json formatter online"
            ],
            d: 'Beautify and validate JSON data', i: '🔧', b: '#ecfeff', t: 'popular', u: './dev-tools/json-formatter'
        },
        {
            id:10,
            n: 'Base64 Encoder',
            SearchTerms: [
                "base64 to text",
                "base64 encoder",
                "encode base64",
                "base64 encod",
                "base64 decoder",
                "text to base64",
                "base64 encode decode",
                "base64 encode online free",
                "base64 online",
                "base64 tool",
                "base 64",
                "btoa atob tool",
                "base64 converter",
                "base64 decode online",
                "base64 convertor",
                "decode base64",
                "base64 decod",
                "encode text base64",
                "base64 string encoder",
                "base 64 encoder"
            ],
            d: 'Encode and decode Base64', i: '🔐', b: '#ecfeff', t: 'popular', u: './dev-tools/base64-encoder'
        },
        {
            id:11,
            n: 'Password Generator',
            SearchTerms: [
                "password generator free",
                "random password",
                "password generator",
                "secure password generator",
                "strong password generator",
                "generate password",
                "create password",
                "random password generator",
                "password creator",
                "passphrase generator",
                "complex password generator",
                "pasword generator",
                "password generater",
                "strong password",
                "safe password maker",
                "passord generator",
                "password generator online",
                "password maker"
            ],
            d: 'Generate secure passwords', i: '🔑', b: '#ecfeff', t: 'popular', u: './dev-tools/password-generator'
        },
        {
            id:12,
            n: 'BMI Calculator',
            SearchTerms: [
                "bmi for men",
                "bmi checker",
                "healthy weight calculator",
                "bmi calculator",
                "bmi for adults",
                "body mass index calculator",
                "bmi calculator imperial",
                "body mass calclator",
                "am i overweight calculator",
                "bmi for women",
                "bmi obesity calculator",
                "bmi calulator",
                "bmi chart calculator",
                "normal bmi calculator",
                "bmi calculater",
                "calculate bmi",
                "bmi calculator metric",
                "bmi calculator india"
            ],
            d: 'Body Mass Index calculator', i: '⚖️', b: '#fef2f2', t: 'soon', u: './health-tools/bmi-calculator'
        },
        {
            id:13,
            n: 'Calorie Calculator',
            SearchTerms: [
                "calories for weight loss",
                "calorie needs calculator",
                "calorie calulator",
                "calories needed per day",
                "maintenance calories calculator",
                "calorie calcuator",
                "daily calorie calculator",
                "calorie calculater",
                "how many calories should i eat",
                "calorie intake calculator",
                "activity level calorie calculator",
                "calorie deficit calculator",
                "tdee calculator",
                "total daily energy expenditure",
                "calorie calculator",
                "calories for weight gain"
            ],
            d: 'Daily calorie needs by goal', i: '🍕', b: '#fef2f2', t: 'soon', u: './health-tools/calorie-calculator'
        },
        {
            id:14,
            n: 'Age Calculator',
            SearchTerms: [
                "age check",
                "exact age calculator",
                "birthday calculator",
                "calculate age",
                "age calculater",
                "age calculator online",
                "age calculator",
                "how old calculator",
                "age finder",
                "how old am i",
                "age from date of birth",
                "age in years months days",
                "age calculation",
                "age calulator",
                "dob calculator"
            ],
            d: 'Exact age from date of birth', i: '🎂', b: '#ecfdf5', t: 'soon', u: './date-tools/age-calculator'
        },
        {
            id:15,
            n: 'Word Counter',
            SearchTerms: [
                "word counter free",
                "word counter",
                "count words online free",
                "word count tool",
                "count words in text",
                "count words",
                "essay word counter",
                "word counter online",
                "word count tool free",
                "word count checker",
                "word count online",
                "word and character counter",
                "words characters sentences",
                "word cunter",
                "reading time calculator",
                "how many words in my text",
                "article word count",
                "text analyzer"
            ],
            d: 'Count words, characters, reading time', i: '📊', b: '#f5f3ff', t: 'soon', u: './text-tools/word-counter'
        },
        {
            id:16,
            n: 'Temperature Converter',
            SearchTerms: [
                "temperature converter",
                "temperature conversion calculator",
                "fahrenheit to celsius",
                "fahrenheit to kelvin",
                "temperature unit converter online free",
                "kelvin to celsius",
                "temp converter",
                "c to f converter",
                "celsius to fahrenheit",
                "convert temperature",
                "temperature convertor",
                "f to c converter",
                "celsius to kelvin"
            ],
            d: 'Celsius, Fahrenheit, Kelvin', i: '🌡️', b: '#fff7ed', t: 'soon', u: './unit-converters/temperature'
        },
        {
            id:17,
            n: 'Percentage Calculator',
            SearchTerms: [
                "percentage decrease calculator",
                "percentage calulator",
                "percentage increase calculator",
                "percent of number",
                "percentage online calculator",
                "percent change calculator",
                "% calculator",
                "parcent calculator",
                "percentage calculator",
                "percent calculator",
                "calculate percentage",
                "x percent of y",
                "what percent is x of y",
                "percentage change calculator",
                "how to calculate percentage"
            ],
            d: 'All percentage calculations', i: '%', b: '#f8f9fc', t: 'soon', u: './math-tools/percentage-calculator'
        },
        {
            id:18,
            n: 'Image Compressor',
            SearchTerms: [
                "reduce photo size",
                "photo compressor",
                "compress photo",
                "image compressor free",
                "compres image",
                "free image compressor",
                "png compressor",
                "image optimizer",
                "compress image",
                "image compressor",
                "lossless compression image",
                "image size reducer",
                "image compresser",
                "image compresor",
                "image compression tool",
                "image file size reducer",
                "optimize image",
                "webp compressor",
                "jpg compressor",
                "compress image online",
                "reduce image size",
                "compress image without quality loss",
                "shrink image",
                "photo size reducer",
                "lossy compression"
            ],
            d: 'Reduce image file size', i: '🗜️', b: '#eef1ff', t: 'soon', u: './image-tools/image-compressor'
        },
        {
            id:19,
            n: 'Image Resizer',
            SearchTerms: [
                "image dimension changer",
                "image resizer",
                "scale image",
                "resize jpg",
                "free image resizer",
                "resize png",
                "photo resiser",
                "resize for instagram",
                "resize image pixels",
                "resize image",
                "resize image to specific size",
                "image scaler",
                "image reziser",
                "resize photo online",
                "image width height changer",
                "aspect ratio resizer",
                "resize for whatsapp",
                "change image size",
                "photo resizer",
                "image resizer free",
                "resize image in kb",
                "photo resize tool"
            ],
            d: 'Resize images to any dimension', i: '📐', b: '#eef1ff', t: 'soon', u: './image-tools/image-resizer'
        },
        {
            id:20,
            n: 'GST Calculator',
            SearchTerms: [
                "gst 28% calculator",
                "reverse gst calculator",
                "gst calulator",
                "gst calculator india",
                "igst calculator",
                "remove gst calculator",
                "goods services tax calc",
                "calculate gst",
                "gst 18% calculator",
                "gst calculator",
                "invoice gst calculator",
                "gst amount calculator",
                "gst tax calculator",
                "price after gst calculator",
                "price before gst calculator",
                "gst 12% calculator",
                "add gst calculator",
                "cgst sgst calculator",
                "gst calculater",
                "gst calculation online",
                "goods and services tax calculator",
                "gst 5% calculator",
                "gst exclusive calculator",
                "gst billing calculator",
                "gst payable calculator",
                "gst inclusive calculator",
                "how to calculate gst"
            ],
            d: 'Add or remove GST from amounts', i: '🧾', b: '#ecfdf5', t: 'soon', u: './calculator-tools/gst-calculator'
        },
        {
            id:21,
            n: 'Income Tax Calculator',
            SearchTerms: [
                "tax on salary calculator",
                "calculate income tax",
                "annual income tax calculator",
                "tax slab calculator",
                "old tax regime calculator",
                "income tax calculator india",
                "income tax calculator 2025",
                "how to calculate income tax india",
                "itr calculator",
                "old regime vs new regime calculator",
                "tax liability calculator",
                "it calculator",
                "income tax calculater",
                "income tex calculator",
                "income tax calulator",
                "how much tax will i pay",
                "take home salary after tax",
                "professional tax calculator",
                "tax bracket calculator",
                "income tax india 2024",
                "80c deduction calculator",
                "income tax calculator 2024-25",
                "income tax calculator",
                "new tax regime calculator",
                "fy 2024-25 tax calculator",
                "tax saving calculator"
            ],
            d: 'Old vs new regime comparison', i: '📋', b: '#ecfdf5', t: 'soon', u: './calculator-tools/income-tax'
        },
        {
            id:22,
            n: 'SHA-256 Generator',
            SearchTerms: [
                "sha-256 online",
                "sha256 checksum",
                "hash sha256",
                "cryptographic hash generator",
                "sha256 free",
                "sha 256 calculator",
                "generate sha256",
                "sha 256 hash",
                "sha-256 hash generator",
                "sha256 online",
                "sha256 hash",
                "sha256 encoder",
                "sha256 generator",
                "sha256 tool"
            ],
            d: 'Generate SHA-256 hash', i: '🧲', b: '#f5f3ff', t: 'soon', u: './security-tools/sha256'
        },
        {
            id:23,
            n: 'URL Encoder',
            SearchTerms: [
                "url encoding tool",
                "url decoder",
                "url encode online",
                "url decode online",
                "url encoder decoder",
                "encode url",
                "urlencode",
                "percent encode url",
                "percent encoding",
                "encode special characters url",
                "url decod",
                "url convertor",
                "url encoder",
                "url encoding free",
                "url encod",
                "decode url"
            ],
            d: 'Encode and decode URLs', i: '🔗', b: '#ecfeff', t: 'soon', u: './dev-tools/url-encoder'
        },
        {
            id:24,
            n: 'Text Case Converter',
            SearchTerms: [
                "sentence case converter",
                "capitalize text",
                "text case tool",
                "pascalcase converter",
                "title case converter",
                "convert uppercase to lowercase",
                "change case online",
                "lowercase converter",
                "text case converter",
                "case conveter",
                "change text case",
                "uppercase to lowercase online free",
                "lower case converter",
                "camelcase converter",
                "case converter",
                "text transformer",
                "case change tool",
                "convert lowercase to uppercase",
                "uppercase converter",
                "case convertor"
            ],
            d: 'UPPER, lower, Title, camel', i: '🔡', b: '#f5f3ff', t: 'soon', u: './text-tools/case-converter'
        },
        {
            id:25,
            n: 'Date Difference Calculator',
            SearchTerms: [
                "date difference calculator",
                "date calculator",
                "how many weeks between dates",
                "date difference calulator",
                "calculate days between dates",
                "days between two dates",
                "date duration calculator",
                "days between dates",
                "date gap calculator",
                "date to date calculator",
                "date subtraction calculator",
                "number of days between dates",
                "how many days between dates",
                "days from date calculator",
                "months between dates",
                "date diff calculator"
            ],
            d: 'Days between two dates', i: '📆', b: '#ecfdf5', t: 'soon', u: './date-tools/date-difference'
        },
        {
            id:26,
            n: 'Timezone Converter',
            SearchTerms: [
                "gmt to ist",
                "timezone converter",
                "utc to ist",
                "time zone tool",
                "convert time zones",
                "time zone calculator",
                "time zone converter",
                "time zone difference calculator",
                "time zone convertor",
                "what time is it in",
                "ist to est",
                "convert time between zones",
                "timezone convertor",
                "world time converter",
                "est to ist"
            ],
            d: 'Convert times across 400+ zones', i: '🌍', b: '#ecfdf5', t: 'soon', u: './date-tools/timezone-converter'
        },
        {
            id:27,
            n: 'Data Storage Converter',
            SearchTerms: [
                "storage unit converter",
                "file size converter",
                "gigabytes to terabytes",
                "data convertor",
                "convert data units",
                "mb to gb",
                "storage converter",
                "mb to kb",
                "file size conversion",
                "byte converter",
                "data size converter",
                "kb mb gb converter",
                "gb to tb",
                "bytes to megabytes",
                "data storage converter",
                "kb to mb"
            ],
            d: 'B, KB, MB, GB, TB', i: '💾', b: '#fff7ed', t: 'soon', u: './unit-converters/data-storage'
        },
        {
            id:28,
            n: 'Length Converter',
            SearchTerms: [
                "km to miles",
                "metric to imperial length",
                "convert length units",
                "length unit converter online",
                "inches to cm",
                "unit converter length",
                "length conversion calculator",
                "cm to inches",
                "feet to cm",
                "km to m converter",
                "imperial to metric length",
                "feet to meters",
                "inches to mm",
                "miles to km",
                "meters to feet",
                "length converter",
                "mm to inches",
                "distance converter",
                "length convertor",
                "distance unit converter"
            ],
            d: 'km, m, cm, miles, feet', i: '📏', b: '#fff7ed', t: 'soon', u: './unit-converters/length'
        },
        {
            id:29,
            n: 'Scientific Calculator',
            SearchTerms: [
                "free scientific calculator",
                "scientific calc",
                "scientific calculator",
                "trig calculator",
                "advanced math calculator",
                "math calculator",
                "exponential calculator",
                "scientific calculater",
                "log calculator",
                "online scientific calculator",
                "sceintific calculator",
                "scientific calc online",
                "scientific calculator free",
                "sin cos tan calculator",
                "trigonometry calculator",
                "advanced calculator"
            ],
            d: 'Trig, log, exp functions', i: '🔢', b: '#f8f9fc', t: 'soon', u: './math-tools/scientific-calculator'
        },
        {
            id:30,
            n: 'JWT Decoder',
            SearchTerms: [
                "jwt parser",
                "jwt payload decoder",
                "jwt decoder",
                "jwt analyze",
                "json web token viewer",
                "jwt token decoder",
                "json web token decoder",
                "jwt inspector",
                "jwt decode free",
                "decode jwt",
                "jwt viewer",
                "decode jwt online",
                "jwt decode online",
                "jwt token viewer"
            ],
            d: 'Decode and inspect JWT tokens', i: '🔑', b: '#f5f3ff', t: 'soon', u: './security-tools/jwt-decoder'
        },
    ]

    const handleInputChange = (val: string) => {
        setSearchTerm(val);
        if (val.length < 3) return [];
        const kywd: Tool[] = KEYWORDS.filter((kw) => {
            const isSeachWorked: string | undefined = kw.SearchTerms.find((item) => {
                return item.includes(val);
            })
            return !!isSeachWorked?.trim();
        });
     setSearchResults(kywd)// = kywd;
     setShowDropdown(true);
    }

      // Handle click outside to hide dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    return (
        <div className="search-outer fu d3" ref={containerRef}>
            <div className="search-wrap" >
                <input
                    type="text"
                    id="search-input"
                    placeholder={searchTerm}
                    autoComplete="off"
                    value={searchTerm}
                    onChange={e => handleInputChange(e.target.value)}
                />
            </div>
            {/* Dropdown is CHILD of .search-outer, NOT inside overflow:hidden hero background divs */}
            <div  className={`search-results ${searchTerm.length>2 ? "show" : ""} `} id="search-results">
              {showDropdown  && 
              searchResults.length> 0 ?  
                searchResults.map(item => (
                    <Link to = {item.u} key={item.id} className = "search-result-item">                  
                    <div className="sri-icon"  style={{ backgroundColor: item.b }}>
                    {item.i}
                  </div>
                  <div>
                  <div className="sri-name">{item.n}</div>
                  <div className="sri-cat">{item.d}</div>
                  </div>
                  </Link>
                )) : searchTerm.length > 2 && showDropdown ? (
          <div   className= "search-no-results">
            No tools found for "{searchTerm}". Try another keyword.
          </div>
        ) : null}
            </div>
        </div>

    )
}