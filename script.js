// array untuk menyimpan tugas
let task = [];

// fungsi untuk menambahkan tugas
function addTask(){
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value;

    console.log(taskName);

    if(taskName.trim() !== ''){
        const task = {
            id : Date.now(),
            name : taskName,
            completed : false
        };

        task.push(task);
        renderTask();
        taskInput.value='';
    }
}

// menambahkan tugas baru saat tombol enter ditekan
const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        addTask()
    }
});

// fungsi menghapus tugas
function deleteTask(id){
    task = task.filter(task => task.id !== id);
    renderTask();
}

// fungsi menandai tugas yang sudah diselesaikan
function markCompleted(id){
    task = task.map(task => {
        if (task.id == id){
            task.completed = !task.completed;
        }
        return task;
    });
    renderTask();
    updateCompleteTask(id);


    
}

function updateCompleteTask(id){
    const taskElement = document.getElementById(id);
    if(taskElement){
        const task = task.find(task => task.id === id);
        if(task.completed){
            taskElement.classList.add('completed');
        }else{
            taskElement.classList.remove('completed');
        }
    }
}

// fungsi untuk merender tugas pada halaman
function renderTask(){
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    task.forEach(task => {
        // membuat daftar baru
        const listItem = document.createElement('li');
        listItem.setAttribute('id',task.id);

        // membuat nama tugas
        const taskName = document.createElement('span');
        taskName.innerHTML = task.name;

        //membuat tombol tugas selesai
        const completeButton = document.createElement('i');
        completeButton.classList.add('bx','bx-check','complete-btn');
        completeButton.addEventListener('click', () => markCompleted(task.id))

        // membuat tombol hapus tugas
        const deleteButton = document.createElement('i');
        deleteButton.classList.add('box','bxs-trash','delete-btn');
        deleteButton.addEventListener('click', () => deleteTask(task.id))

        // menambahkan semua elemen kedalam daftar
        listItem.appendChild(taskName);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        listItem.appendChild(listItem);
    });
}

// merender tugas
renderTask()