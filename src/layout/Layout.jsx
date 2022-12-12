const Layout = ({ children }) => {
  return (
    <main className="w-full max-w-4xl min-h-screen mx-auto dark:bg-black bg-gray-50 px-1 sm:px-0">
      {children}
    </main>
  );
};

export default Layout;
