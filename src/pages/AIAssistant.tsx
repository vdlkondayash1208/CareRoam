import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SupportMessage } from '../data/sampleData';

const aiResponses: Record<string, string> = {
  fever: "If you have a fever while traveling:\n\n1. **Rest and hydrate** - Drink plenty of water\n2. **Take antipyretics** like paracetamol (if not allergic)\n3. **Monitor your temperature** - seek help if >102°F (39°C)\n4. **Visit a nearby doctor** for persistent fever\n\nℹ️ CareRoam is currently onboarding healthcare providers. Once verified partners join, I'll be able to help you find nearby care. In the meantime, please visit a local clinic or call 108 for emergencies.",
  headache: "For headaches while traveling:\n\n1. **Rest in a quiet, dark room**\n2. **Stay hydrated** - dehydration is a common cause\n3. **Over-the-counter pain relief** like ibuprofen\n4. **Check your blood pressure** if you have a monitor\n\nIf the headache is severe or accompanied by vision changes, please visit a doctor immediately.",
  stomach: "For stomach issues while traveling:\n\n1. **Stick to bland foods** - rice, bananas, toast\n2. **Stay hydrated** with ORS or clear fluids\n3. **Avoid spicy/oily food** until recovery\n4. **Carry basic medications** like antacids\n\n⚠️ Seek immediate help if you have: severe pain, blood in stool, or high fever.",
  injury: "For minor injuries while traveling:\n\n1. **Clean the wound** with antiseptic\n2. **Apply pressure** if bleeding\n3. **Bandage properly**\n4. **Check tetanus status**\n\nFor serious injuries, call an ambulance immediately (108) or visit the nearest emergency room.",
  "chest pain": "🚨 **CHEST PAIN IS A MEDICAL EMERGENCY** 🚨\n\nPlease call an ambulance immediately (108) or go to the nearest emergency room. Do not wait. Do not self-medicate.\n\nCommon emergency numbers:\n- Ambulance: **108**\n- National Emergency: **112**",
  allergy: "For allergic reactions:\n\n1. **Identify the allergen** and avoid it\n2. **Take antihistamines** if you have them\n3. **Apply cold compress** for skin reactions\n4. **Seek emergency care** if you have:\n   - Difficulty breathing\n   - Swelling of face/throat\n   - Severe rash\n\n⚠️ Anaphylaxis requires immediate medical attention!",
  default: "I'm here to help with your health-related travel questions! Here are some things I can help you with:\n\n🩺 **Common Health Issues**: Fever, headaches, stomach problems, injuries\n🚑 **Emergency Help**: Emergency contacts and what to do in urgent situations\n💊 **Medication Info**: General guidance on common travel medications\n🌐 **Translation Help**: Common medical phrases in Hindi, Telugu, and English\n\nℹ️ CareRoam is in validation phase — our provider directory is being built. I'll help find nearby care once providers are onboarded!\n\nWhat would you like to know more about?",
};

function getAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('chest pain') || lower.includes('heart attack')) return aiResponses['chest pain'];
  if (lower.includes('fever') || lower.includes('temperature')) return aiResponses.fever;
  if (lower.includes('headache') || lower.includes('migraine')) return aiResponses.headache;
  if (lower.includes('stomach') || lower.includes('vomit') || lower.includes('diarrhea') || lower.includes('food poisoning')) return aiResponses.stomach;
  if (lower.includes('injury') || lower.includes('cut') || lower.includes('wound') || lower.includes('bleeding') || lower.includes('fall')) return aiResponses.injury;
  if (lower.includes('allergy') || lower.includes('allergic') || lower.includes('rash') || lower.includes('itching')) return aiResponses.allergy;
  
  return aiResponses.default;
}

const quickQuestions = [
  'I have a fever, what should I do?',
  'I have a stomach issue, help!',
  'Find nearby hospitals',
  'What to do for an injury?',
  'I have a headache while traveling',
  'Emergency numbers',
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Welcome to CareRoam Health Assistant!\n\nI'm here to provide health guidance while you travel. Please note that CareRoam is currently in **validation phase** — our provider network is being built.\n\nYou can ask me about:\n\n• Common health issues and symptoms\n• Emergency contacts and procedures\n• Travel health tips and advice\n• Medical phrase translations\n\nℹ️ Once providers are onboarded, I'll be able to help you find nearby care. In the meantime, call **108** for ambulance or **112** for national emergencies.\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (content?: string) => {
    const text = (content || input).trim();
    if (!text) return;

    const userMessage: SupportMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMessage: SupportMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6 sticky top-28">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Questions</h3>
                <div className="space-y-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="w-full text-left text-sm text-gray-600 hover:text-care-600 bg-gray-50 hover:bg-care-50 px-3 py-2.5 rounded-xl transition-all border border-gray-100 hover:border-care-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Need Emergency Help?</h3>
                <Link
                  to="/emergency"
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-red-50 text-emergency font-medium text-sm hover:bg-red-100 transition-colors"
                >
                  <AlertCircle className="w-4 h-4" />
                  View Emergency Contacts
                </Link>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Find Nearby Care</h3>
                <Link
                  to="/search"
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-care-50 text-care-600 font-medium text-sm hover:bg-care-100 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Search Healthcare Providers
                </Link>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px] lg:h-[700px]">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-care-50 to-blue-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Travel Health Assistant</h2>
                  <p className="text-xs text-gray-500">AI-powered • Always here to help</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-xs text-green-700 font-medium">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'assistant'
                          ? 'bg-gradient-to-br from-care-500 to-care-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-gray-600" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                        msg.role === 'assistant'
                          ? 'bg-gray-50 border border-gray-100 text-gray-800'
                          : 'bg-care-500 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          msg.role === 'assistant' ? 'text-gray-400' : 'text-care-200'
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-care-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-care-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-care-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-gray-100 bg-white">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about your health while traveling..."
                      rows={1}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all resize-none text-gray-900 text-sm"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-medium shadow-lg shadow-care-500/25 hover:shadow-care-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  AI responses are for guidance only. In emergencies, call local emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
