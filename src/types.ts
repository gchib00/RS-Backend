//Employees:
export interface NewEmployeeBase {
  id: string;
  name: string;
  department: AcceptableDepartment;
  email: string;
  phone?: string | number | undefined;
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
  subDepartment: AcceptableSubDepartment;
}
export enum EmployeeStatus {
  'onVacation',//type-guards:

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

//Users:
export interface User {
  id: string,
  username: string,
  password: string,
  email: string,
  adminRights: boolean
}

//FAQ:
export interface FAQItem {
  question: string;
  answer: string;
}