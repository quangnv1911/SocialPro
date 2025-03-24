import Image from 'next/image';
import { Fragment } from 'react';
import { Facebook } from 'lucide-react';

export default function Home() {
  return (
    <Fragment>
      <div
        className="flex items-center gap-2 bg-gradient-to-r from-[#0A1E4B] to-blue-600 text-white p-4 rounded-lg shadow-md">
        <Facebook className="h-6 w-6" />
        <h1 className="text-xl font-bold">CLONE FACEBOOK</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{/* Product Cards... (unchanged) */}</div>
    </Fragment>
  );
}
