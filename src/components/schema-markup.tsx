import Script from "next/script"

interface SchemaMarkupProps {
  type?: "website" | "software" | "organization"
}

export default function SchemaMarkup({ type = "website" }: SchemaMarkupProps) {
  const getSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": ["WebSite", "SoftwareApplication"],
      "name": "KynuxDev",
      "alternateName": "KynuxDev Discord Bot",
      "url": "https://powerbot.com",
      "description": "KynuxDev ile Discord sunucunuzu profesyonel seviyeye taşıyın. 24/7 müzik çalma, gelişmiş moderasyon araçları, eğlence komutları ve 150+ faydalı özellik.",
      "applicationCategory": "CommunicationApplication",
      "applicationSubCategory": "Discord Bot",
      "operatingSystem": "Discord Platform",
      "softwareVersion": "2.1.4",
      "dateCreated": "2024-06-15",
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "KynuxDev Team",
        "url": "https://powerbot.com"
      },
      "author": {
        "@type": "Organization", 
        "name": "KynuxDev Team"
      },
      "creator": {
        "@type": "Organization",
        "name": "KynuxDev Team"
      },
      "maintainer": {
        "@type": "Organization",
        "name": "KynuxDev Team"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "category": "Free"
      },
      "featureList": [
        "24/7 Müzik Çalma",
        "Gelişmiş Moderasyon Araçları", 
        "Otomatik Spam Koruması",
        "Seviye Sistemi",
        "Ekonomi Sistemi",
        "Eğlence Komutları",
        "Utility Araçları",
        "Çoklu Dil Desteği",
        "Özelleştirilebilir Ayarlar",
        "24/7 Uptime"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Discord Kullanıcısı"
          },
          "reviewRating": {
            "@type": "Rating", 
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Harika bir bot! Müzik kalitesi çok iyi ve moderasyon özellikleri mükemmel."
        }
      ],
      "screenshot": "https://powerbot.com/screenshots/main-interface.png",
      "downloadUrl": "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID",
      "installUrl": "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID",
      "sameAs": [
        "https://github.com/yourorg/powerbot",
        "https://discord.gg/powerbot",
        "https://twitter.com/powerbot_tr"
      ],
      "keywords": "discord bot, müzik botu, moderasyon botu, discord bot türkçe, ücretsiz discord bot",
      "inLanguage": "tr-TR",
      "isAccessibleForFree": true,
      "usageInfo": "https://powerbot.com/terms",
      "privacyPolicy": "https://powerbot.com/privacy",
      "termsOfService": "https://powerbot.com/terms"
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "KynuxDev Team",
      "alternateName": "KynuxDev",
      "url": "https://powerbot.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://powerbot.com/logo.png",
        "width": 512,
        "height": 512
      },
      "description": "Discord bot geliştirici ekibi. KynuxDev ile Discord sunucularınızı geliştirin.",
      "foundingDate": "2024-06-15",
      "sameAs": [
        "https://github.com/yourorg/powerbot",
        "https://discord.gg/powerbot", 
        "https://twitter.com/powerbot_tr"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "url": "https://powerbot.com/support",
        "availableLanguage": ["Turkish", "English"]
      },
      "areaServed": {
        "@type": "Country",
        "name": "Global"
      }
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "KynuxDev ücretsiz mi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evet, KynuxDev tamamen ücretsizdir. Tüm özellikler herkes için açıktır."
          }
        },
        {
          "@type": "Question", 
          "name": "KynuxDev'u nasıl sunucuma eklerim?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KynuxDev'u sunucunuza eklemek için davet linkine tıklayın ve Discord'da gerekli izinleri verin."
          }
        },
        {
          "@type": "Question",
          "name": "KynuxDev hangi komutlara sahip?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KynuxDev 150'den fazla komuta sahiptir. Müzik, moderasyon, eğlence ve utility kategorilerinde komutlar bulunur."
          }
        },
        {
          "@type": "Question",
          "name": "KynuxDev 24/7 çalışıyor mu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evet, KynuxDev %99.9 uptime ile 24/7 kesintisiz hizmet verir."
          }
        }
      ]
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList", 
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://powerbot.com"
        },
        {
          "@type": "ListItem",
          "position": 2, 
          "name": "Özellikler",
          "item": "https://powerbot.com#features"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Komutlar", 
          "item": "https://powerbot.com#commands"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Kurulum",
          "item": "https://powerbot.com#setup"
        }
      ]
    }

    return [baseSchema, organizationSchema, faqSchema, breadcrumbSchema]
  }

  const schemas = getSchema()

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}