import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Route segment config
export const alt = 'English Homestay Vietnam - Teach, Travel, Connect';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#064e3b', // emerald-900 fallback
          position: 'relative',
        }}
      >
        {/* Background image as an actual <img>, more reliable than CSS backgroundImage in Satori */}
        <img
          src="https://ik.imagekit.io/rlw77vgih/Today_s%20Adenda.jpg"
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Dark overlay so text is readable */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}