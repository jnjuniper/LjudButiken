import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="w-full bg-gray-900 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">Administration</h1>
      </header>

      <div className="mx-auto max-w-6xl grid grid-cols-12 gap-0">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-gray-200 bg-gray-50">
          <nav className="p-4 space-y-1">
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-800 hover:bg-gray-200"
                }`
              }
            >
              Produkter
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-800 hover:bg-gray-200"
                }`
              }
            >
              Kategorier
            </NavLink>
          </nav>
        </aside>

        <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
