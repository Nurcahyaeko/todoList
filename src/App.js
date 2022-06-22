import './App.css';
import {useState} from 'react';

function App() {
  // menampung todolist
  const [todoList, setTodoList] = useState ([])
  // menghandle/nampung form
  // line 9 dan setFOrm, setiap diubah maka isnya juga akan diubah
  const [form, setForm] = useState({
    todo: '',
    status: false
  })

  //reset form inputan
  const resetInput = () =>{
    setForm({
      todo: '',
      status: false
    })
  }

  //cek inputan dan menerimanya scr langsung 
  const handleChange = (e) => {
    //console.log(e.target.value)
    setForm({
      ...form,
      todo: e.target.value,
      status: false
    })
  }

  const handleSubmit = (e) =>{
    // e.preventDefault(); agar tidak pindah halaman
    e.preventDefault();
    if(form.index || form.index === 0){
      // update
      const newTodo = todoList.map((e,i) => {
        if(i === form.index){
          return form
        }else{
          return e
        }
      })
      setTodoList(newTodo)
    }else{
      // console.log("Submit")
    setTodoList([
      ...todoList,
      form
    ])
    }
    
    resetInput()
  }

  const handleCheck = (index) =>{
    const newTodo = todoList.map((e, i) => {
      if(i === index){
        return{
          todo: e.todo,
          status: true
        }
      }else{
        return e
      }
    })
    // console.log(newTodo)
    // set todolist lama dengan yg baru
    setTodoList(newTodo)
    console.log(newTodo)
  }

  const handleDelete = (index) =>{
    const newTodo = todoList.filter((e,i) => {
      if (i!== index){
        return e
      }
    })
    // console.log(newTodo)
    setTodoList(newTodo)
  }

  const handleEdit = (index) => {
    const detailTodo = {
      index,
      ...todoList[index]
    }
    // console.log(detailTodo)
    setForm(detailTodo)
  }
  return (
    <div>
    
    <div className="jumbotroon">
      <h1>Todo List App</h1>
      {/* Json cek inputan langsung di layar */}
      {/* {JSON.stringify(form)} */}
      {/* di form pake method post agar tidak muncul detail link */}
      <form className="form" method="post" onSubmit={handleSubmit}>
        <input type="text" name="todo" value={form.todo} onChange={handleChange} placeholder="Todo...."/>
        <button className="btn-submit" type="submit">Save</button>
      </form>    
      </div>
    
    <div className="content">
      {/* menapilkan data di card */}
      {
        todoList.map((e, i) => (
          // {/* buat cek nampilin datanya di html, karena datanya berupa array maka gunakan {JSON.stringify(todoList)} */}
          // {/* {JSON.stringify(todoList)} */}
      <div key={i} className="card">
        <div className="action">
          {/* jika cek true, maka statusnya true, jika false maka false */}
          <input type="checkbox" className="check-box" checked={e.status?true:false} onChange={() => handleCheck(i)}/>      
        </div>
        <div className="text">
          {e.todo}
        </div>
        <div  className="button-action">
          <button className="btn-edit" onClick={() => handleEdit(i)}> Edit</button>
          <button className="btn-delete" onClick={() => handleDelete(i)}> Delete</button>
      </div>    
      </div>
        ))
      }
      
      
    </div>

    </div>

  );
}

export default App;
