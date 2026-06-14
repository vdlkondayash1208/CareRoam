import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Send,
  Bot,
  User,
  MapPin,
  AlertTriangle,
  Copy,
  RefreshCw,
  Stethoscope,
  Pill,
  Shield,
  Globe,
  Heart,
  Ambulance,
  Sparkles,
  ChevronRight,
  PhoneCall,
  MessageSquare,
  Clock,
  Check,
  Languages,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ============================================================
// Types
// ============================================================



// ============================================================
// AI Response Engine
// ============================================================

const aiResponses = {
  fever: {
    text: `**🤒 If you have a fever while traveling:**

**Recommended actions:**
• Rest and hydrate — drink plenty of water or ORS
• Take antipyretics like paracetamol (if not allergic)
• Monitor your temperature every 4 hours
• Apply cool compresses if fever exceeds 102°F (39°C)

**When to see a doctor:**
• Fever lasting more than 48 hours
• Severe headache or body aches
• Persistent vomiting or dehydration
• Fever with rash or confusion`,
    actions: [
      { label: 'Find Nearby Hospitals', type: 'search', href: '/search' },
      { label: 'Find Pharmacies', type: 'search', href: '/search' },
      { label: 'Emergency Contacts', type: 'emergency', href: '/emergency' },
      { label: 'Translate Symptoms', type: 'translate', href: '/language' },
    ],
    warning: 'If fever exceeds 103°F (39.4°C) or you have difficulty breathing, seek emergency care immediately.',
    severity: 'warning',
  },
  headache: {
    text: `**🤕 For headaches while traveling:**

**Recommended actions:**
• Rest in a quiet, dark room
• Stay hydrated — dehydration is a common trigger
• Over-the-counter pain relief (ibuprofen or paracetamol)
• Apply a cold or warm compress to your head/neck
• Avoid caffeine and alcohol

**Warning signs (seek care if):**
• Sudden, severe "thunderclap" headache
• Headache with fever, stiff neck, or confusion
• Vision changes or difficulty speaking
• Headache after a head injury`,
    actions: [
      { label: 'Find Nearby Hospitals', type: 'search', href: '/search' },
      { label: 'Find Pharmacies', type: 'search', href: '/search' },
      { label: 'Emergency Contacts', type: 'emergency', href: '/emergency' },
    ],
    severity: 'info',
  },
  stomach: {
    text: `**🫃 For stomach issues while traveling:**

**Recommended actions:**
• Stick to bland foods — rice, bananas, toast, applesauce
• Stay hydrated with ORS or clear fluids
• Avoid spicy, oily, or dairy-heavy foods
• Carry basic medications: antacids, ORS packets, loperamide

**⚠️ Seek immediate help if you have:**
• Severe abdominal pain
• Blood in stool or vomit
• High fever over 101°F (38.3°C)
• Signs of dehydration (dark urine, dizziness, dry mouth)
• Inability to keep fluids down for 24 hours`,
    actions: [
      { label: 'Find Pharmacies', type: 'search', href: '/search' },
      { label: 'Find Nearby Hospitals', type: 'search', href: '/search' },
      { label: 'Translate Symptoms', type: 'translate', href: '/language' },
    ],
    warning: 'Food poisoning symptoms usually resolve in 24-48 hours. Severe or bloody diarrhea requires medical attention.',
    severity: 'warning',
  },
  injury: {
    text: `**🩹 For injuries while traveling:**

**Recommended actions:**
• Clean the wound with antiseptic or clean water
• Apply pressure with clean cloth if bleeding
• Bandage properly and keep elevated
• Check your tetanus status (last booster within 10 years)
• Apply ice for swelling (20 mins on, 20 mins off)

**For serious injuries (go to ER immediately):**
• Deep wounds or uncontrolled bleeding
• Possible fractures or broken bones
• Head injuries with loss of consciousness
• Burns larger than your palm`,
    actions: [
      { label: 'Emergency Contacts', type: 'emergency', href: '/emergency' },
      { label: 'Find Nearby Hospitals', type: 'search', href: '/search' },
      { label: 'Find Pharmacies', type: 'search', href: '/search' },
    ],
    severity: 'warning',
  },
  emergency: {
    text: `🚨 **MEDICAL EMERGENCY DETECTED** 🚨

**Stop reading and call for help immediately.**

**Emergency numbers in India:**
• **108** — Ambulance (free, government)
• **112** — National Emergency Number
• **100** — Police
• **102** — Private Ambulance

**While waiting for help:**
• Stay calm and keep the person comfortable
• Do not give food or water if unconscious
• Loosen tight clothing
• Monitor breathing and pulse`,
    actions: [
      { label: 'Call 108 (Ambulance)', type: 'emergency', href: 'tel:108' },
      { label: 'Call 112 (National)', type: 'emergency', href: 'tel:112' },
      { label: 'Emergency Guide', type: 'link', href: '/emergency' },
    ],
    severity: 'emergency',
  },
  allergy: {
    text: `**⚠️ For allergic reactions while traveling:**

**Recommended actions:**
• Identify and remove the allergen if possible
• Take antihistamines (cetirizine or loratadine)
• Apply cold compress for skin reactions
• Use hydrocortisone cream for localized rashes

**🚨 Seek emergency care immediately if:**
• Difficulty breathing or wheezing
• Swelling of face, lips, tongue, or throat
• Severe rash spreading rapidly
• Dizziness or fainting
• Nausea/vomiting after exposure`,
    actions: [
      { label: 'Emergency Contacts', type: 'emergency', href: '/emergency' },
      { label: 'Find Pharmacies', type: 'search', href: '/search' },
      { label: 'Find Nearby Hospitals', type: 'search', href: '/search' },
      { label: 'Translate Symptoms', type: 'translate', href: '/language' },
    ],
    warning: 'Anaphylaxis is life-threatening. Use an epinephrine auto-injector if available and call 108 immediately.',
    severity: 'emergency',
  },
  travel_tips: {
    text: `**🧳 Travel Health Tips for Long Journeys:**

**Before you travel:**
• Pack a basic first-aid kit (bandages, antiseptic, pain relievers, ORS, antihistamines)
• Carry your regular medications with extra supply
• Check if your destination requires vaccinations
• Save emergency contacts offline (108, 112)

**During travel:**
• Stay hydrated — drink bottled or filtered water
• Move and stretch every 2 hours on long trips
• Eat at clean, busy restaurants
• Wash hands frequently or use sanitizer

**At your destination:**
• Locate the nearest hospital and pharmacy on arrival
• Register with your embassy if traveling internationally
• Keep emergency numbers accessible without internet`,
    actions: [
      { label: 'Search Healthcare', type: 'search', href: '/search' },
      { label: 'Emergency Contacts', type: 'emergency', href: '/emergency' },
      { label: 'Translate Phrases', type: 'translate', href: '/language' },
    ],
    severity: 'info',
  },
  food_poisoning: {
    text: `**🍽️ For food poisoning while traveling:**

**Recommended actions:**
• Stop eating solid foods for 6-12 hours
• Sip clear liquids — ORS is best for electrolyte replacement
• Eat bland foods when ready — rice, bananas, toast
• Avoid dairy, caffeine, alcohol, and spicy foods
• Rest — your body needs energy to recover

**When to see a doctor:**
• Blood in vomit or stool
• Severe abdominal pain that doesn't subside
• High fever above 101°F (38.3°C)
• Unable to keep fluids down for more than 24 hours
• Signs of severe dehydration`,
    actions: [
      { label: 'Find Pharmacies', type: 'search', href: '/search' },
      { label: 'Find Nearby Hospitals', type: 'search', href: '/search' },
      { label: 'Translate Symptoms', type: 'translate', href: '/language' },
    ],
    warning: 'Most food poisoning resolves in 24-48 hours with rest and hydration. Seek care if symptoms worsen.',
    severity: 'warning',
  },
  pharmacy: {
    text: `**💊 To find a 24/7 pharmacy near you:**

**Tips for finding medicines while traveling:**
• Search for "pharmacy" on CareRoam to find nearby options
• Look for "24/7" or "Open Now" filters for after-hours needs
• Carry a list of your regular medications with generic names
• Major chains (Apollo, Medplus, Netmeds) have wide networks

**Common travel medications to carry:**
• Pain relievers (paracetamol, ibuprofen)
• Antihistamines (cetirizine)
• ORS packets
• Antacids
• Motion sickness tablets
• Bandages and antiseptic cream`,
    actions: [
      { label: 'Find Pharmacies', type: 'search', href: '/search' },
      { label: 'Search Healthcare', type: 'search', href: '/search' },
    ],
    severity: 'info',
  },
  translate: {
    text: `**🌐 Medical Phrase Translation:**

Here are essential medical phrases in Hindi and Telugu:

**"I need a doctor"**
• Hindi: मुझे डॉक्टर चाहिए (Mujhe doctor chahiye)
• Telugu: నాకు డాక్టర్ కావాలి (Naku doctor kavali)

**"Where is the nearest hospital?"**
• Hindi: निकटतम अस्पताल कहाँ है? (Nikatam hospital kahan hai?)
• Telugu: దగ్గరి ఆసుపత్రి ఎక్కడ ఉంది? (Daggari asupatri ekkada undi?)

**"I need an ambulance"**
• Hindi: मुझे एम्बुलेंस चाहिए (Mujhe ambulance chahiye)
• Telugu: నాకు అంబులెన్స్ కావాలి (Naku ambulance kavali)

**"I am allergic to..."**
• Hindi: मुझे ... से एलर्जी है (Mujhe ... se allergy hai)
• Telugu: నాకు ... అలెర్జీ ఉంది (Naku ... allergy undi)`,
    actions: [
      { label: 'Translate More Phrases', type: 'translate', href: '/language' },
      { label: 'Search Healthcare', type: 'search', href: '/search' },
    ],
    severity: 'info',
  },
  default: {
    text: `👋 **I'm your CareRoam Travel Health Assistant.**

I can help you with:

🩺 **Health Issues** — Fever, headaches, stomach problems, injuries, allergies
🚑 **Emergencies** — What to do in urgent situations and who to call
💊 **Medications** — Guidance on common travel medicines
🌐 **Translations** — Medical phrases in Hindi, Telugu, and English
🧳 **Travel Tips** — Health advice for safe journeys

**Try asking me something like:**
• "I have a fever while traveling"
• "Find emergency contacts near me"
• "What should I do for food poisoning?"
• "Translate 'I need a doctor' to Hindi"`,
    actions: [
      { label: 'Find Healthcare', type: 'search', href: '/search' },
      { label: 'Emergency Contacts', type: 'emergency', href: '/emergency' },
      { label: 'Translate Phrases', type: 'translate', href: '/language' },
    ],
    severity: 'info',
  },
};

const emergencyKeywords = [
  'chest pain', 'heart attack', 'difficulty breathing', 'shortness of breath',
  'severe bleeding', 'unconscious', 'fainted', 'seizure', 'stroke',
  'choking', 'drowning', 'poisoning', 'overdose', 'major trauma',
  'head injury', 'spinal injury', 'anaphylaxis', 'not breathing',
  'turning blue', 'labour pain', 'miscarriage', 'cannot wake up',
];

function getAIResponse(userMessage) {
  const lower = userMessage.toLowerCase();

  // Emergency detection — highest priority
  for (const kw of emergencyKeywords) {
    if (lower.includes(kw)) return aiResponses.emergency;
  }

  // Specific conditions
  if (lower.includes('chest pain') || lower.includes('heart attack')) return aiResponses.emergency;
  if (lower.includes('fever') || lower.includes('temperature') || lower.includes('high temp')) return aiResponses.fever;
  if (lower.includes('headache') || lower.includes('migraine')) return aiResponses.headache;
  if (lower.includes('stomach') || lower.includes('vomit') || lower.includes('diarrhea') || lower.includes('food poisoning') || lower.includes('nausea')) {
    if (lower.includes('food poison')) return aiResponses.food_poisoning;
    return aiResponses.stomach;
  }
  if (lower.includes('injury') || lower.includes('cut') || lower.includes('wound') || lower.includes('bleeding') || lower.includes('fall') || lower.includes('fracture') || lower.includes('burn')) return aiResponses.injury;
  if (lower.includes('allergy') || lower.includes('allergic') || lower.includes('rash') || lower.includes('itching') || lower.includes('hives')) return aiResponses.allergy;
  if (lower.includes('pharmacy') || lower.includes('medicine') || lower.includes('medication') || lower.includes('drug') || lower.includes('tablet') || lower.includes('pill')) return aiResponses.pharmacy;
  if (lower.includes('translate') || lower.includes('phrase') || lower.includes('hindi') || lower.includes('telugu') || lower.includes('language')) return aiResponses.translate;
  if (lower.includes('tip') || lower.includes('travel health') || lower.includes('long journey') || lower.includes('pack') || lower.includes('prepare')) return aiResponses.travel_tips;

  return aiResponses.default;
}

// ============================================================
// Data
// ============================================================

const quickQuestions = [
  { key: 'assistant.quickQ1' },
  { key: 'assistant.quickQ2' },
  { key: 'assistant.quickQ3' },
  { key: 'assistant.quickQ4' },
  { key: 'assistant.quickQ5' },
  { key: 'assistant.quickQ6' },
];

const categories = [
  { icon: Stethoscope, labelKey: 'assistant.catSymptoms', color: 'from-blue-500 to-cyan-500', gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50', iconBg: 'bg-blue-500' },
  { icon: Pill, labelKey: 'assistant.catMedicines', color: 'from-green-500 to-emerald-500', gradient: 'bg-gradient-to-br from-green-50 to-emerald-50', iconBg: 'bg-green-500' },
  { icon: Shield, labelKey: 'assistant.catEmergencies', color: 'from-red-500 to-orange-500', gradient: 'bg-gradient-to-br from-red-50 to-orange-50', iconBg: 'bg-red-500' },
  { icon: Heart, labelKey: 'assistant.catTravelTips', color: 'from-purple-500 to-pink-500', gradient: 'bg-gradient-to-br from-purple-50 to-pink-50', iconBg: 'bg-purple-500' },
  { icon: Globe, labelKey: 'assistant.catTranslations', color: 'from-teal-500 to-green-500', gradient: 'bg-gradient-to-br from-teal-50 to-green-50', iconBg: 'bg-teal-500' },
  { icon: MapPin, labelKey: 'assistant.catNearbyCare', color: 'from-indigo-500 to-blue-500', gradient: 'bg-gradient-to-br from-indigo-50 to-blue-50', iconBg: 'bg-indigo-500' },
];

// ============================================================
// Sub-Components
// ============================================================

function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3.5 premium-shadow-sm">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs font-medium text-care-600">{t('assistant.typingIndicator')}</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-care-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-care-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-care-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ action, onClick }) {
  const baseClass = "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200";

  if (action.type === 'emergency') {
    return (
      <a
        href={action.href || '#'}
        className={`${baseClass} bg-red-50 text-red-700 hover:bg-red-100 border border-red-200`}
      >
        <PhoneCall className="w-3.5 h-3.5" />
        {action.label}
      </a>
    );
  }

  if (action.href?.startsWith('/')) {
    return (
      <Link
        to={action.href}
        className={`${baseClass} bg-care-50 text-care-700 hover:bg-care-100 border border-care-200`}
      >
        <MapPin className="w-3.5 h-3.5" />
        {action.label}
      </Link>
    );
  }

  return (
    <Link
      to={action.href || '#'}
      className={`${baseClass} bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200`}
    >
      <Languages className="w-3.5 h-3.5" />
      {action.label}
    </Link>
  );
}

function MessageBubble({ msg, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex gap-3 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
        msg.role === 'assistant' ? 'bg-gradient-to-br from-care-500 to-care-600' : 'bg-gray-200'
      }`}>
        {msg.role === 'assistant' ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-gray-600" />
        )}
      </div>

      <div className={`max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>            {/* Warning banner for assistant messages */}
        {msg.responseData?.warning && (
          <div className={`mb-2 px-3 py-2 rounded-lg text-xs font-medium ${
            msg.responseData.severity === 'emergency'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            <AlertTriangle className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
            {msg.responseData.warning}
          </div>
        )}

        {/* Message content */}
        <div className={`rounded-2xl px-4 py-3 ${
          msg.role === 'assistant'
            ? 'bg-white border border-gray-100 premium-shadow-sm text-gray-800'
            : `bg-care-500 text-white`
        }`}>
          <div className="text-sm whitespace-pre-line leading-relaxed">
            {msg.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-semibold text-base mb-2">{line.slice(2, -2)}</p>;
              }
              if (line.startsWith('•')) {
                return <p key={i} className="ml-3 mb-1">{line}</p>;
              }
              if (line.trim() === '') {
                return <div key={i} className="h-2" />;
              }
              return <p key={i} className="mb-1">{line}</p>;
            })}
          </div>

          {/* Action buttons for assistant messages */}
          {msg.role === 'assistant' && msg.responseData?.actions && (
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
              {msg.responseData.actions.map((action, i) => (
                <ActionButton key={i} action={action} />
              ))}
            </div>
          )}
        </div>

        {/* Footer: timestamp + action buttons */}
        <div className={`flex items-center gap-2 mt-1.5 px-1 ${
          msg.role === 'user' ? 'flex-row-reverse' : ''
        }`}>
          <span className={`text-[10px] ${msg.role === 'assistant' ? 'text-gray-400' : 'text-care-300'}`}>
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          {msg.role === 'assistant' && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
                aria-label={t('assistant.copyResponse')}
                title={t('assistant.copyResponse')}
              >
                {copied ? (
                  <Check className="w-3 h-3 text-success" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                )}
              </button>
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  aria-label={t('assistant.regenerateResponse')}
                  title={t('assistant.regenerateResponse')}
                >
                  <RefreshCw className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Component
// ============================================================

export default function AIAssistant() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = useCallback((content) => {
    const text = (content || input).trim();
    if (!text) return;

    setHasStarted(true);

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = getAIResponse(text);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseData.text,
        timestamp: new Date(),
        responseData,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1400 + Math.random() * 600);
  }, [input]);

  const handleRegenerate = useCallback((msgId) => {
    // Find the user message that prompted this response
    const msgIndex = messages.findIndex((m) => m.id === msgId);
    if (msgIndex < 0) return;

    // Look back for the preceding user message
    let userMsgIndex = msgIndex - 1;
    while (userMsgIndex >= 0 && messages[userMsgIndex].role !== 'user') {
      userMsgIndex--;
    }
    if (userMsgIndex < 0) return;

    const userText = messages[userMsgIndex].content;
    setIsTyping(true);

    // Remove the current assistant message and regenerate
    setMessages((prev) => prev.slice(0, msgIndex));

    setTimeout(() => {
      const responseData = getAIResponse(userText);
      const newMsg = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseData.text,
        timestamp: new Date(),
        responseData,
      };
      setMessages((prev) => [...prev, newMsg]);
      setIsTyping(false);
    }, 1000);
  }, [messages]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ============================================================ */}
          {/* SIDEBAR */}
          {/* ============================================================ */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-5">
            {/* Quick Questions */}
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-care-500" />
                {t('assistant.quickQuestions')}
              </h3>
              <div className="space-y-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q.key}
                    onClick={() => handleSend(t(q.key))}
                    className="w-full text-left text-xs text-gray-600 hover:text-care-600 bg-slate-50 hover:bg-care-50 px-3 py-2.5 rounded-xl transition-all border border-gray-100 hover:border-care-200 group"
                  >
                    <span className="group-hover:translate-x-0.5 inline-block transition-transform">{t(q.key)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Healthcare Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-care-500" />
                {t('assistant.healthcareTopics')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.labelKey}
                      onClick={() => handleSend(`${t('assistant.tellMeAbout')} ${t(cat.labelKey).toLowerCase()}`)}
                      className={`${cat.gradient} rounded-xl p-3 text-center hover:shadow-sm transition-all group border border-transparent hover:border-gray-200`}
                    >
                      <div className={`w-7 h-7 rounded-lg ${cat.iconBg} flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[10px] font-medium text-gray-700">{t(cat.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow p-5 space-y-3">
              <Link to="/emergency"
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 text-emergency font-medium text-sm hover:from-red-100 hover:to-orange-100 transition-all border border-red-100">
                <AlertTriangle className="w-4 h-4" />
                {t('assistant.linkEmergency')}
                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              </Link>
              <Link to="/search"
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-care-50 text-care-600 font-medium text-sm hover:bg-care-100 transition-all border border-care-100">
                <MapPin className="w-4 h-4" />
                {t('assistant.linkFindCare')}
                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              </Link>
              <Link to="/language"
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-teal-50 text-teal-600 font-medium text-sm hover:bg-teal-100 transition-all border border-teal-100">
                <Globe className="w-4 h-4" />
                {t('assistant.linkTranslate')}
                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CHAT INTERFACE */}
          {/* ============================================================ */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow-lg overflow-hidden flex flex-col h-[600px] lg:h-[75vh]">
              {/* Chat Header */}
              <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-care-50 to-blue-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900">{t('assistant.title')}</h2>
                  <p className="text-[11px] text-gray-500">{t('assistant.subtitle')}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-[11px] text-green-700 font-medium hidden sm:inline">{t('assistant.online')}</span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto scroll-smooth bg-gradient-to-b from-white to-slate-50" role="log" aria-live="polite" aria-label="Chat messages">
                {/* Empty State / Onboarding */}
                {!hasStarted && (
                  <div className="h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-care-500/20 animate-float">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{t('assistant.emptyTitle')}</h2>
                    <p className="text-sm text-gray-500 max-w-md mb-6">
                      {t('assistant.emptyDesc')}
                    </p>

                    {/* Suggested Prompts */}
                    <div className="w-full max-w-lg">
                      <p className="text-xs font-medium text-gray-400 mb-3">{t('assistant.tryAsking')}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['assistant.quickQ1', 'assistant.quickQ2', 'assistant.quickQ3', 'assistant.quickQ4', 'assistant.quickQ5', 'assistant.quickQ6'].map((key, idx) => (
                          <button
                            key={key}
                            onClick={() => handleSend(t(key))}
                            className="text-left text-xs text-gray-600 bg-slate-50 hover:bg-care-50 hover:text-care-600 px-3.5 py-2.5 rounded-xl border border-gray-100 hover:border-care-200 transition-all group"
                          >
                            <span className="group-hover:translate-x-0.5 inline-block transition-transform">{t(key)}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Chips */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.labelKey}
                            onClick={() => handleSend(`${t('assistant.tellMeAbout')} ${t(cat.labelKey).toLowerCase()}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-medium hover:bg-care-50 hover:border-care-200 hover:text-care-600 transition-all"
                          >
                            <Icon className="w-3 h-3" />
                            {t(cat.labelKey)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Chat Messages */}
                {hasStarted && (
                  <div className="p-4 sm:px-6 space-y-4">
                    {messages.map((msg) => (
                      <MessageBubble
                        key={msg.id}
                        msg={msg}
                        onRegenerate={msg.role === 'assistant' ? () => handleRegenerate(msg.id) : undefined}
                      />
                    ))}

                    {isTyping && <TypingIndicator />}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-white">
                <div className="flex gap-3 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('assistant.inputPlaceholder')}
                      rows={1}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all resize-none text-gray-900 text-sm placeholder:text-gray-400"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-medium shadow-lg shadow-care-500/25 hover:shadow-care-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label={t('assistant.sendMessage')}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                {/* Trust & Safety Banner */}
                <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-100">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    {t('assistant.disclaimer')} <a href="tel:108" className="font-bold underline">108</a> ({t('assistant.disclaimerOr')}) <a href="tel:112" className="font-bold underline">112</a> ({t('assistant.disclaimerNational')}).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
