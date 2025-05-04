import React from 'react';
import { useStore } from '../store';
import { Plus, MoreVertical, Calendar, Users, Trash2, X } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { format } from 'date-fns';
import { AnimatedCard } from './common/AnimatedCard';
import { ResponsiveGrid } from './common/ResponsiveGrid';
import { SearchInput } from './common/SearchInput';

export const Projects: React.FC = () => {
  const { projects, addProject, deleteProject } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterPriority, setFilterPriority] = React.useState<'all'|'high'|'medium'|'low'>('all');
  const [filterStatus, setFilterStatus]     = React.useState<'all'|'active'|'completed'|'on-hold'>('all');
  const [openMenuId, setOpenMenuId]         = React.useState<string|null>(null);

  // New form states
  const [showForm, setShowForm]             = React.useState(false);
  const [newName, setNewName]               = React.useState('');
  const [newDesc, setNewDesc]               = React.useState('');

  const handleSave = () => {
    if (!newName.trim()) return;
    addProject({
      id: Math.random().toString(),
      name: newName,
      description: newDesc,
      tasks: [],
      progress: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30*24*60*60*1000),
      team: [],
      status: 'active',
      priority: 'medium',
    });
    setNewName('');
    setNewDesc('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setNewName('');
    setNewDesc('');
    setShowForm(false);
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || p.priority === filterPriority;
    const matchesStatus   = filterStatus === 'all'   || p.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and track your projects</p>
        </div>
        <Button
          themeColor="primary"
          onClick={() => setShowForm(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          New Project
        </Button>
      </div>

      {/* Inline Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Add New Project</h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5"/>
            </button>
          </div>
          <input
            type="text"
            className="w-full border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-indigo-500"
            placeholder="Project Name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <textarea
            className="w-full border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-indigo-500"
            placeholder="Project Description"
            rows={3}
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
          />
          <div className="flex gap-2">
            <Button themeColor="success" onClick={handleSave}>Save</Button>
            <Button look="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search projects..."
          className="flex-1"
        />
        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-lg border bg-white text-gray-700"
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value as any)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            className="px-3 py-2 rounded-lg border bg-white text-gray-700"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Project Cards */}
      <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }}>
        {filteredProjects.map((project, idx) => (
          <AnimatedCard key={project.id} delay={idx * 0.1}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 h-full flex flex-col relative">
              {/* Title & Menu */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {openMenuId === project.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 border rounded shadow-lg z-10">
                      <button
                        onClick={() => {
                          deleteProject(project.id);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-800"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-4 flex-grow">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                      {format(new Date(project.startDate), 'MMM d')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      {format(new Date(project.endDate), 'MMM d')}
                    </span>
                  </div>
                </div>

                {/* Team & Priority */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <img
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                          src={`https://randomuser.me/api/portraits/lego/${i}.jpg`}
                          alt="avatar"
                        />
                      ))}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : project.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </ResponsiveGrid>
    </div>
  );
};
