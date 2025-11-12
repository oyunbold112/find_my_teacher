import React from "react";

const Menu: React.FC = ({ children }: React.PropsWithChildren) => {
  return <div className="menu-container">{children}</div>;
};

export default Menu;
