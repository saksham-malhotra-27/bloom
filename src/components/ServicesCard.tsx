import React, { useState } from "react";
import { Button } from "@nextui-org/button";

function ServicesCard() {
  const [formVisible, setFormVisible] = useState(true);
  return (
    <div className="flex flex-col">
      <form action="" className={""}></form>
      <Button className="w-full py-6" color="primary">
        Add Service
      </Button>
    </div>
  );
}

export default ServicesCard;
