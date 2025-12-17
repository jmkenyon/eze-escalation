"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps {
    adviceContent: string | undefined;
}

const Form = ({adviceContent}:FormProps ) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<FieldValues>({
      defaultValues: {
        advice: adviceContent ?? "",
        update: "",
      },
    });
  
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      setIsLoading(true);
      try {
        await axios.post("/api/update", data)
        toast.success("Update sent")
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-3xl">
    <FieldGroup className="flex flex-col">
      <FieldLegend className="font-bold text-center text-white text-3xl m-0">Admin Dashboard</FieldLegend>
      <FieldDescription className="font-bold text-center text-white">
        Enter escalation updates below
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel  htmlFor="advice">Current Advice</FieldLabel>
          <Textarea id="advice" required {...register("advice")} className="bg-white h-40" />
        </Field>
        <Field>
          <FieldLabel htmlFor="update">Latest Update</FieldLabel>
          <Textarea id="update" required {...register("update")} className="bg-white h-40"/>
        </Field>
      </FieldGroup>

      <Field orientation="horizontal" className="justify-center">
        <Button variant={"outline"} type="submit">
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Field>
    </FieldGroup>
  </form>
  )
}

export default Form