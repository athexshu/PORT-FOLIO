import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const contactLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:atharvingale408@gmail.com',
    label: 'atharvingale408@gmail.com',
    color: 'hover:bg-red-500/10 hover:border-red-500/50',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/atharv-ingale1714/',
    label: 'linkedin.com/in/atharvingale',
    color: 'hover:bg-blue-500/10 hover:border-blue-500/50',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/athexshu',
    label: 'github.com/athexshu',
    color: 'hover:bg-purple-500/10 hover:border-purple-500/50',
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 opacity-30">
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center bottom, hsl(187 100% 50% / 0.2) 0%, transparent 60%)',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-12">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card p-6 text-center group transition-all duration-300 border border-transparent ${link.color}`}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{link.name}</h3>
                <p className="text-muted-foreground text-sm truncate">{link.label}</p>
              </motion.a>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 md:p-12 text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Start a Project?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              I'm always open to discussing new opportunities, creative ideas, or possibilities to be part of your vision.
            </p>
            <motion.a
              href="mailto:atharvingale@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
