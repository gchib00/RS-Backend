export interface NewEmployeeBase {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string | number;
  status: string;
  shift?: {
    start: string;
    length: number;
  }
}
export interface NewEmployeeEditor extends NewEmployeeBase {
  department: 'editing';
  team?: string;
  type: 'Editor' | 'QC' | 'Painting Editor';
}
export interface NewEmployeeCS extends NewEmployeeBase {
  department: 'cs';
  team?: string;
  type: 'Agent' | 'Foreign Language Agent' | 'Team Leader' | 'Other';
}
export interface NewEmployeeOperation extends NewEmployeeBase {
  department: 'operations';
  subDepartment: 'Technical Department' | 'Logistics' | 'Billing Department' | 'Other';
}
export enum EmployeeStatus {
  onVacation = 'onVacation',
  active = 'active'
}
export enum AcceptableSubDepartment {
  technical = 'Technical Department',
  logistics = 'Logistics',
  billing = 'Billing Department',
  other = 'other'
}
export type NewStandardEmployeeType = NewEmployeeOperation | NewEmployeeCS | NewEmployeeEditor;
