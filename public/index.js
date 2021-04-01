const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.add')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteTask(){
    const doTask = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'task1': doTask
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}


async function addLike(){
    const doTask = this.parentNode.childNodes[1].innerText
    const doLikes = Number(this.parentNode.childNodes[3].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'task1': doTask,
              'likes1': doLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
