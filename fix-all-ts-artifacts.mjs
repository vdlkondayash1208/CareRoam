import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  const ext = path.extname(filePath);

  // === Common fixes ===

  // Remove import type { ... } from '...'  
  content = content.replace(/import\s+type\s+\{[^}]*\}\s+from\s+'[^']+'\s*;?/g, '');
  // Remove import type X from '...'
  content = content.replace(/import\s+type\s+(\S+)\s+from\s+'[^']+'\s*;?/g, '');
  // Remove standalone type exports
  content = content.replace(/export\s+type\s+\{[^}]*\}\s*;?/g, '');
  
  // Fix CSS class artifacts - these are the most common patterns
  content = content.replace(/\bsm -6\b/g, 'sm:px-6');
  content = content.replace(/\blg -8\b/g, 'lg:px-8');
  content = content.replace(/\bsm -12\b/g, 'sm:p-12');
  content = content.replace(/\bsm -row\b/g, 'sm:flex-row');
  content = content.replace(/\bsm -cols-2\b/g, 'sm:grid-cols-2');
  content = content.replace(/\bsm -span-2\b/g, 'sm:col-span-2');
  content = content.replace(/\blg -cols-2\b/g, 'lg:grid-cols-2');
  content = content.replace(/\blg -span-3\b/g, 'lg:col-span-3');
  content = content.replace(/\blg -span-1\b/g, 'lg:col-span-1');
  content = content.replace(/\bsm -left\b/g, 'sm:text-left');
  content = content.replace(/\bsm -center\b/g, 'sm:items-center');
  content = content.replace(/\bsm -between\b/g, 'sm:justify-between');
  
  // Fix hover: artifacts
  content = content.replace(/\bhover -lg\b/g, 'hover:shadow-lg');
  content = content.replace(/\bhover -sm\b/g, 'hover:shadow-sm');
  content = content.replace(/\bhover -gray-50\b/g, 'hover:bg-gray-50');
  content = content.replace(/\bhover -care-50\b/g, 'hover:bg-care-50');
  content = content.replace(/\bhover -care-100\b/g, 'hover:bg-care-100');
  content = content.replace(/\bhover -care-200\b/g, 'hover:border-care-200');
  content = content.replace(/\bhover -care-600\b/g, 'hover:text-care-600');
  content = content.replace(/\bhover -red-50\b/g, 'hover:bg-red-50');
  content = content.replace(/\bhover -red-100\b/g, 'hover:bg-red-100');
  content = content.replace(/\bhover -slate-50\/50\b/g, 'hover:bg-slate-50/50');
  content = content.replace(/\bhover -white\b/g, 'hover:bg-white');
  content = content.replace(/\bhover -gray-100\b/g, 'hover:bg-gray-100');
  
  // Fix disabled: artifacts
  content = content.replace(/\bdisabled -30\b/g, 'disabled:opacity-30');
  content = content.replace(/\bdisabled -50\b/g, 'disabled:opacity-50');
  content = content.replace(/\bdisabled -not-allowed\b/g, 'disabled:cursor-not-allowed');
  
  // Fix size/time artifacts
  content = content.replace(/\bsm -24\b/g, 'sm:w-24');
  content = content.replace(/\bsm -12 sm -12\b/g, 'sm:w-12 sm:h-12');
  content = content.replace(/\bsm -6 sm -6\b/g, 'sm:w-6 sm:h-6');
  content = content.replace(/\blg -14\b/g, 'lg:pt-14');
  content = content.replace(/\bsm -10\b/g, 'sm:mb-10');
  content = content.replace(/\bsm -4xl\b/g, 'sm:text-4xl');
  content = content.replace(/\bsm -3xl\b/g, 'sm:text-3xl');
  content = content.replace(/\bsm -2xl\b/g, 'sm:text-2xl');
  content = content.replace(/\bsm -sm\b/g, 'sm:text-sm');
  content = content.replace(/\blg -3xl\b/g, 'lg:text-3xl');
  
  // Fix last: and group-hover: artifacts
  content = content.replace(/\blast -b-0\b/g, 'last:border-b-0');
  content = content.replace(/\bgroup-hover -care-600\b/g, 'group-hover:text-care-600');
  content = content.replace(/\bgroup-hover -110\b/g, 'group-hover:scale-110');
  
  // Fix hover:-translate-y-0.5 which was likely already correct
  content = content.replace(/\bhover:-translate-y-0\b\.5/g, 'hover:-translate-y-0.5');

  // === File-specific fixes ===

  const fileName = path.basename(filePath);

  if (fileName === 'config.js') {
    content = content.replace(/export type LanguageCode = \(typeof SUPPORTED_LANGUAGES\)\[number\]\['code'\];/g, '');
    content = content.replace(/export function \(\)/g, 'export function getLanguageInfo(code)');
    content = content.replace(/lng ,/g, 'lng: detectedLang,');
    content = content.replace(/escapeValue/g, 'escapeValue: false');
    content = content.replace(/returnObjects/g, 'returnObjects: true');
    content = content.replace(/\bdebug\b/g, 'debug: false');
    // Only fix the one in init, not in variable names
    content = content.replace(/(debug: false),/g, 'debug: false,');
  }

  if (fileName === 'Home.jsx') {
    content = content.replace(/function TrustBadge\(\{ icon , text \}: \{ icon \.ElementType; text }\) {/g, 'function TrustBadge({ icon: Icon, text }) {');
    content = content.replace(/function PhoneMockup\(\{[^}]*gradient[^}]*icon [^}]*title[^}]*description[^}]*\}: \{[^}]*\}\) {/g, 'function PhoneMockup({ gradient, icon: Icon, title, description }) {');
    content = content.replace(/function FAQItem\(\{[^}]*question[^}]*answer[^}]*isOpen[^}]*onToggle[^}]*\}: \{[^}]*\}\) {/g, 'function FAQItem({ question, answer, isOpen, onToggle }) {');
    content = content.replace(/const toggleFaq = useCallback\(\(index \) =>/g, 'const toggleFaq = useCallback((index) =>');
    content = content.replace(/\(prev === index \? null \)/g, '(prev === index ? null : prev)');
  }

  if (fileName === 'AIAssistant.jsx') {
    // Remove orphaned interface remnant
    content = content.replace(/\[\];\s*\n\s*warning:\s*string;\s*\n\s*severity:\s*'info'\s*\|\s*'warning'\s*\|\s*'emergency';\s*\n\s*\}/g, '');
    
    // Fix getAIResponse function (was stripped to "function () {")
    content = content.replace(/function \(\) {\s*\n\s*const lower = userMessage\.toLowerCase\(\);/g, 'function getAIResponse(userMessage) {\n  const lower = userMessage.toLowerCase();');
    
    // Remove inline type annotations from const declarations
    content = content.replace(/const aiResponses: Record<string, AIResponseData> =/g, 'const aiResponses =');
    content = content.replace(/const emergencyKeywords:/g, 'const emergencyKeywords =');
    
    // Fix handleSend parameter type
    content = content.replace(/const handleSend = useCallback\(\(content: string\) =>/g, 'const handleSend = useCallback((content) =>');
    
    // Fix handleKeyDown type
    content = content.replace(/const handleKeyDown = useCallback\(\(e: KeyboardEvent\)/g, 'const handleKeyDown = useCallback((e) =>');
    content = content.replace(/\(e \.KeyboardEvent\)/g, '(e)');
    
    // Fix handleRegenerate param type
    content = content.replace(/const handleRegenerate = useCallback\(\(msgId \)/g, 'const handleRegenerate = useCallback((msgId)');
    
    // Fix MessageBubble component signature
    content = content.replace(/function MessageBubble\(\{ msg, onRegenerate \}: \{[\s\S]*?msg[\s\S]*?responseData: AIResponseData \};\s*\n\s*onRegenerate: \(\) => void;\s*\n\s*\}\)/g, 'function MessageBubble({ msg, onRegenerate })');
    
    // Fix ActionButton component signature
    content = content.replace(/function ActionButton\(\{ action, onClick \}: \{ action ['actions'][0]; onClick: () => void \}\)/g, 'function ActionButton({ action, onClick })');
    
    // Fix userMessage type annotation
    content = content.replace(/const userMessage: SupportMessage & { responseData: AIResponseData } = {/g, 'const userMessage = {');
    content = content.replace(/const aiMessage: SupportMessage & { responseData: AIResponseData } = {/g, 'const aiMessage = {');
    content = content.replace(/const newMsg: SupportMessage & { responseData: AIResponseData } = {/g, 'const newMsg = {');
    
    // Fix msg parameter type in MessageBubble
    content = content.replace(/msg: SupportMessage & { responseData: AIResponseData };/, '');
    
    // Fix ActionButton action type reference
    content = content.replace(/action: action\.type = (.*);/, '');
  }

  if (fileName === 'LanguageSupport.jsx') {
    // Fix missing function name - getTranslation
    content = content.replace(/function \(\) {\s*\n\s*return \(phrase\)\[targetLang\] \|\| phrase\.en;\s*\n\s*}/g, 'function getTranslation(phrase) {\n    return phrase[targetLang] || phrase.en;\n  }');
    
    // Fix handleCopy types
    content = content.replace(/const handleCopy = useCallback\(\(text , id \)/g, 'const handleCopy = useCallback((text, id)');
    
    // Fix missing colon in ternary
    content = content.replace(/translation !== phrase\.en \? translation }/g, 'translation !== phrase.en ? translation : null }');
  }

  if (fileName === 'Feedback.jsx') {
    // Fix handleSubmit type
    content = content.replace(/const handleSubmit = \(e \.FormEvent\)/g, 'const handleSubmit = (e)');
    
    // Fix destructuring artifacts in onChange
    content = content.replace(/\.\.\.form, name \.target\.value/g, '...form, name: e.target.value');
    content = content.replace(/\.\.\.form, email \.target\.value/g, '...form, email: e.target.value');
    content = content.replace(/\.\.\.form, feedbackType \.id/g, '...form, feedbackType: ft.id');
    content = content.replace(/\.\.\.form, message \.target\.value/g, '...form, message: e.target.value');
  }

  if (fileName === 'Waitlist.jsx') {
    // Fix updateForm type
    content = content.replace(/const updateForm = \(field WaitlistForm, value \)/g, 'const updateForm = (field, value)');
    // Fix handleSubmit type
    content = content.replace(/const handleSubmit = \(e \.FormEvent\)/g, 'const handleSubmit = (e)');
  }

  if (fileName === 'Contact.jsx') {
    content = content.replace(/const handleSubmit = async \(e \.FormEvent\)/g, 'const handleSubmit = async (e)');
    content = content.replace(/catch \(err \)/g, 'catch (err)');
  }

  if (fileName === 'Emergency.jsx') {
    content = content.replace(/const copyNumber = \(number \)/g, 'const copyNumber = (number)');
  }

  if (fileName === 'FounderDashboard.jsx') {
    content = content.replace(/, type User\b/g, '');
    content = content.replace(/, type InterviewData\b/g, '');
    content = content.replace(/\{ count: 0, lastUpdated \.now\(\), updatedBy: '' }/g, "{ count: 0, lastUpdated: Date.now(), updatedBy: '' }");
    content = content.replace(/catch \(err \)/g, 'catch (err)');
    content = content.replace(/setLocalUser\(\{ email }\)/g, 'setLocalUser({ email: loginEmail })');
    content = content.replace(/\(e \.FormEvent\)/g, '(e)');
    content = content.replace(/\(err \)/g, '(err)');
    content = content.replace(/\(key: string, delta \)/g, '(key, delta)');
    content = content.replace(/\(index \)/g, '(index)');
  }

  if (fileName === 'Investor.jsx') {
    // CSS artifacts already handled by common fixes
  }

  if (fileName === 'PartnerDashboard.jsx') {
    // Fix inline TS type annotation on partnerTypes
    content = content.replace(/const partnerTypes: \{ type: PartnerType; icon: typeof Hospital; labelKey: string; descKey: string; color: string }\[\] =/g, 'const partnerTypes =');
    content = content.replace(/\(field PartnerForm, value \)/g, '(field, value)');
    // Fix missing initialForm variable name
    content = content.replace(/const initialForm = {/g, 'const initialForm = {');
  }

  if (fileName === 'Search.jsx') {
    // Already partially fixed, but ensure remaining issues are addressed
    content = content.replace(/\(e \.KeyboardEvent\)/g, '(e)');
    content = content.replace(/\(text \)/g, '(text)');
    content = content.replace(/\(filter \)/g, '(filter)');
    content = content.replace(/function ProviderCard\(\{ provider }: \{ provider }\) {/g, 'function ProviderCard({ provider }) {');
    content = content.replace(/function EmergencyAssistanceCard\(\{ query }: \{ query }\) {/g, 'function EmergencyAssistanceCard({ query }) {');
    content = content.replace(/function NoResultsFallback\(\{ query }: \{ query }\) {/g, 'function NoResultsFallback({ query }) {');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

// Scan all .js and .jsx files in src/
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'locales') walk(fp);
    else if (e.isFile() && (e.name.endsWith('.jsx') || e.name.endsWith('.js'))) {
      const fixed = fixFile(fp);
      if (fixed) console.log('Fixed:', fp.replace(/\\/g, '/'));
    }
  }
}

walk('src');
console.log('\nDone scanning and fixing files.');
