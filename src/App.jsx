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
        (u => u.id === editingId ? { ...u, ...postData } : u));
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

      <div className='flex flex-col items-center justify-center mx-auto mt-5 ' >
        <h1 className='flex  text-xl text-slate-800 font-bold'>CRUD OPERATIONS USING AXIOS</h1>
        <span className='flex text-center p-2 justify-center font-bold gap-x-3 border-gray-800 '>
          <button onClick={getUserData} className='bg-blue-600 text-white border-slate-950 border-2 px-4 hover:scale-105 active:scale-95'>GET</button>
          <button onClick={handleCreate} className='bg-green-500 text-white border-slate-950 border-2 px-3 hover:scale-105 active:scale-95'>POST</button>
        </span>
      </div>

      {/* For POST Form*/}
      {showDataForm && (
        <div className='flex flex-col bg-slate-300 hover:scale-105 transition-all duration-200 shadow-xl rounded-2xl w-full max-w-xs mx-auto items-center justify-center border border-black gap-y-2 mb-5 mt-2 py-4'>
          <p className='flex mx-auto '><b> {editingId ? "Update User" : "Create User"}</b></p>
          <input className='border-black border px-5' type="text" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} placeholder='Enter Name' />
          <input className='border-black border px-5' type="text" value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })} placeholder='Enter Username' />
          <input className='border-black border px-5' type="text" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} placeholder='Enter Email' />
          <span className='flex gap-x-3'>
            <button className='bg-green-500 font-medium text-white border border-black hover:scale-105 active:scale-95 px-4' onClick={handleSubmit}>{editingId ? "Update" : "Create"} </button>
            <button className='bg-red-500 font-medium border text-white border-black hover:scale-105 active:scale-95 px-4' onClick={() => setShowDataForm(false)}>Cancel</button>
          </span>
        </div>
      )}

      
       {/* cards */}
      <div className='grid flex-wrap grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2 m-2'>
        {/* giving unique key so react doesn't have to go through all 100 posts when needed to do some action*/}
        {user.map(u => (
          <div key={u.id} className='flex flex-col items-center justify-center px-1 transition-all duration-200  hover:shadow-xl hover:scale-105 bg-gray-200 border border-black' >
            <h3>{u.id}. <span className='text-2xl font-bold '>{u.name} </span> </h3>
            <p><b>Username:</b> @{u.username} </p>
            <p><b>Email:</b> {u.email} </p>

            <div className='flex items-center mt-auto justify-center gap-4 mb-3 pt-1 '>
              <button onClick={() => handleDelete(u.id)} className='bg-red-500 text-white border-slate-950 font-semibold border-2  px-1 hover:scale-105 active:scale-95'>DELETE</button>
              <button onClick={() => handleUpdate(u)} className='bg-yellow-500 text-white border-slate-950 font-semibold border-2  hover:scale-105 active:scale-95 px-4'>PUT</button>
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