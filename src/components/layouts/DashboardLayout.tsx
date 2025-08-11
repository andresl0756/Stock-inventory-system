import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import Breadcrumbs from './Breadcrumbs';

const DashboardLayout = () => {
  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <Breadcrumbs />
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardLayout;