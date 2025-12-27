
export interface Parameter {
  id: string;
  label: string;
  value: string;
  placeholder: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultValues: Record<string, string>;
}

export interface AppState {
  originalImage: string | null;
  generatedImage: string | null;
  isGenerating: boolean;
  activePackage: string;
  parameters: Parameter[];
}
