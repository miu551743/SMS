import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, BookOpen, DollarSign, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Students', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Teachers', value: '56', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Revenue', value: '$45,000', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Classes', value: '24', icon: Calendar, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
      
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {user?.role === 'teacher' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <p className="text-gray-600">Navigate to Attendance to mark today's attendance.</p>
        </div>
      )}

      {user?.role === 'accountant' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
          <p className="text-gray-600">Navigate to Finance to manage income and expenses.</p>
        </div>
      )}
    </div>
  );
}
