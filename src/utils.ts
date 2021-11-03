import { 
  NewEmployeeOperation, 
  EmployeeStatus, 
  AcceptableSubDepartment, 
  EmployeeShift, 
  AcceptableDepartment, 
  NewEmployeeCS, 
  NewEmployeeEditor, 
  CSEmployeeType, 
  EditorEmployeeType } from './types';

const { v4: uuidv4 } = require('uuid');

//type-guards:
const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};
const isAcceptableStatus = (param: any): param is EmployeeStatus => {
  return Object.values(EmployeeStatus).includes(param);
};
// const isAccepableDepartment = (param: any): param is AcceptableDepartment => {
//   return Object.values(AcceptableDepartment).includes(param);
// };
const isAccepableSubDepartment = (param: any): param is AcceptableSubDepartment => {
  return Object.values(AcceptableSubDepartment).includes(param);
};
const isAcceptableCSType = (param: any): param is CSEmployeeType => {
  return Object.values(CSEmployeeType).includes(param);
};
const isAcceptableEditorType = (param: any): param is EditorEmployeeType => {
  return Object.values(EditorEmployeeType).includes(param);
};
/////////////

//parsers:
const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Name is missing or is of wrong format');
  }
  return name;
};
const parseEmail = (email: unknown): string => {
  if(!email || !isString(email)){
    throw new Error('Email is missing or is of wrong format');
  }
  return email
};
const parsePhoneNum = (phone: any): string | number => {
  if(!phone){throw new Error('Phone number is missing')}
  if(!isString(phone) && isNaN(phone)){
    throw new Error('Phone number is of wrong format')
  }
  return phone
};
// const parseDepartment = (department: any): AcceptableDepartment => {
//   if(!department || !isAccepableDepartment(department)){ 
//     throw new Error('Sub-department is of wrong format');
//   }
//   return department;
// };
const parseSubDepartment = (subDepartment: any): AcceptableSubDepartment => {
  if(!subDepartment || !isAccepableSubDepartment(subDepartment)){ 
    throw new Error('Sub-department is of wrong format');
  }
  return subDepartment;
};
const parseStatus = (status: any): EmployeeStatus => {
  if(!status || !isAcceptableStatus(status)) {
    throw new Error('Status is missing or is of wrong type');
  }
  return status;
};
const parseShift = (shift: any): EmployeeShift | undefined => {
  if(!shift) {return undefined};
  if(!shift.start || !isString(shift.start)) {
    throw new Error('Shift start value is missing or is of wrong format');
  }
  if(!shift.length || isNaN(shift.length)) {
    throw new Error('Shift length value is missing or is of wrong format');
  }
  return shift;
};
const parseTeam = (team: any): string | undefined => {
  if(!team) {return undefined}
  if(!isString(team)) {
    throw new Error('Team is of wrong format');
  }
  return team;  
};
const parseCsType = (type: any): CSEmployeeType  => {
  if(!type || !isAcceptableCSType(type)){
    throw new Error('Type is missing or is an unaccepted type');
  }
  return type;
};
const parseEditorType = (type: any): EditorEmployeeType  => {
  if(!type || !isAcceptableEditorType(type)){
    throw new Error('Type is missing or is an unaccepted type');
  }
  return type;
};
/////////

export const processNewOperationsEmployee = (bodyObj: any): NewEmployeeOperation => {
  const newEmployee: NewEmployeeOperation = { 
    id: uuidv4(),
    name: parseName(bodyObj.name),
    department: AcceptableDepartment.operations,
    subDepartment: parseSubDepartment(bodyObj.subDepartment),
    email: parseEmail(bodyObj.email),
    phone: parsePhoneNum(bodyObj.phone),
    status: parseStatus(bodyObj.status),
    shift: parseShift(bodyObj.shift)
  }
  return newEmployee;
};
export const processNewCsEmployee = (bodyObj: any): NewEmployeeCS => {
  const newEmployee: NewEmployeeCS = { 
    id: uuidv4(),
    name: parseName(bodyObj.name),
    department: AcceptableDepartment.cs,
    team: parseTeam(bodyObj.team),
    type: parseCsType(bodyObj.type),
    email: parseEmail(bodyObj.email),
    phone: parsePhoneNum(bodyObj.phone),
    status: parseStatus(bodyObj.status),
    shift: parseShift(bodyObj.shift)
  }
  return newEmployee;
};
export const processNewEditorEmployee = (bodyObj: any): NewEmployeeEditor => {
  const newEmployee: NewEmployeeEditor = { 
    id: uuidv4(),
    name: parseName(bodyObj.name),
    department: AcceptableDepartment.editing,
    team: parseTeam(bodyObj.team),
    type: parseEditorType(bodyObj.type),
    email: parseEmail(bodyObj.email),
    phone: parsePhoneNum(bodyObj.phone),
    status: parseStatus(bodyObj.status),
    shift: parseShift(bodyObj.shift)
  }
  return newEmployee;
}