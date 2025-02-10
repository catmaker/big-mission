import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
}

export function FormField({
  label,
  id,
  type,
  placeholder,
  register,
  error,
  className,
  disabled,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0 ${className}`}
        {...register}
        disabled={disabled}
      />
      {error?.message && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}
