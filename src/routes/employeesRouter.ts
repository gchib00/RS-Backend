import { processNewOperationsEmployee, processNewCsEmployee, processNewEditorEmployee } from '../utils';
import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.post('/add', (req: Request, res: any) => {
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

router.get('/', async (_req: Request, res: Response) => {
  const data = await Employee.find()
  res.send(data)
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await Employee.deleteOne({ id: id });
    const newData = await Employee.find();
    res.send(newData);
  } catch {
    res.status(401);
  }
});

router.patch('/createTeam/:id', async (req: Request, res: Response) => {
  let response;
  const id = req.params.id;
  try {
    const employee = await Employee.findOne({id: id});
    if (req.body.department !== employee.department){ 
      //return error if user is from different department:
      response = `${employee.name} is not part of this department`;
      return res.status(401).send(response)
    };
    switch(employee.department) {
      case('cs'): {
        response = await Employee.findOneAndUpdate({id: id}, {
          team: req.body.team,
          type: 'Team Leader'
        });
        break;
      }
      case('editing'): {
        response = await Employee.findOneAndUpdate({id: id}, {
          team: req.body.team,
          type: 'QC'
        });
        break;
      }
    };
    return res.status(200).json(await Employee.find({})); //return updated eployees' list
  } catch(err) {
    response = err;
    return res.status(401).send(response);
  }
});

module.exports = router