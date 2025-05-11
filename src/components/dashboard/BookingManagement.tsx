import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  Edit2, 
  Trash2, 
  Check, 
  X,
  Clock,
  Car,
  Tag
} from 'lucide-react';
import Button from '../ui/Button';
import DataTable from '../ui/DataTable';
import Card from '../ui/Card';
import { mockBookings } from '../../utils/mockData';
import { Booking } from '../../types';

const BookingManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter bookings based on search term and status filter
  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.parkingSpot.toLowerCase().includes(searchTerm.toLowerCase());
                        
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { 
      key: 'userName', 
      header: 'User',
      render: (booking: Booking) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-2">
            {booking.userName.charAt(0)}
          </div>
          <span>{booking.userName}</span>
        </div>
      )
    },
    { 
      key: 'vehicleInfo', 
      header: 'Vehicle Info',
      render: (booking: Booking) => (
        <div className="flex items-center">
          <Car size={16} className="text-slate-400 mr-2" />
          <div>
            <div className="font-medium">{booking.vehicleNumber}</div>
            <div className="text-xs text-slate-500 capitalize">{booking.vehicleType}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'parkingSpot', 
      header: 'Spot',
      render: (booking: Booking) => (
        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
          {booking.parkingSpot}
        </div>
      )
    },
    { 
      key: 'duration', 
      header: 'Duration',
      render: (booking: Booking) => {
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
        const hours = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60));
        
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-xs text-slate-500 mb-1">
              <Calendar size={12} className="mr-1" />
              {start.toLocaleDateString()}
            </div>
            <div className="flex items-center text-xs text-slate-500">
              <Clock size={12} className="mr-1" />
              {hours} hours
            </div>
          </div>
        );
      }
    },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (booking: Booking) => (
        <div className="flex items-center">
          <Tag size={16} className="text-slate-400 mr-2" />
          <span className="font-medium">${booking.amount.toFixed(2)}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (booking: Booking) => {
        const statusConfig = {
          upcoming: {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            icon: <Clock size={12} className="mr-1" />
          },
          active: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-800',
            icon: <Check size={12} className="mr-1" />
          },
          completed: {
            bg: 'bg-slate-100',
            text: 'text-slate-800',
            icon: <Check size={12} className="mr-1" />
          },
          cancelled: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: <X size={12} className="mr-1" />
          }
        };
        
        const config = statusConfig[booking.status];
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {config.icon}
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        );
      }
    },
  ];
  
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Booking Management</h1>
        <p className="text-slate-500 mt-1">View and manage parking reservations</p>
      </div>
      
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center"
                icon={<Filter size={16} />}
              >
                <span>Filter</span>
              </Button>
              
              <div className="absolute right-0 top-12 z-10 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-1">
                <div className="py-1">
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All Bookings
                  </button>
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'upcoming' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('upcoming')}
                  >
                    Upcoming
                  </button>
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'active' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'completed' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('completed')}
                  >
                    Completed
                  </button>
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'cancelled' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('cancelled')}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center"
                icon={<Calendar size={16} />}
              >
                <span>Date Range</span>
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center"
              icon={<Download size={16} />}
            >
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        <DataTable
          data={filteredBookings}
          columns={columns}
          keyExtractor={(booking) => booking.id}
          actions={(booking) => (
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="p-1"
                icon={<Edit2 size={16} />}
              >
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="p-1 text-red-600 border-red-200 hover:bg-red-50"
                icon={<Trash2 size={16} />}
              >
                <span className="sr-only">Cancel</span>
              </Button>
            </div>
          )}
        />
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">{filteredBookings.length}</span> of{' '}
            <span className="font-medium">{mockBookings.length}</span> bookings
          </p>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingManagement;