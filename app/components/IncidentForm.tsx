"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


const IncidentForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/incident", data);
      toast.success("Incident Created");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:min-w-2xl sm:min-w-md min-w-xs md:pt-30 pt-20">
      <FieldGroup className="flex flex-col">
        <FieldLegend className="font-bold text-center text-white text-2xl m-0">
          Create Incident
        </FieldLegend>

        <Field>
          <FieldLabel htmlFor="title">Incident Title</FieldLabel>
          <Input
            id="title"
            required
            {...register("title")}
            className="bg-white"
          />
        </Field>

        <Field orientation="horizontal" className="justify-center">
          <Button variant={"outline"} type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Incident"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default IncidentForm;
