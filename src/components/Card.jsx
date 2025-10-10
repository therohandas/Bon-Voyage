import { motion } from 'framer-motion'

export default function Card({ children, ...rest }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, rootMargin: '-50px' }} // ✅ fixed
      transition={{ duration: 0.5 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
