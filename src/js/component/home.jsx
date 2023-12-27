import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [add, setAdd] = useState("");
	const [list, setList] = useState([]);
	const [hoverIndex, setHoverIndex] = useState(null);

const keyIntro = (e) =>{
		if(e.code==="Enter"){
			e.preventDefault();
			setList(list.concat({ label: add, done: false }));
			setAdd("");
		}									
}

 const handleMouseEnter = (index) => {
	setHoverIndex(index)
  }

  const deleteList = (index) =>{
	setList(list.filter((item,i) => i != index));
  }

  const handleMouseLeave = (index) =>{
	setHoverIndex(null);
  }

  const createUser= () =>{
	fetch('https://playground.4geeks.com/apis/fake/todos/user/danimena', {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  	console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
		  	console.log(resp.status); // el código de estado = 200 o código = 400 etc.
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })
	  
	  .then(data => {
		  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
	  })
	  .catch(error => {
		  //manejo de errores
		  console.log(error);
	  });
  }

  const getUserList = () =>{
	const data = fetch('https://playground.4geeks.com/apis/fake/todos/user/danimena')
	  .then(resp => {
		  console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
		  console.log(resp.status); // el código de estado = 200 o código = 400 etc.
		  if(resp.status==400){
			createUser()
		  }
		  return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	  })                            	  
	  .then(data => {
		  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		  setList(data)
		  return data;
	  })
	  .catch(error => {
		  //manejo de errores
		  console.log(error);
	  });
	  return data;
  }

  const UpdateUserList = () =>{
	fetch('https://playground.4geeks.com/apis/fake/todos/user/danimena', {
      method: "PUT",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        // console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
  }
	
  useEffect(() =>{
	// ObtenrListaUsuario();
	getUserList()
  },[])

  useEffect(() =>{
	// Actualizar lista();
	UpdateUserList()
  },[list])

const listItems = list.map((e, index) =>
		<li key={index} className="bg-white list-unstyled d-flex justify-content-between border border-dark-subtle border-top-0" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
			<span className="text-secondary ps-2" style={{fontFamily: "Times New Roman", fontSize: "10px", cursor: "default " }}>{e.label}</span>
			<span className={`text-secondary pe-3 ${hoverIndex===index ? "d-flex" : "d-none"}`}  onClick={()=>deleteList(index)} style={{fontFamily: "Times New Roman", fontSize: "10px", cursor: "default " }}>X</span>
		</li>
);

	return (
			<form className="container" onSubmit={keyIntro}>
				<div className="m-auto bg-danger bg-gradient bg-opacity-25 col-5">
					<p className="text-center my-1 text-danger text-opacity-50 " style={ {fontFamily: "Times New Roman", fontSize: "50px", cursor: "default " }  }>todos</p>
					<div className="d-flex flex-column align-items-center col-11 m-auto">					
						<input value={add} className="form-control border border-dark-subtle rounded-0 text-secondary" onChange={(e)=>setAdd(e.target.value)} onKeyDown={keyIntro} style={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", fontFamily: "Times New Roman", fontSize: "10px", cursor: "default " }} placeholder="What needs to be done?"/>				
						<ul className="ps-0 col-12 m-auto">{listItems}</ul>				
					</div>
					<div className="py-1 border border-top-dark-subtle">
						<p className="text-secondary text-opacity-75 mb-0" style={{fontFamily: "Times New Roman", fontSize: "8px" }}>{list.length} item left</p>
					</div>
				</div>				
			</form>
	);
};

export default Home;
