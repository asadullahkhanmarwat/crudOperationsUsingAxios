import { useEffect, useState } from 'react';
import { deleteUser, getUser, postUser, putUser } from './api/PostApi.jsx';



function App() {

  const [user, setUser] = useState([]);
  const [postData, setPostData] = useState({ name: "", username: "", email: "" });
  const [showDataForm, setShowDataForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  //get
  const getUserData = async () => {
    const res = await getUser();
    console.log(res);
    setUser(res.data);
  }

  useEffect(() => {
    getUserData();
  }, [])

  //delete
  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    console.log(res);
    //Filter never touches the original array that's why we use setUser to make save changes in original array
    setUser(user.filter(u => u.id !== id));
  }

  //post  
  const handleCreate = () => {

    setEditingId(null);
    setPostData({ name: "", username: "", email: "" })
    setShowDataForm(true);
  }

  //put
  const handleUpdate = (u) => {
    setEditingId(u.id);
    setPostData({ name: u.name, username: u.username, email: u.email })
    setShowDataForm(true);
  }

  //submit 
  const handleSubmit = async () => {
    if (editingId) {
      const res = await putUser(editingId, postData);
      console.log(res);
      setUser(user.map
        (u => u.id === editingId ? { ...u, ...postData} :u ));
    }
    else {
      const res = await postUser(postData);
      console.log(res);
      setUser([res.data, ...user]);
    }

    //close form and clear fields 
    setShowDataForm(false);
    setPostData({ name: "", username: "", email: "" });
    setEditingId(null);

  }


  return (
    <>

<div className='flex flex-col items-center justify-center mx-auto my-3 ' >
  <h1 className='flex  text-2xl text-slate-800 font-bold'>CRUD OPERATIONS USING AXIOS</h1>
      <span className='flex text-center p-2 justify-center font-bold gap-x-4 border-gray-800 '> 
        <button onClick={getUserData} className='bg-blue-600 text-white border-slate-950 border-2 px-1 hover:scale-105 active:scale-95'>GET</button>
        <button onClick={handleCreate} className='bg-green-500 text-white border-slate-950 border-2 px-1 hover:scale-105 active:scale-95'>POST</button>
      </span>
</div>

      {/* For POST Form*/}
      {showDataForm &&(
        <div className='flex justify-center gap-1 p-4 '>
           <p><b> {editingId ? "Update User" : "Create User"}</b></p>
          <input className='border-black border' type="text" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} placeholder='Enter Name' />
          <input className='border-black border' type="text" value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })} placeholder='Enter Username' /> <br />
          <input className='border-black border' type="text" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} placeholder='Enter Email' /> <br />

          <button className='bg-green-500 border px-1  border-black hover:scale-105 active:scale-95' onClick={handleSubmit}>{editingId ? "Update" : "Create"} </button>

          <button className='bg-red-500 border px-1 border-black hover:scale-105 active:scale-95' onClick={() => setShowDataForm(false)}>Cancel</button>
        </div>
        // cards
      )}
      <div className='grid flex-wrap grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 m-2'>
        {/* giving unique key so react doesn't have to go through all 100 posts when needed to do some action*/}
        {user.map(u => (
          <div key={u.id} className=' bg-gray-200 px-3 border border-black' >
            <h3>{u.id}. <span className='text-2xl px-1 font-bold '>{u.name} </span> </h3>
            <p><b>Username:</b> @{u.username} </p>
            <p><b>Email:</b> {u.email} </p>

            <div className='flex align-bottom  justify-center gap-3 mt-2 mb-2 '>
              <button onClick={() => handleDelete(u.id)} className='bg-red-500 border-slate-950 border-2 px-1 hover:scale-105 active:scale-95'>DELETE</button>
              <button onClick={() => handleUpdate(u)} className='bg-yellow-500 border-slate-950 border-2 px-1 hover:scale-105 active:scale-95'>PUT</button>
            </div>

          </div >))}
      </div >
    </>
  );
}
export default App



{/*              <p>
              <b>Street:</b> {u.address.street} <br />
              <b>Suite:</b> {u.address.suite} <br />
              <b>City:</b> {u.address.city} <br />
              <b>Zipcode:</b> {u.address.zipcode} <br />
            </p>
            
            <p>
              <b>Phone:</b> {u.phone} <br />
              <b>Website:</b> {u.website} <br />
              <b>Company:</b> {u.company.name} <br />
            </p > */}