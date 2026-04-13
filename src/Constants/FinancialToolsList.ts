import type { ToolCardDetails } from '../types/ToolCardDetails';

export const FinancialToolsList: ToolCardDetails[] = [
  // ── FINANCIAL CALCULATORS ──
  {
    id: 1,
    toolTags: ['Mutual Funds', 'Monthly SIP', 'CAGR'],
    subCategory: 'Investment Calculators',
    name: 'SIP Calculator', description: 'Calculate your SIP maturity value, total wealth gained and year-by-year growth breakdown', icon: '📈', status: 'COMING SOON', url: './financial-calculators/sip-calculator'
  },
  {
    id: 2,
    toolTags: ['Fixed Deposit', 'Compound Interest', 'Maturity'],
    subCategory: 'Investment Calculators',
    name: 'FD Calculator', description: 'Calculate Fixed Deposit maturity amount and interest with monthly, quarterly or yearly compounding.', icon: '🏦', status: 'COMING SOON', url: './financial-calculators/fd-calculator'
  },
  {
    id: 3,
    toolTags: ['Home Loan', 'Car Loan', 'Personal'],
    subCategory: 'Investment Calculators',
    name: 'EMI Calculator', description: 'Calculate monthly EMI, total interest and full amortization schedule for any loan type.', icon: '🏠', status: 'COMING SOON', url: './financial-calculators/emi-calculator'
  },
  {
    id: 4,
    toolTags: ['Tax-Free', 'EEE', '15 Yr Lock-in'],
    subCategory: 'Investment Calculators',
    name: 'PPF Calculator', description: 'Calculate Public Provident Fund maturity and EEE tax-free returns over the 15-year lock-in.', icon: '🛡️', status: 'COMING SOON', url: './financial-calculators/ppf-calculator'
  },
  {
    id: 5,
    toolTags: ['Withdrawals', 'Corpus', 'Retirement'],
    subCategory: 'Investment Calculators',
    name: 'SWP Calculator', description: 'Plan Systematic Withdrawals — see how long your corpus lasts with regular monthly payouts.', icon: '💸', status: 'COMING SOON', url: './financial-calculators/swp-calculator'
  },
  {
    id: 6,
    toolTags: ['GST', 'Tax', 'Invoice'],
    subCategory: 'Tax & Salary Calculators',
    name: 'GST Calculator', description: 'Add or remove GST at 5%, 12%, 18% or 28% slabs — show original and final price breakdown.', icon: '🧾', status: 'COMING SOON', url: './financial-calculators/gst-calculator'
  },
  {
    id: 7,
    toolTags: ['Income Tax', 'Old Regime', 'New Regime'],
    subCategory: 'Tax & Salary Calculators',
    name: 'Income Tax Calculator', description: 'Compare your tax liability under the Old vs New regime to choose the best option.', icon: '📋', status: 'COMING SOON', url: './financial-calculators/income-tax'
  },
  {
    id: 8,
    toolTags: ['Compound', 'Growth', 'Interest'],
    subCategory: 'Investment Calculators',
    name: 'Compound Interest', description: 'Calculate compound growth using A = P(1+r/n)^nt for any principal, rate and period.', icon: '📊', status: 'COMING SOON', url: './financial-calculators/compound-interest'
  },
  {
    id: 9,
    toolTags: ['Simple Interest', 'Principal', 'Rate'],
    subCategory: 'Investment Calculators',
    name: 'Simple Interest', description: 'Calculate simple interest earned on a principal using I = PRT/100 for any rate and time.', icon: '🧮', status: 'COMING SOON', url: './financial-calculators/simple-interest'
  },
  {
    id: 10,
    toolTags: ['Gratuity', 'Salary', 'Service'],
    subCategory: 'Tax & Salary Calculators',
    name: 'Gratuity Calculator', description: 'Calculate gratuity payout based on the Payment of Gratuity Act formula and years of service.', icon: '💼', status: 'COMING SOON', url: './financial-calculators/gratuity'
  },
  {
    id: 11,
    toolTags: ['HRA', 'Rent', 'Tax Exemption'],
    subCategory: 'Tax & Salary Calculators',
    name: 'HRA Calculator', description: 'Calculate House Rent Allowance tax exemption to maximise your take-home salary.', icon: '🏘️', status: 'COMING SOON', url: './financial-calculators/hra-calculator'
  },
  {
    id: 12,
    toolTags: ['NPS', 'Pension', 'Retirement'],
    subCategory: 'Investment Calculators',
    name: 'NPS Calculator', description: 'Estimate National Pension System corpus at retirement and expected monthly pension under NPS.', icon: '🏦', status: 'COMING SOON', url: './financial-calculators/nps-calculator'
  },
  {
    id: 13,
    toolTags: ['CAGR', 'Growth Rate', 'Investment'],
    subCategory: 'Tax & Salary Calculators',
    name: 'CAGR Calculator', description: 'Calculate Compound Annual Growth Rate between two values over any number of years.', icon: '📈', status: 'COMING SOON', url: './financial-calculators/cagr-calculator'
  },
  {
    id: 14,
    toolTags: ['ROI', 'Return', 'Profit'],
    subCategory: 'Tax & Salary Calculators',
    name: 'ROI Calculator', description: 'Calculate Return on Investment as a percentage gain or loss on any amount.', icon: '💹', status: 'COMING SOON', url: './financial-calculators/roi-calculator'
  },
  {
    id: 15,
    toolTags: ['Inflation', 'Real Value', 'Purchasing Power'],
    subCategory: 'Other Calculators',
    name: 'Inflation Calculator', description: 'Calculate the real value of money over time — see how inflation erodes purchasing power.', icon: '📉', status: 'COMING SOON', url: './financial-calculators/inflation'
  },
  {
    id: 16,
    toolTags: ['Retirement', 'Corpus', 'Goal'],
    subCategory: 'Other Calculators',
    name: 'Retirement Calculator', description: 'Find the corpus you need at retirement based on your monthly expenses and inflation rate.', icon: '🌅', status: 'COMING SOON', url: './financial-calculators/retirement'
  },
  {
    id: 17,
    toolTags: ['Lump Sum', 'One-time', 'Growth'],
    subCategory: 'Investment Calculators',
    name: 'Lump Sum Calculator', description: 'Calculate one-time investment growth over time at a given rate — ideal for comparing FD vs equity.', icon: '💰', status: 'COMING SOON', url: './financial-calculators/lump-sum'
  },
  {
    id: 18,
    toolTags: ['Savings', 'Goal', 'Monthly'],
    subCategory: 'Other Calculators',
    name: 'Savings Calculator', description: 'Plan monthly savings to reach a financial goal by a target date with interest factored in.', icon: '🏧', status: 'COMING SOON', url: './financial-calculators/savings'
  },
  {
    id: 19,
    toolTags: ['TDS', 'Deduction', 'Tax'],
    subCategory: 'Tax & Salary Calculators',
    name: 'TDS Calculator', description: 'Compute Tax Deducted at Source for salary, FD interest, professional fees and other income.', icon: '📑', status: 'COMING SOON', url: './financial-calculators/tds-calculator'
  },
  {
    id: 20,
    toolTags: ['Salary', 'CTC', 'In-Hand'],
    subCategory: 'Tax & Salary Calculators',
    name: 'Salary / CTC Calculator', description: 'Break down CTC into in-hand salary — includes HRA, PF, professional tax and all deductions.', icon: '💳', status: 'COMING SOON', url: './financial-calculators/ctc-calculator'
  },
]


