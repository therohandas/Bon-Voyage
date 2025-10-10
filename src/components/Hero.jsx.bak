import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <div className="hero section container">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6, ease: 'easeOut' }}
      >
        <h1>Find your next <span style={{color:'var(--e-sand)'}}>earthy</span> escape</h1>
        <p>Seamless exploration beyond boundaries.</p>
        <Link to="/explore" className="btn">Start Exploring</Link>
      </motion.div>

      <motion.div
        className="card hero-card"
        initial={{ opacity: 0, scale: .96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .6, delay:.1, ease: 'easeOut' }}
      >
        <h3 style={{marginTop:0}}>Today’s Thought</h3>
        <ul style={{margin:'5px 0 0 10px'}}>
          <p>“See the world. It’s more fantastic than any dream.” </p>
          <p>– Ray Bradbury</p>
        </ul>
      </motion.div>
    </div>
  )
}
