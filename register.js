const Elform = document.querySelector(".form")
const ElName = document.querySelector(".inputName")
const ElEmail = document.querySelector(".inputEmail")
const ElTel = document.querySelector(".inputTell")
const ElPasword = document.querySelector(".nomer")

 
// console.log(ElPasword);

async function registerFunksion(){

  try {
    const res = await fetch("http://192.168.5.86:5000/user/register", {
    method:"POST",

    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_name:ElName.value, 
      phone: ElTel.value,
      email:ElEmail.value,
      password:ElPasword.value,

    })
 
    });

    const data = await res.json()
    

    if (data.token) {
      localStorage.setItem("register-token", data.token)
      window.location.pathname = "/index.html"
    }
  } 
  
  catch (error) {
    console.log(error);
  }
 
}


Elform.addEventListener("submit" , evt => {
evt.preventDefault()

 
registerFunksion()

})







$(".form")
  .find("input, textarea")
  .on("keyup blur focus", function (e) {
    var $this = $(this),
      label = $this.prev("label");

    if (e.type === "keyup") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.addClass("active highlight");
      }
    } else if (e.type === "blur") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.removeClass("highlight");
      }
    } else if (e.type === "focus") {
      if ($this.val() === "") {
        label.removeClass("highlight");
      } else if ($this.val() !== "") {
        label.addClass("highlight");
      }
    }
  });

$(".tab a").on("click", function (e) {
  e.preventDefault();

  $(this).parent().addClass("active");
  $(this).parent().siblings().removeClass("active");

  target = $(this).attr("href");

  $(".tab-content > div").not(target).hide();

  $(target).fadeIn(600);
});
