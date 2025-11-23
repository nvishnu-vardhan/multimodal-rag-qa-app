export default function Home() {
  return (
    <div style={{padding: '40px', fontFamily: 'system-ui'}}>
      <h1>Multimodal RAG Q&A Application</h1>
      <p>A RAG-based question-answering system with document ingestion, retrieval, and answer generation.</p>
      <div style={{marginTop: '20px'}}>
        <h2>Features:</h2>
        <ul>
          <li>Document Upload & Indexing</li>
          <li>Context Retrieval</li>
          <li>Answer Generation</li>
          <li>Multi-modal Support</li>
        </ul>
      </div>
    </div>
  )
}
