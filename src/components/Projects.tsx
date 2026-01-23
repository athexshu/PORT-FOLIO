import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Monitor, Smartphone } from 'lucide-react';

const projects = [
  {
    title: 'FMS Dashboard',
    description: 'Real-time robot monitoring system with live positions, alerts, task management, and operational analytics for warehouse automation.',
    tech: ['React', 'TypeScript', 'MQTT', 'WebSockets', 'PostgreSQL'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Robot Map Editor',
    description: 'Canvas-based editor for creating and managing robot navigation maps including points, paths, polylines, zones with zoom, pan, and selection tools.',
    tech: ['React', 'Canvas API', 'TypeScript', 'Custom Rendering'],
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Robot Task Management',
    description: 'Comprehensive task orchestration system with pick & drop workflows, multi-robot coordination, and real-time job execution tracking.',
    tech: ['React', 'NestJS', 'PostgreSQL', 'WebSockets'],
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Data visualization platform with interactive charts, operational reports, performance metrics, and customizable insights for robotics operations.',
    tech: ['React', 'Recharts', 'TypeScript', 'REST APIs'],
    gradient: 'from-orange-500/20 to-yellow-500/20',
  },
  {
    title: 'Blog Application',
    description: 'Full-featured blogging platform with CRUD operations, user authentication, admin panel, rich text editor, and responsive design.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT Auth'],
    gradient: 'from-rose-500/20 to-red-500/20',
  },
  {
    title: 'Pizza Delivery App',
    description: 'Complete food delivery solution with menu browsing, cart management, order tracking, payment gateway integration, and admin order management.',
    tech: ['React Native', 'Node.js', 'Stripe', 'PostgreSQL'],
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'E-commerce Platform',
    description: 'Scalable online shopping solution with product listings, advanced filters, cart, checkout, user & admin panels, and payment integration.',
    tech: ['React', 'NestJS', 'Razorpay', 'PostgreSQL'],
    gradient: 'from-indigo-500/20 to-purple-500/20',
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A selection of my best work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="project-card group"
            >
              {/* Preview Mockup */}
              <div className={`relative h-40 md:h-48 rounded-xl mb-6 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    className="p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                  >
                    <Monitor className="w-8 h-8 text-foreground" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    className="p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                  >
                    <Smartphone className="w-6 h-6 text-foreground" />
                  </motion.div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover Link Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
