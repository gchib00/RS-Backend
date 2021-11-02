export interface NewEmployeeBase {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string | number;
  status: EmployeeStatus;
  shift?: EmployeeShift
}
export interface EmployeeShift {
  start: string;
  length: number;
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
  // subDepartment: 'Technical Department' | 'Logistics' | 'Billing Department' | 'Other';
  subDepartment: AcceptableSubDepartment;
}
export enum EmployeeStatus {
  'onVacation',
  'active'
}
export enum AcceptableSubDepartment {
  'Technical Department',
  'Logistics',
  'Billing Department',
  'Other'
}
export type NewStandardEmployeeType = NewEmployeeOperation | NewEmployeeCS | NewEmployeeEditor;
