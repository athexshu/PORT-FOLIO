import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Cpu, Database, Globe } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    { icon: Code2, label: 'Full-Stack Development' },
    { icon: Cpu, label: 'Robotics & FMS' },
    { icon: Database, label: 'Real-Time Systems' },
    { icon: Globe, label: 'Web & Mobile Apps' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Passionate developer building the future of robotics
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-6 md:p-8">
              <p className="text-foreground text-base md:text-lg leading-relaxed mb-6">
                I am a <span className="text-primary font-semibold">Software Developer at Humro Robotics</span> with 
                1.5 years of experience specializing in Fleet Management Systems (FMS) and warehouse robotics automation.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                My expertise lies in crafting real-time dashboards, robot monitoring systems, and sophisticated 
                map-based applications. I develop scalable solutions using modern technologies including 
                <span className="text-primary"> React, React Native, Node.js, NestJS, and PostgreSQL</span>.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                I have extensive experience in robot navigation systems, MQTT-based real-time communication, 
                task management platforms, and operational analytics dashboards that power complex warehouse operations.
              </p>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center group cursor-pointer"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-foreground font-medium text-sm md:text-base">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
