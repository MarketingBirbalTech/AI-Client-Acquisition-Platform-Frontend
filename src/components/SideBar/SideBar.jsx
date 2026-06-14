import sidebarItems from "../../constants/sidebarItems";
import { useNavigate } from "react-router-dom";

const SideBar = ({ setIsSidebarOpen }) => {

  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen border-2 border-red-900">
      <div className="mt-4">
        {sidebarItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              navigate(item.path);
              setIsSidebarOpen(false);
            }}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;