let title = document.getElementById('inputTitle');
let description = document.getElementById('inputDescription');
let duaDate = document.getElementById('inputDuaDate');
let priority = document.getElementsByName('priority');

let viewTask = document.getElementById('viewTask');
let ID = false;

let tasks = JSON.parse(localStorage.getItem("Tasks"));
let storage = tasks ? tasks : [];
displayTasks();

const addTask = () => {
    let ans;
    if (priority[0].checked) {
        ans = priority[0].value
    } else if (priority[1].checked) {
        ans = priority[1].value
    } else {
        ans = priority[2].value
    }
    let task = {
        title: title.value,
        description: description.value,
        duaDate: duaDate.value,
        priority: ans,
        id: ID ? ID : parseInt(Math.random() * 10000)
    };

    if(ID == task.id){
        let newRec = storage.map((data) => {
            if (data.id == task.id) {
                return data = task;
            }else{
                return data;
            }
        });

        storage = newRec;
        ID = false;
    }else storage.push(task);

    localStorage.setItem("Tasks", JSON.stringify(storage));
    displayTasks();
};

function displayTasks() {
    viewTask.innerHTML = '';
    storage.forEach((data, index) => {
        viewTask.innerHTML += `<tr>
                                    <td>${index + 1}</td>                       
                                    <td>${data.title}</td>                       
                                    <td>${data.description}</td>                       
                                    <td>${data.id}</td>                       
                                    <td>${data.duaDate}</td>                       
                                    <td>${data.priority}</td>
                                    <td>
                                        <button class="btn btn-primary" onclick="return editTask(${data.id})">EDIT</button>
                                        <button class="btn btn-danger" onclick="return deleteTask(${data.id})">DELETE</button>
                                    </td>
                                </tr>`
    });
};

function editTask(id) {
    let sinTask = storage.find(data => data.id === id);

    title.value = sinTask.title;
    description.value = sinTask.description;
    duaDate.value = sinTask.duaDate;
    priority.value = sinTask.priority;
    ID = sinTask.id;
    
    console.log('SINKID', id);
    
    console.log("EDIT",sinTask);
};

function deleteTask (id) {
    let newRec = storage.map((data) => {
        if(data.id !== id){
            return data;    
        }
    });
    storage = newRec;
    localStorage.setItem("Tasks", JSON.stringify(storage));
    displayTasks();
};