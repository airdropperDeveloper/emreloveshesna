"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Timer = ({ targetDate, onReturnHome }) => {
  const [timeElapsed, setTimeElapsed] = useState({ 
    years: 0, 
    months: 0, 
    days: 0, 
    hours: 0,
    minutes: 0,
    seconds: 0 
  })

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const difference = now.getTime() - target.getTime()

      const seconds = Math.floor(difference / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const months = Math.floor(days / 30.44) // Average days in a month
      const years = Math.floor(months / 12)

      setTimeElapsed({
        years,
        months: months % 12,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <motion.div
      className="timer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h2>Seni ilk gördüğümden beri seni çok severek hayatımı geçirdiğim süre:</h2>
      <p>
        {timeElapsed.years} yıl {timeElapsed.months} ay {timeElapsed.days} gün {timeElapsed.hours} saat {timeElapsed.minutes} dakika {timeElapsed.seconds} saniye
      </p>
      
      <button 
        onClick={onReturnHome}
        className="return-home-btn"
      >
        Dünyanın En güzel çiftinin Hikayesinin başına dön 
      </button>
    </motion.div>
  )
}

export default Timer

