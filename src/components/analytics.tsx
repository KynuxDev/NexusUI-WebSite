import Script from "next/script"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface AnalyticsProps {
  gaId?: string
}

export default function Analytics({ gaId = "G-XXXXXXXXXX" }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />

      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3000000,hjsv:6}; // Replace with your Hotjar ID
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />

      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "abcdef1234"); // Replace with your Clarity ID
          `,
        }}
      />

      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1234567890123456'); // Replace with your Facebook Pixel ID
            fbq('track', 'PageView');
          `,
        }}
      />

      <Script
        id="performance-observer"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.entryType === 'largest-contentful-paint') {
                    gtag('event', 'web_vitals', {
                      name: 'LCP',
                      value: Math.round(entry.startTime),
                      event_category: 'Web Vitals'
                    });
                  }
                  if (entry.entryType === 'first-input') {
                    gtag('event', 'web_vitals', {
                      name: 'FID',
                      value: Math.round(entry.processingStart - entry.startTime),
                      event_category: 'Web Vitals'
                    });
                  }
                  if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                    gtag('event', 'web_vitals', {
                      name: 'CLS',
                      value: Math.round(entry.value * 1000),
                      event_category: 'Web Vitals'
                    });
                  }
                }
              });
              
              observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
            }
          `,
        }}
      />

      <Script
        id="custom-events"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.trackEvent = function(eventName, parameters = {}) {
              if (typeof gtag !== 'undefined') {
                gtag('event', eventName, parameters);
              }
            };
            
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('a[href*="discord.com/oauth2/authorize"]').forEach(function(link) {
                link.addEventListener('click', function() {
                  trackEvent('bot_invite_click', {
                    event_category: 'engagement',
                    event_label: 'discord_invite'
                  });
                });
              });
              
              document.querySelectorAll('a[href*="github.com"]').forEach(function(link) {
                link.addEventListener('click', function() {
                  trackEvent('github_visit', {
                    event_category: 'engagement',
                    event_label: 'github_click'
                  });
                });
              });
              
              const scrollDepths = [25, 50, 75, 90];
              let trackedDepths = [];
              
              window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = Math.round((scrollTop / docHeight) * 100);
                
                scrollDepths.forEach(function(depth) {
                  if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                    trackedDepths.push(depth);
                    trackEvent('scroll_depth', {
                      event_category: 'engagement',
                      event_label: depth + '%',
                      value: depth
                    });
                  }
                });
              });
            });
          `,
        }}
      />
    </>
  )
}