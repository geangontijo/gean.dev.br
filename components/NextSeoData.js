import { ArticleJsonLd, NextSeo } from 'next-seo'

import React from 'react'

const NextSeoData = ({ slug, metadata, publishedDate }) => {
  return (
    <>
      <NextSeo
        additionalMetaTags={[
          { property: 'twitter:card', content: 'summary_large_image' },
          {
            property: 'twitter:url',
            content: `https://gean.dev.br/blog/${slug}`,
          },
          { property: 'twitter:title', content: metadata.title },
          {
            property: 'twitter:description',
            content: metadata.frontmatter.summary,
          },
          { property: 'twitter:image', content: metadata.frontmatter.image },
        ]}
        canonical={`https://gean.dev.br/blog/${slug}`}
        description={metadata.frontmatter.summary}
        openGraph={{
          url: `https://gean.dev.br/blog/${slug}`,
          site_name: 'Gean Gontijo',
          title: metadata.title,
          description: metadata.frontmatter.summary,
          type: 'article',
          article: {
            authors: ['Gean Gontijo'],
            publishedTime: publishedDate,
            modifiedTime: publishedDate,
            tags: ['Programação', 'Desenvolvimento Web', 'Engenharia de Software'],
          },
          images: [
            {
              url: metadata.frontmatter.image,
              alt: metadata.title,
            },
          ],
        }}
        title={metadata.title}
      />
      <ArticleJsonLd
        authorName="Gean Gontijo"
        dateModified={publishedDate}
        datePublished={publishedDate}
        description={metadata.frontmatter.summary}
        images={[metadata.frontmatter.image]}
        publisherLogo="https://imagizer.imageshack.com/a/img923/7612/A5tDeP.png"
        publisherName="Gean Gontijo"
        title={metadata.title}
        url={`https://gean.dev.br/blog/${slug}`}
      />
    </>
  )
}

export default NextSeoData
