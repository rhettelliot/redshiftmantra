import { Gatekeeper } from '@/components/Gatekeeper'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Albums } from '@/components/Albums'
import { TrackVisualizer } from '@/components/TrackVisualizer'
import { VisualOS } from '@/components/VisualOS'
import { Listen } from '@/components/Listen'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { AmbientOrb } from '@/components/AmbientOrb'

const SITE = 'https://redshiftmantra.com'
const ARTIST_ID = `${SITE}/#artist`

const albumSchema = (album: {
  id: string
  name: string
  datePublished: string
  spotify: string
  hyperfollow: string
  tracks: string[]
}) => ({
  '@type': 'MusicAlbum',
  '@id': `${SITE}/#album-${album.id}`,
  name: album.name,
  byArtist: { '@id': ARTIST_ID },
  datePublished: album.datePublished,
  numTracks: album.tracks.length,
  url: album.hyperfollow,
  sameAs: [album.spotify],
  track: {
    '@type': 'ItemList',
    numberOfItems: album.tracks.length,
    itemListElement: album.tracks.map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MusicRecording',
        name,
        byArtist: { '@id': ARTIST_ID },
        inAlbum: { '@id': `${SITE}/#album-${album.id}` },
      },
    })),
  },
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MusicGroup',
      '@id': ARTIST_ID,
      name: 'Red Shift Mantra',
      genre: ['Electronic', 'Synthwave'],
      url: SITE,
      sameAs: ['https://soundcloud.com/rhettelliot'],
      recordLabel: { '@type': 'Organization', name: 'Manteis Recordings' },
    },
    albumSchema({
      id: 'phoneme',
      name: 'Phoneme',
      datePublished: '2025',
      spotify: 'https://open.spotify.com/album/3jAWlv6FPYUhiDJ0X0KEhH',
      hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2',
      tracks: ['Piece of Ocean Water', 'Surface Tension', 'Xi', 'Hokku', 'Super Fluous', 'Byaiana', 'In Our Hands', 'Ashen Glow', 'Ajna'],
    }),
    albumSchema({
      id: 'deep-field-image',
      name: 'Deep Field Image',
      datePublished: '2025',
      spotify: 'https://open.spotify.com/album/1nJCr1MCkLBA1ZqD7j7GDF',
      hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2',
      tracks: ['Obsidian', 'Rain', 'Kobayashi Maru', 'Nalu', 'Cloud Noise', 'Calm Between', 'Prominence'],
    }),
  ],
}

export default function Home() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomCursor />
      <AmbientOrb />
      <Gatekeeper />
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Philosophy />
        <Albums />
        <TrackVisualizer />
        <VisualOS />
        <Listen />
      </main>
      <Footer />
    </SmoothScroll>
  )
}