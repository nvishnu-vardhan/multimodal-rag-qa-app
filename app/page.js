'use client'
import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('ingestion')
  const [darkMode, setDarkMode] = useState(true)
  const [documents, setDocuments] = useState([])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    const fileArray = Array.from(files)
    setDocuments(prev => [...prev, ...fileArray.map(f => ({ name: f.name, size: f.size, status: 'processing' }))])
    setTimeout(() => {
      setDocuments(prev => prev.map(d => ({ ...d, status: 'completed' })))
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connect your RAG backend API to get real answers from your documents.' }])
    }, 1000)
    setInput('')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div style={{ minHeight: '100vh', display: 'flex', background: darkMode ? '#0a0a0a' : '#f9fafb', color: darkMode ? '#fff' : '#000' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: darkMode ? '#1a1a1a' : '#1f2937', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🤖</span> Multi Model RAG
            </h1>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>RAG System</p>
          </div>
          
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setActiveTab('overview')} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', borderRadius: '6px', background: activeTab === 'overview' ? '#374151' : 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 Overview & Report
            </button>
            <button onClick={() => setActiveTab('ingestion')} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', borderRadius: '6px', background: activeTab === 'ingestion' ? '#374151' : 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⬆️ Ingestion Pipeline
            </button>
            <button onClick={() => setActiveTab('chatbot')} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', borderRadius: '6px', background: activeTab === 'chatbot' ? '#374151' : 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              💬 Q&A Chatbot
            </button>
            <button onClick={() => setActiveTab('evaluation')} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', borderRadius: '6px', background: activeTab === 'evaluation' ? '#374151' : 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 System Evaluation
            </button>
          </nav>
          
          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: `1px solid ${darkMode ? '#374151' : '#4b5563'}` }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>System Status</p>
            <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                Vector DB Online
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                Gemini 2.5 Active
              </div>
            </div>

                      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <div style={{ padding: '20px 30px', borderBottom: `1px solid ${darkMode ? '#2d2d2d' : '#e5e5e5'}`, background: darkMode ? '#1a1a1a' : '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: darkMode ? '#ffffff' : '#000000' }}>
            {activeTab === 'overview' && 'Overview & Report'}
            {activeTab === 'ingestion' && 'Ingestion Pipeline'}
            {activeTab === 'chatbot' && 'Q&A Chatbot'}
            {activeTab === 'evaluation' && 'System Evaluation'}
          </h2>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: darkMode ? '#2d2d2d' : '#f0f0f0', color: darkMode ? '#ffffff' : '#000000', cursor: 'pointer', fontSize: '14px' }}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '30px', overflow: 'auto', background: darkMode ? '#0d0d0d' : '#f9f9f9' }}>
          
          {/* Ingestion Pipeline Tab */}
          {activeTab === 'ingestion' && (
            <div>
              <div
                onDrop={handleDrop}
                onDragOver={handleDrag}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                style={{
                  border: `2px dashed ${dragActive ? '#4f46e5' : (darkMode ? '#2d2d2d' : '#d1d5db')}`,
                  borderRadius: '12px',
                  padding: '60px 20px',
                  textAlign: 'center',
                  background: dragActive ? (darkMode ? '#1a1a2e' : '#eef2ff') : (darkMode ? '#1a1a1a' : '#ffffff'),
                  marginBottom: '30px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
                <h3 style={{ color: darkMode ? '#ffffff' : '#000000', marginBottom: '10px' }}>Drag & Drop Documents</h3>
                <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '20px' }}>or click to browse files</p>
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={(e) => handleFiles(Array.from(e.target.files))}
                  style={{ display: 'none' }}
                  accept=".pdf,.txt,.doc,.docx"
                />
                <button style={{ padding: '10px 24px', background: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>
                  Select Files
                </button>
              </div>

              {/* Processed Documents */}
              <h3 style={{ color: darkMode ? '#ffffff' : '#000000', marginBottom: '20px' }}>Processed Documents</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {documents.map((doc, index) => (
                  <div key={index} style={{ background: darkMode ? '#1a1a1a' : '#ffffff', padding: '20px', borderRadius: '8px', border: `1px solid ${darkMode ? '#2d2d2d' : '#e5e5e5'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                      <div style={{ fontSize: '24px' }}>📄</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: darkMode ? '#ffffff' : '#000000', fontWeight: '500', marginBottom: '5px' }}>{doc.name}</div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '14px' }}>{doc.size}</div>
                      </div>
                    </div>
                    <span style={{ padding: '4px 12px', background: doc.status === 'completed' ? '#10b981' : '#f59e0b', color: '#ffffff', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                      {doc.status === 'completed' ? '✓ Completed' : '⏳ Processing'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Q&A Chatbot Tab */}
          {activeTab === 'chatbot' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 200px)' }}>
              {/* Chat Messages */}
              <div style={{ flex: 1, overflow: 'auto', marginBottom: '20px', background: darkMode ? '#1a1a1a' : '#ffffff', borderRadius: '12px', padding: '20px', border: `1px solid ${darkMode ? '#2d2d2d' : '#e5e5e5'}` }}>
                {messages.map((msg, index) => (
                  <div key={index} style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.role === 'user' ? '#4f46e5' : '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '14px', flexShrink: 0 }}>
                      {msg.role === 'user' ? '👤' : '🤖'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: darkMode ? '#ffffff' : '#000000', fontWeight: '600', marginBottom: '5px', textTransform: 'capitalize' }}>{msg.role}</div>
                      <div style={{ color: darkMode ? '#d1d5db' : '#374151', lineHeight: '1.6' }}>{msg.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question about your documents..."
                  style={{
                    flex: 1,
                    padding: '15px 20px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? '#2d2d2d' : '#d1d5db'}`,
                    background: darkMode ? '#1a1a1a' : '#ffffff',
                    color: darkMode ? '#ffffff' : '#000000',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    padding: '15px 30px',
                    background: '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Overview & Report Tab */}
          {activeTab === 'overview' && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📊</div>
              <h3 style={{ color: darkMode ? '#ffffff' : '#000000', marginBottom: '10px' }}>Overview & Report</h3>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>System overview and analytics will be displayed here</p>
            </div>
          )}

          {/* System Evaluation Tab */}
          {activeTab === 'evaluation' && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛠️</div>
              <h3 style={{ color: darkMode ? '#ffffff' : '#000000', marginBottom: '10px' }}>System Evaluation</h3>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>System performance metrics and evaluation tools</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Home
          </div>
        </div>
