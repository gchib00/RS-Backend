const express = require('express');
let router = express.Router();
const Employee = require('../models/employee');

router.post('/add', (req: any, res: any) => {
  const employee = new Employee({
    id: req.body.id,
    name: req.body.name,
    department: req.body.department,
    subDepartment: req.body.subDepartment,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    shift: {
      start: req.body.shift.start,
      length: req.body.shift.length
    }
  });
  employee.save()
    .then((result: unknown) => res.send(result))
    .catch((error: unknown) => console.error(error))
})

router.get('/', async (_req: any, res: any) => {
  const data = await Employee.find()
  res.send(data)
});

module.exports = router