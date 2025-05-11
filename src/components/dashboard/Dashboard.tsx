import React from 'react';
import { 
  Users, 
  CalendarClock, 
  DollarSign, 
  Car, 
  LineChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from 'lucide-react';
import Card from '../ui/Card';
import StatCard from '../ui/StatCard';
import { mockDashboardStats, mockBookings } from '../../utils/mockData';

const Dashboard: React.FC = () => {
  // Get recent bookings (last 5)
  const recentBookings = [...mockBookings]
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 5);

  return (
    <div className="px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your parking system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={mockDashboardStats.totalUsers}
          icon={<Users size={24} />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Active Bookings"
          value={mockDashboardStats.activeBookings}
          icon={<CalendarClock size={24} />}
          trend={{ value: 12.4, isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${mockDashboardStats.revenue.monthly.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          trend={{ value: 3.8, isPositive: true }}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${mockDashboardStats.occupancyRate}%`}
          icon={<Car size={24} />}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card 
          className="lg:col-span-2"
          title="Revenue Overview"
          subtitle="Last 30 days"
          icon={<LineChart size={20} className="text-blue-600" />}
        >
          <div className="h-72 flex items-center justify-center bg-slate-50 rounded-md">
            <div className="text-center">
              <Activity size={48} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500">Revenue chart visualization will appear here</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card 
          title="Recent Bookings" 
          subtitle="Last 5 bookings"
        >
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-start pb-3 border-b border-slate-100">
                <div>
                  <p className="font-medium">{booking.userName}</p>
                  <p className="text-sm text-slate-500">Spot: {booking.parkingSpot}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(booking.startTime).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    booking.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                    booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'completed' ? 'bg-slate-100 text-slate-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-100">Daily Revenue</h3>
              <p className="text-2xl font-bold mt-1">${mockDashboardStats.revenue.daily.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight size={16} className="mr-1" />
                <span className="text-sm">+5.2% from yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <DollarSign size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-emerald-100">Active Users</h3>
              <p className="text-2xl font-bold mt-1">{mockDashboardStats.activeUsers}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight size={16} className="mr-1" />
                <span className="text-sm">+3.1% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Users size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-orange-100">Available Spots</h3>
              <p className="text-2xl font-bold mt-1">{100 - mockDashboardStats.occupancyRate}/100</p>
              <div className="flex items-center mt-2">
                <ArrowDownRight size={16} className="mr-1" />
                <span className="text-sm">-2.8% from yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Car size={24} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;