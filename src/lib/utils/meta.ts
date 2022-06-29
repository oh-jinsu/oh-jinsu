import { AUTHOR, ORIGIN } from "$lib/constants"

export const getStructedData = ({
  name, title, description, date, category, keywords,
} : {
  name: string, title: string, description: string, date: Date, category: string, keywords : string[],
}) : string => {
  return `<script type="application/ld+json">{
  "@context": "http://schema.org/",
  "@type": "BlogPosting",
  "name": "${name}",
  "headline": "${title}",
  "description": "${description}",
  "keywords": "${keywords}",
  "author": {
    "@type": "Person",
    "name": ${AUTHOR},
    "url": ${ORIGIN}
  },
  "articleSection": "${category}",
  "dateCreated": "${date}",
  "datePublished": "${date}",
  "dateModified": "${date}",
  "inLanguage": "ko-KR",
  "homepage": ${ORIGIN}
}</script>`
}