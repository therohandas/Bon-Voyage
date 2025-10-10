import { motion } from 'framer-motion'

export default function PageTransition({ children }){
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: .35, ease: 'easeOut' }}
      style={{ flex:1 }}
    >
      {children}
    </motion.main>
  )
}
