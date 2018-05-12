document.addEventListener('DOMContentLoaded', function(){

    // settings for edit rows
    let edittableRows = document.querySelectorAll('td');
    edittableRows.forEach( element => {
    
    // set for all row attribute edditable
        element.setAttribute('contenteditable', "true");
    })


    // document.addEventListener('.img_download')


    // create new table
    
    function correction(){
        let firstTable = document.querySelectorAll('table');
        console.log(firstTable.length)
    }
})