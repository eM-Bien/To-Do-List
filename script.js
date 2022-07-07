
let toDoList;
let btnAddTask;
let inputToDo;
let errEmptyTask;
let noTaskText;

// stworzone dynamicznie
let newToDo;
let newToDoText;
let allBtnTools;
let completeBtn;
let editBtn;
let deleteBtn;

//popup
let popup;
let popupBg;
let popupBox;
let popupCurrentTask;
let popupInput;
let popupErr;
let popupBtnSubmit;
let popupBtnCancel;
let editText;

const main = () => {
    prepareElements()
    prepareEvents()
}

const prepareElements = () => {
    inputToDo = document.querySelector('.todo__header-field');
    btnAddTask = document.querySelector('.todo__header-btn');
    errEmptyTask = document.querySelector('.todo__header-error');
    toDoList = document.querySelector('.todo__list');
    noTaskText = document.querySelector('.todo__list-no-task')

    //popup
    popup = document.querySelector('.todo-popup')
    popupBg = document.querySelector('.popup-bg')
    popupBox = document.querySelector('.todo-popup__box')
    popupCurrentTask = document.querySelector('.todo-popup__current-task')
    popupInput = document.querySelector('.todo-popup__box-edit__field')
    popupErr = document.querySelector('.todo-popup__box-edit__err')
    popupBtnSubmit = document.querySelector('.todo-popup__box-edit__submit')
    popupBtnCancel = document.querySelector('.todo-popup__box-edit__cancel')
}

const prepareEvents = () => {
    btnAddTask.addEventListener('click', createNewTask);
    toDoList.addEventListener('click', checkClick)
    popupBg.addEventListener('click', closePopUp)
    popupBtnCancel.addEventListener('click', closePopUp)
    popupBtnSubmit.addEventListener('click', changeEditText)
}

const createNewTask = () => {
    if (inputToDo.value !== '') {
        newToDo = document.createElement('li')
        newToDo.classList.add('todo__list__item')
        toDoList.append(newToDo)
    
        newToDoText = document.createElement('p')
        newToDoText.classList.add('todo__list__item-task')
        newToDoText.textContent = inputToDo.value
    
        createNewTools()
    
        newToDo.append(newToDoText, allBtnTools)
        errEmptyTask.classList.remove('todo__header-error-active')
        noTaskText.textContent = ''
        
    } else {
        errEmptyTask.classList.add('todo__header-error-active')
    }

    inputToDo.value = ''
}

const createNewTools = () => {
    allBtnTools = document.createElement('div')
    allBtnTools.classList.add('todo__list__item-btns')
    
    completeBtn = document.createElement('button')
    completeBtn.classList.add('todo__list__item-btn')
    completeBtn.classList.add('todo__list__item-btn__complete')
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`

    editBtn = document.createElement('button')
    editBtn.classList.add('todo__list__item-btn')
    editBtn.classList.add('todo__list__item-btn__edit')
    editBtn.innerHTML = `edytuj`

    deleteBtn = document.createElement('button')
    deleteBtn.classList.add('todo__list__item-btn')
    deleteBtn.classList.add('todo__list__item-btn__delete')
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`
    
    allBtnTools.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
    if (e.target.matches('.todo__list__item-btn__complete')) {
        e.target.closest('li').classList.toggle('task-done')
        e.target.classList.toggle('complete-btn')

    } else if (e.target.matches('.todo__list__item-btn__edit')) {
        editToDo(e)

    } else if (e.target.matches('.todo__list__item-btn__delete')) {
        deleteToDo(e)
    }
}

const editToDo = e => {
    popup.classList.remove('hide')
    popupBg.classList.remove('hide')

    completeBtnNotDone = e.target.closest('.todo__list__item-btn__complete')
    editText = e.target.closest('li')
    popupCurrentTask.textContent = editText.firstChild.textContent
}

const changeEditText = () => {
    if (popupInput.value !== '') {
        editText.firstChild.textContent = popupInput.value
        closePopUp()

    } else {
        popupErr.textContent = 'Nic nie wpisano'
    }
}

const closePopUp = () => {
    popup.classList.add('hide')
    popupBg.classList.add('hide')
    popupInput.value = ''
    popupErr.textContent = ''
}

const deleteToDo = e => {
    e.target.closest('li').remove()

    const allToDo = toDoList.querySelectorAll('li')
    if (allToDo.length === 0) {
        noTaskText.textContent = 'Brak zadań do wykonania'
    }
}

document.addEventListener('DOMContentLoaded', main)