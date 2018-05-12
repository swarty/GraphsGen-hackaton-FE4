document.addEventListener('DOMContentLoaded', function () {

    // settings for edit rows
    let edittableRows = document.querySelectorAll('td');

    edittableRows.forEach(element => {

        // set for all row attribute edditable
        element.setAttribute('contenteditable', "true");
    });

    // document.addEventListener('.img_download')


    // vie new table and hide old tables
    // function correction(){
    //     let firstTable = document.querySelectorAll('table');


    //     firstTable.forEach( e => {
    //         e.classList.add('display-none');
    //     });

    //     firstTable[0].classList.remove('display-none');
    // }
    // correction();


    function loadGraph() {
        let addGraph = document.querySelector('.img_download');
        addGraph.addEventListener('click', function () {
            let firstTable = document.querySelectorAll('table');
            firstTable[0].innerHTML += " ";
        });
    }

    function resetGraph() {
        let reset = document.querySelector('.s_table__button');
        reset.addEventListener('click', function () {

            getArraysFromTable();

            setting.chart.data.datasets[0].data = arrTable[1];
            setting.chart.update({
                duration: 800,
                easing: 'easeOutBounce'
            });
        });
    }

    resetGraph();
});