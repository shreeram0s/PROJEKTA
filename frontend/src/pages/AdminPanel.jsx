import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Filter,
  Search
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const chartData = [
    { date: 'Jan', users: 40, analyses: 24 },
    { date: 'Feb', users: 30, analyses: 13 },
    { date: 'Mar', users: 20, analyses: 8 },
    { date: 'Apr', users: 27, analyses: 15 },
    { date: 'May', users: 18, analyses: 9 },
    { date: 'Jun', users: 23, analyses: 14 },
    { date: 'Jul', users: 34, analyses: 20 },
  ];

  // Mock data for users
  const mockUsers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', analyses: 5, lastActive: '2023-10-15' },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', analyses: 12, lastActive: '2023-10-18' },
    { id: 3, name: 'David Smith', email: 'david@example.com', analyses: 3, lastActive: '2023-10-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', analyses: 8, lastActive: '2023-10-20' },
    { id: 5, name: 'James Brown', email: 'james@example.com', analyses: 15, lastActive: '2023-10-22' },
  ];

  // Mock data for analyses
  const mockAnalyses = [
    { id: 101, user: 'Alex Johnson', matchScore: 78, skills: 12, date: '2023-10-15' },
    { id: 102, user: 'Maria Garcia', matchScore: 92, skills: 18, date: '2023-10-18' },
    { id: 103, user: 'David Smith', matchScore: 65, skills: 8, date: '2023-10-10' },
    { id: 104, user: 'Sarah Williams', matchScore: 85, skills: 15, date: '2023-10-20' },
    { id: 105, user: 'James Brown', matchScore: 95, skills: 22, date: '2023-10-22' },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setAnalyses(mockAnalyses);
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'users', name: 'Users' },
    { id: 'analyses', name: 'Analyses' },
    { id: 'reports', name: 'Reports' }
  ];

  const stats = [
    { 
      title: 'Total Users', 
      value: '1,248', 
      change: '+12%', 
      icon: <Users className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Total Analyses', 
      value: '3,421', 
      change: '+18%', 
      icon: <FileText className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Avg Match Score', 
      value: '78%', 
      change: '+5%', 
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-pink-500 to-pink-600'
    },
    { 
      title: 'Active Today', 
      value: '243', 
      change: '+8%', 
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your ProFileMatch platform
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-green-500 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Chart */}
            <div className="bg-background border rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold">Platform Activity</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="analyses"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-background border rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Users</h2>
                <div className="space-y-4">
                  {mockUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{user.analyses} analyses</p>
                        <p className="text-sm text-muted-foreground">{user.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background border rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Analyses</h2>
                <div className="space-y-4">
                  {mockAnalyses.slice(0, 5).map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{analysis.user}</p>
                        <p className="text-sm text-muted-foreground">Analysis #{analysis.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{analysis.matchScore}% match</p>
                        <p className="text-sm text-muted-foreground">{analysis.skills} skills</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-background border rounded-2xl p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 bg-muted rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Analyses</th>
                    <th className="text-left py-3 px-4">Last Active</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{user.name}</div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                        <td className="py-3 px-4">{user.analyses}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{user.lastActive}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:underline text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Analyses Tab */}
        {activeTab === 'analyses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-background border rounded-2xl p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">Analysis Reports</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search analyses..."
                    className="pl-10 pr-4 py-2 bg-muted rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Analysis ID</th>
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Match Score</th>
                    <th className="text-left py-3 px-4">Skills</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAnalyses.map((analysis) => (
                    <tr key={analysis.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">#{analysis.id}</td>
                      <td className="py-3 px-4">{analysis.user}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                              style={{ width: `${analysis.matchScore}%` }}
                            ></div>
                          </div>
                          <span>{analysis.matchScore}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{analysis.skills}</td>
                      <td className="py-3 px-4">{analysis.date}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:underline text-sm">
                          View Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-background border rounded-2xl p-6 text-center py-12"
          >
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Detailed Reports</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Generate comprehensive reports on user activity, analysis trends, and platform performance.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
              Generate Report
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;