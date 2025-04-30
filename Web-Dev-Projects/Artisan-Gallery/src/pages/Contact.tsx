import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import ContactForm from '../components/contact/ContactForm';
import Map from '../components/contact/Map';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useThemeStore } from '../store/theme';

const Contact = () => {
  const { isDark } = useThemeStore();

  const infoItems = [
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      title: "Email",
      content: "amitssahu199@gmail.com",
      link: "mailto:amitssahu199@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      title: "Phone",
      content: "+91 9868619498",
      link: "tel:+919868619498"
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      title: "Address",
      content: "UPES, Bidholi, Dehradun, Uttarakhand 248007",
      link: "https://maps.google.com/?q=UPES,+Bidholi,+Dehradun,+Uttarakhand+248007"
    },
    {
      icon: <Clock className="w-5 h-5 text-primary" />,
      title: "Hours",
      content: "Tuesday–Sunday, 10AM–6PM",
      link: null
    }
  ];

  const containerVariants = {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PageTransition>
      <section className={`pt-32 pb-24 px-4 min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-dark' : 'bg-light'
      }`}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Contact Us" 
              className={`text-5xl md:text-6xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h1"
            />
            <AnimatedText 
              text="Get in touch with our team"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              delay={0.3}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.div 
                className={`${
                  isDark ? 'bg-dark-lighter' : 'bg-white'
                } p-8 rounded-lg shadow-md mb-8 transition-colors duration-300`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className={`text-2xl font-display font-medium mb-6 ${
                  isDark ? 'text-white' : 'text-dark'
                }`}>Contact Information</h2>
                
                <div className="space-y-6">
                  {infoItems.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className={`font-medium text-lg ${
                          isDark ? 'text-white' : 'text-dark'
                        }`}>{item.title}</h3>
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className={`${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            } hover:text-primary transition-colors duration-300`}
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            {item.content}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <Map />
            </div>
            
            <div className={`${
              isDark ? 'bg-dark-lighter' : 'bg-white'
            } p-8 rounded-lg shadow-md transition-colors duration-300`}>
              <h2 className={`text-2xl font-display font-medium mb-6 ${
                isDark ? 'text-white' : 'text-dark'
              }`}>Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <section className={`py-16 px-4 ${
        isDark ? 'bg-dark-lighter' : 'bg-dark'
      } text-white transition-colors duration-300`}>
        <div className="container mx-auto max-w-5xl text-center">
          <AnimatedText 
            text="Visit Our Gallery" 
            className="text-3xl md:text-4xl font-display font-medium mb-4"
            tag="h2"
          />
          <AnimatedText 
            text="Experience our collection in person and join us for upcoming events and exhibitions"
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            delay={0.3}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Gallery Tours",
                description: "Join our expert guides for an insightful tour of current exhibitions",
                time: "Every Saturday at 2PM"
              },
              {
                title: "Artist Talks",
                description: "Hear directly from featured artists about their work and process",
                time: "First Friday each month"
              },
              {
                title: "Art Workshops",
                description: "Develop your skills in various media with our experienced instructors",
                time: "Check calendar for schedule"
              }
            ].map((event, index) => (
              <motion.div 
                key={index}
                className={`${
                  isDark ? 'bg-dark' : 'bg-gray-800/50'
                } p-6 rounded-lg`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-xl font-display font-medium mb-3">{event.title}</h3>
                <p className="text-gray-300 mb-3">{event.description}</p>
                <p className="text-primary text-sm font-medium">{event.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;