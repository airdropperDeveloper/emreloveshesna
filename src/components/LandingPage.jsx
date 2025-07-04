import { motion } from "framer-motion"

function LandingPage({ onExplore, onGoToUpload }) {
  return (
    <motion.div
      className="landing-page"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>"Dünyanın en güzel kızına hazırlandı❤️"</h1>
      <h1>Hazırsan başlayalım!</h1>
      <button onClick={onExplore}>Beni dünyanın en güzel çiftinin hikayesine götür.</button>
      <button onClick={onGoToUpload}>Hikayemize yeni anı ekle 📸</button>
    </motion.div>
  )
}

export default LandingPage

