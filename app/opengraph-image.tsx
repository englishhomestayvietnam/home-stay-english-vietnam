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
          backgroundColor: '#064e3b', // emerald-900 background
          backgroundImage: 'url(https://ik.imagekit.io/rlw77vgih/Today_s%20Adenda.jpg)', // The original image
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* We add a dark overlay so text is readable */}
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
          <div
            style={{
              fontSize: 64,
              fontStyle: 'normal',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              whiteSpace: 'pre-wrap',
              marginBottom: '20px',
              textShadow: '0 4px 8px rgba(0,0,0,0.4)',
            }}
          >
            English Homestay Vietnam
          </div>
          <div
            style={{
              fontSize: 32,
              fontStyle: 'normal',
              fontWeight: 600,
              color: '#a7f3d0', // emerald-200
              marginTop: '10px',
              textShadow: '0 2px 4px rgba(0,0,0,0.4)',
            }}
          >
            Teach. Travel. Connect. Live with Locals.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
