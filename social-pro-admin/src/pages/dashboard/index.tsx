import StatCard from '@/components/features/dashboard/start-card';
import { FC, Fragment, ReactElement } from 'react';
import { Users, ShoppingCart, BarChart, PiggyBank } from 'lucide-react';

const Dashboard: FC = (): ReactElement => {
  return (
    <Fragment>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">Chào mừng bạn đến với hệ thống quản lý!</p>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <StatCard
            icon={Users}
            title="Thành viên đăng ký"
            value="24"
            period="Toàn thời gian"
            iconColor="text-purple-500"
          />
          <StatCard
            icon={ShoppingCart}
            title="Đơn hàng đã bán"
            value="82"
            period="Toàn thời gian"
            iconColor="text-blue-500"
          />
          <StatCard
            icon={BarChart}
            title="Doanh thu đơn hàng"
            value="118.266.652đ"
            period="Toàn thời gian"
            iconColor="text-orange-500"
          />
          <StatCard
            icon={PiggyBank}
            title="Lợi nhuận đơn hàng"
            value="117.823.802đ"
            period="Toàn thời gian"
            iconColor="text-red-500"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
