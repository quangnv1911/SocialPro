import Image from 'next/image';

const FooterComponent = () => {
  return (
    <footer className="w-full h-[200px] dark:bg-neutral-700 bg-slate-300">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center gap-4">
          <Image src="/vite.svg" alt="logo" />
          <span>Footer-ReactJS Boilerplate By Nguyen Vinh Quang</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
