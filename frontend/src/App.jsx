import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import KanbanBoard from './components/KanbanBoard';
import ComplexElements from './components/ComplexElements';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 w-full max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/complex" element={<ComplexElements />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
