import { useRoutes } from "react-router-dom";
import routes from "@/routes";

function Layout() {
  const element = useRoutes(routes);
  return <>{element}</>; // 或者 return <div>{element}</div>;
}

export default Layout;
