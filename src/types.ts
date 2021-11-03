export interface NewEmployeeBase {
  id: string;
  name: string;
  department: AcceptableDepartment;
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
  department: AcceptableDepartment.editing;
  team?: string;
  type: EditorEmployeeType;
}
export interface NewEmployeeCS extends NewEmployeeBase {
  department: AcceptableDepartment.cs;
  team?: string;
  type: CSEmployeeType;
}
export interface NewEmployeeOperation extends NewEmployeeBase {
  department: AcceptableDepartment.operations;
  // subDepartment: 'Technical Department' | 'Logistics' | 'Billing Department' | 'Other';
  subDepartment: AcceptableSubDepartment;
}
export enum EmployeeStatus {
  'onVacation',
  'active'
}
export enum CSEmployeeType {
  'Agent', 
  'Foreign Language Agent',
  'Team Leader', 
  'Other'
}
export enum EditorEmployeeType {
  'Editor', 
  'QC',
  'Painting Editor' 
}
export enum AcceptableSubDepartment {
  'Technical Department',
  'Logistics',
  'Billing Department',
  'Other'
}
export enum AcceptableDepartment {
  operations = 'operations',
  cs = 'cs',
  editing = 'editing'
}
export type NewStandardEmployeeType = NewEmployeeOperation | NewEmployeeCS | NewEmployeeEditor;
