//---Add new task to list
//Get input from textbox
var input = document.getElementById("newitem");
//Trigger function when pressing enter key
input.addEventListener("keypress", function(event){
    if(event.keyCode === 13){
        addTask();
    }
})

var checkboxes = document.getElementsByName("todo");
for(let i=0;i<checkboxes.length; i++){
    changeState(checkboxes[i]);
}

//Change state of checkbox 
function changeState(checkbox){
    checkbox.onclick=function(){
        if(checkbox.checked){
            checkbox.nextSibling.classList.toggle("done");
            checkIfDone(checkbox);
        } else {
            checkbox.nextSibling.classList.toggle("done");
            checkIfDone(checkbox);
            return;
            }
        }
}

function checkIfDone(element){
    var tasks = document.getElementById("tasks");
    var doneList = document.getElementById("tasks-done");
    if(element.nextSibling.className === "done"){
        var readd =  element.parentElement;
        element.parentElement.remove();
        doneList.appendChild(readd);
    } else{
        var readd2 =  element.parentElement;
        element.parentElement.remove();
        tasks.appendChild(readd2);
    }
}

//Function to addTask
function addTask(){
    //Create list element
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    var span = document.createElement("span");
    //Set attributes 
    checkbox.type = "checkbox";
    checkbox.name = "todo";
    checkbox.checked = false;
    checkbox.value = 1+document.getElementById("tasks").getElementsByTagName("li").length;
    //Append
    li.appendChild(checkbox);
    var span = li.appendChild(span);

    //Get text for element
    var text = document.getElementById("newitem").value;
    var task = document.createTextNode(text);
    span.appendChild(task);

    //Add task to list
    if(text === ''){
        alert("Do something!");
    } else {
        document.getElementById("tasks").appendChild(li);
        changeState(checkbox);
    }
    //Clear textbox
    document.getElementById("newitem").value = "";
}


  
