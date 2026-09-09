import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function DashboardLayout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="app-main">

        <Header />

        <main className="app-content">
          {children}
        </main>

      </div>

    </div>
  );
}


export default DashboardLayout;