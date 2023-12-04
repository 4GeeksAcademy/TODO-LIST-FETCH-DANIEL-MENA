import React, { useState } from "react";

//create your first component
const Home = () => {
	const [add, setAdd] = useState("");
	const [list, setList] = useState([]);
	const [hoverIndex, setHoverIndex] = useState(null);

const keyIntro = (e) =>{
		if(e.code==="Enter"){
			e.preventDefault();
			setList(list.concat(add));
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


	const listItems = list.map((e, index) =>
		<li key={index} className="bg-white list-unstyled d-flex justify-content-between border border-dark-subtle border-top-0" style={{width:"180.8px", height:"24px"}} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
			<span className="text-secondary ps-2" style={{fontFamily: "Times New Roman", fontSize: "10px", cursor: "default " }}>{e}</span>
			<span className={`text-secondary pe-3 ${hoverIndex===index ? "d-flex" : "d-none"}`}  onClick={()=>deleteList(index)} style={{fontFamily: "Times New Roman", fontSize: "10px", cursor: "default " }}>X</span>
		</li>
  	);


	return (
			<form className="container" onSubmit={keyIntro}>
				<div className="m-auto bg-danger bg-gradient bg-opacity-25" style={{width:"250px"}}>
					<p className="text-center my-1 text-danger text-opacity-50 " style={ {fontFamily: "Times New Roman", fontSize: "50px", cursor: "default " }  }>todos</p>
					<div className="d-flex flex-column align-items-center">					
						<input value={add} className="form-control border border-dark-subtle rounded-0 text-secondary" onChange={(e)=>setAdd(e.target.value)} onKeyDown={keyIntro} style={{width:"180.8px", height:"24px", boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", fontFamily: "Times New Roman", fontSize: "10px", cursor: "default " }} placeholder="What needs to be done?"/>				
						<ul className="ps-0">{listItems}</ul>				
					</div>
					<div>
						<p className="ps-2 text-secondary text-opacity-75 border border-top-dark-subtle" style={{fontFamily: "Times New Roman", fontSize: "8px" }}>{list.length} item left</p>
					</div>
				</div>				
			</form>
	);
};

export default Home;
