import React from "react";

const RightSidebar = () => {
  return (
    <section
      className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-2-[227px] 
   sticky right-0 h-full max-sm:hidden select-none overflow-y-auto"
    >
      <h3 className="px-5 p-4  flex justify-center text-xs uppercase">Design</h3>
    </section>
  );
};

export default RightSidebar;
