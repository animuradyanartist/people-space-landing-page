import React, { useState } from 'react';
import { 
  Layers, 
  User, 
  Calendar, 
  Clock, 
  ChevronDown, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Plus, 
  ArrowLeft,
  Briefcase,
  Umbrella,
  Stethoscope,
  GraduationCap,
  Droplets,
  Heart,
  Sword,
  MapPin,
  Monitor,
  CheckCircle2,
  MoreHorizontal,
  Info,
  Eye,
  Utensils,
  LogIn,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Filter,
  Target,
  BarChart3,
  TrendingUp,
  Users2,
  DollarSign,
  ArrowRight,
  ArrowUpRight,
  PieChart,
  Map,
  LayoutGrid,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Request {
  id: string;
  type: string;
  substitute: string;
  start: string;
  end: string;
  duration: string;
  submittedOn: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
  icon: React.ReactNode;
}

const requestsData: Request[] = [
  {
    id: '1',
    type: 'Regular Vacation',
    substitute: '-',
    start: '06/04/2026',
    end: '30/04/2026',
    duration: '19 bus. days',
    submittedOn: '31/03/2026',
    status: 'Draft',
    icon: <Umbrella className="w-4 h-4 text-blue-500" />
  },
  {
    id: '2',
    type: 'Overtime non working day',
    substitute: '-',
    start: '28/03/2026 16:00',
    end: '28/03/2026 16:30',
    duration: '30 m',
    submittedOn: '27/03/2026',
    status: 'Draft',
    icon: <Clock className="w-4 h-4 text-purple-500" />
  },
  {
    id: '3',
    type: 'Overtime non working day',
    substitute: '-',
    start: '27/03/2026 10:30',
    end: '27/03/2026 19:00',
    duration: '-',
    submittedOn: '31/03/2026',
    status: 'Draft',
    icon: <Clock className="w-4 h-4 text-purple-500" />
  },
  {
    id: '4',
    type: 'Overtime non working day',
    substitute: '-',
    start: '25/03/2026 15:00',
    end: '25/03/2026 17:00',
    duration: '2 h',
    submittedOn: '30/03/2026',
    status: 'Draft',
    icon: <Clock className="w-4 h-4 text-purple-500" />
  },
  {
    id: '5',
    type: 'Overtime non working day',
    substitute: '-',
    start: '25/03/2026 13:30',
    end: '25/03/2026 20:30',
    duration: '6 h',
    submittedOn: '31/03/2026',
    status: 'Draft',
    icon: <Clock className="w-4 h-4 text-purple-500" />
  }
];

const Logo = ({ className = "w-8 h-8", iconClassName = "w-5 h-5" }: { className?: string, iconClassName?: string }) => (
  <div className={`relative flex items-center justify-center rounded-2xl bg-[#4CAF50] shadow-lg shadow-[#4CAF50]/20 ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${iconClassName} text-white`}>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(-35 12 12)" />
      <circle cx="19" cy="7" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

const Sidebar = ({ currentView, onViewChange }: { currentView: string, onViewChange: (view: string) => void }) => (
  <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
    <div className="p-6 flex items-center gap-3">
      <Logo className="w-8 h-8" iconClassName="w-5 h-5" />
      <div>
        <h1 className="font-bold text-gray-900 leading-tight">People Space</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">HR Management</p>
      </div>
      <button className="ml-auto p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </button>
    </div>

    <nav className="flex-1 px-4 py-4 space-y-1">
      <button 
        onClick={() => onViewChange('Modules')}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
          currentView === 'Modules' ? 'bg-[#4CAF50]/10 text-[#4CAF50] font-bold' : 'text-gray-500 hover:bg-gray-50'
        }`}
      >
        <Logo className="w-4 h-4" iconClassName="w-2.5 h-2.5" />
        <span className="text-sm">Modules</span>
      </button>

      <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all group">
        <User className="w-4 h-4 group-hover:text-[#4CAF50]" />
        <span className="text-sm font-medium">My Profile</span>
        <span className="ml-auto text-[10px] bg-[#4CAF50]/10 text-[#4CAF50] px-1.5 py-0.5 rounded font-bold">New</span>
      </a>
      
      <div className="pt-2">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-50 rounded-xl transition-all group">
          <Calendar className="w-4 h-4 text-[#4CAF50]" />
          <span className="text-sm font-bold">Attendance and Absence</span>
          <ChevronDown className="ml-auto w-4 h-4 text-gray-400" />
        </button>
        
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-50">
          <button 
            onClick={() => onViewChange('Requests')}
            className={`w-full flex items-center gap-3 px-6 py-2.5 rounded-r-xl transition-all text-sm ${
              currentView === 'Requests' 
                ? 'text-[#4CAF50] bg-[#4CAF50]/5 font-bold' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {currentView === 'Requests' && <div className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full" />}
            Requests
          </button>
          <button 
            onClick={() => onViewChange('Vacation planning')}
            className={`w-full flex items-center gap-3 px-6 py-2.5 rounded-r-xl transition-all text-sm ${
              currentView === 'Vacation planning' 
                ? 'text-[#4CAF50] bg-[#4CAF50]/5 font-bold' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {currentView === 'Vacation planning' && <div className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full" />}
            {currentView !== 'Vacation planning' && <Sword className="w-4 h-4" />}
            Vacation planning
          </button>
          <button 
            onClick={() => onViewChange('Attendance')}
            className={`w-full flex items-center gap-3 px-6 py-2.5 rounded-r-xl transition-all text-sm ${
              currentView === 'Attendance' 
                ? 'text-[#4CAF50] bg-[#4CAF50]/5 font-bold' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {currentView === 'Attendance' && <div className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full" />}
            {currentView !== 'Attendance' && <Clock className="w-4 h-4" />}
            Attendance
          </button>
        </div>
      </div>
    </nav>
  </aside>
);

const Header = ({ onBack, title = "Requests" }: { onBack?: () => void, title?: string }) => (
  <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-4">
      {onBack && (
        <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Attendance and Absence</p>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#4CAF50] transition-all w-64"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white" />
        </button>
        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <Sun className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="h-8 w-px bg-gray-100 mx-2" />

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-gray-900">Hanna D.</p>
          <p className="text-[10px] text-gray-400 font-medium">Employee</p>
        </div>
        <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-bold text-xs">
          H
        </div>
      </div>
    </div>
  </header>
);

const NewRequestSelection = ({ onBack }: { onBack: () => void, key?: string }) => {
  const categories = [
    {
      title: "VACATIONS",
      items: [
        { name: "Regular Vacation", icon: <Umbrella className="w-5 h-5 text-blue-500" />, available: "75 days available", paid: true },
        { name: "Paternity Leave for Baby Birth", icon: <User className="w-5 h-5 text-blue-400" />, paid: true },
        { name: "Parental Leave", icon: <Heart className="w-5 h-5 text-blue-600" />, paid: false },
      ]
    },
    {
      title: "ABSENCE REQUESTS",
      items: [
        { name: "Paid Time off", icon: <Clock className="w-5 h-5 text-cyan-500" />, available: "36h 0m available", paid: true },
        { name: "Unpaid Time off", icon: <Clock className="w-5 h-5 text-gray-400" />, paid: false },
        { name: "Sick Leave", icon: <Plus className="w-5 h-5 text-cyan-600" />, paid: true },
        { name: "University Exam", icon: <GraduationCap className="w-5 h-5 text-cyan-700" />, paid: true },
        { name: "Blood Donorship", icon: <Droplets className="w-5 h-5 text-blue-300" />, paid: true },
        { name: "Family Member Loss Leave", icon: <div className="w-5 h-5 bg-cyan-100 rounded" />, paid: true },
        { name: "Military Exercise", icon: <Sword className="w-5 h-5 text-cyan-800" />, paid: true },
      ]
    },
    {
      title: "ATTENDANCE REQUESTS",
      items: [
        { name: "Business Meeting", icon: <Briefcase className="w-5 h-5 text-purple-500" />, paid: true },
        { name: "Remote Work", icon: <Monitor className="w-5 h-5 text-purple-400" />, paid: true },
        { name: "Overtime Work", icon: <Clock className="w-5 h-5 text-purple-600" />, paid: true },
        { name: "Interbranch Rotation", icon: <MapPin className="w-5 h-5 text-purple-700" />, paid: true },
        { name: "Work Without Card", icon: <div className="w-5 h-5 bg-purple-100 rounded border border-purple-200" />, paid: true },
        { name: "Overtime non working day", icon: <Clock className="w-5 h-5 text-purple-800" />, available: "3h 0m available", paid: true },
      ]
    }
  ];

  return (
    <div className="flex-1 bg-gray-50/50 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-8">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 font-bold text-sm mb-8 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.title}>
                <h3 className="text-[10px] font-bold text-gray-400 tracking-widest mb-6">{cat.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item) => (
                    <button key={item.name} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#4CAF50] hover:shadow-md transition-all text-left group">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-[#4CAF50]/5 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                          {item.available && <Info className="w-3 h-3 text-gray-300" />}
                        </div>
                        {item.available && <p className="text-xs text-gray-400">{item.available}</p>}
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.paid ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        {item.paid ? 'PAID' : 'UNPAID'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const DashboardContent = ({ onNewRequest }: { onNewRequest: () => void, key?: string }) => {
  const [activeTab, setActiveTab] = useState('MY REQUESTS');
  const [filter, setFilter] = useState('Vacation');

  return (
    <div className="flex-1 bg-gray-50/50 p-8 space-y-8">
      {/* Top Cards */}
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Balance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Umbrella className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">75 days available</span>
                  <Info className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs text-gray-400">Annual vacation</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">36h 0m available</span>
                </div>
                <p className="text-xs text-gray-400">Paid time off</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Colleagues on vacation</h3>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-bold">
              AF
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Asha Ferry Zieme</h4>
              <p className="text-xs text-gray-400">20.04.2026 - 24.04.2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-8 border-b border-gray-100">
              {['MY REQUESTS', 'APPROVAL REQUESTS', 'TEAM\'S BALANCE', 'RAISED REQUESTS'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-xs font-bold tracking-widest transition-all relative ${
                    activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {tab === 'APPROVAL REQUESTS' && (
                    <span className="ml-2 bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">31</span>
                  )}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4CAF50]" />
                  )}
                </button>
              ))}
            </div>
            <button 
              onClick={onNewRequest}
              className="bg-[#4CAF50] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#43A047] transition-all flex items-center gap-2 shadow-lg shadow-[#4CAF50]/20"
            >
              New request
            </button>
          </div>

          <div className="flex gap-2 mb-8">
            {['Vacation', 'Absence', 'Attendance'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  filter === f ? 'bg-gray-50 border-gray-200 text-gray-900' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-50">
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Request type</th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Substitute</th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start</th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">End</th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Submitted on</th>
                  <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requestsData.map((req) => (
                  <tr key={req.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                          {req.icon}
                        </div>
                        <span className="text-sm font-bold text-gray-900">{req.type}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{req.substitute}</td>
                    <td className="py-4 text-sm text-gray-900 font-medium">{req.start}</td>
                    <td className="py-4 text-sm text-gray-900 font-medium">{req.end}</td>
                    <td className="py-4 text-sm text-gray-500">{req.duration}</td>
                    <td className="py-4 text-sm text-gray-500">{req.submittedOn}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <span className="text-sm font-bold text-gray-900">{req.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AttendanceView = () => {
  const [activeTab, setActiveTab] = useState('My attendance');
  const attendanceData = [
    { date: '11.03.2026', day: 'Wednesday' },
    { date: '12.03.2026', day: 'Thursday' },
    { date: '20.03.2026', day: 'Friday' },
    { date: '23.03.2026', day: 'Monday' },
    { date: '24.03.2026', day: 'Tuesday' },
    { date: '25.03.2026', day: 'Wednesday' },
    { date: '26.03.2026', day: 'Thursday' },
  ];

  return (
    <div className="flex-1 bg-gray-50/50 p-8 space-y-6">
      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
          {['My attendance', 'Team attendance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-900">
          <span>02.03.2026 - 31.03.2026</span>
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <div className="w-4 h-4 border-2 border-gray-200 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-[#4CAF50] rounded-sm opacity-0" />
          </div>
          <span className="text-xs font-medium text-gray-500">Include holidays</span>
        </label>

        <div className="ml-auto flex gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-50/50 rounded-xl border border-blue-100">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Working hours</p>
              <p className="text-sm font-bold text-gray-900">-</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-purple-50/50 rounded-xl border border-purple-100">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Utensils className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Lunchtime duration</p>
              <p className="text-sm font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
            <LogIn className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">In office</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
            <LogOut className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Out of office</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Absence time</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-bold text-gray-900">Date</th>
                <th className="px-4 py-5 text-xs font-bold text-gray-900">Check in</th>
                <th className="px-4 py-5 text-xs font-bold text-gray-900">Check out</th>
                <th className="px-4 py-5 text-xs font-bold text-gray-900">In office</th>
                <th className="px-4 py-5 text-xs font-bold text-gray-900">Out of office</th>
                <th className="px-4 py-5 text-xs font-bold text-gray-900">Absence time</th>
                <th className="px-4 py-5 text-xs font-bold text-gray-900">Attendance/Absence requests</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attendanceData.map((item) => (
                <tr key={item.date} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.date}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{item.day}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">-</td>
                  <td className="px-4 py-4 text-sm text-gray-400">-</td>
                  <td className="px-4 py-4 text-sm text-gray-400">-</td>
                  <td className="px-4 py-4 text-sm text-gray-400">-</td>
                  <td className="px-4 py-4 text-sm text-gray-400">-</td>
                  <td className="px-4 py-4 text-sm text-gray-400">-</td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ModulesView = () => {
  const [activeTab, setActiveTab] = useState('Strategy Management');

  const modules = [
    {
      title: "OKRs",
      description: "Align your team's efforts with high-level objectives and measurable results.",
      gradient: "from-blue-50/50 to-white",
      illustration: (
        <div className="mt-8 relative h-48">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-40 relative z-10">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">Objectives</p>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-blue-500" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold">75%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-1 bg-gray-100 rounded-full w-full" />
              <div className="h-1 bg-gray-100 rounded-full w-2/3" />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 w-52 transform translate-y-2 translate-x-2">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[10px] font-bold text-gray-900">Annual Growth Plan</p>
              <TrendingUp className="w-3 h-3 text-green-500" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[8px] mb-1">
                  <span className="text-gray-400">Revenue Target</span>
                  <span className="font-bold text-green-600">82%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '82%' }} className="h-full bg-green-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] mb-1">
                  <span className="text-gray-400">Market Share</span>
                  <span className="font-bold text-blue-600">45%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '45%' }} className="h-full bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Balanced Scorecard",
      description: "View performance through financial, customer, process, and learning perspectives.",
      gradient: "from-yellow-50/50 to-white",
      illustration: (
        <div className="mt-8 space-y-3 h-48 overflow-hidden">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-yellow-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-900 uppercase">Financial</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500" />)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 bg-blue-50/30 border-b border-gray-50 flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-900">Customer Satisfaction</p>
              <span className="text-[8px] font-bold text-blue-600">9.2/10</span>
            </div>
            <div className="p-3 bg-white flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-900">Internal Processes</p>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/p${i}/50/50`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-gray-50/30 flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-900">Learning & Growth</p>
              <div className="w-12 h-1.5 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "KPIs & Goal Tracking",
      description: "Define what matters most and monitor progress in real time.",
      gradient: "from-purple-50/50 to-white",
      illustration: (
        <div className="mt-8 relative h-48">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 p-2 border-b border-gray-100 flex justify-between items-center">
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Monthly Performance</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="w-1 h-1 rounded-full bg-gray-300" />
              </div>
            </div>
            <table className="w-full text-[9px]">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="p-2 text-left text-gray-400 font-medium">Metric</th>
                  <th className="p-2 text-center text-gray-400 font-medium">Actual</th>
                  <th className="p-2 text-center text-gray-400 font-medium">Target</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="p-2 font-bold text-gray-700">Sales</td>
                  <td className="p-2 text-center text-green-600 font-bold">$42k</td>
                  <td className="p-2 text-center text-gray-400">$40k</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-2 font-bold text-gray-700">Leads</td>
                  <td className="p-2 text-center text-orange-500 font-bold">128</td>
                  <td className="p-2 text-center text-gray-400">150</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-gray-700">Churn</td>
                  <td className="p-2 text-center text-red-500 font-bold">2.1%</td>
                  <td className="p-2 text-center text-gray-400">1.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="absolute -bottom-2 right-2 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 z-10 w-44 transform rotate-1 group-hover:rotate-0 transition-transform">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-[11px] font-black text-purple-600">92% <span className="text-gray-400 font-medium">Overall</span></p>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">Yearly Target</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Company Culture",
      description: "Keep your people connected with a shared space that brings your workplace identity to life.",
      gradient: "from-green-50/50 to-white",
      illustration: (
        <div className="mt-8 space-y-3 h-48 overflow-hidden">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 group hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-0.5">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                <img src="https://picsum.photos/seed/hanna/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-[10px] font-black text-gray-900">Hanna Wright</p>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500" />
                  <p className="text-[7px] text-gray-400 font-bold uppercase">Active</p>
                </div>
              </div>
              <p className="text-[9px] text-gray-500 leading-tight">Just finished the new branding guidelines for the Q3 launch! 🚀</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-green-600" />
                </div>
                <p className="text-[9px] font-black text-gray-900 uppercase tracking-tight">Milestone Reached</p>
              </div>
              <span className="text-[8px] font-bold text-gray-400">2h ago</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-[8px] mb-1.5">
                  <span className="text-gray-500 font-bold">Team Engagement</span>
                  <span className="text-green-600 font-black">88%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[88%]" />
                </div>
              </div>
              <div className="flex -space-x-1.5">
                {[1, 2].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Reporting & Analitics",
      description: "Turn data into clear insights that drive smarter decisions.",
      gradient: "from-orange-50/50 to-white",
      illustration: (
        <div className="mt-8 bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-48">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">Data Insights</p>
              <p className="text-[8px] text-gray-400 font-bold">Weekly Overview</p>
            </div>
            <div className="flex gap-1.5">
              <div className="w-6 h-3 bg-blue-500 rounded-sm" />
              <div className="w-6 h-3 bg-orange-400 rounded-sm" />
            </div>
          </div>
          <div className="flex items-end gap-3 h-20">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-50 rounded-t-lg relative group overflow-hidden h-full">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${i % 2 === 0 ? 'bg-blue-500' : 'bg-orange-400'}`} 
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-50 pt-3">
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-900">12.4k</p>
              <p className="text-[7px] text-gray-400 font-bold uppercase">Visits</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-900">84%</p>
              <p className="text-[7px] text-gray-400 font-bold uppercase">Growth</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-900">2.1m</p>
              <p className="text-[7px] text-gray-400 font-bold uppercase">Revenue</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Strategy Maps",
      description: "Visualize how goals, KPIs, and initiatives connect to your mission.",
      gradient: "from-cyan-50/50 to-white",
      illustration: (
        <div className="mt-8 flex flex-col items-center h-48 relative">
          <div className="w-36 h-10 bg-white rounded-xl border border-blue-100 shadow-sm flex items-center justify-center text-[9px] font-black text-blue-600 uppercase tracking-tight relative z-10">
            Financial Goal
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-blue-100" />
          </div>
          
          <div className="flex gap-8 mt-4 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-px bg-blue-100" />
            <div className="w-28 h-10 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700 relative">
              Customer
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gray-100" />
            </div>
            <div className="w-28 h-10 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700 relative">
              Internal
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gray-100" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 w-full px-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 bg-paper/50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 w-12 h-12 bg-cyan-50 rounded-full blur-xl opacity-50" />
        </div>
      )
    },
    {
      title: "Initiatives",
      description: "Turn strategy into action with clear, manageable projects.",
      gradient: "from-teal-50/50 to-white",
      illustration: (
        <div className="mt-8 space-y-3 h-48">
          {[
            { name: "Market Expansion", progress: 75, color: "bg-teal-500", status: "On Track" },
            { name: "Product Redesign", progress: 40, color: "bg-orange-400", status: "Delayed" },
            { name: "Team Onboarding", progress: 90, color: "bg-blue-500", status: "Active" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm group hover:border-teal-200 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{item.name}</p>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                  <span className="text-[7px] font-bold text-gray-400 uppercase">{item.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    className={`h-full ${item.color}`} 
                  />
                </div>
                <span className="text-[9px] font-black text-gray-900">{item.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 bg-white p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-1 mb-6">
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">KEY</span>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">FEATURES</span>
          </div>

          <div className="flex gap-4 mb-12">
            {[
              { id: 'Strategy Management', icon: <Target className="w-4 h-4" /> },
              { id: 'HRMS', icon: <ClipboardList className="w-4 h-4" /> },
              { id: 'Spark AI', icon: <Sparkles className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#0A0F2C] border-[#0A0F2C] text-white shadow-lg' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className={`${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
                  {tab.icon}
                </div>
                <span className="text-sm font-bold">{tab.id}</span>
              </button>
            ))}
          </div>

          <h1 className="text-5xl font-black text-[#0A0F2C] mb-16 tracking-tight">
            Execute Strategy with Precision
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((mod) => (
              <motion.div
                key={mod.title}
                whileHover={{ y: -12, transition: { duration: 0.4, ease: "easeOut" } }}
                className={`bg-gradient-to-b ${mod.gradient} p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-[520px] relative group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-[#0A0F2C] leading-tight pr-8 group-hover:text-blue-600 transition-colors">{mod.title}</h3>
                    <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                    {mod.description}
                  </p>
                </div>
                
                <div className="flex-1 flex flex-col justify-center relative z-10">
                  <div className="transform group-hover:scale-105 transition-transform duration-500">
                    {mod.illustration}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isNewRequestView, setIsNewRequestView] = useState(false);
  const [currentView, setCurrentView] = useState('Modules');

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setIsNewRequestView(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      <div className="flex-1 flex flex-col">
        <Header 
          onBack={isNewRequestView ? () => setIsNewRequestView(false) : undefined} 
          title={isNewRequestView ? "Requests" : currentView}
        />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            {isNewRequestView ? (
              <NewRequestSelection key="selection" onBack={() => setIsNewRequestView(false)} />
            ) : currentView === 'Requests' ? (
              <DashboardContent key="dashboard" onNewRequest={() => setIsNewRequestView(true)} />
            ) : currentView === 'Attendance' ? (
              <AttendanceView key="attendance" />
            ) : currentView === 'Modules' ? (
              <ModulesView key="modules" />
            ) : (
              <div key="placeholder" className="flex-1 flex items-center justify-center text-gray-400">
                {currentView} View Coming Soon
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
