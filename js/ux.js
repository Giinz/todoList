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
        id: i++,
        isDone: false,
        isSelected: false
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
        
        output.innerHTML += 
        `<div class="taskTodo taskTodo-${item.id}">
            <div class = "Output__name" id= "Name-${item.id}">
                <p> ${item.title}</p>
                <div class="Date">
                    <span>${item.date}</span>
                    Select<input type="checkbox" ${item.isSelected?"checked":''} class = 'selectTask' onchange = 'selected(${item.id})'>
                    <button class = "Delete" onclick = "deleteTask(${item.id})">X</button>
                </div>
            </div>
            <div class="Output__description" id= "Description-${item.id}">
                <p>${item.description}</p>
                <div class="Options">
                    <button class="Edit" onclick = "edit(${item.id})">Edit</button>
                    <label class = "checkbox" onchange="checked(${item.id})">
                        <input type="checkbox" ${item.isDone ? 'checked' : ''}> Done
                    </label>
                </div>
            </div>
        </div>`;
        const outputName = document.querySelector(`#Name-${item.id}`);
        const outputTitle = outputName.querySelector('p'),
              outputDescription = document.querySelector(`#Description-${item.id}`),
              outputDescriptionText = outputDescription.querySelector('p');
        if(item.isDone == true ){
            outputName.style.backgroundColor = '#363636';
            outputTitle.style.textDecoration = 'line-through';
            outputDescriptionText.style.textDecoration = 'line-through';
            outputDescription.style.backgroundColor = '#fafafa';
        }
        else {
            outputName.style.backgroundColor = '#00d1b2';
            outputDescriptionText.style.textDecoration = 'none';
            outputTitle.style.textDecoration = 'none';
            outputDescription.style.backgroundColor = '#ebfffc';
        }
        if(item.isSelected == true){
            outputDescription.style.backgroundColor = '#a7f3e7';
        }
        else {
            outputDescription.style.backgroundColor = '#ebfffc';
        }
        return
    })
    }
function deleteTask(e){
    data.forEach(item =>{
        if(item.id === e){
            closeTask.style.display = 'flex'
            closePopupBtn.setAttribute('onclick','closePopup()');
            cancelDeleteTask.setAttribute('onclick','closePopup()');
            confirmDeleteTask.setAttribute('onclick', `confirmDelete(${item.id})`)
        }
    })
}
function confirmDelete(e){
    let indexID = data.findIndex(key => key.id === e);
    data.splice(indexID,1);
    const taskItem = document.querySelector(`.taskTodo-${e}`);
    output.removeChild(taskItem)
    closePopup()
}
function closePopup(e){
    closeTask.style.display = 'none';
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
        if(item.id === title && isChecked == true ){
            item.isDone = true;
            outputName.style.backgroundColor = '#363636';
            outputTitle.style.textDecoration = 'line-through';
            outputDescriptionText.style.textDecoration = 'line-through';
            outputDescription.style.backgroundColor = 'fafafa';
        }
        else if(item.id===title && isChecked == false ){
            item.isDone = false;
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
        const outputCheckbox = document.querySelector(`label[onchange="checked(${item.id})"]>input`);
        if(item.id === idValue){
            editModal.style.display = 'block' ;
            editTitle.value = item.title;
            editDescription.value= item.description;
            editDate.value = item.date;
            modalChange.setAttribute('onclick',`editChange(${item.id})`);
                modalCheckbox.checked = outputCheckbox.checked;
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
            if(modalCheckbox.checked == true){
                outputCheckbox.checked = true;
                item.isDone == true;
            } else{
                outputCheckbox.checked = false;
                item.isDone == false;
            }
            checked(e);
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
closeTask.addEventListener('click',closePopup)
closeTaskContainer.addEventListener('click',function(e){
    e.stopPropagation();
});
function selected(e){
    data.forEach(item=>{
        const outputName = document.querySelector(`#Name-${item.id}`);
        const outputDescription = document.querySelector(`#Description-${item.id}`),
 selectedTask = outputName.querySelector('.selectTask');
        let selected = selectedTask.checked;
        if(item.id === e && selected == true ){
            item.isSelected = true;
            outputDescription.style.backgroundColor = '#a7f3e7';
        }
        else if(item.id===e && selected == false ){
            item.isSelected = false;
            outputDescription.style.backgroundColor = '#ebfffc';

        }
        return
    })
}
deleteSelectedTask.addEventListener('click',function(){
    const selectedData = data.filter(function(item){
        return item.isSelected == true
    })
    selectedData.forEach(f =>{
        data.splice(data.findIndex(e=>e.isSelected == f.isSelected),1);
    })
    render()
    console.log(data)
})