"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const CHATBOT_KNOWLEDGE = {
  company: {
    name: "Luxury Real Estate Nigeria",
    location: "Nigeria",
    specialization: "Luxury residential properties",
    experience: "15+ years",
    contact: "+2348155931801",
    email: "ekanezemonday@gmail.com",
  },
  faqs: [
    {
      question: "What areas do you cover?",
      answer:
        "We specialize in luxury properties across Nigeria, particularly in prestigious areas like Ikoyi, Victoria Island, Lekki, Abuja, and other high-end neighborhoods.",
    },
    {
      question: "What is the price range of your properties?",
      answer:
        "Our properties range from ₦150 million to over ₦1 billion+, depending on location, size, and amenities. We cater to diverse luxury real estate needs.",
    },
    {
      question: "Do you offer property financing assistance?",
      answer:
        "Yes, we provide guidance on financing options and can connect you with trusted financial institutions that offer competitive rates for luxury property purchases.",
    },
    {
      question: "How long does the buying process take?",
      answer:
        "Typically, the process takes 4-8 weeks depending on documentation and inspections. We work efficiently to expedite your purchase without compromising on due diligence.",
    },
    {
      question: "Can I invest in properties for rental income?",
      answer:
        "We have excellent investment properties with strong rental yields. Our team provides detailed investment analysis and management options.",
    },
    {
      question: "Do you provide property management services?",
      answer:
        "Yes! We offer comprehensive property management services including tenant management, maintenance, and rent collection.",
    },
    {
      question: "What makes your properties unique?",
      answer:
        "All our properties are handpicked for their exceptional location, architectural design, modern amenities, and investment potential.",
    },
    {
      question: "How can I schedule a property viewing?",
      answer:
        "You can schedule a consultation through our website or WhatsApp. Contact us at +2348155931801 for immediate assistance.",
    },
    {
      question: "Do you handle international buyers?",
      answer:
        "Yes, we specialize in assisting international investors and buyers. Our team provides complete guidance through all stages of the process.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We offer property acquisition assistance, investment advisory, property management, market consultation, and comprehensive real estate solutions.",
    },
  ],
}

const PRESET_QUESTIONS = [
  "What areas do you cover?",
  "How can I schedule a viewing?",
  "What is your contact information?",
  "Do you offer investment properties?",
]

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Luxury Real Estate Assistant. Ask me anything about our properties and services!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const faq of CHATBOT_KNOWLEDGE.faqs) {
      if (
        lowerMessage.includes(faq.question.toLowerCase().split(" ")[0]) ||
        faq.question.toLowerCase().includes(lowerMessage.split(" ")[0])
      ) {
        return faq.answer
      }
    }

    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("call")) {
      return `You can reach us at ${CHATBOT_KNOWLEDGE.company.contact} or email ${CHATBOT_KNOWLEDGE.company.email}. For immediate chat, use WhatsApp!`
    }

    if (lowerMessage.includes("service") || lowerMessage.includes("offer")) {
      return `We offer: Property Acquisition, Investment Advisory, and Property Management services. Which interests you most?`
    }

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return `Our properties range from ₦150M to ₦1B+ depending on location and features. For specific pricing, let's schedule a consultation!`
    }

    if (lowerMessage.includes("location") || lowerMessage.includes("where")) {
      return `We specialize in Nigeria's premium areas: Ikoyi, Victoria Island, Lekki, Abuja, and other prestigious neighborhoods.`
    }

    if (lowerMessage.includes("view") || lowerMessage.includes("tour") || lowerMessage.includes("schedule")) {
      return `I'd be happy to help schedule a viewing! Please contact us at ${CHATBOT_KNOWLEDGE.company.contact} or use WhatsApp for quick booking.`
    }

    if (lowerMessage.includes("investment") || lowerMessage.includes("rental") || lowerMessage.includes("income")) {
      return `Excellent! We have fantastic investment properties with strong rental yields. Let's discuss your investment goals!`
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return `Welcome! I'm here to help you find your perfect luxury property. What would you like to know?`
    }

    if (lowerMessage.includes("thank")) {
      return `Happy to help! Is there anything else you'd like to know about our properties or services?`
    }

    if (lowerMessage.includes("need personal") || lowerMessage.includes("personal")) {
      return `For personalized assistance, our team is ready to help! Chat with us on WhatsApp at ${CHATBOT_KNOWLEDGE.company.contact} for a dedicated consultation.`
    }

    return `Great question! For detailed information, please contact our team at ${CHATBOT_KNOWLEDGE.company.contact} or WhatsApp us for a quick response.`
  }

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputValue("")
      setIsTyping(true)

      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: findBotResponse(userMessage.text),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      }, 800)
    }
  }

  const handlePresetQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBotResponse(question),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${CHATBOT_KNOWLEDGE.company.contact.replace(/\D/g, "")}?text=Hello%2C%20I%20need%20personal%20assistance%20with%20your%20luxury%20properties.`,
      "_blank",
    )
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-32 right-6 p-4 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Modern Redesigned Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-40 max-h-[75vh] sm:max-h-[600px] overflow-hidden">
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-5 flex justify-between items-center flex-shrink-0 rounded-t-2xl">
            <div>
              <h3 className="font-bold text-lg">Luxury Assistant</h3>
              <p className="text-xs text-amber-100">Instant support available</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area - Improved scrolling */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-3 rounded-xl text-sm break-words ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-br-none shadow-md"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-xl rounded-bl-none border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Questions - Better visibility */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0 max-h-48 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-600 mb-3">QUICK QUESTIONS</p>
              <div className="space-y-2">
                {PRESET_QUESTIONS.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handlePresetQuestion(question)}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg bg-gray-100 hover:bg-amber-50 transition-colors text-gray-700 font-medium truncate border border-gray-200 hover:border-amber-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area - Modern design */}
          <div className="border-t border-gray-200 p-4 space-y-3 flex-shrink-0 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:shadow-lg transition-all flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
            <button
              onClick={handleWhatsApp}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              💬 Chat on WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  )
}
