import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
} from 'lucide-react'

const Dashboard: React.FC = () => {
  // Dummy data for the dashboard
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
        return 'text-green-600 bg-green-100'
      case 'completed':
        return 'text-blue-600 bg-blue-100'
      case 'new':
        return 'text-orange-600 bg-orange-100'
      case 'updated':
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="w-4 h-4" />
      case 'media':
        // eslint-disable-next-line jsx-a11y/alt-text
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
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your political portfolio today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <TrendingUp
                  className={`w-3 h-3 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest updates and activities on your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getStatusIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}
                        >
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    type="button"
                  >
                    <div className="flex items-center space-x-3">
                      <action.icon className="w-4 h-4" />
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-xs text-gray-500">{action.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campaign Progress */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
              <CardDescription>Current campaign milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Voter Outreach</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fundraising Goal</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Event Planning</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
