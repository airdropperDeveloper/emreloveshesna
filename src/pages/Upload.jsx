"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { IoCloudUploadOutline, IoArrowBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import photoService from "../services/photoService"

const CLOUDINARY_UPLOAD_PRESET = "ml_default"
const CLOUDINARY_CLOUD_NAME = "dytlryqvs"

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [caption, setCaption] = useState("")
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Cloudinary hatası:", errorData)
      throw new Error(`Fotoğraf yükleme hatası: ${errorData.error?.message || 'Cloudinary preset kontrol edin'}`)
    }

    const data = await response.json()
    return data.secure_url
  }

  const handleUpload = async () => {
    if (!selectedFile || !caption.trim()) {
      alert("Lütfen fotoğraf seçin ve bir açıklama yazın!")
      return
    }

    setUploading(true)
    try {
      // 1. Önce Cloudinary'e yükle
      const imageUrl = await uploadToCloudinary(selectedFile)
      
      // 2. Sonra backend API'ye gönder
      await photoService.addPhoto({
        src: imageUrl,
        caption: caption.trim()
      })
      
      // Form temizle
      setSelectedFile(null)
      setCaption("")
      setPreview(null)
      
      // Başarı mesajı göster ve anasayfaya yönlendir
      alert("Fotoğraf başarıyla eklendi! 🎉\nHikayenizi görmek için anasayfaya yönlendiriliyorsunuz...")
      
      // Kısa bir bekleme sonrası anasayfaya yönlendir
      setTimeout(() => {
        navigate("/")
      }, 1500)
      
    } catch (error) {
      console.error("Yükleme hatası:", error)
      alert(`Fotoğraf yüklenirken bir hata oluştu: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="upload-page">
      <motion.button
        className="back-button"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <IoArrowBackOutline size={24} />
        Ana Sayfaya Dön
      </motion.button>

      <motion.div
        className="upload-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="upload-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hikayemize Yeni Bir Anı Ekle 💕
        </motion.h1>
        
        <motion.p
          className="upload-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Hikayemize bir anı daha ekleyelim 💕
        </motion.p>

        <div className="upload-form">
          <motion.div
            className="file-input-container"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="photo-input"
            />
            <label htmlFor="photo-input" className="file-input-label">
              <IoCloudUploadOutline size={48} />
              <span>Fotoğraf Seç</span>
              <small>JPG, PNG, GIF formatları desteklenir</small>
            </label>
          </motion.div>

          {preview && (
            <motion.div
              className="preview-section"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={preview} alt="Önizleme" className="preview-image" />
            </motion.div>
          )}

          <motion.div
            className="caption-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <label htmlFor="caption">Bu güzel anı hakkında birkaç söz...</label>
            <textarea
              id="caption"
              className="caption-textarea"
              placeholder="Örn: Bugün beraber geçirdiğimiz harika bir gün..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
            />
          </motion.div>

          <motion.button
            className="upload-submit-button"
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !caption.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {uploading ? "Yükleniyor..." : "Hikayeye Ekle 💕"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Upload 