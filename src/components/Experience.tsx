import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experienceData = {
  company: 'Humro Robotics',
  role: 'Software Developer',
  duration: '1.5 Years',
  location: 'India',
  highlights: [
    'Built FMS dashboards for real-time robot monitoring and control systems',
    'Created comprehensive map editor for managing points, paths, zones, and routes',
    'Implemented real-time robot tracking using MQTT & WebSockets protocols',
    'Developed task management and job execution systems for warehouse operations',
    'Built XML/JSON model editors for robot navigation configuration',
    'Created React Native applications for operations and field monitoring',
  ],
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title">Experience</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Building cutting-edge robotics solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-6 md:p-10 relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {experienceData.role}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    {experienceData.company}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {experienceData.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {experienceData.location}
                  </span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden md:block"
              >
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium text-sm">
                  Current Position
                </div>
              </motion.div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {experienceData.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground text-base">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
