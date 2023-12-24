import React from "react";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center">{children}</div>
  );
};

export default Authlayout;
