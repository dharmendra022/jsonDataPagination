import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import {MDBTable,MDBTableHead,MDBRow,MDBCol,MDBContainer, MDBTableBody,MDBBtn,MDBBtnGroup,MDBInput} from 'mdb-react-ui-kit'

function App() {
  
  const[post,setPost]=useState([])
  const[searchText,setSearchText]=useState()
  const[filterData,setFilterData]=useState([])

 
  const GetData=async()=>{
    return await axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>{
      console.log(response.data)
      setPost(response.data)
    

      
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
   GetData()
  },[])

  

  const handleSearch=(e)=>{
    e.preventDefault()
    const value=e.target.value();
    setSearchText(value)
    if(value==""){
      // setSearchText(post)
      setFilterData(post)
    }

  }

  const handleSearchClick=()=>{
    filterData(searchText)
  }

  const filter = value => {
    const val = value.toLowerCase().trim()
    if (!val) {
        setFilterData(filterData)
    } else {
        const filter = post.filter(item => {
            return Object.keys(item).some(key => {
                return item[key].toString().toLowerCase().includes(val)
            })
        })
        setFilterData(filterData)
    }
}



  

  return (
    <>
     <MDBContainer>
     <form action=""  style={{
       margin:"auto",
       padding:"15px",
       maxWidth:"400px",
       alignContent:"center"
     }} className='d-flex input-group w-auto'>
     <input type="text" className='form-control' placeholder='Search....' onChange={handleSearch} value={searchText}/>
     <MDBBtnGroup>
       <MDBBtn type='submit' color='dark' className='mx-2' onClick={handleSearchClick} >Search</MDBBtn>
       <MDBBtn className='mx-2' color='info' >Reset</MDBBtn>
     </MDBBtnGroup>

     </form>
       <div className='card'>
       <h2 className='text-center'>Search + Filter + Pagination</h2>
       </div>
       <MDBRow>
         <MDBCol size='12'>
         <MDBTable>
           <MDBTableHead dark>
             <tr>
               <th scope='col'>S.No</th>
               <th scope='col'>Title</th>
               <th scope='col'>Body</th>
             </tr>
           </MDBTableHead>
           {post.length===0 ? (
             <MDBTableBody className='align-centre mb-0'>
             <tr>
               <td colSpan={8} className='text-center mb-0'>No Data Found</td>
             </tr>
             </MDBTableBody>
          
           ):(
             post.map((item,index)=>{
               return(
                 <>
                   <MDBTableBody key={index}>
                     <tr>
                       <th className='col'>{index+1}</th>
                      
                       <th className='col'>{item.title}</th>
                       <th className='col'>{item.body}</th>
                      

                     </tr>
                   </MDBTableBody>
                 </>
               )
             })
           )}
         </MDBTable>

         </MDBCol>
       </MDBRow>
     </MDBContainer>
    </>
    
  );
}

export default App;
