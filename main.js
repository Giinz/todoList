const titleForm = document.querySelector(".Submit__title");
const titleInput = document.querySelector(".Input-title");
const dateInput = document.querySelector(".Input-date");
const descriptionInput = document.querySelector(".Input-description");
const create = document.querySelector('.Create');
const modal = document.querySelector('.modal'),
      closeModal = document.querySelector('.modalClose');
// 'CREATE BUTTON' FUNCTION
create.addEventListener('click',function(e){
    e.preventDefault();
    const taskTitle = titleInput.value;
    const date = dateInput.value;
    const description = descriptionInput.value;
    if(!taskTitle){
        titleInput.focus();
        return
    } else {
// CREATE TASK TITLE
        const output = document.querySelector('.Output');
        const outputName = document.createElement('div');
        const outputName__Title = document.createElement('p');
        outputName__Title.innerHTML = taskTitle;
        outputName.classList.add('Output__name');
        output.appendChild(outputName);
// CREATE TASK DEADLINE
        const dateDiv = document.createElement('div');
        dateDiv.classList.add("Date");
        const dateSpan = document.createElement('span'),
              deleteBtn = document.createElement('button');
        dateSpan.innerHTML = 'Deadline:'+ ' ' + date;
        deleteBtn.innerHTML = 'X';
        deleteBtn.classList.add('Delete');
        dateDiv.appendChild(dateSpan);
        dateDiv.appendChild(deleteBtn);
        outputName.appendChild(outputName__Title);
        outputName.appendChild(dateDiv);
// CREATE TASK DESCRIPTION
        const outputDescription = document.createElement('div');
        outputDescription.classList.add('Output__description');
        const outputDescription__text = document.createElement('p');
             outputDescription__text.innerHTML = description;
        const descriptionOptions = document.createElement('div');
        descriptionOptions.classList.add('Options');
//CREATE EDIT BUTTON, DELETE BUTTN, DONE CHECKBOX
        const editBtn = document.createElement('button');
        editBtn.classList.add('Edit');
        editBtn.innerHTML = 'Edit';
        const checkbox = document.createElement('label');
        checkbox.classList.add('checkbox');
        checkbox.innerHTML = '<input type="checkbox">' +'Done';
        descriptionOptions.appendChild(editBtn);
        descriptionOptions.appendChild(checkbox);
        outputDescription.appendChild(outputDescription__text);
        outputDescription.appendChild(descriptionOptions);
        output.appendChild(outputDescription);
// DELETE BUTTON FUNCTION
        deleteBtn.addEventListener('click',function(){
            output.removeChild(outputName);
            output.removeChild(outputDescription);
        })
// CHECKBOX DONE TASK FUNCTION
        checkbox.onclick = function(){
            let isChecked = document.querySelector('input[type="checkbox"]'),
                desText = outputDescription.querySelector('p');
            let isEditDoneChecked = editDone.querySelector('input');

            if(isChecked.checked || isEditDoneChecked.checked){
                desText.style.textDecoration = "line-through";
                outputName__Title.style.textDecoration = 'line-through';
                outputName.style.backgroundColor = '#363636';
                outputDescription.style.backgroundColor = '#fafafa';
            }else{
                desText.style.textDecoration = "none";
                outputName__Title.style.textDecoration = 'none';
                outputName.style.backgroundColor = '#00d1b2';
                outputDescription.style.backgroundColor = '#ebfffc'
            }
        }
// EDIT BUTTON FUNCTION
        const changeBtn = document.querySelector('.Change'),
        editDone = document.querySelector('.modalCheckbox'),
        editTitle = document.querySelector('.editTitle'),
        editDescription = document.querySelector('.editDescription'),
        editDate = document.querySelector('.editDate');
        editBtn.addEventListener('click',function(){
            modal.style.display = 'block';
            editTitle.value = outputName__Title.innerHTML;
            editDescription.value = outputDescription__text.innerHTML;
            editDate.value = date;
        })
        changeBtn.addEventListener('click',function(){
            outputName__Title.innerHTML = editTitle.value;
            dateSpan.innerHTML = 'Deadline:'+ ' ' + editDate.value;
            outputDescription__text.innerHTML = editDescription.value;
            modal.style.display = 'none';
        })  
        dateInput.value = '';
        titleInput.value = '';
        descriptionInput.value = '';
    }
})      
//RESET BUTTON FUNCTION
const resetBtn = document.querySelector('.Reset');
      
resetBtn.addEventListener('click',function(){
    dateInput.value = '';
    titleInput.value = '';
    descriptionInput.value = '';
})
// MODAL
window.addEventListener('click',function(e){
    if(e.target == modal)
    modal.style.display = 'none';
})
closeModal.addEventListener('click',function(){
    modal.style.display = 'none';
})