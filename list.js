

let todoElements = [];

// Windows onLoad / refresh()
window.onload = function() {
  if (JSON.parse(localStorage.getItem("todoElements")) != null)
  todoElements = JSON.parse(localStorage.getItem("todoElements"));
  console.log(todoElements);
  display();
};

function addElement() {
  if (document.querySelector(".addNewList").value.trim() != "") {
    todoElements.push(document.querySelector(".addNewList").value.trim());
    document.querySelector(".addNewList").value="";
    if (localStorage.getItem("todoElements") == null) {
      localStorage.setItem("todoElements", JSON.stringify(todoElements));
    } else {
      localStorage.setItem("todoElements", JSON.stringify(todoElements));
    }
    display();
  }
}

function display() {
  document.querySelector(".cardList").innerHTML = "";
  document.querySelector(".cardItemsCount").innerHTML= todoElements.length+" Items";
  for (let i = 0; i < todoElements.length; i++) {
    document.querySelector(".cardList").innerHTML +=
      "<center><div class='listItems' id='"+i+"'>" +
      todoElements[i] +
      "<img class='checkMark' src = 'https://api.iconify.design/ion:checkmark-sharp.svg?color=green&width=20px&height=20px' onclick='checkCompleted(" +
      i +
      ")'><img class='trashBtn' src = 'https://api.iconify.design/ion:trash-bin.svg?color=red&width=20px&height=20px' onclick='del(" +
      i +
      ")'></div></center><br>";
  }
}

function del(index) {
  todoElements.splice(index, 1);
  localStorage.removeItem(index);
  if (localStorage.getItem("todoElements") == null) {
    localStorage.setItem("todoElements", JSON.stringify(todoElements));
  } else {
    localStorage.setItem("todoElements", JSON.stringify(todoElements));
  }
  display();
  //console.log("local storage key value====="+index);
}


function checkCompleted(index) { 
if (todoElements[index].includes("<strike>")) {
    todoElements[index] = todoElements[index].replace("<strike>", "");
    todoElements[index] = todoElements[index].replace("</strike>", "");
  } else {
    todoElements[index] = todoElements[index].strike();
  }
  if (localStorage.getItem("todoElements") == null) {
    localStorage.setItem("todoElements", JSON.stringify(todoElements));
  } else {
    localStorage.setItem("todoElements", JSON.stringify(todoElements));
  } 
 // console.log("todoElements======"+todoElements);
  display();
}

function clearAll() {
  while (todoElements.length) {
    todoElements.pop();
  }  
  localStorage.clear();
  display();
  //console.log("todoElements============"+todoElements);
}

function All(){  
  display();
}

function completedList(){
  let completedElements = [];
  let completedIndex =0;
  for (let i = 0; i < todoElements.length; i++) {
    if (todoElements[i].includes("<strike>")) {      
      completedElements[completedIndex] = todoElements[i];     
      completedIndex++; 
    }
  }  
 // console.log("completedElements=====completedElements======="+completedElements);
  updateList(completedElements);
}

function activeList(){
  let activeElements = [];
  let activeIndex =0; 
  for (let i = 0; i < todoElements.length; i++) {
    if (!todoElements[i].includes("<strike>")) {      
      activeElements[activeIndex] = todoElements[i];     
      activeIndex++; 
    }
  }  
 // console.log("activeElements=====activeList======="+activeElements);
  updateList(activeElements);
}


function updateList(arrayElements) {
  if (arrayElements.length==0) {
    document.querySelector(".cardList").innerHTML =  "<center><div  class='listItems' style='background: #f5f3f3;text-align: center;padding:10px'>No List Found</div></center><br>";
    document.querySelector(".cardItemsCount").innerHTML= arrayElements.length+" Items";
  } 
  else {    
    document.querySelector(".cardList").innerHTML = "";  
    document.querySelector(".cardItemsCount").innerHTML= arrayElements.length+" Items";
    for (let i = 0; i < arrayElements.length; i++) {
      document.querySelector(".cardList").innerHTML +=
        "<center><div class='listItems' style='background: #f5f3f3' id='"+i+"'>" +
        arrayElements[i]+"</div></center><br>";
    }
  }
 
}
