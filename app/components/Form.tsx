"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps {
  adviceContent: string | undefined;
  incident: {
    id: string;
    title: string;
  };
}

const Form = ({ adviceContent, incident }: FormProps) => {
  const router = useRouter();
  const [status, setStatus] = useState("OPEN");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      advice: adviceContent ?? "",
      update: "",
      incidentId: incident.id,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const finalPayload = {
        ...data,
        status,
      };
      await axios.post("/api/update", finalPayload);
      toast.success("Update sent");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-3xl h-full">
      <FieldGroup className="flex flex-col">
        <FieldLegend className="font-bold text-center text-white text-3xl m-0">
          Admin Dashboard
        </FieldLegend>
        <FieldDescription className="font-bold text-center text-white">
          Enter escalation updates below
        </FieldDescription>
        <Field>
          <Label htmlFor="title">Title</Label>
          <Input
            readOnly
            id="title"
            value={incident.title}
            className="bg-white"
          />
        </Field>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="advice">Current Advice</FieldLabel>
            <Textarea
              id="advice"
              {...register("advice")}
              className="bg-white h-40"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="update">Latest Update</FieldLabel>
            <Textarea
              id="update"
              {...register("update")}
              className="bg-white h-40"
            />
          </Field>
        </FieldGroup>

        <Label htmlFor="status" className="m-0">
          Status
        </Label>
        <Select defaultValue="OPEN" onValueChange={(value) => setStatus(value)}>
          <SelectTrigger id="status" className="w-45 m-0 bg-white">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Field orientation="horizontal" className="justify-center">
          <Button variant={"outline"} type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default Form;
