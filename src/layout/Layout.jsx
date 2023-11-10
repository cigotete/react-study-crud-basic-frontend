
export const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Product CRUD</h1>
      </header>

      <main>{children}</main>

      <footer>&copy; 2023 Footer</footer>
    </div>
  );
};