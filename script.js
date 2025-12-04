// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu")
  navMenu.classList.toggle("active")
}

// Close mobile menu when link is clicked
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active")
  })
})

// Hero Canvas Animation
function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  const particleCount = 50

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.size = Math.random() * 2 + 1
      this.opacity = Math.random() * 0.5 + 0.2
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0) this.x = canvas.width
      if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      if (this.y > canvas.height) this.y = 0
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    drawConnections()
    requestAnimationFrame(animate)
  }

  initParticles()
  animate()

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animation observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all sections for scroll animations
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0"
    observer.observe(section)
  })

  // Observe property cards
  document.querySelectorAll(".property-card").forEach((card) => {
    card.style.opacity = "0"
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)"
    })
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
    })
  })

  initHeroCanvas()
  renderFeaturedProperties()
  initCarousel()
  initTestimonials()
  initChatbot()
})

// Carousel functionality
let currentCarouselIndex = 0
let autoRotateInterval

function initCarousel() {
  const container = document.getElementById("propertiesCarousel")
  const items = PROPERTIES_DATA.slice(0, 2)

  container.innerHTML = items
    .map(
      (prop, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${prop.image}" alt="${prop.title}">
            <div class="carousel-info">
                <h3>${prop.title}</h3>
                <p>${prop.location} • ${prop.priceFormatted}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

function nextProperty() {
  const items = document.querySelectorAll(".carousel-item")
  items.forEach((item) => {
    item.classList.remove("active", "prev")
    item.style.opacity = "0"
  })

  currentCarouselIndex = (currentCarouselIndex + 1) % items.length
  items[currentCarouselIndex].classList.add("active")
  items[currentCarouselIndex].style.opacity = "1"

  if (currentCarouselIndex > 0) {
    items[currentCarouselIndex - 1].classList.add("prev")
    items[currentCarouselIndex - 1].style.opacity = "0.3"
  }
}

function previousProperty() {
  const items = document.querySelectorAll(".carousel-item")
  items.forEach((item) => {
    item.classList.remove("active", "prev")
    item.style.opacity = "0"
  })

  currentCarouselIndex = currentCarouselIndex === 0 ? items.length - 1 : currentCarouselIndex - 1
  items[currentCarouselIndex].classList.add("active")
  items[currentCarouselIndex].style.opacity = "1"

  if (currentCarouselIndex > 0) {
    items[currentCarouselIndex - 1].classList.add("prev")
    items[currentCarouselIndex - 1].style.opacity = "0.3"
  }
}

// Auto-rotate carousel with pause on hover
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    nextProperty()
  }, 6000)
}

function stopAutoRotate() {
  clearInterval(autoRotateInterval)
}

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("propertiesCarousel")
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoRotate)
    carousel.addEventListener("mouseleave", startAutoRotate)
  }
})

// Render featured properties
function renderFeaturedProperties() {
  const container = document.getElementById("featuredProperties")
  if (!container) return

  const featured = PROPERTIES_DATA.slice(0, 3)
  container.innerHTML = featured
    .map(
      (prop) => `
        <div class="property-card">
            <img src="${prop.image}" alt="${prop.title}">
            <div class="property-info">
                <h3 class="property-title">${prop.title}</h3>
                <p class="property-location">${prop.location}</p>
                <div class="property-stats">
                    <div class="stat">
                        <div class="stat-value">${prop.beds}</div>
                        <div class="stat-label">Beds</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${prop.baths}</div>
                        <div class="stat-label">Baths</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${(prop.area / 1000).toFixed(1)}k</div>
                        <div class="stat-label">Sq.Ft</div>
                    </div>
                </div>
                <div class="property-footer">
                    <span class="property-price">${prop.priceFormatted}</span>
                    <a href="property-detail.html?id=${prop.id}" class="btn btn-primary property-btn">View Details</a>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Initialize testimonials
const TESTIMONIALS_DATA = [
  { rating: 5, text: "Absolutely loved the service!", author: "John Doe", role: "Customer" },
  { rating: 4, text: "Great experience overall.", author: "Jane Smith", role: "Investor" },
  { rating: 5, text: "Highly recommend!", author: "Alice Johnson", role: "Tenant" },
]

function initTestimonials() {
  const container = document.getElementById("testimonials")
  if (!container) return

  container.innerHTML = TESTIMONIALS_DATA.map(
    (testimonial) => `
        <div class="testimonial-card">
            <div class="stars">${"★".repeat(testimonial.rating)}${"☆".repeat(5 - testimonial.rating)}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">${testimonial.author}</p>
            <p class="testimonial-role">${testimonial.role}</p>
        </div>
    `,
  ).join("")
}

// Chatbot functionality
const CHATBOT_KNOWLEDGE = {
  faqs: [
    {
      question: "What areas do you cover?",
      answer:
        "We specialize in luxury properties across Nigeria, particularly in prestigious areas like Ikoyi, Victoria Island, Lekki, Abuja, and other high-end neighborhoods.",
    },
    {
      question: "What is the price range?",
      answer:
        "Our properties range from ₦150 million to over ₦1 billion+, depending on location, size, and amenities. We cater to diverse luxury real estate needs.",
    },
    {
      question: "Do you offer financing assistance?",
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
      question: "Do you provide property management?",
      answer:
        "Yes! We offer comprehensive property management services including tenant management, maintenance, and rent collection.",
    },
    {
      question: "What makes your properties unique?",
      answer:
        "All our properties are handpicked for their exceptional location, architectural design, modern amenities, and investment potential.",
    },
    {
      question: "How can I schedule a viewing?",
      answer:
        "You can schedule a consultation through our website or WhatsApp. Contact us at +2348155931801 for immediate assistance.",
    },
  ],
}

const PRESET_QUESTIONS = [
  "What areas do you cover?",
  "How can I schedule a viewing?",
  "What is your contact information?",
  "Do you offer investment properties?",
]

let messages = [
  {
    id: "1",
    text: "Hello! I'm the Ascent Luxury Residences Assistant. Ask me anything about our properties and services!",
    sender: "bot",
    timestamp: new Date(),
  },
]

function initChatbot() {
  const presetContainer = document.getElementById("presetButtons")
  if (presetContainer) {
    presetContainer.innerHTML = PRESET_QUESTIONS.map(
      (q, i) => `<button class="preset-btn" onclick="handlePresetQuestion('${q}')">${q}</button>`,
    ).join("")
  }
  renderChatMessages()
}

function toggleChatbot() {
  const window = document.getElementById("chatbotWindow")
  window.classList.toggle("active")
}

function renderChatMessages() {
  const container = document.getElementById("chatMessages")
  if (!container) return

  container.innerHTML = messages
    .map(
      (msg) => `
        <div class="message ${msg.sender}">
            <div class="message-content">${msg.text}</div>
        </div>
    `,
    )
    .join("")

  container.scrollTop = container.scrollHeight
}

function findBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase()

  for (const faq of CHATBOT_KNOWLEDGE.faqs) {
    if (
      lowerMessage.includes(faq.question.toLowerCase().split(" ")[0]) ||
      faq.question.toLowerCase().includes(lowerMessage.split(" ")[0])
    ) {
      return faq.answer
    }
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("phone")) {
    return "You can reach us at +2348155931801 or email ekanezemonday@gmail.com. For immediate chat, use WhatsApp!"
  }

  if (lowerMessage.includes("service") || lowerMessage.includes("offer")) {
    return "We offer: Property Acquisition, Investment Advisory, and Property Management services. Which interests you most?"
  }

  return "For detailed information, please contact our team at +2348155931801 or WhatsApp us for a quick response."
}

function sendChatMessage() {
  const input = document.getElementById("userInput")
  if (!input.value.trim()) return

  messages.push({
    id: Date.now().toString(),
    text: input.value,
    sender: "user",
    timestamp: new Date(),
  })

  input.value = ""
  renderChatMessages()

  // Show typing indicator
  const typingMsg = {
    id: "typing",
    text: "...",
    sender: "bot",
    timestamp: new Date(),
    typing: true,
  }
  messages.push(typingMsg)
  renderChatMessages()

  setTimeout(() => {
    messages = messages.filter((m) => m.id !== "typing")
    const lastUserMsg = messages[messages.length - 1]
    messages.push({
      id: (Date.now() + 1).toString(),
      text: findBotResponse(lastUserMsg.text),
      sender: "bot",
      timestamp: new Date(),
    })
    renderChatMessages()
  }, 800)
}

function handleChatKeypress(event) {
  if (event.key === "Enter") {
    sendChatMessage()
  }
}

function handlePresetQuestion(question) {
  document.getElementById("userInput").value = question
  sendChatMessage()
}

function openWhatsAppChat() {
  window.open(
    "https://wa.me/2348155931801?text=Hello%2C%20I%20need%20personal%20assistance%20with%20your%20luxury%20properties.",
    "_blank",
  )
}

// Show/hide modals
function showSuccessModal(title, message) {
  const modal = document.getElementById("successModal")
  if (modal) {
    document.getElementById("modalTitle").textContent = title
    document.getElementById("modalMessage").textContent = message
    modal.classList.add("active")

    setTimeout(() => {
      modal.classList.remove("active")
    }, 4000)
  }
}

// Handle form submissions
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      showSuccessModal("Success!", "Your message has been received. We will get back to you shortly!")
      form.reset()
    })
  })
})

const PROPERTIES_DATA = [
  {
    id: 1,
    image: "property1.jpg",
    title: "Property 1",
    location: "Ikoyi",
    priceFormatted: "₦150 million",
    beds: 3,
    baths: 2,
    area: 2000,
  },
  {
    id: 2,
    image: "property2.jpg",
    title: "Property 2",
    location: "Victoria Island",
    priceFormatted: "₦200 million",
    beds: 4,
    baths: 3,
    area: 2500,
  },
  {
    id: 3,
    image: "property3.jpg",
    title: "Property 3",
    location: "Lekki",
    priceFormatted: "₦250 million",
    beds: 5,
    baths: 4,
    area: 3000,
  },
  {
    id: 4,
    image: "property4.jpg",
    title: "Property 4",
    location: "Abuja",
    priceFormatted: "₦300 million",
    beds: 6,
    baths: 5,
    area: 3500,
  },
  {
    id: 5,
    image: "property5.jpg",
    title: "Property 5",
    location: "High-end Neighborhood",
    priceFormatted: "₦350 million",
    beds: 7,
    baths: 6,
    area: 4000,
  },
]
