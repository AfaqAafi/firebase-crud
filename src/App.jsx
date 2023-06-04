import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { colRef, db } from "./firebase/firebase";

const App = () => {
const[data, setData] = useState([])
const[task, setTask] = useState('')
const [loading, setLoading] = useState(true)
  const [trackId, setTrackId] = useState('');
  useEffect(() => {
    let books = []
    const unSubscribe = onSnapshot(colRef, (snapshot) => {
      books = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: serverTimestamp(),
      }));
      setData(books)
      setLoading(false);
    }) 
    
    return () => unSubscribe();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (trackId) {
      try {
        await updateDoc(doc(db, 'todo', trackId), {
         task
        })
        setTask('')
      } catch (error) {
        console.log("Error while updating", error);
      }
    } else {
      if (task !== "") {
        try {
          await addDoc(collection(db, "todo"), {
            task,
            createdAt: serverTimestamp(),
          }).then(() => {
            setTask("");
          });
        } catch (error) {
          console.log("Error in adding task", error);
        }
      }     
    }


 
  }
  
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todo", id));
    } catch (error) {
      console.log('There is error deleting', error);
    }
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const selectId = data.find(doc => doc.id === id);
    if(selectId) { 
      setTrackId(selectId.id)
      setTask(selectId.task)
    }

  }
  
  
  return (
    <div className="h-full py-5 w-full bg-purple-300 flex items-center justify-center">
      <div className="min-w-[500px] bg-slate-200 h-auto pb-10">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center p-2 text-3xl text-gray-400">Todo App</h1>
          <div className="flex items-center gap-2 justify-center">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-96 border-2 border-gray-400 py-2 px-2 rounded-lg"
            />
            <button
              type="submit"
              className="p-2 bg-purple-300 duration-75 transition-all hover:bg-gray-300  rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 fill-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </form>
        {loading ? (
          <h2 className="text-center mt-7 text-2xl text-gray-600">
            Loading .....
          </h2>
        ) : (
        data && data?.map((doc) => {
            return (
              <div key={doc.id}>
                <div className="w-full flex items-center justify-center gap-2 mt-10">
                  <input
                    type="text"
                    value={doc.task}
                    className="text-sm placeholder p-1 pl-2 rounded-lg focus:outline-none hover:none w-[280px]"
                    readOnly
                  />
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-1.5 bg-purple-300 duration-75 transition-all hover:bg-gray-300  rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 fill-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button onClick={(e) => handleUpdate(e, doc.id)} className="p-1.5 bg-purple-300  rounded-lg duration-75 transition-all hover:bg-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 fill-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
        {loading ? (
          <p className="text-center pt-7 text-lg text-gray-500">
            Please wait fetching task....
          </p>
        ) : (
          <p className="text-center pt-7 text-lg text-gray-500">
            I have {data.length} Tasks To Do!
          </p>
        )}
      </div>
    </div>
  );
}

export default App