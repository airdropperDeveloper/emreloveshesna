"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LandingPage from "./components/LandingPage"
import PhotoStory from "./components/PhotoStory"
import Timer from "./components/Timer"
import FlyingHearts from "./components/FlyingHearts"
import "./App.css"

function App() {
  const [currentScreen, setCurrentScreen] = useState("landing")
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef(new Audio("/fadeIntoYou.mp3"))
  const audio = audioRef.current
  audio.loop = true
  audio.volume = 0.5
  useEffect(() => {
    
   
    
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

 

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      try {
        await audio.play()
      } catch (error) {
        console.log("Müzik çalınamadı:", error)
      }
    }
    setIsPlaying(!isPlaying)
  }

  const handleExplore = async () => {
    try {
      await audio.play()
      setCurrentScreen("photoStory")
    } catch (error) {
      console.log("Müzik çalınamadı:", error)
      setCurrentScreen("photoStory") 
    }
  }
  const handlePhotoStoryComplete = () => setCurrentScreen("timer")
  const handleReturnHome = () => setCurrentScreen("landing")

  return (
    <div className="App">
      <div 
        style={{
          position: 'fixed',
          bottom: '5px',
          left: '10px',
          color: 'rgba(82, 80, 80, 0.6)',
          fontSize: '12px',
          zIndex: 1000,
          fontFamily: 'Arial, sans-serif'
        }}
      >
        Aşkla Hesna için geliştirildi ❤️
      </div>
      <button 
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '30px',
          zIndex: 1000,
          padding: '10px',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid white',
          cursor: 'pointer'
        }}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
      <AnimatePresence mode="wait">
        {currentScreen === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FlyingHearts />
            <LandingPage onExplore={handleExplore} />
          </motion.div>
        )}
        {currentScreen === "photoStory" && (
          <motion.div
            key="photo-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoStory onComplete={handlePhotoStoryComplete} />
          </motion.div>
        )}
        {currentScreen === "timer" && (
          <motion.div
            key="timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Timer targetDate="2023-03-07" onReturnHome={handleReturnHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App


