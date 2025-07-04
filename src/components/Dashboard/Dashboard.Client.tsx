'use client'

import React from 'react'
import {
  Users,
  FileText,
  Image,
  MessageSquare,
  TrendingUp,
  Eye,
  Calendar,
  BarChart3,
  Activity,
  Target,
  TrendingDown,
  DollarSign,
  MapPin,
  Clock,
} from 'lucide-react'
import './Dashboard.scss'

// Simple chart components (we'll use CSS for basic charts)
const LineChart: React.FC<{ data: number[]; labels: string[]; color: string }> = ({
  data,
  labels,
  color,
}) => {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  return (
    <div className="dashboard__chart-line">
      <svg width="100%" height="60" viewBox="0 0 300 60">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={data
            .map((value, index) => {
              const x = (index / (data.length - 1)) * 280 + 10
              const y = 50 - ((value - minValue) / range) * 40
              return `${x},${y}`
            })
            .join(' ')}
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 280 + 10
          const y = 50 - ((value - minValue) / range) * 40
          return <circle key={index} cx={x} cy={y} r="3" fill={color} />
        })}
      </svg>
      <div className="dashboard__chart-line-labels">
        {labels.map((label, index) => (
          <span key={index} className="dashboard__chart-line-label">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

const BarChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({
  data,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="dashboard__chart-bar">
      {data.map((item, index) => (
        <div key={index} className="dashboard__chart-bar-item">
          <div className="dashboard__chart-bar-label">{item.label}</div>
          <div className="dashboard__chart-bar-container">
            <div
              className="dashboard__chart-bar-fill"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
              }}
            />
            <span className="dashboard__chart-bar-value">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({
  data,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  return (
    <div className="dashboard__chart-donut">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100
          const angle = (percentage / 100) * 360
          const startAngle = currentAngle
          currentAngle += angle

          const x1 = 60 + 50 * Math.cos((startAngle * Math.PI) / 180)
          const y1 = 60 + 50 * Math.sin((startAngle * Math.PI) / 180)
          const x2 = 60 + 50 * Math.cos((currentAngle * Math.PI) / 180)
          const y2 = 60 + 50 * Math.sin((currentAngle * Math.PI) / 180)

          const largeArcFlag = angle > 180 ? 1 : 0

          const pathData = [`M ${x1} ${y1}`, `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`].join(' ')

          return (
            <path
              key={index}
              d={pathData}
              fill="none"
              stroke={item.color}
              strokeWidth="10"
              strokeLinecap="round"
            />
          )
        })}
        <circle cx="60" cy="60" r="25" fill="white" />
        <text x="60" y="65" textAnchor="middle" fontSize="12" fontWeight="bold">
          {total}
        </text>
      </svg>
      <div className="dashboard__chart-donut-legend">
        {data.map((item, index) => (
          <div key={index} className="dashboard__chart-donut-legend-item">
            <div
              className="dashboard__chart-donut-legend-color"
              style={{ backgroundColor: item.color }}
            />
            <span className="dashboard__chart-donut-legend-label">{item.label}</span>
            <span className="dashboard__chart-donut-legend-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const DashboardClient: React.FC = () => {
  // Chart data
  const pageViewsData = [1200, 1350, 1100, 1600, 1400, 1800, 2200]
  const pageViewsLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const engagementData = [
    { label: 'Facebook', value: 45, color: '#1877f2' },
    { label: 'Twitter', value: 32, color: '#1da1f2' },
    { label: 'Instagram', value: 28, color: '#e4405f' },
    { label: 'LinkedIn', value: 15, color: '#0077b5' },
  ]

  const campaignData = [
    { label: 'Voter Outreach', value: 75, color: '#3b82f6' },
    { label: 'Fundraising', value: 60, color: '#10b981' },
    { label: 'Events', value: 90, color: '#8b5cf6' },
    { label: 'Media', value: 45, color: '#f59e0b' },
  ]

  const stats = [
    {
      title: 'Total Posts',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
      description: 'Published articles and news',
    },
    {
      title: 'Media Files',
      value: '156',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Image,
      description: 'Images and videos uploaded',
    },
    {
      title: 'Contact Forms',
      value: '89',
      change: '+23%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      description: 'New inquiries received',
    },
    {
      title: 'Page Views',
      value: '12.4K',
      change: '+18%',
      changeType: 'positive' as const,
      icon: Eye,
      description: 'Total website visits',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'post',
      title: 'New Campaign Announcement Published',
      description: 'Published a new post about upcoming campaign initiatives',
      time: '2 hours ago',
      status: 'published',
    },
    {
      id: 2,
      type: 'media',
      title: 'Campaign Photos Uploaded',
      description: 'Added 15 new photos from recent campaign events',
      time: '4 hours ago',
      status: 'completed',
    },
    {
      id: 3,
      type: 'contact',
      title: 'New Contact Form Submission',
      description: 'Received inquiry from constituent about local issues',
      time: '6 hours ago',
      status: 'new',
    },
    {
      id: 4,
      type: 'page',
      title: 'About Page Updated',
      description: 'Updated biography and policy positions',
      time: '1 day ago',
      status: 'updated',
    },
  ]

  const quickActions = [
    {
      title: 'Create New Post',
      description: 'Publish a new article or announcement',
      icon: FileText,
      action: 'create-post',
    },
    {
      title: 'Upload Media',
      description: 'Add photos or videos to the gallery',
      icon: Image,
      action: 'upload-media',
    },
    {
      title: 'View Analytics',
      description: 'Check website performance and engagement',
      icon: BarChart3,
      action: 'view-analytics',
    },
    {
      title: 'Manage Contacts',
      description: 'Review and respond to inquiries',
      icon: MessageSquare,
      action: 'manage-contacts',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'dashboard__activities-item-header-status--published'
      case 'completed':
        return 'dashboard__activities-item-header-status--completed'
      case 'new':
        return 'dashboard__activities-item-header-status--new'
      case 'updated':
        return 'dashboard__activities-item-header-status--updated'
      default:
        return 'dashboard__activities-item-header-status--published'
    }
  }

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="w-4 h-4" />
      case 'media':
        return <Image className="w-4 h-4" />
      case 'contact':
        return <MessageSquare className="w-4 h-4" />
      case 'page':
        return <FileText className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard__welcome">
        <div className="dashboard__welcome-content">
          <h1>Welcome back!</h1>
          <p>Here&apos;s what&apos;s happening with your political portfolio today.</p>
        </div>
        <div className="dashboard__welcome-date">
          <Calendar className="calendar-icon" />
          <span>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard__stats">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard__stat-card">
            <div className="dashboard__stat-card-header">
              <h3 className="dashboard__stat-card-header-title">{stat.title}</h3>
              <stat.icon className="dashboard__stat-card-header-icon" />
            </div>
            <div className="dashboard__stat-card-content">
              <div className="dashboard__stat-card-content-value">{stat.value}</div>
              <div className="dashboard__stat-card-content-change">
                <span
                  className={`dashboard__stat-card-content-change-text--${
                    stat.changeType === 'positive' ? 'positive' : 'negative'
                  }`}
                >
                  {stat.change}
                </span>
                <TrendingUp
                  className={`dashboard__stat-card-content-change-icon--${
                    stat.changeType === 'positive' ? 'positive' : 'negative'
                  }`}
                />
              </div>
              <p className="dashboard__stat-card-content-description">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="dashboard__charts">
        <div className="dashboard__charts-grid">
          {/* Page Views Chart */}
          <div className="dashboard__chart-card">
            <div className="dashboard__chart-card-header">
              <h3 className="dashboard__chart-card-title">
                <Eye className="dashboard__chart-card-icon" />
                Weekly Page Views
              </h3>
              <p className="dashboard__chart-card-description">
                Website traffic over the last 7 days
              </p>
            </div>
            <div className="dashboard__chart-card-content">
              <LineChart data={pageViewsData} labels={pageViewsLabels} color="#3b82f6" />
            </div>
          </div>

          {/* Social Media Engagement */}
          <div className="dashboard__chart-card">
            <div className="dashboard__chart-card-header">
              <h3 className="dashboard__chart-card-title">
                <BarChart3 className="dashboard__chart-card-icon" />
                Social Media Engagement
              </h3>
              <p className="dashboard__chart-card-description">Engagement across platforms</p>
            </div>
            <div className="dashboard__chart-card-content">
              <BarChart data={engagementData} />
            </div>
          </div>

          {/* Campaign Progress Donut */}
          <div className="dashboard__chart-card">
            <div className="dashboard__chart-card-header">
              <h3 className="dashboard__chart-card-title">
                <Target className="dashboard__chart-card-icon" />
                Campaign Progress
              </h3>
              <p className="dashboard__chart-card-description">Overall campaign completion</p>
            </div>
            <div className="dashboard__chart-card-content">
              <DonutChart data={campaignData} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard__content-grid">
        {/* Recent Activities */}
        <div className="dashboard__activities">
          <div className="dashboard__activities-header">
            <h2 className="dashboard__activities-header-title">
              <Activity className="activity-icon" />
              <span>Recent Activities</span>
            </h2>
            <p className="dashboard__activities-header-description">
              Latest updates and activities on your portfolio
            </p>
          </div>
          <div className="dashboard__activities-content">
            <div className="dashboard__activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="dashboard__activities-item">
                  <div className="dashboard__activities-item-icon">
                    {getStatusIcon(activity.type)}
                  </div>
                  <div className="dashboard__activities-item-content">
                    <div className="dashboard__activities-item-header">
                      <h4 className="dashboard__activities-item-header-title">{activity.title}</h4>
                      <span className={getStatusColor(activity.status)}>{activity.status}</span>
                    </div>
                    <p className="dashboard__activities-item-description">{activity.description}</p>
                    <p className="dashboard__activities-item-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="dashboard__sidebar">
          {/* Quick Actions */}
          <div className="dashboard__quick-actions">
            <div className="dashboard__quick-actions-header">
              <h2 className="dashboard__quick-actions-header-title">
                <Target className="target-icon" />
                <span>Quick Actions</span>
              </h2>
              <p className="dashboard__quick-actions-header-description">
                Common tasks and shortcuts
              </p>
            </div>
            <div className="dashboard__quick-actions-content">
              <div className="dashboard__quick-actions-list">
                {quickActions.map((action, index) => (
                  <button key={index} className="dashboard__quick-actions-button" type="button">
                    <div className="dashboard__quick-actions-button-content">
                      <action.icon className="dashboard__quick-actions-button-icon" />
                      <div className="dashboard__quick-actions-button-text">
                        <div className="dashboard__quick-actions-button-text-title">
                          {action.title}
                        </div>
                        <div className="dashboard__quick-actions-button-text-description">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Campaign Progress */}
          <div className="dashboard__campaign-progress">
            <div className="dashboard__campaign-progress-header">
              <h2 className="dashboard__campaign-progress-header-title">Campaign Progress</h2>
              <p className="dashboard__campaign-progress-header-description">
                Current campaign milestones
              </p>
            </div>
            <div className="dashboard__campaign-progress-content">
              <div className="dashboard__campaign-progress-list">
                <div className="dashboard__campaign-progress-item">
                  <div className="dashboard__campaign-progress-item-header">
                    <span className="dashboard__campaign-progress-item-header-label">
                      Voter Outreach
                    </span>
                    <span className="dashboard__campaign-progress-item-header-percentage">75%</span>
                  </div>
                  <div className="dashboard__campaign-progress-item-progress">
                    <div
                      className="dashboard__campaign-progress-item-progress-bar dashboard__campaign-progress-item-progress-bar--blue"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
                <div className="dashboard__campaign-progress-item">
                  <div className="dashboard__campaign-progress-item-header">
                    <span className="dashboard__campaign-progress-item-header-label">
                      Fundraising Goal
                    </span>
                    <span className="dashboard__campaign-progress-item-header-percentage">60%</span>
                  </div>
                  <div className="dashboard__campaign-progress-item-progress">
                    <div
                      className="dashboard__campaign-progress-item-progress-bar dashboard__campaign-progress-item-progress-bar--green"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
                <div className="dashboard__campaign-progress-item">
                  <div className="dashboard__campaign-progress-item-header">
                    <span className="dashboard__campaign-progress-item-header-label">
                      Event Planning
                    </span>
                    <span className="dashboard__campaign-progress-item-header-percentage">90%</span>
                  </div>
                  <div className="dashboard__campaign-progress-item-progress">
                    <div
                      className="dashboard__campaign-progress-item-progress-bar dashboard__campaign-progress-item-progress-bar--purple"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardClient
