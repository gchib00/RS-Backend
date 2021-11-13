import { 
  NewEmployeeOperation, 
  EmployeeStatus, 
  AcceptableSubDepartment, 
  EmployeeShift, 
  AcceptableDepartment, 
  NewEmployeeCS, 
  NewEmployeeEditor, 
  CSEmployeeType, 
  EditorEmployeeType,
  User } from './types';

const { v4: uuidv4 } = require('uuid');

//type-guards:
const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};
const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean'
};
const isAcceptableStatus = (param: any): param is EmployeeStatus => {
  return Object.values(EmployeeStatus).includes(param);
};
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
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('Enter a valid email address');
  }
  return email
};
const parsePhoneNum = (phone: any): string | number | undefined => {
  if(!isString(phone) && isNaN(phone) && phone!==undefined){
    throw new Error('Phone number is of wrong format')
  }
  return phone
};
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
const parsePassword = (password: unknown): string => {
  if(!password || !isString(password)){
    throw new Error('Password is of wrong format')
  }
  if(password.length > 150 || password.length < 5) {
    throw new Error('Password must be longer than 5 characters')
  }
  return password;
};
const validateBoolean = (value: unknown): boolean => {
  if(value==undefined || !isBoolean(value)){
    throw new Error('adminRights must be set as either true or false')
  }
  return value;
}
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
export const processNewUser = (bodyObj: any): User => {
  const newUser: User = {
    id: uuidv4(),
    username: parseName(bodyObj.username),
    password: parsePassword(bodyObj.password),
    email: parseEmail(bodyObj.email),
    adminRights: validateBoolean(bodyObj.adminRights)
  }
  return newUser;
};