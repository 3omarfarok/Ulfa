import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaWhatsapp, FaHeart, FaMoon, FaSun, FaBars, FaGift, FaMagic, FaStar, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa'
import { useForm } from 'react-hook-form'


function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-warm z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-6xl text-primary"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        🧶
      </motion.div>
      <motion.h2
        className="text-2xl font-bold text-primary ml-4"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Ulfa Crochet
      </motion.h2>
    </motion.div>
  )
}

function Header({ isDarkMode, toggleTheme, isMobileMenuOpen, toggleMobileMenu }) {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center h-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-primary w-1/4"
          >
            Ulfa Crochet
          </motion.h1>

          <button
            className="md:hidden text-2xl text-primary absolute right-4"
            onClick={toggleMobileMenu}
          >
            <FaBars />
          </button>

          <div className="hidden md:flex items-center justify-center w-2/4">
            <div className="flex gap-8">
              <a href="#makers" className="nav-link">Crocheters</a>
              <a href="#products" className="nav-link">Products</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>

          <div className="hidden md:flex justify-end w-1/4">
            <button
              className="text-xl hover:text-primary transition-colors"
              onClick={toggleTheme}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col items-center gap-6 absolute top-20 left-0 w-full bg-white dark:bg-dark p-4 shadow-lg`}>
            <a href="#about" className="nav-link">About</a>
            <a href="#makers" className="nav-link">Makers</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button
              className="text-xl hover:text-primary transition-colors"
              onClick={toggleTheme}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

function ProductCard({ product, index }) {
  const shareMessage = (platform) => {
    const message = `I'm interested in ordering ${product.title} from Ulfa Crochet!`;
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/+201147825907?text=${encodeURIComponent(message)} (via WhatsApp)`);
    } else if (platform === 'instagram') {
      window.open('https://instagram.com/0mar_far0k/');
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-dark rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">{product.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => shareMessage('whatsapp')}
            className="text-2xl text-green-500 hover:scale-110 transition-transform"
          >
            <FaWhatsapp />
          </button>
          <button
            onClick={() => shareMessage('instagram')}
            className="text-2xl text-pink-500 hover:scale-110 transition-transform"
          >
            <FaInstagram />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      className="bg-white dark:bg-dark rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="text-4xl text-primary mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

// Main App component
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const onSubmit = (data) => {
    console.log(data)
    setIsMessageSent(true)
    reset()
    setTimeout(() => setIsMessageSent(false), 3000)
  }

  const products = [
    {
      image: "../ulfa/public/8.jpg",
      title: "amigurumi pet turtle",
      description: "Slow and steady wins hearts! 🐢✨ Meet our handmade amigurumi pet turtle"
    },
    {
      image: "../ulfa/public/4.jpg",
      title: "Crochet Cardigan",
      description: "Elevate your winter wardrobe with this vintage-inspired granny square coat!"
    },
    {
      image: "../ulfa/public/7.jpg",
      title: "Mr roboty",
      description: "Soft, cuddly, and ready to compute endless hugs!"
    },
    {
      image: "../ulfa/public/11.jpg",
      title: "EID Diary",
      description: "Stylish crochet wear for all occasions! Perfect for any outfit."
    },
    {
      image: "../ulfa/public/5.jpg",
      title: "heart crochet bag",
      description: "Our black-and-white bag is perfect for carrying style and charm wherever you go!"
    },
    {
      image: "../ulfa/public/10.jpg",
      title: "chunky crochet bag",
      description: "The perfect blend of handmade charm & modern style for your everyday adventures!"
    }
  ]

  const features = [
    {
      image: "../ulfa/public/10.jpg",
      label: "Best Seller",
      description: "Our most loved creations"
    },
    {
      image: "../ulfa/public/11.jpg",
      label: "New Arrival",
      description: "Fresh designs just added"
    }
  ]

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-warm dark:bg-dark text-gray-900 dark:text-white">
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-primary font-medium">🧶 Handcrafted with Love</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 animate-float drop-shadow-lg">
              Discover Handmade Magic
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Each piece tells a story of love, creativity, and dedication to the art of crochet.
              Our creations bring warmth and joy to your everyday life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.a
                href="#products"
                className="btn shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Collection
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>

            {/* Featured Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-2xl overflow-hidden shadow-lg group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <span className="text-white font-semibold text-lg">{feature.label}</span>
                    <span className="text-white/80 text-sm">{feature.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={FaGift}
                title="Unique Gifts"
                description="Perfect for special occasions and thoughtful presents"
                delay={0.6}
              />
              <FeatureCard
                icon={FaMagic}
                title="Custom Orders"
                description="Personalized creations tailored to your preferences"
                delay={0.7}
              />
              <FeatureCard
                icon={FaStar}
                title="Quality Craftsmanship"
                description="Made with premium materials and attention to detail"
                delay={0.8}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* [Rest of the sections remain unchanged] */}
      <section id="makers" className="py-20 bg-white/50 dark:bg-dark/50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Meet the Crocheters</h2>
          <p className="section-subtitle">The creative minds behind Ulfa Crochet</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              className="bg-white dark:bg-dark/80 rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="../ulfa/public/Aml.png"
                alt="Amal Rashwan"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary text-center mb-2">Amal Rashwan</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Creative designer with a passion for color combinations and innovative crochet patterns. Brings modern twist to traditional techniques.

              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-dark/80 rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="../ulfa/public/Eman2.png"
                alt="Eman Emad"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-primary text-center mb-2">Eman Emad</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Master crocheter with over 10 years of experience. Specializes in creating unique patterns and teaching crochet techniques.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-white/50 dark:bg-dark/50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Creations</h2>
          <p className="section-subtitle">Each piece is uniquely handcrafted with love and care</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 bg-white/30 dark:bg-dark/30">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">We'd love to hear from you</p>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.a
                href="https://instagram.com//0mar_far0k/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-primary hover:text-secondary transition-colors bg-white dark:bg-dark/80 p-4 rounded-lg shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <FaInstagram className="text-3xl" />
                <div className="text-left">
                  <div className="font-semibold">Follow Us</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">@__ulfa99__</div>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/+201147825907"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-primary hover:text-secondary transition-colors bg-white dark:bg-dark/80 p-4 rounded-lg shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <FaWhatsapp className="text-3xl" />
                <div className="text-left">
                  <div className="font-semibold">Chat with Us</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">+20 114 782 5907</div>
                </div>
              </motion.a>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-dark/80 p-8 rounded-xl shadow-lg">
              <div>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('name', { required: "Name is required" })}
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
              </div>

              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('email', {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="Your Email"
                    type="email"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
              </div>

              <div>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-4 text-gray-400" />
                  <input
                    {...register('phone', {
                      pattern: {
                        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                        message: "Invalid phone number"
                      }
                    })}
                    placeholder="Your Phone (optional)"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>}
              </div>

              <div>
                <textarea
                  {...register('message', { required: "Message is required" })}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>}
              </div>

              <motion.button
                type="submit"
                className="btn w-full shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>

              <AnimatePresence>
                {isMessageSent && (
                  <motion.p
                    className="text-center text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Message sent successfully! 🧶
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">About Ulfa Crochet</h3>
              <p className="text-gray-600 dark:text-gray-400">Made with love and a lot of time and repetition</p>
              <p className="text-gray-600 dark:text-gray-400">Delivering handmade happiness to all parts of Egypt</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-400">Email: info@ulfa.com</p>
              <p className="text-gray-600 dark:text-gray-400">WhatsApp: +20 114 782 5907</p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://wa.me/+201147825907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-primary hover:text-secondary transition-colors"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://instagram.com/__ulfa99__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-primary hover:text-secondary transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">Follow Us</h3>
              <p className="text-gray-600 dark:text-gray-400">Stay updated with our latest creations and stories on social media</p>
            </div>
          </div>

          <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
              Made with love and a lot of time and repetition
              <FaHeart className="text-primary" />
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              © 2024 Ulfa Crochet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App