import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const SaveButton = () => {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending}>
      {status.pending ? "Saving..." : "Save"}
    </Button>
  );
};

export default SaveButton;
