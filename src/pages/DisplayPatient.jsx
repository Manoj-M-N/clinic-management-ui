import React, { useEffect, useState } from 'react'
import { Services } from '../service/service';
import { Login } from './login';

export default function DisplayPatient() {
  const [patient,setPatient]=useState([]);
  const [data,setData]=useState({full_name:"",phone:"",gender:"Male", age:0, disease:"",admission_date:""});
  const [edit,SetEdit]=useState(null);
  const [logout,setLogout]=useState(false);


  useEffect(()=>{
    Services.get().then((data)=>setPatient(data));
    },[]);
    

    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(data);
     if(edit===null){
     const newRec=await Services.addData(data);
      setPatient([...patient,newRec]);
     }

     else{
       await Services.edit(edit,data)
      setPatient(
      patient.map((p)=> p.patient_id===edit ? {...p,...data}:p));

      SetEdit(null);
     }
     setData({full_name:"",phone:"",gender:"Male", age:0, disease:"",admission_date:""});
     
    }

    const handleDelete=async(id)=>{
     await Services.delte(id);
     setPatient(patient.filter(p => p.patient_id!==id));
    }

    const handleEdit=async(par)=>{
      SetEdit(par.patient_id);
      setData({
        full_name:par.full_name,
        phone:par.phone,
        gender:par.gender,
        age:par.age,
        disease:par.disease,
        admission_date:par.admission_date
      });
    };

    const handleLogout=()=>{
      setLogout(true);
    }

  return (
    <div>

      {logout ? (
         <Login/>
      ) : (
        <>
      <button onClick={handleLogout}>logout</button>

      <h1>Patients Details Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter name: </label>
        <input type="text" value={data.full_name} name='full_name' onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} required />
        <br />
        <label htmlFor="">Enter Number</label>
        <input type="text" name='phone' value={data.phone} onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} required/>
        <br />
        <label htmlFor="">Gender</label>
        <select name="gender" value={data.gender} onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} required>
          <option >Male</option>
          <option >Female</option>
          <option >others</option>
        </select>
        <br />
        <label htmlFor="">Age: </label>
        <input type="number" value={data.age} name='age' onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} required/>
        <br />
        <label htmlFor="">Diseas: </label>
        <input type="text" value={data.disease} name='disease' onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} required/>
        <br />
        <label htmlFor="">Admission Date</label>
        <input type="date" name="admission_date" value={data.admission_date} onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} required />   
             
        <br /><button type='submit'>Submit</button>
      </form>
        <h1>Patients List</h1>
          <table border={2}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Admission Date</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {patient.map((pat,index)=>(
             
              <tr key={pat.patient_id || index}>
                <td>{pat.full_name}</td>
                <td>{pat.phone}</td>
                <td>{pat.gender}</td>
                <td>{pat.age}</td>
                <td>{pat.disease}</td>
                <td>{pat.admission_date}</td>
                <td>
                  <button onClick={()=>handleEdit(pat)}>Edit</button>
                  <button onClick={()=>handleDelete(pat.patient_id)}>delete</button></td>
              </tr>
              ))}
            </tbody>
          </table>
        </>
      )
}
    </div>
  )
}
