export type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "dropdown" | "textarea";
  placeholder?: string;
  options?: { label: string; value: string }[]
}

export interface additionalFields {
    label: string;
    component: React.ReactNode;
  };