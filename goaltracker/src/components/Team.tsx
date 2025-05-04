import React, { useState } from 'react';
import { Mail, Phone, MapPin, Plus } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';

const initialTeamMembers = [
  {
    id: 1,
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'leslie@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    projects: 12,
    tasks: 25,
  },
  {
    id: 2,
    name: 'Michael Foster',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'michael@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    projects: 8,
    tasks: 18,
  },
  {
    id: 3,
    name: 'Dries Vincent',
    role: 'Senior Developer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'dries@example.com',
    phone: '+1 (555) 345-6789',
    location: 'London, UK',
    projects: 15,
    tasks: 32,
  },
];

export const Team: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    image: '',
  });

  const handleAddMemberClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember(prevState => ({ ...prevState, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = teamMembers.length + 1;
    setTeamMembers([
      ...teamMembers,
      { ...newMember, id: newId }
    ]);
    setShowForm(false);
    setNewMember({
      name: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      image: '',
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-500">Manage your team and their roles</p>
        </div>
        <Button
          themeColor="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleAddMemberClick}
        >
          Add Member
        </Button>
      </div>

      {/* Render the Add Member Form if `showForm` is true */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-8">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newMember.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={newMember.role}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newMember.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newMember.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newMember.location}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
            {/* Profile Photo Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border rounded"
              />
              {newMember.image && (
                <img
                  src={newMember.image}
                  alt="Profile Preview"
                  className="w-32 h-32 mt-4 rounded-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit" themeColor="primary">
              Save New Member
            </Button>
          </div>
        </form>
      )}

      {/* Display team members */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-500">
                <Mail className="w-4 h-4 mr-2" />
                {member.email}
              </div>
              <div className="flex items-center text-gray-500">
                <Phone className="w-4 h-4 mr-2" />
                {member.phone}
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-2" />
                {member.location}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Projects</p>
                  <p className="font-semibold text-gray-900">{member.projects}</p>
                </div>
                <div>
                  <p className="text-gray-500">Tasks</p>
                  <p className="font-semibold text-gray-900">{member.tasks}</p>
                </div>
                <div>
                  <Button look="outline" className="text-sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
