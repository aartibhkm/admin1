import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Filter, 
  Download, 
  Check, 
  X 
} from 'lucide-react';
import Button from '../ui/Button';
import DataTable from '../ui/DataTable';
import Card from '../ui/Card';
import { mockUsers } from '../../utils/mockData';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter users based on search term and status filter
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.phone.includes(searchTerm);
                        
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { 
      key: 'registeredOn', 
      header: 'Registered On',
      render: (user: User) => new Date(user.registeredOn).toLocaleDateString()
    },
    { 
      key: 'lastLogin', 
      header: 'Last Login',
      render: (user: User) => new Date(user.lastLogin).toLocaleDateString()
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (user: User) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 
          user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {user.status === 'active' ? <Check size={12} className="mr-1" /> : 
           user.status === 'inactive' ? <X size={12} className="mr-1" /> :
           <X size={12} className="mr-1" />}
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      )
    },
  ];
  
  return (
    <div className="px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-500 mt-1">View and manage user accounts</p>
      </div>
      
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-3">
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
                    All Users
                  </button>
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'active' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'inactive' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('inactive')}
                  >
                    Inactive
                  </button>
                  <button
                    className={`text-left w-full px-4 py-2 text-sm ${statusFilter === 'suspended' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setStatusFilter('suspended')}
                  >
                    Suspended
                  </button>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center"
              icon={<Download size={16} />}
            >
              <span>Export</span>
            </Button>
            
            <Button 
              className="flex items-center"
              icon={<UserPlus size={16} />}
            >
              <span>Add User</span>
            </Button>
          </div>
        </div>
        
        <DataTable
          data={filteredUsers}
          columns={columns}
          keyExtractor={(user) => user.id}
          actions={(user) => (
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
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          )}
        />
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
            <span className="font-medium">{mockUsers.length}</span> users
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

export default UserManagement;