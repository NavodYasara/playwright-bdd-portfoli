import { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import api from '../api';

const ItemTypes = {
  EMPLOYEE: 'employee',
};

const EmployeeCard = ({ employee }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EMPLOYEE,
    item: { id: employee.id, status: employee.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 bg-white rounded shadow cursor-grab ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      data-testid={`kanban-card-${employee.id}`}
    >
      <div className="font-semibold text-gray-800">{employee.name}</div>
      <div className="text-sm text-gray-500">{employee.role}</div>
    </div>
  );
};

const BoardColumn = ({ status, employees, moveEmployee }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.EMPLOYEE,
    drop: (item) => {
      // Don't trigger if dropping in the same column
      if (item.status !== status) {
        moveEmployee(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full md:w-1/2 p-4 min-h-[400px] border-2 rounded ${isOver ? 'bg-gray-100 border-indigo-400' : 'bg-gray-50 border-gray-200'}`}
      data-testid={`kanban-col-${status.toLowerCase()}`}
    >
      <h3 className="text-lg font-bold mb-4">{status}</h3>
      {employees.map(emp => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </div>
  );
};

export default function KanbanBoard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await api.get('/employees');
      setEmployees(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const moveEmployee = async (id, newStatus) => {
    // Find employee to check old status
    const employee = employees.find(e => e.id === id);
    if (!employee || employee.status === newStatus) return;

    // Optimistic update
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, status: newStatus } : emp));

    try {
      await api.put(`/employees/${id}`, {
        ...employee,
        status: newStatus
      });
    } catch (e) {
      console.error(e);
      // Revert if API fails
      fetchEmployees();
    }
  };

  if (loading) return <div className="text-center py-10" id="loading-kanban">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Status Kanban</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <BoardColumn 
          status="Active" 
          employees={employees.filter(e => e.status === 'Active')} 
          moveEmployee={moveEmployee} 
        />
        <BoardColumn 
          status="Inactive" 
          employees={employees.filter(e => e.status === 'Inactive')} 
          moveEmployee={moveEmployee} 
        />
      </div>
    </div>
  );
}
