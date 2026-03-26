import { useState } from 'react';
import api from '../api';

export default function ComplexElements() {
  const [showModal, setShowModal] = useState(false);
  const [downloadRes, setDownloadRes] = useState('');

  const handleDownload = async () => {
    try {
      const response = await api.get('/download-report', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.txt');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setDownloadRes('Downloaded successfully');
    } catch (error) {
      console.error('Download failed', error);
      setDownloadRes('Download failed');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Complex Elements for Testing</h2>
      
      <div className="space-y-8">
        {/* Modals & Alerts */}
        <section className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Modals & Alerts</h3>
          <button 
            id="btn-show-modal" 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Show Modal
          </button>
          
          <button 
            id="btn-show-alert" 
            onClick={() => alert('This is a native alert!')}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Trigger Native Alert
          </button>
        </section>

        {/* Hover Menus & Tooltips */}
        <section className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Hover Elements</h3>
          <div className="flex space-x-6">
            <div className="relative group">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded" id="btn-hover-menu">
                Hover Menu
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg border rounded mt-1 w-48 z-10" id="hover-menu-content">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 1</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 2</a>
              </div>
            </div>

            <div className="group relative inline-block">
              <span className="underline cursor-help" id="text-tooltip">Hover for Tooltip</span>
              <div className="invisible group-hover:visible bg-black text-white text-xs rounded py-1 px-2 absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2" id="tooltip-content">
                This is a helpful tooltip!
              </div>
            </div>
          </div>
        </section>

        {/* File Download */}
        <section className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">File Download</h3>
          <button 
            id="btn-download" 
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2"
          >
            Download Report
          </button>
          {downloadRes && <p id="download-status" className="text-sm text-gray-600">{downloadRes}</p>}
        </section>

        {/* Iframe */}
        <section className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Iframe Elements</h3>
          <div className="w-full h-64 border bg-gray-50 flex items-center justify-center relative">
            <p className="absolute text-gray-400 z-0">Iframe loading...</p>
            <iframe 
              src="about:blank" 
              title="Test Iframe" 
              className="w-full h-full relative z-10 bg-white"
              id="test-iframe"
            />
          </div>
        </section>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative" id="modal-dialog">
            <h3 className="text-lg font-bold mb-4">Action Modal</h3>
            <p className="mb-6">Please confirm this action.</p>
            <div className="flex justify-end space-x-2">
              <button 
                id="btn-close-modal" 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 border border-gray-400"
              >
                Cancel
              </button>
              <button 
                id="btn-confirm-modal" 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
