import React from 'react'

const SimpleDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-4">CUSTOM DASHBOARD WORKING!</h1>
        <p className="text-gray-700 mb-2">
          This is a test dashboard to verify the override is working.
        </p>
        <p className="text-gray-700 mb-4">
          If you can see this styled content, both the dashboard override AND Tailwind CSS are
          working!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Test Card 1</h3>
            <p className="text-gray-600">This card should have Tailwind styling.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Test Card 2</h3>
            <p className="text-gray-600">This card should have Tailwind styling.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Test Card 3</h3>
            <p className="text-gray-600">This card should have Tailwind styling.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleDashboard
