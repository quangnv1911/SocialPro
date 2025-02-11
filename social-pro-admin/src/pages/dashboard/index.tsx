import StatCard from '@/components/features/dashboard/start-card';
import { FC, Fragment, ReactElement } from 'react';
import { Users, ShoppingCart, BarChart, PiggyBank } from 'lucide-react';

const Dashboard: FC = (): ReactElement => {
  return (
    <Fragment>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

        {/* Monthly Stats */}
        <StatCard icon={Users} title="Thành viên đăng ký" value="1" period="Tháng 02" iconColor="text-purple-500" />
        <StatCard icon={ShoppingCart} title="Đơn hàng đã bán" value="0" period="Tháng 02" iconColor="text-blue-500" />
        <StatCard icon={BarChart} title="Doanh thu đơn hàng" value="0đ" period="Tháng 02" iconColor="text-orange-500" />
        <StatCard icon={PiggyBank} title="Lợi nhuận đơn hàng" value="0đ" period="Tháng 02" iconColor="text-red-500" />

        {/* Weekly Stats */}
        <StatCard icon={Users} title="Thành viên đăng ký" value="1" period="Tuần này" iconColor="text-purple-500" />
        <StatCard icon={ShoppingCart} title="Đơn hàng đã bán" value="0" period="Tuần này" iconColor="text-blue-500" />
        <StatCard icon={BarChart} title="Doanh thu đơn hàng" value="0đ" period="Tuần này" iconColor="text-orange-500" />
        <StatCard icon={PiggyBank} title="Lợi nhuận đơn hàng" value="0đ" period="Tuần này" iconColor="text-red-500" />

        {/* Daily Stats */}
        <StatCard icon={Users} title="Thành viên đăng ký" value="1" period="Hôm nay" iconColor="text-purple-500" />
        <StatCard icon={ShoppingCart} title="Đơn hàng đã bán" value="0" period="Hôm nay" iconColor="text-blue-500" />
        <StatCard icon={BarChart} title="Doanh thu đơn hàng" value="0đ" period="Hôm nay" iconColor="text-orange-500" />
        <StatCard icon={PiggyBank} title="Lợi nhuận đơn hàng" value="0đ" period="Hôm nay" iconColor="text-red-500" />
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">THỐNG KÊ ĐƠN HÀNG THÁNG 02</h2>
        {/* Add chart component here */}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">THỐNG KÊ NẠP TIỀN THÁNG 02</h2>
        {/* Add chart component here */}
      </div>
    </Fragment>
  );
};

export default Dashboard;
