document.addEventListener('DOMContentLoaded', function(){

    // settings for edit rows
    let edittableRows = document.querySelectorAll('td');
    edittableRows.forEach( element => {
    
    // set for all row attribute edditable
        element.setAttribute('contenteditable', "true");
    })


})