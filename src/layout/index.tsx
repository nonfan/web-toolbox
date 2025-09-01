import {useRoutes} from "react-router-dom";
import routes from "@/routes";
import ThemeToggle from "@/components/ThemeToggle";

function Layout() {
  const element = useRoutes(routes);
  return <div>
    <ThemeToggle/>
    {
      element
    }
  </div>;
}

export default Layout;
