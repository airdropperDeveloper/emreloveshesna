"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { IoHomeOutline, IoCloudUploadOutline } from "react-icons/io5"
import photoService from "../services/photoService"

const CLOUDINARY_UPLOAD_PRESET = "ml_default" // Bu değeri kendi preset'inizle değiştirin
const CLOUDINARY_CLOUD_NAME = "dytlryqvs" // Bu değeri kendi cloud name'inizle değiştirin

function PhotoUpload({ onComplete }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [caption, setCaption] = useState("")
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

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
      
      alert("Fotoğraf başarıyla eklendi! 🎉")
      setSelectedFile(null)
      setCaption("")
      setPreview(null)
      
    } catch (error) {
      console.error("Yükleme hatası:", error)
      alert(`Fotoğraf yüklenirken bir hata oluştu: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="photo-upload">
      <motion.button
        className="home-button"
        onClick={onComplete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          padding: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px'
        }}
      >
        <IoHomeOutline size={20} />
      </motion.button>

      <motion.div
        className="upload-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Hikayemize Yeni Bir Anı Ekle 💕</h2>
        
        <div className="upload-section">
          <motion.div
            className="file-input-wrapper"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="photo-input"
            />
            <label htmlFor="photo-input" className="file-input-label">
              <IoCloudUploadOutline size={40} />
              <span>Fotoğraf Seç</span>
            </label>
          </motion.div>

          {preview && (
            <motion.div
              className="preview-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={preview} alt="Önizleme" className="preview-image" />
            </motion.div>
          )}

          <motion.textarea
            className="caption-input"
            placeholder="Bu güzel anı hakkında birkaç söz yazın..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          />

          <motion.button
            className="upload-button"
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !caption.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {uploading ? "Yükleniyor..." : "Hikayeye Ekle 💕"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default PhotoUpload 