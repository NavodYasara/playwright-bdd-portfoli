import { Link } from 'react-router-dom';
import { Users, Kanban, Blocks, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold tracking-tight text-xl hover:text-indigo-200">
              EMS System
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/" id="nav-employees" className="flex items-center space-x-1 hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
              <Users size={18} />
              <span>Employees</span>
            </Link>
            <Link to="/add" id="nav-add" className="flex items-center space-x-1 hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
              <PlusCircle size={18} />
              <span>Add Employee</span>
            </Link>
            <Link to="/kanban" id="nav-kanban" className="flex items-center space-x-1 hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
              <Kanban size={18} />
              <span>Kanban</span>
            </Link>
            <Link to="/complex" id="nav-complex" className="flex items-center space-x-1 hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
              <Blocks size={18} />
              <span>Complex Components</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
