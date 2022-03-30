let i = 0;
const output = document.querySelector('.Output');
createTask.addEventListener('click', function(){
    const taskTitle = titleInput.value,
        taskDate = dateInput.value,
        taskDescription = descriptionInput.value;
    if(!taskTitle){
        titleInput.focus();
        return
    }
    let taskData = {
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        id: i++
    }
    data.push(taskData);
    render();
    titleInput.value = '';
    dateInput.value = '';
    descriptionInput.value = '';
    })

function render(){
    output.innerHTML = '';
    data.map(item => {
        const taskTodo = document.createElement('div');
        taskTodo.classList.add('taskTodo');
        taskTodo.innerHTML = 
        `<div class = "Output__name" id= "Name-${item.id}">
            <p> ${item.title}</p>
            <div class="Date">
            <span>Deadline: ${item.date}</span>
            <button class = "Delete" onclick = "deleteTask(${item.id})">X</button>
            </div>
        </div>
        <div class="Output__description" id= "Description-${item.id}">
            <p>${item.description}</p>
            <div class="Options">
                <button class="Edit" onclick = "edit(${item.id})">Edit</button>
                <label class = "checkbox" onchange="checked(${item.id})">
                    <input type="checkbox"> Done
                </label>
            </div>
        </div>
        `
        output.appendChild(taskTodo)})
    }
function deleteTask(e){
    let indexID = data.findIndex(key => key.id === e);
    console.log(indexID)
    data.splice(indexID,1);
    render();
}
resetButton.onclick = function(){
    titleInput.value = '';
    dateInput.value = '';
    descriptionInput.value = '';
}

function checked(title){
    data.forEach(item=>{
        const outputName = document.querySelector(`#Name-${item.id}`);
        const outputTitle = outputName.querySelector('p'),
              outputDescription = document.querySelector(`#Description-${item.id}`),
              checkboxDone = outputDescription.querySelector('input[type="checkbox"]'),
              outputDescriptionText = outputDescription.querySelector('p');
        let isChecked = checkboxDone.checked;
        if(item.id === title && isChecked == true){
            outputName.style.backgroundColor = '#363636';
            outputTitle.style.textDecoration = 'line-through';
            outputDescriptionText.style.textDecoration = 'line-through';
            outputDescription.style.backgroundColor = 'fafafa';
        }
        else if(item.id===title && isChecked == false){
            outputName.style.backgroundColor = '#00d1b2';
            outputDescriptionText.style.textDecoration = 'none';
            outputTitle.style.textDecoration = 'none';
            outputDescription.style.backgroundColor = 'ebfffc';
        }
        return
    })
}
function edit(idValue){
    data.forEach(item=>{
        if(item.id === idValue){
            editModal.style.display = 'block' ;
            editTitle.value = item.title;
            editDescription.value= item.description;
            editDate.value = item.date;
            modalChange.setAttribute('onclick',`editChange(${item.id})`);
            modalCheckbox.checked = false;
        }
    })
}

function editChange(e){
    data.forEach(item =>{
        if(item.id === e){
            const outputTitle = document.querySelector(`#Name-${item.id}>p`),
                  outputDate = document.querySelector(`#Name-${item.id}>.Date>span`),
                  outputDescription = document.querySelector(`#Description-${item.id}`),
                  outputDescriptionText = outputDescription.querySelector('p'),
                  outputCheckbox = document.querySelector(`label[onchange="checked(${item.id})"]>input`);
            item.title = editTitle.value;
            item.description = editDescription.value;
            item.date = editDate.value;
            outputTitle.innerHTML = item.title;
            outputDate.innerHTML = 'Deadline: ' + item.date;
            outputDescriptionText.innerHTML = item.description;
            editModal.style.display = 'none';
            modalCheckbox.checked == true ? outputCheckbox.checked = true : outputCheckbox.checked = false;
            checked(e);
            console.log(modalCheckbox.checked, outputCheckbox.checked   )
        }
    })
};
function closeModal(){
    editModal.style.display = 'none';
}
modalClose.addEventListener('click',closeModal);
editModal.addEventListener('click',closeModal);
modalContent.addEventListener('click',function(e){
    e.stopPropagation();
});