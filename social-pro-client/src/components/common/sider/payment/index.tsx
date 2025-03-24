import { Plus } from 'lucide-react';
import userStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import templateStore from '@/stores/templateStore';
import { Separator } from '@/components/ui/separator';
import NavItem from '@/components/common/sider/nav-item';
import React, { FC, Fragment, ReactElement } from 'react';
import SanitizedHTML from '@/components/common/sanitizeText';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const PaymentSidebar: FC = (): ReactElement => {
  const router: AppRouterInstance = useRouter();

  const { money } = userStore();
  const { sidebarCollapsed } = templateStore();
  return (
    <Fragment>
      {/* Settings Section */}
      <div className="px-3 py-2">
        <div className="space-y-1">
          {!sidebarCollapsed && <h3 className="mb-2 px-4 text-sm font-medium text-blue-600">
            <SanitizedHTML htmlContent={`Số dư: <span class="font-semibold">${money} đ</span>`} />
          </h3>}
          <NavItem icon={Plus} title="Nạp tiền" onClick={() => router.push('/payment')} />
        </div>
      </div>
      <Separator className="mx-3" />
    </Fragment>
  );
};

export default PaymentSidebar;