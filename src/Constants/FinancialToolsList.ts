import type {ToolCard} from '../types/ToolCard';

export const FinancialToolsList : ToolCard[] = [
    {
        id: 1,
        name: "SIP Calculator",
        description: "Mutual fund SIP returns and maturity value.",
        icon:"&#x1F4C8;",
        url:"/financial-calculators/sip-calculator",
        status:"BUILT"
    },
        {
        id: 2,
        name: "FD Calculator",
        description: "Fixed deposit maturity and interest earned.",
        icon:"&#x1F3E6;",
        url:"/financial-calculators/fd-calculator",
        status:"BUILT"


    },
        {
         id: 3,
        name: "EMI Calculator",
        description: "Loan EMI, total interest and amortization.",
        icon:"&#x1F3E0;",
        url:"/financial-calculators/emi-calculator",
        status:"BUILT"


    },
        {
         id: 4,
        name: "PPF Calculator",
        description: "PPF maturity and tax-free interest returns.",
        icon:"&#x1F6E1;&#xFE0F;",
        url:"/financial-calculators/ppf-calculator",
        status:"COMING SOON"


    },
        {
         id: 5,
        name: "SWP Calculato",
        description: "Corpus withdrawal planning and balance.",
        icon:"&#x1F4B8;",
        url:"/financial-calculators/swp-calculator",
        status:"BUILT"


    },
        {
        id: 6,
        name: "GST Calculator",
        description: "Add or remove GST — 5%, 12%, 18%, 28%.",
        icon:"&#x1F9FE;",
        url:"/financial-calculators/gst-calculator",
        status:"COMING SOON"


    },
        {
        id: 7,
        name: "Income Tax Calculator",
        description: "Old vs New regime tax comparison.",
        icon:"&#x1F4CB;",
        url:"/financial-calculators/income-tax-calculator",
        status:"COMING SOON"
    }
]


