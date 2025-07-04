// Backend API Photo Service
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

class PhotoService {
  constructor() {
    this.apiUrl = `${API_BASE_URL}${API_ENDPOINTS.PHOTOS}`
  }

  async getAllPhotos() {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        console.error(`API hatası: ${response.status}`)
        return []
      }

      const result = await response.json()
      
      // Backend'den gelen veri yapısını frontend formatına çevir
      if (result.success && result.data && result.data.photos) {
        const backendPhotos = result.data.photos.map(photo => ({
          src: photo.url,
          caption: photo.description || photo.title || 'Yeni fotoğraf',
          id: photo._id,
          createdAt: photo.createdAt
        }))
        
        console.log(`Backend'den ${backendPhotos.length} fotoğraf yüklendi`)
        return backendPhotos
      }
      
      return []
    } catch (error) {
      console.error("Fotoğraflar yüklenirken hata:", error)
      return []
    }
  }

  async addPhoto(photoData) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: photoData.src,
          description: photoData.caption,
          title: photoData.caption,
          createdAt: new Date().toISOString()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Backend API hatası:", errorData)
        throw new Error(`Fotoğraf eklenirken hata: ${errorData.message || 'Backend bağlantı hatası'}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("Fotoğraf eklenirken hata:", error)
      throw error
    }
  }

  async deletePhoto(photoId) {
    try {
      const response = await fetch(`${this.apiUrl}/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Backend API hatası:", errorData)
        throw new Error(`Fotoğraf silinirken hata: ${errorData.message}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("Fotoğraf silinirken hata:", error)
      throw error
    }
  }
}

export default new PhotoService() 