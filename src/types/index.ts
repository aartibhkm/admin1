export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredOn: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  vehicleType: 'car' | 'motorcycle' | 'truck' | 'other';
  vehicleNumber: string;
  parkingSpot: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  amount: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalBookings: number;
  activeBookings: number;
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  occupancyRate: number;
}

export interface AdminCredentials {
  username: string;
  password: string;
}