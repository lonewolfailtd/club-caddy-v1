import * as React from 'react'

interface EmailLayoutProps {
  children: React.ReactNode
  previewText?: string
}

export const EmailLayout = ({ children, previewText }: EmailLayoutProps) => {
  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#fafafa',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>
        {previewText && (
          <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden' }}>
            {previewText}
          </div>
        )}

        {/* Container */}
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#fafafa' }}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: '40px 20px' }}>
                {/* Main Content Card */}
                <table
                  width="600"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <tbody>
                    {/* Header */}
                    <tr>
                  <td style={{
                    background: 'linear-gradient(135deg, #a1a1aa 0%, #881337 50%, #a1a1aa 100%)',
                    padding: '40px 40px',
                    textAlign: 'center',
                    position: 'relative',
                  }}>
                    {/* Hexagon pattern overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.06,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E")`,
                      backgroundSize: '100px 100px',
                    }} />

                    <h1 style={{
                      margin: 0,
                      fontSize: '32px',
                      fontWeight: 700,
                      color: '#ffffff',
                      fontFamily: "'Playfair Display', serif",
                      letterSpacing: '-0.01em',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      Club Caddy Carts
                    </h1>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: '40px' }}>
                    {children}
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{
                    backgroundColor: '#fafafa',
                    padding: '30px 40px',
                    borderTop: '1px solid #e4e4e7',
                  }}>
                    <table width="100%" cellPadding="0" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'center', paddingBottom: '20px' }}>
                          <div style={{
                            width: '40px',
                            height: '1px',
                            backgroundColor: '#881337',
                            margin: '0 auto 20px',
                          }} />
                          <p style={{
                            margin: '0 0 8px',
                            fontSize: '14px',
                            color: '#52525b',
                            fontWeight: 600,
                          }}>
                            Contact Us
                          </p>
                          <p style={{
                            margin: '0 0 4px',
                            fontSize: '13px',
                            color: '#71717a',
                          }}>
                            <a href="tel:+64021560307" style={{ color: '#881337', textDecoration: 'none' }}>
                              +64 021 560 307
                            </a>
                          </p>
                          <p style={{
                            margin: '0 0 4px',
                            fontSize: '13px',
                            color: '#71717a',
                          }}>
                            <a href="mailto:admin@clubcaddycarts.com" style={{ color: '#881337', textDecoration: 'none' }}>
                              admin@clubcaddycarts.com
                            </a>
                          </p>
                          <p style={{
                            margin: '0',
                            fontSize: '13px',
                            color: '#71717a',
                          }}>
                            New Zealand
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={{
                          textAlign: 'center',
                          paddingTop: '20px',
                          borderTop: '1px solid #e4e4e7',
                        }}>
                          <p style={{
                            margin: '0 0 8px',
                            fontSize: '12px',
                            color: '#a1a1aa',
                          }}>
                            © {new Date().getFullYear()} Club Caddy Carts. All rights reserved.
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '12px',
                            color: '#a1a1aa',
                          }}>
                            New Zealand's Premier Electric Golf Carts
                          </p>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                  </tbody>
              </table>

              {/* Legal Links */}
              <table width="600" cellPadding="0" cellSpacing="0" style={{ marginTop: '20px' }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>
                      <a href="https://clubcaddycarts.com/privacy" style={{
                        fontSize: '12px',
                        color: '#a1a1aa',
                        textDecoration: 'none',
                        margin: '0 10px',
                      }}>
                        Privacy Policy
                      </a>
                      <span style={{ color: '#d4d4d8', margin: '0 5px' }}>•</span>
                      <a href="https://clubcaddycarts.com/terms" style={{
                        fontSize: '12px',
                        color: '#a1a1aa',
                        textDecoration: 'none',
                        margin: '0 10px',
                      }}>
                        Terms of Service
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </body>
    </html>
  )
}

// Reusable Components
export const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    margin: '0 0 20px',
    fontSize: '28px',
    fontWeight: 700,
    color: '#18181b',
    fontFamily: "'Playfair Display', serif",
    letterSpacing: '-0.01em',
  }}>
    {children}
  </h2>
)

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    margin: '0 0 16px',
    fontSize: '15px',
    lineHeight: '24px',
    color: '#52525b',
  }}>
    {children}
  </p>
)

export const Button = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <table cellPadding="0" cellSpacing="0" style={{ margin: '24px 0' }}>
    <tbody>
      <tr>
        <td>
          <a
            href={href}
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: '#881337',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {children}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
)

export const Divider = () => (
  <div style={{
    width: '40px',
    height: '1px',
    backgroundColor: '#881337',
    margin: '24px 0',
  }} />
)

export const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    backgroundColor: '#fafafa',
    border: '1px solid #e4e4e7',
    borderRadius: '2px',
    padding: '20px',
    margin: '20px 0',
  }}>
    {children}
  </div>
)

export const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    backgroundColor: '#fef2f2',
    border: '1px solid #fecdd3',
    borderRadius: '2px',
    padding: '20px',
    margin: '20px 0',
  }}>
    {children}
  </div>
)
