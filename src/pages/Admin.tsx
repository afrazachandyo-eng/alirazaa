import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, ShoppingBag, DollarSign, TrendingUp, 
  Package, LayoutDashboard, MessageSquare, 
  Settings, Search, MoreHorizontal, Bell, Plus, Download
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const stats = [
    { label: 'Total Revenue', value: 'PKR 142k', trend: '+12.5%', icon: <DollarSign />, color: 'bg-green-100 text-green-600' },
    { label: 'Total Orders', value: '482', trend: '+8.2%', icon: <ShoppingBag />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Customers', value: '1,240', trend: '+24%', icon: <Users />, color: 'bg-[#f06292]/10 text-[#f06292]' },
    { label: 'Conversion Rate', value: '3.4%', trend: '-2.1%', icon: <TrendingUp />, color: 'bg-orange-100 text-orange-600' },
  ];

  const chartData = [
    { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 6000 }, { name: 'Fri', sales: 8000 }, { name: 'Sat', sales: 9000 }, { name: 'Sun', sales: 11000 },
  ];

  const pieData = [
    { name: 'Clothing', value: 400 }, { name: 'Toys', value: 300 }, { name: 'Essentials', value: 300 },
  ];

  const COLORS = ['#f06292', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="flex h-screen bg-[#fdfbf7] overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white p-6 hidden xl:flex flex-col">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#f06292] rounded-full flex items-center justify-center font-bold text-white">LH</div>
          <span className="text-xl font-bold tracking-tight">AdminPanel</span>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
            { id: 'products', icon: <Package />, label: 'Products' },
            { id: 'orders', icon: <ShoppingBag />, label: 'Orders Center' },
            { id: 'customers', icon: <Users />, label: 'Customers' },
            { id: 'reviews', icon: <MessageSquare />, label: 'Reviews' },
            { id: 'settings', icon: <Settings />, label: 'Platform Config' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={cn(
                "w-full flex items-center p-3 rounded-xl transition-all font-medium text-sm",
                activeMenu === item.id ? "bg-[#f06292] text-white shadow-lg shadow-pink-500/20" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="w-5 h-5 mr-3">{item.icon}</div>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <Link to="/" className="text-xs font-bold text-[#f06292] hover:underline uppercase tracking-widest">Back to Website</Link>
        </div>
      </aside>

      {/* Admin Main Body */}
      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#eee] p-6 z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#1a1a1a] capitalize tracking-tight">{activeMenu}</h1>
            <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest">Store Overview • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="bg-[#f5f2ed] rounded-xl px-4 py-2 hidden md:flex items-center">
                <Search className="w-4 h-4 text-[#8e8e8e] mr-2" />
                <input type="text" placeholder="Global Search..." className="bg-transparent border-none focus:ring-0 text-sm w-48 outline-none" />
             </div>
             <button className="p-2.5 bg-[#f5f2ed] rounded-xl relative">
                <Bell className="w-5 h-5 text-[#4a4a4a]" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 rounded-full border-2 border-white" />
             </button>
             <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-[#f06292] font-black shadow-sm">A</div>
          </div>
        </header>

        <main className="p-8">
          {activeMenu === 'dashboard' ? (
            <div className="space-y-10">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map(s => (
                  <div key={s.label} className="bg-white p-6 rounded-[2rem] border border-[#f5f2ed] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className={cn("p-3 rounded-2xl", s.color)}>{s.icon}</div>
                      <span className={cn("text-[10px] font-black px-2 py-1 rounded-full", s.trend.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>{s.trend}</span>
                    </div>
                    <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest mb-1">{s.label}</p>
                    <h3 className="text-3xl font-black text-[#1a1a1a]">{s.value}</h3>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-[#f5f2ed] shadow-sm h-[450px]">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h4 className="text-lg font-black text-[#1a1a1a]">Weekly Revenue</h4>
                      <p className="text-xs text-[#8e8e8e] font-bold">Sales performance across week days</p>
                    </div>
                    <button className="flex items-center text-xs font-bold text-[#f06292] uppercase"><Download className="w-4 h-4 mr-1" /> Export</button>
                  </div>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f2ed" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                        cursor={{ fill: '#fdfbf7' }}
                      />
                      <Bar dataKey="sales" fill="#f06292" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-[#f5f2ed] shadow-sm h-[450px]">
                  <h4 className="text-lg font-black text-[#1a1a1a] mb-10">Sales by Category</h4>
                  <div className="h-[80%] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table Skeleton */}
              <div className="bg-white p-10 rounded-[3rem] border border-[#f5f2ed] shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-lg font-black text-[#1a1a1a]">Recent Transaction History</h4>
                  <Link to="/admin/orders" className="text-xs font-bold text-[#f06292] uppercase hover:underline">View All Sales</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#f5f2ed]">
                        <th className="pb-4 text-[10px] font-black uppercase text-[#8e8e8e] tracking-widest pl-2">OrderID</th>
                        <th className="pb-4 text-[10px] font-black uppercase text-[#8e8e8e] tracking-widest">Customer</th>
                        <th className="pb-4 text-[10px] font-black uppercase text-[#8e8e8e] tracking-widest">Status</th>
                        <th className="pb-4 text-[10px] font-black uppercase text-[#8e8e8e] tracking-widest">Amount</th>
                        <th className="pb-4 text-right pr-2"><div className="w-4 h-4 ml-auto" /></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#fdfbf7]">
                      {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i} className="group hover:bg-[#fdfbf7] transition-colors">
                          <td className="py-5 font-bold text-sm text-[#1a1a1a] pl-2">#LH-1283{i}</td>
                          <td className="py-5">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-pink-50 mr-3 overflow-hidden">
                                 <img src={`https://i.pravatar.cc/150?u=cust${i}`} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-bold text-[#4a4a4a]">Hammad A.</span>
                            </div>
                          </td>
                          <td className="py-5">
                             <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", i % 2 === 0 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                                {i % 2 === 0 ? 'Delivered' : 'In Transit'}
                             </span>
                          </td>
                          <td className="py-5 font-black text-sm text-[#1a1a1a]">PKR {Math.floor(Math.random() * 5000 + 1000).toLocaleString()}</td>
                          <td className="py-5 text-right pr-2">
                             <button className="p-2 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-5 h-5 text-[#8e8e8e]" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-40">
               <h2 className="text-3xl font-black text-[#1a1a1a] mb-4">Module Under Construction</h2>
               <p className="text-[#8e8e8e]">This administrative section is currently being architected.</p>
               <button onClick={() => setActiveMenu('dashboard')} className="mt-8 px-10 py-4 bg-[#f06292] text-white rounded-2xl font-black shadow-xl shrink shadow-pink-100">Back to Dashboard</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
