import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../api';

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer',
    status: 'Active',
    remote: false,
    joinDate: new Date(),
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      api.get(`/employees/${id}`).then(({ data }) => {
        setFormData({
          name: data.name,
          email: data.email,
          role: data.role || 'Developer',
          status: data.status || 'Active',
          remote: Boolean(data.remote),
          joinDate: new Date(), // Just for demo
        });
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, joinDate: date }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === 'joinDate') {
        data.append(key, formData[key].toISOString());
      } else {
        data.append(key, formData[key]);
      }
    }
    if (profilePic) {
      data.append('profilePic', profilePic);
    }

    try {
      if (isEdit) {
        await api.put(`/employees/${id}`, data);
      } else {
        await api.post('/employees', data);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save employee', error);
      alert('Failed to save. Check email uniqueness.');
    }
  };

  if (loading) return <div className="text-center py-10" id="loading-form">Loading...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit} id="employee-form" className="space-y-4">
        
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" name="name" id="name"
            required value={formData.name} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" name="email" id="email"
            required value={formData.email} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>

        {/* Select Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select 
            name="role" id="role"
            value={formData.role} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          >
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
            <option value="Tester">Tester</option>
          </select>
        </div>

        {/* Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input 
                type="radio" name="status" id="status-active" value="Active"
                checked={formData.status === 'Active'} onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="status-active" className="ml-2 block text-sm text-gray-700">Active</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" name="status" id="status-inactive" value="Inactive"
                checked={formData.status === 'Inactive'} onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="status-inactive" className="ml-2 block text-sm text-gray-700">Inactive</label>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center h-5 mt-4">
          <input 
            type="checkbox" name="remote" id="remote"
            checked={formData.remote} onChange={handleChange}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="remote" className="ml-2 block text-sm text-gray-900">Works Remotely</label>
        </div>

        {/* Date Picker */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Join Date</label>
          <DatePicker 
            id="join-date"
            selected={formData.joinDate} 
            onChange={handleDateChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* File Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input 
            type="file" name="profilePic" id="profilePic" accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div className="pt-4 flex justify-end space-x-3">
          <button type="button" onClick={() => navigate('/')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="inline-flex justify-center flex-shrink-0 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="btn-submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
