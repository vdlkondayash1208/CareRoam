import fs from 'fs';

// =============================================
// Fix config.js
// =============================================
let cfg = fs.readFileSync('src/i18n/config.js', 'utf8');
cfg = cfg
  .replace(/export type LanguageCode = \(typeof SUPPORTED_LANGUAGES\)\[number\]\['code'\];/g, '')
  .replace(/export function \(\) {\n  return SUPPORTED_LANGUAGES.find\(\(l\) => l\.code === code\)/g, 'export function getLanguageInfo(code) {\n  return SUPPORTED_LANGUAGES.find((l) => l.code === code)')
  .replace(/lng ,/g, 'lng: detectedLang,')
  .replace(/escapeValue/g, 'escapeValue: false')
  .replace(/returnObjects/g, 'returnObjects: true')
  .replace(/debug/g, 'debug: false');
fs.writeFileSync('src/i18n/config.js', cfg);
console.log('config.js fixed');

// =============================================
// Fix Home.jsx
// =============================================
let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');
home = home
  // Fix TrustBadge component signature
  .replace(/function TrustBadge\(\{ icon , text \}: \{ icon \.ElementType; text }\) {/g, 'function TrustBadge({ icon: Icon, text }) {')
  // Fix PhoneMockup component signature
  .replace(/function PhoneMockup\(\{[^}]*gradient[^}]*icon [^}]*title[^}]*description[^}]*\}: \{[^}]*\}\) {/g, 'function PhoneMockup({ gradient, icon: Icon, title, description }) {')
  // Fix FAQItem component signature
  .replace(/function FAQItem\(\{[^}]*question[^}]*answer[^}]*isOpen[^}]*onToggle[^}]*\}: \{[^}]*\}\) {/g, 'function FAQItem({ question, answer, isOpen, onToggle }) {')
  // Fix useCallback
  .replace(/const toggleFaq = useCallback\(\(index \) =>/g, 'const toggleFaq = useCallback((index) =>')
  .replace(/\(prev === index \? null \)/g, "(prev === index ? null : prev)")
  // Fix CSS class artifacts
  .replace(/last -b-0/g, 'last:border-b-0')
  .replace(/group-hover -care-600/g, 'group-hover:text-care-600')
  .replace(/hover -care-600/g, 'hover:text-care-600')
  .replace(/hover -white\/\[0\.12\]/g, 'hover:bg-white/[0.12]')
  .replace(/lg -3xl/g, 'lg:text-3xl')
  .replace(/hover -slate-50\/50/g, 'hover:bg-slate-50/50');
fs.writeFileSync('src/pages/Home.jsx', home);
console.log('Home.jsx fixed');

// =============================================
// Fix FounderDashboard.jsx
// =============================================
let founder = fs.readFileSync('src/pages/FounderDashboard.jsx', 'utf8');
founder = founder
  // Fix import type User and InterviewData
  .replace(/, type User/g, '')
  .replace(/, type InterviewData/g, '')
  // Fix destructuring patterns
  .replace(/\{ count , lastUpdated \.now\(\), updatedBy: '' }/g, "{ count: 0, lastUpdated: Date.now(), updatedBy: '' }")
  .replace(/catch \(err \)/g, 'catch (err)')
  .replace(/setLocalUser\(\{ email }\)/g, 'setLocalUser({ email: loginEmail })')
  // Fix parameter types
  .replace(/\(e \.FormEvent\)/g, '(e)')
  .replace(/\(err \)/g, '(err)')
  .replace(/\(key: string, delta \)/g, '(key, delta)')
  .replace(/\(index \)/g, '(index)')
  // Fix CSS class artifacts
  .replace(/sm -row/g, 'sm:flex-row')
  .replace(/sm -center/g, 'sm:items-center')
  .replace(/sm -between/g, 'sm:justify-between')
  .replace(/sm -6/g, 'sm:px-6')
  .replace(/lg -8/g, 'lg:px-8')
  .replace(/hover -gray-50/g, 'hover:bg-gray-50')
  .replace(/hover -care-300/g, 'hover:border-care-300')
  .replace(/disabled -30/g, 'disabled:opacity-30')
  .replace(/disabled -not-allowed/g, 'disabled:cursor-not-allowed')
  .replace(/hover -care-50/g, 'hover:bg-care-50')
  .replace(/disabled -50/g, 'disabled:opacity-50');
fs.writeFileSync('src/pages/FounderDashboard.jsx', founder);
console.log('FounderDashboard.jsx fixed');

// =============================================
// Fix Search.jsx
// =============================================
let search = fs.readFileSync('src/pages/Search.jsx', 'utf8');
search = search
  // Fix empty destructuring (enrichProviders result)
  .replace(/const  = enrichProviders\(rawProviders\);/g, 'const demoProviders = enrichProviders(rawProviders);')
  // Fix empty destructuring (parsedInfo)
  .replace(/const  = \[\];/g, 'const parts = [];')
  // Fix parameter types in sub-components
  .replace(/function ProviderCard\(\{ provider }: \{ provider }\) {/g, 'function ProviderCard({ provider }) {')
  .replace(/function EmergencyAssistanceCard\(\{ query }: \{ query }\) {/g, 'function EmergencyAssistanceCard({ query }) {')
  .replace(/function NoResultsFallback\(\{ query }: \{ query }\) {/g, 'function NoResultsFallback({ query }) {')
  .replace(/\(e \.KeyboardEvent\)/g, '(e)')
  .replace(/\(text \)/g, '(text)')
  .replace(/\(filter \)/g, '(filter)')
  // Fix CSS class artifacts
  .replace(/md -cols-2/g, 'md:grid-cols-2')
  .replace(/sm -24/g, 'sm:w-24')
  .replace(/sm -row/g, 'sm:flex-row')
  .replace(/sm -6/g, 'sm:px-6')
  .replace(/lg -8/g, 'lg:px-8')
  .replace(/lg -14/g, 'lg:pt-14')
  .replace(/hover -white/g, 'hover:bg-white')
  .replace(/hover -red-50/g, 'hover:bg-red-50')
  .replace(/hover -care-50/g, 'hover:bg-care-50')
  .replace(/hover -care-200/g, 'hover:border-care-200')
  .replace(/hover -care-600/g, 'hover:text-care-600');
fs.writeFileSync('src/pages/Search.jsx', search);
console.log('Search.jsx fixed');

// =============================================
// Fix PartnerDashboard.jsx
// =============================================
let partner = fs.readFileSync('src/pages/PartnerDashboard.jsx', 'utf8');
partner = partner
  // Fix missing variable name
  .replace(/const  = {/g, 'const initialForm = {')
  // Fix parameter type
  .replace(/\(field PartnerForm, value \)/g, '(field, value)')
  // Fix CSS class artifacts
  .replace(/sm -6/g, 'sm:px-6')
  .replace(/lg -8/g, 'lg:px-8')
  .replace(/sm -12/g, 'sm:p-12')
  .replace(/sm -cols-2/g, 'sm:grid-cols-2')
  .replace(/sm -span-2/g, 'sm:col-span-2');
fs.writeFileSync('src/pages/PartnerDashboard.jsx', partner);
console.log('PartnerDashboard.jsx fixed');

console.log('\nAll files fixed!');
