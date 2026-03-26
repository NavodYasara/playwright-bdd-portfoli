import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import api from '../api';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await api.get('/employees');
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Failed to delete employee:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-10" id="loading-spinner">Loading...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
        <Link to="/add" id="btn-add-new-employee" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add New
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" id="employee-table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500" id="no-employees-msg">No employees found</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="employee-row" data-testid={`employee-${emp.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {emp.profilePic ? (
                        <img src={`http://localhost:3001/uploads/${emp.profilePic}`} alt="" className="h-8 w-8 rounded-full mr-3 object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-bold">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      emp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-2">
                    <Link to={`/edit/${emp.id}`} className="text-indigo-600 hover:text-indigo-900" id={`edit-emp-${emp.id}`}>
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => deleteEmployee(emp.id)} className="text-red-600 hover:text-red-900" id={`del-emp-${emp.id}`}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
