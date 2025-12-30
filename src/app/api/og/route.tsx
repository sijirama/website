import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Untitled';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    backgroundColor: '#18181b',
                    padding: '60px',
                }}
            >
                {/* Pink accent bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        background: 'linear-gradient(90deg, #ec4899, #f472b6)',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    {/* Label */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: '#ec4899',
                            }}
                        />
                        <span
                            style={{
                                fontSize: '24px',
                                color: '#71717a',
                                fontFamily: 'system-ui',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            siji's library
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: title.length > 40 ? '48px' : '64px',
                            fontWeight: 600,
                            color: '#fafafa',
                            fontFamily: 'Georgia, serif',
                            lineHeight: 1.2,
                            maxWidth: '900px',
                            margin: 0,
                        }}
                    >
                        {title}
                    </h1>
                </div>

                {/* Footer */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        right: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span
                        style={{
                            fontSize: '20px',
                            color: '#52525b',
                            fontFamily: 'system-ui',
                        }}
                    >
                        siji.ng
                    </span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
