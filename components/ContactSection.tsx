'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Phone, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    streetAddress: '',
    enquiry: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request / loading animation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', address: '', streetAddress: '', enquiry: '' });
    }, 3000);
  };

  // Explicitly typed Framer Motion Variants to remove any IDE/Linter errors
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const inputVariants: Variants = {
    focus: { scale: 1.01, borderColor: 'rgba(214, 158, 46, 0.8)', boxShadow: '0 0 12px rgba(214, 158, 46, 0.2)' }
  };

  return (
    <section 
      id='contact'
      className="relative min-h-screen w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.6)), url('/contact-bg.webp')`,
      }}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* Left Side: Content & Branding - Fully Responsive Layout & Centralized Alignments */}
        <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 text-white w-full">
          <div className="space-y-4 w-full flex flex-col items-center lg:items-start">
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight w-full"
            >
              Let us resolve your matters<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                quickly, lawfully, confidently
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0"
            >
              Meet us in Manchester or book a remote consultation from anywhere in the UK. We handle property, legal, banking, taxation, and documentation cases with our sole responsibility.
            </motion.p>
          </div>

          {/* Premium Bullet points with smooth hover offsets */}
          <motion.ul 
            variants={itemVariants} 
            className="space-y-4 text-sm sm:text-base text-gray-200 text-left w-full max-w-xl lg:max-w-none"
          >
            {[
              "UK based consultation, India-side representation",
              "Clear timelines, transparent communication, lawful resolution",
              "Secure handling of documents and confidential information"
            ].map((text, idx) => (
              <motion.li 
                key={idx} 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500 ring-4 ring-amber-500/20 shrink-0" />
                <span className="group-hover:text-amber-400 transition-colors duration-200">{text}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Contact Actions (Buttons) */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center lg:justify-start max-w-md sm:max-w-xl lg:max-w-none"
          >
            <a 
              href="tel:07941485199" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-sm transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 mr-2 stroke-[2.5]" />
              Call UK: 07941 485199
            </a>
            <a 
              href="mailto:info@innerworkadvisors.co.uk" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-600/50 bg-white/5 hover:bg-white/10 text-white font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 mr-2" />
              info@innerworkadvisors.co.uk
            </a>
          </motion.div>
        </div>

        {/* Right Side: Premium Glassmorphic Form Container */}
        <motion.div 
          className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto"
          variants={itemVariants}
        >
          <div className="relative p-6 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-2xl overflow-hidden group">
            
            {/* Glossy top border line effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-5 text-white"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Full Name *</label>
                    <motion.input 
                      type="text" required name="fullName" value={formData.fullName} onChange={handleInputChange}
                      variants={inputVariants} whileFocus="focus"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <motion.input 
                        type="email" required name="email" value={formData.email} onChange={handleInputChange}
                        variants={inputVariants} whileFocus="focus"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <motion.input 
                        type="tel" required name="phone" value={formData.phone} onChange={handleInputChange}
                        variants={inputVariants} whileFocus="focus"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Address Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <motion.input 
                          type="text" name="address" placeholder="Search address..." value={formData.address} onChange={handleInputChange}
                          variants={inputVariants} whileFocus="focus"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Street Address</label>
                      <motion.input 
                        type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange}
                        variants={inputVariants} whileFocus="focus"
                        className="w-full px-4 py-2.5 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Enquiry */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Please Enter Your Enquiry *</label>
                    <motion.textarea 
                      required name="enquiry" rows={3} value={formData.enquiry} onChange={handleInputChange}
                      variants={inputVariants} whileFocus="focus"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors resize-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Submit Button with Loading Animation */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm sm:text-base flex items-center justify-center transition-all duration-300 overflow-hidden shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex items-center space-x-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Request...</span>
                      </motion.div>
                    ) : (
                      <span>Send Your Request</span>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                /* Success Feedback State Card */
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-16 h-16 text-amber-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                  <p className="text-gray-300 max-w-sm text-sm sm:text-base">
                    Your enquiry has been securely submitted. One of our advisors will connect with you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}