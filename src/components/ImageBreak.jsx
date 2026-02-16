import React from 'react'

const images = {
  highway: {
    src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&q=80&auto=format',
    alt: 'Aerial view of highway interchange infrastructure',
    caption: 'Infrastructure at Scale',
  },
  bridge: {
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80&auto=format',
    alt: 'Urban skyline with bridge infrastructure',
    caption: 'Urban Systems',
  },
  dam: {
    src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80&auto=format',
    alt: 'Large-scale water infrastructure',
    caption: 'Water Infrastructure',
  },
  industrial: {
    src: 'https://images.unsplash.com/photo-1513828583688-c52571e73e83?w=1600&q=80&auto=format',
    alt: 'Aerial view of industrial infrastructure',
    caption: 'Industrial Ecology',
  },
  viaduct: {
    src: 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=1600&q=80&auto=format',
    alt: 'Elevated highway viaduct columns',
    caption: 'Structural Engineering',
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
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90"
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
