import { useState, useEffect, FC, ReactElement } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table';
import { DollarSign, Filter, Search, Users } from 'lucide-react';

// Mock user data - replace with your actual data fetching logic
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johnd',
    email: 'john@example.com',
    phone: '1234567890',
    ip: '192.168.1.1',
    status: 'active',
    balance: 1000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janes',
    email: 'jane@example.com',
    phone: '0987654321',
    ip: '192.168.1.2',
    status: 'inactive',
    balance: 500,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@example.com',
    phone: '1122334455',
    ip: '192.168.1.3',
    status: 'active',
    balance: 750,
  },
  {
    id: 4,
    name: 'Bob Williams',
    username: 'bobw',
    email: 'bob@example.com',
    phone: '5566778899',
    ip: '192.168.1.4',
    status: 'inactive',
    balance: 250,
  },
  {
    id: 5,
    name: 'Charlie Brown',
    username: 'charlieb',
    email: 'charlie@example.com',
    phone: '2233445566',
    ip: '192.168.1.5',
    status: 'active',
    balance: 1200,
  },
  {
    id: 6,
    name: 'David Lee',
    username: 'davidl',
    email: 'david@example.com',
    phone: '3344556677',
    ip: '192.168.1.6',
    status: 'active',
    balance: 900,
  },
  {
    id: 7,
    name: 'Eva Garcia',
    username: 'evag',
    email: 'eva@example.com',
    phone: '4455667788',
    ip: '192.168.1.7',
    status: 'inactive',
    balance: 600,
  },
  {
    id: 8,
    name: 'Frank Rodriguez',
    username: 'frankr',
    email: 'frank@example.com',
    phone: '5566778899',
    ip: '192.168.1.8',
    status: 'active',
    balance: 1100,
  },
  {
    id: 9,
    name: 'Grace Wilson',
    username: 'gracew',
    email: 'grace@example.com',
    phone: '6677889900',
    ip: '192.168.1.9',
    status: 'inactive',
    balance: 300,
  },
  {
    id: 10,
    name: 'Henry Martinez',
    username: 'henrym',
    email: 'henry@example.com',
    phone: '7788990011',
    ip: '192.168.1.10',
    status: 'active',
    balance: 800,
  },
  {
    id: 11,
    name: 'Ivy Anderson',
    username: 'ivya',
    email: 'ivy@example.com',
    phone: '8899001122',
    ip: '192.168.1.11',
    status: 'inactive',
    balance: 400,
  },
  {
    id: 12,
    name: 'Jack Taylor',
    username: 'jackt',
    email: 'jack@example.com',
    phone: '9900112233',
    ip: '192.168.1.12',
    status: 'active',
    balance: 1300,
  },
  {
    id: 13,
    name: 'Kelly Thomas',
    username: 'kellyt',
    email: 'kelly@example.com',
    phone: '0011223344',
    ip: '192.168.1.13',
    status: 'inactive',
    balance: 700,
  },
  {
    id: 14,
    name: 'Liam Lewis',
    username: 'liaml',
    email: 'liam@example.com',
    phone: '1122334455',
    ip: '192.168.1.14',
    status: 'active',
    balance: 1050,
  },
  {
    id: 15,
    name: 'Mia Moore',
    username: 'miam',
    email: 'mia@example.com',
    phone: '2233445566',
    ip: '192.168.1.15',
    status: 'inactive',
    balance: 550,
  },
  {
    id: 16,
    name: 'Noah Clark',
    username: 'noahc',
    email: 'noah@example.com',
    phone: '3344556677',
    ip: '192.168.1.16',
    status: 'active',
    balance: 1250,
  },
  {
    id: 17,
    name: 'Olivia Brown',
    username: 'oliviab',
    email: 'olivia@example.com',
    phone: '4455667788',
    ip: '192.168.1.17',
    status: 'inactive',
    balance: 650,
  },
  {
    id: 18,
    name: 'Peter Davis',
    username: 'peterd',
    email: 'peter@example.com',
    phone: '5566778899',
    ip: '192.168.1.18',
    status: 'active',
    balance: 950,
  },
  {
    id: 19,
    name: 'Quinn Wilson',
    username: 'quinnw',
    email: 'quinn@example.com',
    phone: '6677889900',
    ip: '192.168.1.19',
    status: 'inactive',
    balance: 350,
  },
  {
    id: 20,
    name: 'Ryan Garcia',
    username: 'ryang',
    email: 'ryan@example.com',
    phone: '7788990011',
    ip: '192.168.1.20',
    status: 'active',
    balance: 1150,
  },
  {
    id: 21,
    name: 'Sophia Rodriguez',
    username: 'soph',
    email: 'sophia@example.com',
    phone: '8899001122',
    ip: '192.168.1.21',
    status: 'inactive',
    balance: 450,
  },
  {
    id: 22,
    name: 'Thomas Martinez',
    username: 'thomasm',
    email: 'thomas@example.com',
    phone: '9900112233',
    ip: '192.168.1.22',
    status: 'active',
    balance: 850,
  },
  {
    id: 23,
    name: 'Ursula Anderson',
    username: 'ursulaa',
    email: 'ursula@example.com',
    phone: '0011223344',
    ip: '192.168.1.23',
    status: 'inactive',
    balance: 200,
  },
  {
    id: 24,
    name: 'Victor Taylor',
    username: 'victort',
    email: 'victor@example.com',
    phone: '1122334455',
    ip: '192.168.1.24',
    status: 'active',
    balance: 1400,
  },
  {
    id: 25,
    name: 'Wendy Thomas',
    username: 'wendyt',
    email: 'wendy@example.com',
    phone: '2233445566',
    ip: '192.168.1.25',
    status: 'inactive',
    balance: 750,
  },
  {
    id: 26,
    name: 'Xavier Lewis',
    username: 'xavierl',
    email: 'xavier@example.com',
    phone: '3344556677',
    ip: '192.168.1.26',
    status: 'active',
    balance: 1000,
  },
  {
    id: 27,
    name: 'Yara Moore',
    username: 'yaram',
    email: 'yara@example.com',
    phone: '4455667788',
    ip: '192.168.1.27',
    status: 'inactive',
    balance: 500,
  },
  {
    id: 28,
    name: 'Zachary Clark',
    username: 'zacharyc',
    email: 'zachary@example.com',
    phone: '5566778899',
    ip: '192.168.1.28',
    status: 'active',
    balance: 1200,
  },
  {
    id: 29,
    name: 'Abigail Brown',
    username: 'abigailb',
    email: 'abigail@example.com',
    phone: '6677889900',
    ip: '192.168.1.29',
    status: 'inactive',
    balance: 600,
  },
  {
    id: 30,
    name: 'Benjamin Davis',
    username: 'benjamind',
    email: 'benjamin@example.com',
    phone: '7788990011',
    ip: '192.168.1.30',
    status: 'active',
    balance: 900,
  },
  {
    id: 31,
    name: 'Chloe Wilson',
    username: 'chloew',
    email: 'chloe@example.com',
    phone: '8899001122',
    ip: '192.168.1.31',
    status: 'inactive',
    balance: 300,
  },
  {
    id: 32,
    name: 'Daniel Garcia',
    username: 'danielg',
    email: 'daniel@example.com',
    phone: '9900112233',
    ip: '192.168.1.32',
    status: 'active',
    balance: 1100,
  },
  {
    id: 33,
    name: 'Emily Rodriguez',
    username: 'emilyr',
    email: 'emily@example.com',
    phone: '0011223344',
    ip: '192.168.1.33',
    status: 'inactive',
    balance: 400,
  },
  {
    id: 34,
    name: 'Finn Martinez',
    username: 'finnm',
    email: 'finn@example.com',
    phone: '1122334455',
    ip: '192.168.1.34',
    status: 'active',
    balance: 800,
  },
  {
    id: 35,
    name: 'Grace Anderson',
    username: 'gracea',
    email: 'grace@example.com',
    phone: '2233445566',
    ip: '192.168.1.35',
    status: 'inactive',
    balance: 200,
  },
  {
    id: 36,
    name: 'Henry Taylor',
    username: 'henryt',
    email: 'henry@example.com',
    phone: '3344556677',
    ip: '192.168.1.36',
    status: 'active',
    balance: 1300,
  },
  {
    id: 37,
    name: 'Ivy Thomas',
    username: 'ivyt',
    email: 'ivy@example.com',
    phone: '4455667788',
    ip: '192.168.1.37',
    status: 'inactive',
    balance: 700,
  },
  {
    id: 38,
    name: 'Jack Lewis',
    username: 'jackl',
    email: 'jack@example.com',
    phone: '5566778899',
    ip: '192.168.1.38',
    status: 'active',
    balance: 1050,
  },
  {
    id: 39,
    name: 'Katie Moore',
    username: 'katiem',
    email: 'katie@example.com',
    phone: '6677889900',
    ip: '192.168.1.39',
    status: 'inactive',
    balance: 550,
  },
  {
    id: 40,
    name: 'Liam Clark',
    username: 'liamc',
    email: 'liam@example.com',
    phone: '7788990011',
    ip: '192.168.1.40',
    status: 'active',
    balance: 1250,
  },
  {
    id: 41,
    name: 'Mia Brown',
    username: 'miab',
    email: 'mia@example.com',
    phone: '8899001122',
    ip: '192.168.1.41',
    status: 'inactive',
    balance: 650,
  },
  {
    id: 42,
    name: 'Noah Davis',
    username: 'noahd',
    email: 'noah@example.com',
    phone: '9900112233',
    ip: '192.168.1.42',
    status: 'active',
    balance: 950,
  },
  {
    id: 43,
    name: 'Olivia Wilson',
    username: 'oliviaw',
    email: 'olivia@example.com',
    phone: '0011223344',
    ip: '192.168.1.43',
    status: 'inactive',
    balance: 350,
  },
  {
    id: 44,
    name: 'Peter Garcia',
    username: 'peterg',
    email: 'peter@example.com',
    phone: '1122334455',
    ip: '192.168.1.44',
    status: 'active',
    balance: 1150,
  },
  {
    id: 45,
    name: 'Quinn Rodriguez',
    username: 'quinnr',
    email: 'quinn@example.com',
    phone: '2233445566',
    ip: '192.168.1.45',
    status: 'inactive',
    balance: 450,
  },
  {
    id: 46,
    name: 'Ryan Martinez',
    username: 'ryanm',
    email: 'ryan@example.com',
    phone: '3344556677',
    ip: '192.168.1.46',
    status: 'active',
    balance: 850,
  },
  {
    id: 47,
    name: 'Sophia Anderson',
    username: 'sophia',
    email: 'sophia@example.com',
    phone: '4455667788',
    ip: '192.168.1.47',
    status: 'inactive',
    balance: 200,
  },
  {
    id: 48,
    name: 'Thomas Taylor',
    username: 'thomast',
    email: 'thomas@example.com',
    phone: '5566778899',
    ip: '192.168.1.48',
    status: 'active',
    balance: 1400,
  },
  {
    id: 49,
    name: 'Ursula Thomas',
    username: 'urulat',
    email: 'ursula@example.com',
    phone: '6677889900',
    ip: '192.168.1.49',
    status: 'inactive',
    balance: 750,
  },
  {
    id: 50,
    name: 'Victor Lewis',
    username: 'victorl',
    email: 'victor@example.com',
    phone: '7788990011',
    ip: '192.168.1.50',
    status: 'active',
    balance: 1000,
  },
  {
    id: 51,
    name: 'Wendy Moore',
    username: 'wendym',
    email: 'wendy@example.com',
    phone: '8899001122',
    ip: '192.168.1.51',
    status: 'inactive',
    balance: 500,
  },
  {
    id: 52,
    name: 'Xavier Clark',
    username: 'xavierc',
    email: 'xavier@example.com',
    phone: '9900112233',
    ip: '192.168.1.52',
    status: 'active',
    balance: 1200,
  },
];

type User = (typeof mockUsers)[0];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'ip',
    header: 'IP',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('balance'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const user = row.original;
      const { handleEditUser, handleAdjustBalance } = table.options.meta as {
        handleEditUser: (user: User) => void;
        handleAdjustBalance: (user: User) => void;
      };

      return (
        <div className="">
          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAdjustBalance(user)}>
            Adjust Balance
          </Button>
        </div>
      );
    },
  },
];

const ManageUserScreen: FC = (): ReactElement => {
  const [data, setData] = useState<User[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [adjustingBalance, setAdjustingBalance] = useState<User | null>(null);
  const [balanceChange, setBalanceChange] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleAdjustBalance = (user: User) => {
    setAdjustingBalance(user);
    setBalanceChange('');
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    meta: {
      handleEditUser,
      handleAdjustBalance,
    },
  });

  const handleSaveEdit = () => {
    if (editingUser) {
      setData(data.map((user) => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
    }
  };

  const handleSaveBalanceAdjustment = () => {
    if (adjustingBalance) {
      const newBalance = adjustingBalance.balance + Number.parseFloat(balanceChange);
      setData(data.map((user) => (user.id === adjustingBalance.id ? { ...user, balance: newBalance } : user)));
      setAdjustingBalance(null);
    }
  };

  const handlePageChange = (newPageIndex: number) => {
    setIsLoading(true);
    table.setPageIndex(newPageIndex);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-5 rounded-xl shadow-lg">
        {/* Search Bar */}
        <div className="relative w-full sm:w-[350px]">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters Section */}
        <div className="flex space-x-3">
          {/* Status Filter */}
          <Select
            onValueChange={(value) => {
              if (value === 'all') {
                table.getColumn('status')?.setFilterValue(undefined);
              } else {
                table.getColumn('status')?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-[180px] px-3 py-2 border rounded-lg text-gray-600">
              <Filter className="mr-2 h-5 w-5" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Balance Sort */}
          <Select onValueChange={(value) => table.getColumn('balance')?.toggleSorting(value === 'asc')}>
            <SelectTrigger className="w-[180px] px-3 py-2 border rounded-lg text-gray-600">
              <DollarSign className="mr-2 h-5 w-5" />
              <SelectValue placeholder="Sort by Balance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-white shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 text-gray-700">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold p-2 text-left">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <Users className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(table.getState().pagination.pageIndex - 1)}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page - 1)}
                  isActive={table.getState().pagination.pageIndex === page - 1}
                  className="px-4 py-2 rounded-lg hover:bg-indigo-100"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(table.getState().pagination.pageIndex + 1)}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-700">Items per page</p>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[80px] px-3 py-2 border rounded-lg text-gray-600">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Modals */}
      {/* Edit User Modal */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="edit-username">Username</Label>
                <Input
                  id="edit-username"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingUser.status}
                  onValueChange={(value) => setEditingUser({ ...editingUser, status: value as 'active' | 'inactive' })}
                  className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveEdit} className="bg-indigo-500 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Balance Modal */}
      <Dialog open={!!adjustingBalance} onOpenChange={() => setAdjustingBalance(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Balance</DialogTitle>
          </DialogHeader>
          {adjustingBalance && (
            <div className="space-y-5">
              <p>Current Balance: ${adjustingBalance.balance}</p>
              <div className="space-y-3">
                <Label htmlFor="balance-change">Change Amount</Label>
                <Input
                  id="balance-change"
                  type="number"
                  value={balanceChange}
                  onChange={(e) => setBalanceChange(e.target.value)}
                  placeholder="Enter amount (use - for decrease)"
                  className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveBalanceAdjustment} className="bg-indigo-500 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUserScreen;
