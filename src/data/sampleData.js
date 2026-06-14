export const emergencyContacts = [
  { service: 'National Emergency Number', number: '112', description: 'All emergencies across India', category: 'national' },
  { service: 'Ambulance (Govt.)', number: '108', description: 'Government ambulance service, free of charge', category: 'medical' },
  { service: 'Ambulance (Private)', number: '102', description: 'Private ambulance service', category: 'medical' },
  { service: 'Police', number: '100', description: 'Police emergency line', category: 'safety' },
  { service: 'Fire Brigade', number: '101', description: 'Fire emergency line', category: 'safety' },
  { service: 'Disaster Management', number: '1070', description: 'National Disaster Response Force', category: 'safety' },
  { service: 'Women Helpline', number: '1091', description: 'Women in distress helpline', category: 'support' },
  { service: 'Tourist Helpline', number: '1363', description: 'Tourist support and assistance', category: 'support' },
  { service: 'COVID-19 Helpline', number: '1075', description: 'COVID-19 information and support', category: 'medical' },
  { service: 'Poison Control', number: '1800-425-1123', description: '24/7 poison information center', category: 'medical' },
];

export const medicalPhrases = [
  { id: '1', english: 'I need a doctor urgently', hindi: 'मुझे तुरंत डॉक्टर चाहिए', telugu: 'నాకు అత్యవసరంగా డాక్టర్ కావాలి', category: 'Emergency' },
  { id: '2', english: 'Where is the nearest hospital?', hindi: 'निकटतम अस्पताल कहाँ है?', telugu: 'దగ్గరి ఆసుపత్రి ఎక్కడ ఉంది?', category: 'Emergency' },
  { id: '3', english: 'I have a fever', hindi: 'मुझे बुखार है', telugu: 'నాకు జ్వరం వచ్చింది', category: 'Symptoms' },
  { id: '4', english: 'I need medicine for pain', hindi: 'मुझे दर्द की दवा चाहिए', telugu: 'నాకు నొప్పి మందు కావాలి', category: 'Pharmacy' },
  { id: '5', english: 'I am allergic to...', hindi: 'मुझे ... से एलर्जी है', telugu: 'నాకు ... అలెర్జీ ఉంది', category: 'Allergies' },
  { id: '6', english: 'Please call an ambulance', hindi: 'कृपया एम्बुलेंस बुलाएँ', telugu: 'దయచేసి అంబులెన్స్ కాల్ చేయండి', category: 'Emergency' },
  { id: '7', english: 'I have difficulty breathing', hindi: 'मुझे सांस लेने में तकलीफ है', telugu: 'నాకు శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంది', category: 'Symptoms' },
  { id: '8', english: 'Where is the pharmacy?', hindi: 'फार्मेसी कहाँ है?', telugu: 'ఫార్మసీ ఎక్కడ ఉంది?', category: 'Pharmacy' },
  { id: '9', english: 'I need a prescription', hindi: 'मुझे एक प्रिस्क्रिप्शन चाहिए', telugu: 'నాకు ప్రిస్క్రిప్షన్ కావాలి', category: 'Pharmacy' },
  { id: '10', english: 'I feel dizzy', hindi: 'मुझे चक्कर आ रहा है', telugu: 'నాకు తల తిరుగుతోంది', category: 'Symptoms' },
  { id: '11', english: 'Do you have health insurance?', hindi: 'क्या आपके पास स्वास्थ्य बीमा है?', telugu: 'మీ దగ్గర ఆరోగ్య బీమా ఉందా?', category: 'General' },
  { id: '12', english: 'I need a blood test', hindi: 'मुझे रक्त परीक्षण की आवश्यकता है', telugu: 'నాకు రక్త పరీక్ష అవసరం', category: 'Medical' },
  { id: '13', english: 'Where is the emergency room?', hindi: 'आपातकालीन कक्ष कहाँ है?', telugu: 'ఎమర్జెన్సీ రూం ఎక్కడ ఉంది?', category: 'Emergency' },
  { id: '14', english: 'I have stomach pain', hindi: 'मेरे पेट में दर्द है', telugu: 'నాకు కడుపు నొప్పి ఉంది', category: 'Symptoms' },
  { id: '15', english: 'Please help me', hindi: 'कृपया मेरी मदद करें', telugu: 'దయచేసి నాకు సహాయం చేయండి', category: 'General' },
];

export const roadmapData = [
  {
    phase: 'Phase 1',
    title: 'Problem Validation',
    status: 'current',
    description: 'Conducting interviews with travelers and healthcare providers to validate pain points.',
    milestones: [
      'Interview 50+ travelers about healthcare experiences',
      'Survey 30+ hospitals on partnership willingness',
      'Analyze competitor landscape and regulatory requirements',
      'Publish findings and refine product requirements',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Partnership Acquisition',
    status: 'upcoming',
    description: 'Building the healthcare provider network and establishing trust with partners.',
    milestones: [
      'Onboard 20+ hospital partners in pilot cities',
      'Establish service-level agreements with providers',
      'Integrate with clinic management systems',
      'Launch provider verification and rating system',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'MVP Pilot Launch',
    status: 'upcoming',
    description: 'Launching the platform in select cities with a curated provider network.',
    milestones: [
      'Pilot launch in Mumbai and Bangalore',
      'Onboard 500+ early users from waitlist',
      'Implement emergency alert system',
      'Gather feedback and iterate on core features',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Public Launch',
    status: 'upcoming',
    description: 'Expanding coverage across India with a fully verified provider network.',
    milestones: [
      'Expand to 10 major Indian cities',
      'Scale to 200+ verified provider partners',
      'Launch mobile apps (iOS & Android)',
      'Establish 24/7 emergency coordination center',
    ],
  },
];
