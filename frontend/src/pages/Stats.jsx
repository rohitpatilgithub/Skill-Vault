import React from 'react'
import { useTaskContext } from '../contexts/TaskContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { BarChart3, TrendingUp, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const Stats = () => {
  const { userTasks } = useTaskContext();
  const { colors } = useThemeContext();

  // Calculate detailed stats
  const totalTasks = userTasks.length;
  const completedTasks = userTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in_progress').length;
  const pendingTasks = userTasks.filter(task => task.status === 'pending' || task.status === 'not_started').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate weekly progress data from real tasks
  const getWeeklyData = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);
    weekStart.setHours(0, 0, 0, 0);

    const weeklyTaskCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat

    userTasks.forEach(task => {
      // For completed tasks, use endDate
      if (task.status === 'completed' && task.endDate) {
        const taskDate = new Date(task.endDate);
        const daysDiff = Math.floor((taskDate - weekStart) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 0 && daysDiff <= 6) {
          weeklyTaskCounts[daysDiff]++;
        }
      }
      // For in-progress tasks, use startDate as activity indicator
      else if (task.status === 'in_progress' && task.startDate) {
        const taskDate = new Date(task.startDate);
        const daysDiff = Math.floor((taskDate - weekStart) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 0 && daysDiff <= 6) {
          weeklyTaskCounts[daysDiff]++;
        }
      }
      // For tasks created this week, use creation date (assuming it's available)
      else if ((task.status === 'pending' || task.status === 'not_started') && task.startDate) {
        const taskDate = new Date(task.startDate);
        const daysDiff = Math.floor((taskDate - weekStart) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 0 && daysDiff <= 6) {
          weeklyTaskCounts[daysDiff]++;
        }
      }
    });

    // Debug: log the data to see what we're getting
    console.log('Weekly task counts:', weeklyTaskCounts);
    console.log('All tasks with dates:', userTasks.map(task => ({
      title: task.title,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate
    })));

    return weeklyTaskCounts;
  };

  const weeklyData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Task Activity',
        data: getWeeklyData(),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'rgb(59, 130, 246)',
        pointHoverBackgroundColor: 'rgb(37, 99, 235)',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const donutData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, pendingTasks],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(251, 191, 36, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        border: {
          display: false,
        },
        beginAtZero: true,
        max: Math.max(5, Math.max(...getWeeklyData()) + 1),
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  const statsCards = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: BarChart3,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: AlertTriangle,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className={`text-2xl sm:text-3xl font-bold ${colors.text.primary} mb-2`}>Statistics</h1>
        <p className={`${colors.text.secondary} text-sm sm:text-base`}>Your task performance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className={`${colors.background.card} p-4 md:p-6 rounded-xl md:rounded-2xl ${colors.border.card}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xl md:text-2xl font-bold ${colors.text.primary}`}>{stat.value}</p>
                <p className={`${colors.text.secondary} text-sm md:text-base`}>{stat.title}</p>
              </div>
              <div className={`p-2 md:p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Rate Card */}
      <div className={`${colors.background.card} p-4 md:p-8 rounded-xl md:rounded-2xl ${colors.border.card} mb-6 md:mb-8`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
          <div>
            <h2 className={`text-lg md:text-xl font-semibold ${colors.text.primary} mb-1 md:mb-2`}>Completion Rate</h2>
            <p className={`${colors.text.secondary} text-sm md:text-base`}>Overall task completion percentage</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            <span className={`text-xl md:text-2xl font-bold ${colors.text.primary}`}>{completionRate}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`w-full ${colors.background.secondary} rounded-full h-2 md:h-3`}>
          <div 
            className="bg-green-500 h-2 md:h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
        {/* Weekly Progress Chart */}
        <div className={`${colors.background.card} p-4 md:p-8 rounded-xl md:rounded-2xl ${colors.border.card}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
            <div>
              <h2 className={`text-lg md:text-xl font-semibold ${colors.text.primary} mb-1 md:mb-2`}>Weekly Activity</h2>
              <p className={`${colors.text.secondary} text-sm md:text-base`}>Task activity this week</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={`text-xs md:text-sm ${colors.text.secondary}`}>This Week</span>
            </div>
          </div>
          <div className="h-48 md:h-64">
            <Line data={weeklyData} options={chartOptions} />
          </div>
        </div>

        {/* Task Distribution Donut Chart */}
        <div className={`${colors.background.card} p-4 md:p-8 rounded-xl md:rounded-2xl ${colors.border.card}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
            <div>
              <h2 className={`text-lg md:text-xl font-semibold ${colors.text.primary} mb-1 md:mb-2`}>Task Distribution</h2>
              <p className={`${colors.text.secondary} text-sm md:text-base`}>Current task status breakdown</p>
            </div>
          </div>
          <div className="h-48 md:h-64">
            {totalTasks > 0 ? (
              <Doughnut data={donutData} options={donutOptions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BarChart3 className={`w-8 h-8 md:w-12 md:h-12 ${colors.text.tertiary} mx-auto mb-2`} />
                  <p className={`${colors.text.secondary} text-sm md:text-base`}>No data available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Breakdown */}
      <div className={`${colors.background.card} p-4 md:p-8 rounded-xl md:rounded-2xl ${colors.border.card}`}>
        <h2 className={`text-lg md:text-xl font-semibold ${colors.text.primary} mb-4 md:mb-6`}>Task Breakdown</h2>
        
        {totalTasks === 0 ? (
          <div className="text-center py-8 md:py-12">
            <BarChart3 className={`w-12 h-12 md:w-16 md:h-16 ${colors.text.tertiary} mx-auto mb-4`} />
            <p className={`${colors.text.secondary} text-base md:text-lg`}>No tasks available</p>
            <p className={`${colors.text.tertiary} text-sm md:text-base`}>Create your first task to see statistics</p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {/* Completed */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className={`${colors.text.secondary} text-sm md:text-base`}>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`${colors.text.primary} font-semibold text-sm md:text-base`}>{completedTasks}</span>
                <span className={`${colors.text.tertiary} text-xs md:text-sm`}>({totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%)</span>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className={`${colors.text.secondary} text-sm md:text-base`}>In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`${colors.text.primary} font-semibold text-sm md:text-base`}>{inProgressTasks}</span>
                <span className={`${colors.text.tertiary} text-xs md:text-sm`}>({totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0}%)</span>
              </div>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className={`${colors.text.secondary} text-sm md:text-base`}>Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`${colors.text.primary} font-semibold text-sm md:text-base`}>{pendingTasks}</span>
                <span className={`${colors.text.tertiary} text-xs md:text-sm`}>({totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0}%)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stats