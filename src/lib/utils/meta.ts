export const getStructedData = ({
  name, title, description, date, section, keywords,
} : {
  name: string, title: string, description: string, date: Date, section: string, keywords : string[],
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
    "name": "오진수",
    "url:": "https://ohjinsu.me/",
  },
  "articleSection": "${section}",
  "dateCreated": "${date}",
  "datePublished": "${date}",
  "dateModified": "${date}",
  "inLanguage": "ko-KR",
  "homepage": "https://ohjinsu.me/",
}</script>`
}