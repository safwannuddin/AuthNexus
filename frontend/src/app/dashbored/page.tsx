'use client'

import Navbar from '@/components/ui/Navbar'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Document Verification</h2>
          <p className="text-gray-600 mb-4">
            Start by uploading your document for verification.
          </p>
          {/* Document upload component will be added here */}
        </div>
      </main>
    </div>
  )
}