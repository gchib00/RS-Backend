import { processNewOperationsEmployee, processNewCsEmployee, processNewEditorEmployee } from '../utils';
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.post('/add', (req: any, res: any) => {
  let newEmployee = new Employee({}); //variable needs to be initialized so, otherwise mongoose thorws error for '.save' command below (it's a bug)
  switch(req.body.department){
    case('operations'):{
      const processedEmployee = processNewOperationsEmployee(req.body);
      newEmployee = new Employee({
        id: processedEmployee.id,
        name: processedEmployee.name,
        department: processedEmployee.department,
        subDepartment: processedEmployee.subDepartment,
        email: processedEmployee.email,
        phone: processedEmployee.phone,
        status: processedEmployee.status,
        shift: processedEmployee.shift
      });
      break;     
    }
    case('cs'):{
      const processedEmployee = processNewCsEmployee(req.body);
      newEmployee = new Employee({
        id: processedEmployee.id,
        name: processedEmployee.name,
        department: processedEmployee.department,
        team: processedEmployee.team,
        type: processedEmployee.type,
        email: processedEmployee.email,
        phone: processedEmployee.phone,
        status: processedEmployee.status,
        shift: processedEmployee.shift
        });
        break;
    }
    case('editing'):{
      const processedEmployee = processNewEditorEmployee(req.body);
      newEmployee = new Employee({
        id: processedEmployee.id,
        name: processedEmployee.name,
        department: processedEmployee.department,
        team: processedEmployee.team,
        type: processedEmployee.type,
        email: processedEmployee.email,
        phone: processedEmployee.phone,
        status: processedEmployee.status,
        shift: processedEmployee.shift
        });
        break;
    }
    default: {
      res.status(400).send(console.error('Department was not selected!'))
    }
  };
  const saveAndReturnData = async () => {
    await newEmployee.save()
    res.send(await Employee.find())
  }
  saveAndReturnData() //need a separate async function for saving/returning data, otherwise processor (from utils) function will cause it to get stuck
});

router.get('/', async (_req: any, res: any) => {
  const data = await Employee.find()
  res.send(data)
});

router.delete('/delete/:id', async (req: any, res: any) => {
  const id = req.params.id;
  await Employee.deleteOne({ id: id });
  const newData = await Employee.find();
  res.send(newData);
});

module.exports = router