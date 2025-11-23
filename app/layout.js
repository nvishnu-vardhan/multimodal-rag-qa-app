export const metadata = {
  title: 'Multimodal RAG Q&A App',
  description: 'A RAG-based question-answering system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
