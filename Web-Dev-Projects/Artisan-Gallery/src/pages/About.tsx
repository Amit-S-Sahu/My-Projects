import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import RevealImage from '../components/ui/RevealImage';
import TimelineItem from '../components/about/TimelineItem';
import timelineEvents from '../data/timeline';
import { useThemeStore } from '../store/theme';

const About = () => {
  const { isDark } = useThemeStore();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <PageTransition>
      <section className={`pt-32 pb-16 px-4 transition-colors duration-300 ${
        isDark ? 'bg-dark' : 'bg-light'
      }`}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatedText 
                text="Our Story" 
                className={`text-5xl md:text-6xl font-display font-medium mb-6 ${
                  isDark ? 'text-white' : 'text-dark'
                }`}
                tag="h1"
              />
              <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <AnimatedText 
                  text="Founded in 2013, Artisan Gallery has grown from a small project into a leading destination for art lovers and collectors." 
                  delay={0.3}
                />
                <AnimatedText 
                  text="Our mission is to make exceptional art accessible to everyone and to support both emerging and established artists in their creative journey."
                  delay={0.4}
                />
                <AnimatedText 
                  text="We believe in the transformative power of art and its ability to inspire, challenge, and connect us all."
                  delay={0.5}
                />
              </div>
            </div>
            
            <RevealImage 
              src="https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=1280" 
              alt="Artisan Gallery exterior" 
              className="rounded-lg shadow-lg aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>
      
      <section className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? 'bg-dark-lighter' : 'bg-white'
      }`}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Our Values" 
              className={`text-4xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h2"
            />
            <AnimatedText 
              text="The principles that guide everything we do"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              delay={0.2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Artistic Excellence",
                description: "We showcase only the highest quality artworks that demonstrate exceptional skill, originality, and vision.",
                icon: "✨"
              },
              {
                title: "Inclusivity",
                description: "We believe art should be accessible to all, regardless of background, education, or experience.",
                icon: "🌍"
              },
              {
                title: "Innovation",
                description: "We embrace new ideas, techniques, and perspectives that push the boundaries of artistic expression.",
                icon: "💡"
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className={`${
                  isDark ? 'bg-dark' : 'bg-light'
                } p-8 rounded-lg text-center transition-colors duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="text-4xl mb-4 inline-block">{value.icon}</span>
                <h3 className={`text-xl font-display font-medium mb-3 ${
                  isDark ? 'text-white' : 'text-dark'
                }`}>{value.title}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className={`py-24 px-4 transition-colors duration-300 ${
        isDark ? 'bg-dark' : 'bg-light'
      }`}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Our Journey" 
              className={`text-4xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h2"
            />
            <AnimatedText 
              text="Key moments in the evolution of Artisan Gallery"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              delay={0.2}
            />
          </div>
          
          <div className="relative">
            <div className={`absolute left-1/2 -ml-px w-0.5 h-full ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            } hidden md:block`}></div>
            
            <div className="space-y-0">
              {timelineEvents.map((event, index) => (
                <TimelineItem 
                  key={event.id} 
                  event={event} 
                  index={index} 
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? 'bg-dark-lighter' : 'bg-white'
      }`}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <AnimatedText 
              text="Our Team" 
              className={`text-4xl font-display font-medium mb-4 ${
                isDark ? 'text-white' : 'text-dark'
              }`}
              tag="h2"
            />
            <AnimatedText 
              text="The passionate people behind Artisan Gallery"
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              delay={0.2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                name: "Amit S Sahu",
                id: "500123854",
                post: "B. Tech CS",
                image: "assets\\images\\amit.jpg",
              },
              {
                name: "Kinjal Srivastava",
                id: "500123394",
                post: "B. Tech CS",
                image: "assets\\images\\kinjal.jpg",
              },
              {
                name: "Lekhit Mehta",
                id: "AG003",
                post: "B. Tech CS",
                image: "assets\\images\\leekhit.jpg",
              },
              {
                name: "Naman Parihar",
                id: "AG004",
                post: "B. Tech CS",
                image: "assets\\images\\naman.jpg",
              },
              {
                name: "Aayan Mehrotra",
                id: "500122009",
                post: "B. Tech CS",
                image: "assets\\images\\aayan.jpg",
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8 }}
              >
                <div className="overflow-hidden rounded-lg shadow-md mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className={`text-xl font-display font-medium ${
                    isDark ? 'text-white' : 'text-dark'
                  }`}>{member.name}</h3>
                  <p className="text-primary font-medium">{member.id}</p>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{member.post}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;