import { NewEmployeeOperation, EmployeeStatus, AcceptableSubDepartment } from './types';

const { v4: uuidv4 } = require('uuid');

//type-guards:
const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};
const isAcceptableStatus = (param: any): param is EmployeeStatus => {
  return Object.values(EmployeeStatus).includes(param);
};
const isAccepableSubDepartment = (param: any): param is AcceptableSubDepartment => {
  return Object.values(AcceptableSubDepartment).includes(param);
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
const parsePhoneNum = (phone: unknown): string | number => {
  if(!phone || !isString(phone) || isNaN){
    throw new Error('Phone number is missing or is of wrong format');
  }
  return phone
};
const parseSubDepartment = (subDepartment: unknown): AcceptableSubDepartment => {
  if(!subDepartment || !isAccepableSubDepartment(subDepartment)){ 
    throw new Error('Sub-department is of wrong format');
  }
  return subDepartment;
};
const parseStatus = (status: any): EmployeeStatus => {
  if(!status ||isAcceptableStatus(status)) {
    throw new Error('Status is missing or is of wrong type');
  }
  return status;
}
/////////

export const processNewOperationsEmployee = (bodyObj: any): NewEmployeeOperation => {
  const newEmployee: NewEmployeeOperation = { 
    id: uuidv4(),
    name: parseName(bodyObj.name),
    department: 'operations',
    subDepartment: parseSubDepartment(bodyObj.subDepartment),
    email: parseEmail(bodyObj.email),
    phone: parsePhoneNum(bodyObj.phone),
    status: parseStatus(bodyObj.status)
    shift: {
      start: parseStartTime(bodyObj.shift.start),
      length:parseShiftLength(bodyObj.shift.length)
    }
  }
  return 
}