import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const DeleteButton = ({
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending} type="button" onClick={onClick}>
      {status.pending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
