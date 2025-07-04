// MongoDB Atlas Data API konfigürasyonu
// App Services'dan aldığın bilgileri buraya yazacaksın
const MONGO_DATA_API_URL = "https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1"
const MONGO_API_KEY = "YOUR_API_KEY"
const DATABASE_NAME = "photoStory"
const COLLECTION_NAME = "photos"

// TODO: Yukarıdaki YOUR_APP_ID ve YOUR_API_KEY'i kendi değerlerinle değiştir
// Örnek: 
// const MONGO_DATA_API_URL = "https://data.mongodb-api.com/app/data-abc123/endpoint/data/v1"
// const MONGO_API_KEY = "xyz789abc456def"

class PhotoService {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
      "api-key": MONGO_API_KEY
    }
  }

  async getAllPhotos() {
    try {
      const response = await fetch(`${MONGO_DATA_API_URL}/action/find`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          collection: COLLECTION_NAME,
          database: DATABASE_NAME,
          sort: { createdAt: 1 }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("MongoDB API hatası:", errorData)
        throw new Error(`Fotoğraflar yüklenirken hata: ${errorData.error}`)
      }

      const data = await response.json()
      return data.documents || []
    } catch (error) {
      console.error("Fotoğraflar yüklenirken hata:", error)
      return []
    }
  }

  async addPhoto(photoData) {
    try {
      const newPhoto = {
        ...photoData,
        createdAt: new Date().toISOString(),
        id: Date.now()
      }

      const response = await fetch(`${MONGO_DATA_API_URL}/action/insertOne`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          collection: COLLECTION_NAME,
          database: DATABASE_NAME,
          document: newPhoto
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("MongoDB API hatası:", errorData)
        throw new Error(`Fotoğraf eklenirken hata: ${errorData.error}`)
      }

      const data = await response.json()
      return { success: true, insertedId: data.insertedId }
    } catch (error) {
      console.error("Fotoğraf eklenirken hata:", error)
      throw error
    }
  }

  async deletePhoto(photoId) {
    try {
      const response = await fetch(`${MONGO_DATA_API_URL}/action/deleteOne`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          collection: COLLECTION_NAME,
          database: DATABASE_NAME,
          filter: { id: photoId }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("MongoDB API hatası:", errorData)
        throw new Error(`Fotoğraf silinirken hata: ${errorData.error}`)
      }

      const data = await response.json()
      return { success: true, deletedCount: data.deletedCount }
    } catch (error) {
      console.error("Fotoğraf silinirken hata:", error)
      throw error
    }
  }
}

export default new PhotoService() 