
const elForm = document.querySelector(".form")
const elPasword = document.querySelector(".password")
const elkoz = document.querySelector(".koz")
const elemail = document.querySelector(".email")
const elpasword = document.querySelector(".password")



 
elkoz.addEventListener("click",  () => {
  if(elPasword.type == "password"){
    elPasword.type = "text"
    
}else{
  elPasword.type = "password"
}

 
} )

elkoz.addEventListener("mousedown",()=>{
  elPasword.type = "text"

} )


// mouseout button hudididan ciqib ketmaslik un
window.addEventListener("mouseout",()=>{
  elPasword.type = "password"

} )




async function LogRend( ) {
  
try{ 
const res = await fetch("https://reqres.in/api/login",{ 
method: "POST",


headers:{
"Content-Type":"application/json"
},

body: JSON.stringify( {
  email: "eve.holt@reqres.in",
  password:  elpasword.value
  })

} )
 
  const data = await res.json()
  console.log(data);
if (data.token) {
  localStorage.setItem("token" , data.token)
window.location.pathname = "/index.html"

};

}
 catch (error) {
  console.log(error);

 }



}



elForm.addEventListener("submit", evt =>{
  evt.preventDefault()

LogRend()
 

   })