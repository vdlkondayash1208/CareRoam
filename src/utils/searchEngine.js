// ============================================================
// Types
// ============================================================



// ============================================================
// Keyword Maps
// ============================================================

const HOSPITAL_KEYWORDS = [
  'hospital', 'hospitl', 'hosp', 'hos', 'clinic', 'clinical',
  'medical center', 'medicalcentre', 'med centre',
  'emergency room', 'er', 'emergency ward', 'trauma centre', 'trauma center',
  'nursing home', 'dispensary',
];

const DOCTOR_KEYWORDS = [
  'doctor', 'docter', 'doc', 'dr', 'physician', 'physcian',
  'specialist', 'spclist', 'surgeon', 'surgon',
  'dermatologist', 'derma',
  'pediatrician', 'paediatrician', 'pediatric', 'child doctor',
  'cardiologist', 'cardio', 'heart doctor',
  'neurologist', 'neuro',
  'orthopedic', 'ortho', 'bone doctor',
  'gynecologist', 'gynaecologist', 'gyno', 'obgyn',
  'ophthalmologist', 'eye doctor',
  'dentist', 'dental', 'tooth doctor',
  'ent specialist', 'ent',
  'general physician', 'gp', 'general medicine',
  'psychiatrist', 'psychologist', 'therapy',
];

const PHARMACY_KEYWORDS = [
  'pharmacy', 'pharmcy', 'pharm', 'phar',
  'medicine', 'meds', 'med', 'medicines',
  'medical store', 'medicalstore', 'med store',
  'drug store', 'drugstore', 'chemist',
  'drugs', 'tablets', 'medication',
];

const AMBULANCE_KEYWORDS = [
  'ambulance', 'ambulnce', 'amb', 'emergency',
  'sos', 'urgent', 'urgent care',
  'trauma', 'accident', 'crash',
  'rescue', 'paramedic', 'emergency transport',
];

const SPECIALTY_KEYWORDS = {
  'General Medicine': ['general', 'gp', 'physician', 'family doctor', 'primary care'],
  'Cardiology': ['cardio', 'heart', 'cardiac', 'cardiovascular'],
  'Pediatrics': ['pediatric', 'child', 'children', 'kids', 'baby', 'infant'],
  'Orthopedics': ['ortho', 'bone', 'joint', 'fracture', 'spine', 'orthopedic'],
  'Dermatology': ['derma', 'skin', 'rash', 'allergy', 'dermatologist'],
  'Gynecology': ['gyno', 'gynaecology', 'women', 'pregnancy', 'obgyn', 'maternity'],
  'Neurology': ['neuro', 'brain', 'nerve', 'stroke', 'neurologist'],
  'Ophthalmology': ['eye', 'vision', 'sight', 'ophthalmologist'],
  'ENT': ['ent', 'ear', 'nose', 'throat', 'hearing'],
  'Dentistry': ['dentist', 'dental', 'tooth', 'teeth', 'oral'],
  'Psychiatry': ['psychiatry', 'mental health', 'depression', 'anxiety', 'psychologist', 'counseling'],
};

/** Expanded emergency phrases including number-based queries like 108, 112 */
const EMERGENCY_PHRASES = [
  'emergency', 'chest pain', 'heart attack', 'stroke',
  'accident', 'unconscious', 'fainted', 'seizure',
  'severe bleeding', 'burns', 'poisoning', 'overdose',
  'difficulty breathing', 'choking', 'drowning',
  'head injury', 'spinal injury', 'major trauma',
  'labour pain', 'miscarriage',
  'urgent', 'sos', 'critical', 'hospital emergency',
  '108', '112',
];

const CITIES = [
  'hyderabad', 'bangalore', 'bengaluru', 'mumbai', 'delhi', 'new delhi',
  'chennai', 'madras', 'kolkata', 'calcutta', 'pune', 'ahmedabad',
  'jaipur', 'lucknow', 'surat', 'visakhapatnam', 'vizag',
  'indore', 'bhopal', 'nagpur', 'kochi', 'cochin', 'trivandrum',
  'chandigarh', 'goa', 'panaji', 'gurgaon', 'gurugram', 'noida',
  'thane', 'navi mumbai', 'faridabad', 'rajkot', 'vadodara', 'varanasi',
  'agra', 'amritsar', 'patna', 'ranchi', 'guwahati', 'shimla',
  'dehradun', 'mangalore', 'mysore', 'coimbatore', 'madurai',
  'tirupati', 'vijayawada', 'guntur', 'nellore', 'kurnool',
  'warangal', 'karimnagar', 'nizamabad', 'kakinada', 'rajahmundry',
  'ongole', 'kadapa', 'anantapur', 'hindupur',
];

/** Exact keywords for emergency intent detection (used by hasEmergencyIntent) */
export const EMERGENCY_INTENT_KEYWORDS = [
  'ambulance', 'emergency', 'urgent', 'sos',
  'accident', 'trauma', '108', '112',
  'critical', 'hospital emergency',
];

// ============================================================
// Fuzzy Matching
// ============================================================

export function fuzzyMatch(input, target) {
  const a = input.toLowerCase().trim();
  const b = target.toLowerCase().trim();

  if (!a || !b) return false;
  if (b.includes(a)) return true;

  let ai = 0;
  for (let bi = 0; bi < b.length && ai < a.length; bi++) {
    if (a[ai] === b[bi]) ai++;
  }
  if (ai === a.length) return true;

  if (a.length >= 2 && b.startsWith(a)) return true;

  let matches = 0;
  const aChars = new Set(a);
  for (const ch of b) {
    if (aChars.has(ch)) matches++;
  }
  return a.length >= 3 && matches / a.length >= 0.7;
}

function matchKeywords(input, keywords) {
  return keywords.some((kw) => fuzzyMatch(input, kw));
}

// ============================================================
// Emergency Intent Detection (NEW standalone check)
// ============================================================

/**
 * Quick check if a raw query contains emergency intent.
 * This is used BEFORE provider filtering so emergency results
 * are shown even when no providers match the location/category.
 */
export function hasEmergencyIntent(query) {
  const q = query.toLowerCase().trim();
  if (!q) return false;

  // Check each keyword — match standalone words and numbers
  return EMERGENCY_INTENT_KEYWORDS.some((kw) => {
    // For short numeric keywords (108, 112), match exact word boundaries
    if (/^\d+$/.test(kw)) {
      const words = q.split(/\s+/);
      return words.includes(kw);
    }
    // For multi-word phrases, check the whole query
    if (kw.includes(' ') && q.includes(kw)) return true;
    // Generic substring match for text keywords
    if (q.includes(kw)) return true;
    return false;
  });
}

// ============================================================
// Query Parsing
// ============================================================

export function parseSearchQuery(query) {
  const raw = query.trim();
  if (!raw) {
    return { raw: '', category: null, location: null, specialty: null, filters: [], isEmergency: false };
  }

  const words = raw.toLowerCase().split(/\s+/).filter(Boolean);
  let category = null;
  let location = null;
  let specialty = null;
  const filters = [];
  let isEmergency = false;

  if (EMERGENCY_PHRASES.some((phrase) => raw.toLowerCase().includes(phrase))) {
    isEmergency = true;
  }

  const foundCity = CITIES.find((city) => {
    if (raw.toLowerCase().includes(city)) return true;
    return words.some((w) => fuzzyMatch(w, city) && w.length >= 3);
  });

  if (foundCity) {
    location = foundCity.charAt(0).toUpperCase() + foundCity.slice(1);
  }

  const isNearMe = raw.toLowerCase().includes('near me') || raw.toLowerCase().includes('nearby');

  if (raw.includes('24/7') || raw.includes('24 hour') || raw.includes('24-hour') || raw.includes('round the clock') || raw.includes('open now')) {
    filters.push('24/7');
  }
  if (isEmergency) {
    filters.push('emergency');
  }
  if (raw.includes('verified') || raw.includes('trusted') || raw.includes('top') || raw.includes('best')) {
    filters.push('verified');
  }

  for (const word of words) {
    if (!category && matchKeywords(word, HOSPITAL_KEYWORDS)) {
      category = 'hospital';
    }
    if (!category && matchKeywords(word, DOCTOR_KEYWORDS)) {
      category = 'doctor';
    }
    if (!category && matchKeywords(word, PHARMACY_KEYWORDS)) {
      category = 'pharmacy';
    }
    if (!category && matchKeywords(word, AMBULANCE_KEYWORDS)) {
      category = 'ambulance';
    }
  }

  if (!category) {
    for (const word of words) {
      if (!category) {
        for (const kw of HOSPITAL_KEYWORDS) {
          if (fuzzyMatch(word, kw) && word.length >= 3) { category = 'hospital'; break; }
        }
      }
      if (!category) {
        for (const kw of DOCTOR_KEYWORDS) {
          if (fuzzyMatch(word, kw) && word.length >= 3) { category = 'doctor'; break; }
        }
      }
      if (!category) {
        for (const kw of PHARMACY_KEYWORDS) {
          if (fuzzyMatch(word, kw) && word.length >= 3) { category = 'pharmacy'; break; }
        }
      }
      if (!category) {
        for (const kw of AMBULANCE_KEYWORDS) {
          if (fuzzyMatch(word, kw) && word.length >= 3) { category = 'ambulance'; break; }
        }
      }
    }
  }

  for (const [spec, keywords] of Object.entries(SPECIALTY_KEYWORDS)) {
    if (keywords.some((kw) => raw.toLowerCase().includes(kw) || words.some((w) => fuzzyMatch(w, kw)))) {
      specialty = spec;
      if (!category) category = 'doctor';
      break;
    }
  }

  if (isNearMe && !location) {
  }

  return {
    raw,
    category,
    location,
    specialty,
    filters: [...new Set(filters)],
    isEmergency,
  };
}

// ============================================================
// Search Suggestions
// ============================================================

export function getSuggestions(query) {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();
  const suggestions = [];

  if (fuzzyMatch(q, 'hospital') || q.startsWith('hos') || q.startsWith('cli')) {
    suggestions.push(
      { text: 'Hospitals Near Me', category: 'hospital', subtitle: 'Find hospitals in your area' },
      { text: '24/7 Hospitals', category: 'hospital', subtitle: 'Hospitals open round the clock' },
      { text: 'Emergency Hospitals', category: 'hospital', subtitle: 'Emergency & trauma care' },
    );
  }

  if (fuzzyMatch(q, 'pharmacy') || q.startsWith('ph') || q.startsWith('chem') || q.startsWith('medic')) {
    suggestions.push(
      { text: 'Nearby Pharmacies', category: 'pharmacy', subtitle: 'Find pharmacies near you' },
      { text: '24/7 Pharmacies', category: 'pharmacy', subtitle: 'Open all night pharmacies' },
    );
  }

  if (fuzzyMatch(q, 'doctor') || q.startsWith('doc') || q.startsWith('phys') || q.startsWith('spec')) {
    suggestions.push(
      { text: 'General Doctors', category: 'doctor', subtitle: 'General physicians & GPs' },
      { text: 'Specialists', category: 'doctor', subtitle: 'Cardiologists, dermatologists & more' },
      { text: 'Pediatricians', category: 'doctor', subtitle: 'Child specialists' },
    );
  }

  if (fuzzyMatch(q, 'ambulance') || q.startsWith('amb') || q.startsWith('emerg')) {
    suggestions.push(
      { text: 'Emergency Ambulance', category: 'ambulance', subtitle: '24/7 ambulance dispatch' },
      { text: 'Emergency Services', category: 'ambulance', subtitle: 'Urgent medical assistance' },
    );
  }

  for (const city of CITIES.slice(0, 10)) {
    if (fuzzyMatch(q, city) && q.length >= 2) {
      suggestions.push(
        { text: `Hospitals in ${city.charAt(0).toUpperCase() + city.slice(1)}`, category: 'hospital', subtitle: `Find healthcare in ${city}` },
        { text: `Doctors in ${city.charAt(0).toUpperCase() + city.slice(1)}`, category: 'doctor', subtitle: `Find doctors in ${city}` },
      );
      break;
    }
  }

  if (q.includes('24') || q.includes('open') || q.includes('night')) {
    suggestions.push(
      { text: '24/7 Hospitals Near Me', category: 'hospital', subtitle: 'Open 24 hours' },
      { text: '24/7 Pharmacies Near Me', category: 'pharmacy', subtitle: 'Open 24 hours' },
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      { text: 'Hospitals Near Me', category: 'hospital', subtitle: 'Find hospitals in your area' },
      { text: 'Doctors Near Me', category: 'doctor', subtitle: 'Find doctors nearby' },
      { text: 'Emergency Help', category: 'ambulance', subtitle: 'Emergency assistance' },
    );
  }

  const seen = new Set();
  return suggestions.filter((s) => {
    if (seen.has(s.text)) return false;
    seen.add(s.text);
    return true;
  }).slice(0, 5);
}

// ============================================================
// Emergency Detection
// ============================================================

export function getEmergencyInfo(parsed) {
  if (!parsed.isEmergency) return null;

  return {
    message: parsed.isEmergency
      ? 'It looks like you may need urgent medical assistance. Please call emergency services immediately.'
      : 'For urgent medical help, call emergency services.',
    contacts: [
      { label: 'National Emergency', number: '112' },
      { label: 'Ambulance', number: '108' },
      { label: 'Police', number: '100' },
      { label: 'Fire Brigade', number: '101' },
    ],
  };
}

// ============================================================
// Provider Filtering
// ============================================================

export function filterProviders(providers, parsed, activeFilters) {
  let results = [...providers];

  if (parsed.category) {
    const catMap = {
      hospital: ['Multi-Speciality', 'Hospital', 'Clinic'],
      doctor: ['Doctor', 'Physician', 'Specialist', 'Clinic'],
      pharmacy: ['Pharmacy', 'Medical Store'],
      ambulance: ['Ambulance', 'Emergency Service'],
    };
    const cats = catMap[parsed.category] || [];
    results = results.filter((p) => cats.some((c) => p.category.toLowerCase().includes(c.toLowerCase())));
  }

  if (parsed.specialty && parsed.category === 'doctor') {
    results = results.filter((p) =>
      p.tags.some((t) => fuzzyMatch(parsed.specialty, t))
    );
  }

  if (parsed.location) {
    results = results.filter((p) =>
      p.city.toLowerCase().includes(parsed.location.toLowerCase())
    );
  }

  for (const filter of activeFilters) {
    switch (filter) {
      case '24/7':
        results = results.filter((p) => p.is24x7);
        break;
      case 'open-now':
        results = results.filter((p) => p.isOpen);
        break;
      case 'emergency':
        results = results.filter((p) => p.hasEmergency);
        break;
      case 'verified':
        results = results.filter((p) => p.isVerified);
        break;
      case 'top-rated':
        results = results.sort((a, b) => b.rating - a.rating);
        break;
      case 'nearest':
        results = results.sort((a, b) => {
          const distA = parseFloat(a.distance);
          const distB = parseFloat(b.distance);
          return distA - distB;
        });
        break;
    }
  }

  if (parsed.raw && !parsed.category && !parsed.location) {
    const searchTerms = parsed.raw.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    results = results.filter((p) => {
      const searchableText = `${p.name} ${p.category} ${p.address} ${p.tags.join(' ')}`.toLowerCase();
      return searchTerms.some((term) => fuzzyMatch(term, searchableText));
    });
  }

  return results;
}

// ============================================================
// Helper: Enrich demo providers with search-engine fields
// ============================================================

export function enrichProviders(providers) {
  return providers.map((p) => ({
    ...p,
    city: p.city || p.address?.split(',').pop()?.trim() || 'Hyderabad',
    isVerified: p.badge === 'Verified' || p.badge === 'NABH Accredited',
    is24x7: p.hours?.includes('24/7') || false,
    hasEmergency: p.category?.toLowerCase().includes('multi-speciality') || p.category?.toLowerCase().includes('hospital') || false,
    tags: [p.category, p.badge, p.name?.split(' ')[0]].filter(Boolean),
  }));
}
