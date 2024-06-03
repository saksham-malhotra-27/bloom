"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";
import { Spinner } from "@nextui-org/spinner";

function FormSubmitButton({ text }: { text?: string }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full text-stone-50 text-lg"
      size="lg"
      color="primary"
      radius="md"
    >
      {pending ? <Spinner color="white" /> : text ? text : "Submit"}
    </Button>
  );
}

export default FormSubmitButton;
