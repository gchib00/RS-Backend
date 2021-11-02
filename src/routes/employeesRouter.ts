import { processNewOperationsEmployee } from '../utils';
const express = require('express');
let router = express.Router();
const Employee = require('../models/employee');

router.post('/add', (req: any, res: any) => {
  const processedEmployee = processNewOperationsEmployee(req.body);
  const employee = new Employee({
    id: processedEmployee.id,
    name: processedEmployee.name,
    department: processedEmployee.department,
    subDepartment: processedEmployee.subDepartment,
    email: processedEmployee.email,
    phone: processedEmployee.phone,
    status: processedEmployee.status,
    shift: processedEmployee.shift
  });
  employee.save()
    .then((result: unknown) => res.send(result))
    .catch((error: unknown) => console.error(error))
});

router.get('/', async (_req: any, res: any) => {
  const data = await Employee.find()
  res.send(data)
});

module.exports = router