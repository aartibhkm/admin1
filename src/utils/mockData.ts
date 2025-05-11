import { User, Booking, DashboardStats } from '../types';

// Admin credentials - in a real app, these would be stored securely in a database
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'parkadmin123'
};

// Generate random date within the last 30 days
const getRandomRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

// Generate random date within the next 7 days
const getRandomFutureDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 7));
  return date.toISOString();
};

// Generate mock users
export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  registeredOn: getRandomRecentDate(),
  lastLogin: getRandomRecentDate(),
  status: ['active', 'inactive', 'suspended'][Math.floor(Math.random() * 3)] as 'active' | 'inactive' | 'suspended',
}));

// Generate mock bookings
export const mockBookings: Booking[] = Array.from({ length: 100 }, (_, i) => {
  const startTime = getRandomRecentDate();
  const endTime = new Date(new Date(startTime).getTime() + Math.random() * 1000 * 60 * 60 * 5).toISOString();
  const userId = `user-${Math.floor(Math.random() * 50) + 1}`;
  const userIndex = Number(userId.split('-')[1]) - 1;
  
  return {
    id: `booking-${i + 1}`,
    userId,
    userName: mockUsers[userIndex]?.name || 'Unknown User',
    vehicleType: ['car', 'motorcycle', 'truck', 'other'][Math.floor(Math.random() * 4)] as 'car' | 'motorcycle' | 'truck' | 'other',
    vehicleNumber: `${['CA', 'NY', 'TX', 'FL'][Math.floor(Math.random() * 4)]}-${Math.floor(Math.random() * 900) + 100}${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
    parkingSpot: `${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}-${Math.floor(Math.random() * 30) + 1}`,
    startTime,
    endTime,
    status: ['upcoming', 'active', 'completed', 'cancelled'][Math.floor(Math.random() * 4)] as 'upcoming' | 'active' | 'completed' | 'cancelled',
    amount: Math.floor(Math.random() * 40) + 10,
  };
});

// Mock dashboard statistics
export const mockDashboardStats: DashboardStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(user => user.status === 'active').length,
  totalBookings: mockBookings.length,
  activeBookings: mockBookings.filter(booking => booking.status === 'active').length,
  revenue: {
    daily: Math.floor(Math.random() * 1000) + 500,
    weekly: Math.floor(Math.random() * 5000) + 3000,
    monthly: Math.floor(Math.random() * 20000) + 10000,
  },
  occupancyRate: Math.floor(Math.random() * 40) + 60,
};