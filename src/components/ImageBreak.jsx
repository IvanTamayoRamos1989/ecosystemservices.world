import React from 'react'

const images = {
  forest: {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format',
    alt: 'Dense forest canopy with sunlight filtering through',
    caption: 'Forest Ecosystems',
  },
  wetland: {
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format',
    alt: 'Golden wetland landscape at sunrise',
    caption: 'Wetland Restoration',
  },
  mangrove: {
    src: 'https://images.unsplash.com/photo-1559827291-bac3687ed5a0?w=1600&q=80&auto=format',
    alt: 'Aerial view of river delta and mangrove systems',
    caption: 'Coastal Resilience',
  },
  solar: {
    src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80&auto=format',
    alt: 'Solar farm surrounded by natural landscape',
    caption: 'Renewable Energy & Nature',
  },
  coral: {
    src: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1600&q=80&auto=format',
    alt: 'Healthy coral reef ecosystem underwater',
    caption: 'Marine Ecosystems',
  },
}

function ImageBreak({ imageKey, caption: captionOverride, height = 'h-64 md:h-80 lg:h-96' }) {
  const image = images[imageKey]
  if (!image) return null

  const displayCaption = captionOverride || image.caption

  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      />
      <div className="absolute inset-0 bg-navy/30" />
      {displayCaption && (
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-label uppercase text-white/80 tracking-widest">
              {displayCaption}
            </span>
            <span className="text-label uppercase text-white/50 tracking-widest font-mono">
              ESW
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageBreak
