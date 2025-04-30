import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/theme';

const ContactForm = () => {
  const { isDark } = useThemeStore();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
    alert('Your message has been sent successfully!');
    
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const isLabelFloating = (field: string): boolean => {
    const value = formState[field as keyof typeof formState];
    const isFocused = focused[field as keyof typeof focused];
    return !!value || isFocused;
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const inputClasses = `w-full px-4 py-3 border-b-2 ${
    isDark 
      ? 'border-gray-600 focus:border-primary bg-transparent text-white' 
      : 'border-gray-300 focus:border-primary bg-transparent text-dark'
  } outline-none transition-all duration-300`;

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-6 relative" variants={itemVariants}>
        <label 
          htmlFor="name" 
          className={`absolute transition-all duration-300 pointer-events-none ${
            isLabelFloating('name') 
              ? '-top-2.5 left-0 text-xs text-primary' 
              : 'top-3 left-4 text-gray-500'
          }`}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          onFocus={() => handleFocus('name')}
          onBlur={() => handleBlur('name')}
          className={inputClasses}
          required
        />
      </motion.div>
      
      <motion.div className="mb-6 relative" variants={itemVariants}>
        <label 
          htmlFor="email" 
          className={`absolute transition-all duration-300 pointer-events-none ${
            isLabelFloating('email') 
              ? '-top-2.5 left-0 text-xs text-primary' 
              : 'top-3 left-4 text-gray-500'
          }`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
          className={inputClasses}
          required
        />
      </motion.div>
      
      <motion.div className="mb-6 relative" variants={itemVariants}>
        <label 
          htmlFor="subject" 
          className={`absolute transition-all duration-300 pointer-events-none ${
            isLabelFloating('subject') 
              ? '-top-2.5 left-0 text-xs text-primary' 
              : 'top-3 left-4 text-gray-500'
          }`}
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          onFocus={() => handleFocus('subject')}
          onBlur={() => handleBlur('subject')}
          className={inputClasses}
          required
        />
      </motion.div>
      
      <motion.div className="mb-6 relative" variants={itemVariants}>
        <label 
          htmlFor="message" 
          className={`absolute transition-all duration-300 pointer-events-none ${
            isLabelFloating('message') 
              ? '-top-2.5 left-0 text-xs text-primary' 
              : 'top-3 left-4 text-gray-500'
          }`}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          onFocus={() => handleFocus('message')}
          onBlur={() => handleBlur('message')}
          className={`${inputClasses} min-h-[120px] resize-y`}
          required
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.button
          type="submit"
          className="w-full py-3 px-6 bg-primary text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;