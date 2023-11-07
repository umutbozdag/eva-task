export interface TableHeader {
  id: string;
  label?: string;
  fullWidth?: boolean;
  formatter?: () => string;
}
