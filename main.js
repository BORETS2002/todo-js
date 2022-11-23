const Tokens = window.localStorage.getItem("register-token")
const LoginTokin = localStorage.getItem("token")

if (!LoginTokin) {
  window.location.href = "/login.html"
}


const elForm = document.querySelector(".form")
const elinput = document.querySelector(".inputJs")
const elList = document.querySelector(".list")
const elmodalJs = document.querySelector(".modalJs")

const elModalinPut = document.querySelector(".inputJs-modal")

console.log(elModalinPut);
const Frag = new DocumentFragment()

function renDer(data , elList) {
  elList.innerHTML = ""
  data.forEach(item => {
  const elTemp = document.querySelector(".template").content.cloneNode(true) 
 
  elTemp.querySelector(".textJs").textContent = item.todo_value
  elTemp.querySelector(".edit-btn").dataset.id = item.id
  elTemp.querySelector(".delete-btn").dataset.id = item.id

  Frag.appendChild(elTemp)

});
elList.appendChild(Frag)

}


async function postTodos() {
  try {
    const res = await fetch ("http://localhost:5000/todo", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:Tokens
    },
    body:JSON.stringify({
      text: elinput.value.trim()
    })
  })
const data = await res.json()
console.log(data);

} catch (error) {
  console.log(error);
}
}

async function GetTodos() {
  try {
    const res = await fetch ("http://localhost:5000/todo", {
   
    headers:{
      Authorization:Tokens
    },
  })
const data = await res.json()


renDer(data , elList)
} catch (error) {
  console.log(error);
}
}


elForm.addEventListener("submit", evt => {
  evt.preventDefault()
  
  GetTodos()
  postTodos()

  
})
GetTodos()

async function editTodo(id , Modal   ) {
    
  console.log(id);
  // elModalinPut.value = ""
  try {
    const res = await fetch(`http://localhost:5000/todo/${id}`,{
      method:"PUT",

      headers:{
        "Content-Type": "application/json",
        Authorization:Tokens
      },

      body:JSON.stringify({
        text: Modal
      }) 
    })

    const data = await res.json()
  

  } catch (error) {
    console.log(error);
  }
  GetTodos()
}

async function deleteTodo(id) {
 

  try {
    const res = await fetch(`http://localhost:5000/todo/${id}`,{
      method:"DELETE",

      headers:{
        Authorization:Tokens
      },
    })

    const data = await res.json()
    alert(data)

  } catch (error) {
    console.log(error);
  }
  GetTodos()
}




elList.addEventListener("click", evt=> {
  if (evt.target.matches(".edit-btn")) {
    const editBtnId = evt.target.dataset.id
    editTodo(editBtnId)
    
    elmodalJs.addEventListener("click", evt => {
      evt.preventDefault()
      editTodo( editBtnId , elModalinPut.value)
    })
  } 
  if (evt.target.matches(".delete-btn")) {
    const deletBtnId = evt.target.dataset.id
    deleteTodo(deletBtnId )
  } 
})

