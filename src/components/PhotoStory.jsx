"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { IoHomeOutline } from "react-icons/io5"
import "react-photo-view/dist/react-photo-view.css"

const photos = [
  {
    src: "/1.jpeg",
    caption: "İlk tiyatromuzda senin gibi güzeller güzeli bir kızla tanıştığım için harika bir gün geçirmiştim.",
  },
  { 
    src: "2.jpeg",
    caption: "Beraber bugün kahve içmiştik ve güzelliğine hayran bir şekilde büyülenmiştim.",
  },
  {
    src: "3.jpeg",
    caption: "Bitki çayının bu kadar pahalı olması senin sinirini bozmuştu sevgilim ve yine her zamanki gibi çok tatlıydın❤️",
  },
  {
    src: "4.jpeg",
    caption: "Yurtdışında seni çok özlemiştim ve hemen koşa koşa yanına geldim bugün💐",
  },
  {
    src: "5.jpeg",
    caption: "Allahım bayılıyorum elini tutmaya bana o kadar huzur veriyor ki...",
  },
  {
    src: "6.jpeg",
    caption: "Tiyatroya gittiğimiz güzel bir yaz gecesi ve benim bebeğim her zamanki gibi çok güzel❤️",
  },
  {
    src: "7.jpeg",
    caption: "Ayakkabımı hikayende paylaşmıştın bir de açıklama yapmıştın tatlış şey seni",
  },
  {
    src: "8.jpeg",
    caption: "Dünyanın ennnnnn güzel prensesi❤️❤️❤️",
  },
  {
    src: "9.jpeg",
    caption: "Seninle yağmurda yürümek bile çok tatlı",
  },
  {
    src: "10.jpeg",
    caption: "O gün gideceğim için kahvaltı yapasım bile gelmemişti seni çok özleyeceğimi biliyordum çünkü",
  },
  {
    src: "11.jpeg",
    caption: "Gözlerine hayran kaldığım başka bir an daha..",
  },
  {
    src: "12.jpeg",
    caption: "Beni hep böyle öper misin? 🥺",
  },
  {
    src: "13.jpeg",
    caption: "En sevdiğin fotoğrafı da koymak istedim😽",
  },
  {
    src: "14.jpeg",
    caption: "Burada civciv gibisinn🐣",
  },
  {
    src: "15.jpeg",
    caption: "Veee o an. Hayatımın en harika en aşk dolu tatili❤️",
  },
  {
    src: "16.jpeg",
    caption: "Sana sahip olduğum için o kadar mutluyum ki anlatamam..",
  },
  {
    src: "17.jpeg",
    caption: "Seninle gezmek, seninle eğlenmek, hayatımı seninle geçirmek harika bir duygu",
  },
  {
    src: "18.jpeg",
    caption: "Seni sevmek çok güzel bir duygu💐",
  },
  {
    src: "19.jpeg",
    caption: "Seninle olmak, seninle masmavi sularda huzur içinde tatil yapmak çok güzel bir duygu",
  },
  {
    src: "20.jpeg",
    caption: "Seni bu hayatta her şeyden daha çok seviyorum. Şu an bunları yazarken gözlerim doldu çok uzatamayacağım.",
  },
  {
    src: "21.jpeg",
    caption: "Sevgililer günümüz kutlu olsun sevgilim seni ömrümün sonuna dek çok seveceğim❤️",
  },
]

function PhotoStory({ onComplete }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const nextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1)
    } else {
      onComplete()
    }
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  return (
    <div className="photo-story">
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

      <PhotoProvider>
        <div className="photo-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhotoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <PhotoView src={photos[currentPhotoIndex].src}>
                <img
                  src={photos[currentPhotoIndex].src || "/placeholder.svg"}
                  alt={`Photo ${currentPhotoIndex + 1}`}
                  className="photo"
                />
              </PhotoView>
            </motion.div>
          </AnimatePresence>
          <motion.p
            className="caption"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {photos[currentPhotoIndex].caption}
          </motion.p>
        </div>
      </PhotoProvider>
      <div className="navigation">
        <motion.button
          onClick={prevPhoto}
          disabled={currentPhotoIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Önceki hikayemiz
        </motion.button>
        <motion.button
          onClick={nextPhoto}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentPhotoIndex === photos.length - 1 ? "Seni çok seviyorum sevgilim ❤️" : "Sonraki hikayemiz"}
        </motion.button>
      </div>
    </div>
  )
}

export default PhotoStory

