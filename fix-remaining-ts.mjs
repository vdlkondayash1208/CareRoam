import fs from 'fs';

// =============================================
// Fix firebase/config.js
// =============================================
let cfg = fs.readFileSync('src/firebase/config.js', 'utf8');
cfg = cfg
  .replace(/, type User\b/g, '')
  .replace(/let app: ReturnType<typeof initializeApp> \| null = null;/g, 'let app = null;')
  .replace(/let auth: ReturnType<typeof getAuth> \| null = null;/g, 'let auth = null;')
  .replace(/let db: ReturnType<typeof getFirestore> \| null = null;/g, 'let db = null;')
  .replace(/'http:\/\/localhost '/g, "'http://localhost:9099'");
fs.writeFileSync('src/firebase/config.js', cfg);
console.log('Fixed: src/firebase/config.js');

// =============================================
// Fix firebase/interviewService.js
// =============================================
let isv = fs.readFileSync('src/firebase/interviewService.js', 'utf8');
isv = isv
  .replace(/export const  = {/g, 'export const defaultData = {')
  .replace(/export function isAdmin\(user \| null\) {/g, 'export function isAdmin(user) {')
  .replace(/export function subscribeInterviewCount\(\n  onUpdate: \(data \) => void,\n  onError: \(err \) => void,\n\): \(\) => void {/g, 'export function subscribeInterviewCount(onUpdate, onError) {')
  .replace(/export async function incrementInterviewCount\(user \| null\) {/g, 'export async function incrementInterviewCount(user) {')
  .replace(/export async function decrementInterviewCount\(user \| null\) {/g, 'export async function decrementInterviewCount(user) {')
  .replace(/\n    count ,\n    lastUpdated \.now\(\),\n    updatedBy: user!\.email \?\? '',/g, '\n    count: newCount,\n    lastUpdated: Date.now(),\n    updatedBy: user?.email ?? \'\',')
  .replace(/return \(snapshot\.data\(\)\)\.count;/g, 'return snapshot.data().count;');
fs.writeFileSync('src/firebase/interviewService.js', isv);
console.log('Fixed: src/firebase/interviewService.js');

// =============================================
// Fix data/sampleData.js
// =============================================
let sd = fs.readFileSync('src/data/sampleData.js', 'utf8');
sd = sd
  .replace(/^export export export export export export export const  = \[/gm, 'export const emergencyContacts = [')
  .replace(/^export const  = \[/gm, 'export const medicalPhrases = [');
fs.writeFileSync('src/data/sampleData.js', sd);
console.log('Fixed: src/data/sampleData.js');

// =============================================
// Fix utils/searchEngine.js
// =============================================
let se = fs.readFileSync('src/utils/searchEngine.js', 'utf8');
se = se
  // Remove type exports
  .replace(/export type SearchCategory = 'hospital' \| 'doctor' \| 'pharmacy' \| 'ambulance' \| null;/g, '')
  .replace(/export type SearchFilter = '24\/7' \| 'emergency' \| 'verified' \| 'open-now' \| 'top-rated' \| 'nearest';/g, '')
  // Fix duplicate exports + missing identifier
  .replace(/export export export export \[\]/, 'export const suggestions = []')
  // Fix missing function names
  .replace(/\nexport function \(\) {\n  const q = query\.toLowerCase\(\)\.trim\(\);\n  if \(!q\) return false;\n/g, '\nexport function hasEmergencyIntent(query) {\n  const q = query.toLowerCase().trim();\n  if (!q) return false;\n')
  .replace(/\nexport function \(\) {\n  const raw = query\.trim\(\);\n  if \(!raw\) {\n    return { raw: '', category: null, location: null, specialty: null, filters: \[\], isEmergency: false };\n  }\n/g, '\nexport function parseSearchQuery(query) {\n  const raw = query.trim();\n  if (!raw) {\n    return { raw: \'\', category: null, location: null, specialty: null, filters: [], isEmergency: false };\n  }\n')
  .replace(/\nexport function \(\) {\n  if \(!query\.trim\(\)\) return \[\];\n/g, '\nexport function getSuggestions(query) {\n  if (!query.trim()) return [];\n')
  .replace(/\nexport function \(\): EmergencyInfo \| null {\n  if \(!parsed\.isEmergency\) return null;\n/g, '\nexport function getEmergencyInfo(parsed) {\n  if (!parsed.isEmergency) return null;\n')
  // Fix parameter types
  .replace(/export function fuzzyMatch\(input , target \)/g, 'export function fuzzyMatch(input, target)')
  .replace(/function matchKeywords\(input , keywords \)/g, 'function matchKeywords(input, keywords)')
  .replace(/export function filterProviders\(\n  providers ,\n  parsed ,\n  activeFilters ,\n\)/g, 'export function filterProviders(providers, parsed, activeFilters)')
  .replace(/export function enrichProviders\(providers \)/g, 'export function enrichProviders(providers)')
  // Fix specific artifacts
  .replace(/, city \.city \|\| p/g, ', city: p.city || p')
  .replace(/new Set<string>\(\)/g, 'new Set()')
  .replace(/parsed\.specialty!/g, 'parsed.specialty')
  .replace(/parsed\.location!/g, 'parsed.location')
  // Remove type from const declarations
  .replace(/const SPECIALTY_KEYWORDS: Record<string, string\[\]> =/g, 'const SPECIALTY_KEYWORDS =');
fs.writeFileSync('src/utils/searchEngine.js', se);
console.log('Fixed: src/utils/searchEngine.js');

console.log('\nAll remaining files fixed!');
