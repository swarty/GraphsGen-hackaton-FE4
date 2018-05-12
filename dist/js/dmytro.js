document.addEventListener('DOMContentLoaded', function () {

    // sellect all fields in tables
    let tableFields = document.querySelectorAll('td');

    // select input for entry values in table
    let input = document.querySelector('.input__field');

    // mass for entry it on table row place
    let pressValues = [];

    // event on press keys and 
    input.addEventListener('click', function () {

        document.addEventListener('keypress', function (e) {

            letter = e.key;

            pressValues.push(letter);

            // string value from keyboard 
            pressValues.join('');
        });
    });

    // add logic
    tableFields.forEach(eOuter => {
        eOuter.addEventListener('click', function () {

            // remove class froom another element
            tableFields.forEach(eInner => {
                eInner.classList.remove('td--active');
            });

            // create connetion with input field and table row
            input.value = eOuter.textContent;
            eOuter.classList.add('td--active');
        });
    });
});