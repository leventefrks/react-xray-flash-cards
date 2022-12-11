const Layout = ({ children }) => {
  return (
    <main className="relative w-full min-h-screen dark:bg-black bg-gray-100 px-1 sm:px-0">
      {children}
    </main>
  );
};

export default Layout;
