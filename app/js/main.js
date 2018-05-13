$('.holder').fadeIn();

document.addEventListener('DOMContentLoaded', function () {
    $('.holder').fadeOut();


    // ----------------------- fileloader -----------------------------
    // part for file loader
    function loadFile() {


        const inputLoadExcelFile = document.getElementById('loadExcel');
        const parentTable = document.getElementById('outfile');

        inputLoadExcelFile.addEventListener('change', addToHTML, false);

        function addToHTML(e) {



            // change const value for can changing reader
            let reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);

            // write name of file infor place after table
            let spanWrap = document.querySelector('.s_docName');

            // get name of file and input it on doc
            spanWrap.innerHTML += `<span> File name: ${e.target.files[0].name} </span>`;

            // update function for can choose more then one time docs
            let button = document.querySelector('.img_download');
            button.addEventListener('click', function () {

                // reset table after click
                reader = "";

            })

            // start preloader
            $('.holder').fadeIn();


            reader.addEventListener("loadend", function () {

                const data = new Uint8Array(reader.result);
                const wb = XLSX.read(data, {
                    type: 'array'
                });


                // reset prev table on new table
                resetTables();

                // generate new table structure from file
                process_wb(wb);

                // make edditable false for headers table
                createEditRows()

                // function for autochanging

                // end preloader after end
                $('.holder').fadeOut();

                // resetValues auto
                resetGraphAuto();

                resetbyBlur()



            });
        }

        function process_wb(wb) { // имя листа документа - берем 1-й, но можно и по названию sheet:"page 1"
            parentTable.innerHTML = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]], {
                editable: true
            }).replace("<table", '<table id="table" border="1"');
        }

    }

    // ------------------------- end fileloader -----------------------------------------



    // ------------------------- chart logic render -------------------------------------


    // select cancas node
    const ctx = document.getElementById("myChart");

    // select menu-type graphs node
    const btnType = document.querySelector(".btn-type-wrp");

    // all td
    let td = null;
    let tr = null;


    // colorPicker
    function colorPickerInit() {

        // rows in picker
        const firstLine = document.querySelector(".first");
        const nextLine = document.querySelector(".next");
        const endLine = document.querySelector(".end");

        // colors in picker
        const color1 = ['#ed1c24', '#fff200', '#00a651', '#00aeef', '#9e1f63', '#ec008c', '#be1e2d', '#ef4136'];
        const color2 = ['#f15a29', '#f7941d', '#fbb040', '#d7df23', '#8dc63f', '#39b54a', '#009444', '#006838'];
        const color3 = ['#2bb673', '#00a79d', '#27aae1', '#1b75bc', '#2b3990', '#262262', '#662d91', '#92278f'];


        // settings for colorPicker
        function generate(value1, value2, value3) {
            let line1 = '<div class=\"active-color\" data-color=\"' + value1 + '\" style=\"background-color: ' + value1 + '\"></div>';
            let line2 = '<div class=\"active-color\" data-color=\"' + value2 + '\" style=\"background-color: ' + value2 + '\"></div>';
            let line3 = '<div class=\"active-color\" data-color=\"' + value3 + '\" style=\"background-color: ' + value3 + '\"></div>';
            firstLine.insertAdjacentHTML('beforeend', line1);
            nextLine.insertAdjacentHTML('beforeend', line2);
            endLine.insertAdjacentHTML('beforeend', line3);
        };

        for (let index = 0; index < 8; index++) {
            generate(color1[index], color2[index], color3[index]);
        };
    }
    colorPickerInit();


    // colorPicker page paint
    const activeColor = document.querySelector(".blockColors");

    // 3th cell index
    let id = null;


    function drawFields() {



        activeColor.addEventListener('click', function (e) {
            let color = e.target.getAttribute('data-color');

            const rowThree = Array.from(tr, el => el.querySelectorAll('td')[2]);

            for (let index = 0; index < colorCell.length; index++) {

                colorCell[id] = color;
            };
            setting.chart.destroy();
            paint();

            let a  = document.querySelectorAll("td[data-index]");
            a[id].style.backgroundColor = color;
            
            $(activeColor).fadeOut();

            // nextCell.style.backgroundColor = color;
            
            id = null;

        });     
    }


    // display colorPicker
    function showPicker(e) {
        $(activeColor).fadeIn();
        id = e.target.getAttribute('data-index');
        // console.log(id);
    };



    // add cells for paint
    function addCell() {

        // tdColor.classList.add('paint');
        const tdColor = '<td class=\"paint\"></td>';
        tr.forEach(col => {
            col.insertAdjacentHTML('beforeend', tdColor);
        })

        const rowThree = Array.from(tr, el => el.querySelectorAll('td')[2]);
        rowThree[0].textContent = "Ваш цвет";

    }


    getArraysFromTable();


    // add cells

    addCell();

    // show colorPicker by click

    function setAttributesColorRows(value) {


        const colorRow = Array.from(tr, el => el.querySelectorAll('td')[2]);


        colorRow.forEach((element, index) => {

            if (index !== 0) {
                element.setAttribute('data-paint', value);
                element.setAttribute('data-index', index - 1);
                element.addEventListener('click', showPicker);
            }

        })

        drawFields();

    }
    setAttributesColorRows();






    // create mass(object) with Colors values and Edits values
    function getArraysFromTable() {

        td = document.querySelectorAll('td');
        tr = document.querySelectorAll("tr");

        let quantity = td.length;
        const td0 = Array.from(tr, el => el.querySelectorAll('td')[0].textContent);
        const td1 = Array.from(tr, el => el.querySelectorAll('td')[1].textContent);

        return arrTable = [td0.slice(1, td0.length), td1.slice(1, td1.length)];

        // addCell();
    }


    // value with Edits(numbers)
    let meanings = arrTable[1];

    // value with Names rows
    let name = arrTable[0];

    // mass with colors
    let colorCell = ["hsl(81, 94%, 50%)", "hsl(162, 95%, 50%)", "hsl(141, 91%, 50%)", "hsl(164, 92%, 50%)", "hsl(219, 94%, 50%)", "hsl(260, 95%, 50%)", "hsl(11, 93%, 50%)", "hsl(238, 94%, 50%)", "hsl(289, 94%, 50%)", "hsl(78, 92%, 50%)"];


    // settings for canvas
    const setting = {
        chart: {},
        chartType: 'bar',
        chartName: 'My Chart',
        x_axis: name,
        y_axis: arrTable[1],
        bg_color: colorCell,
        bg_cache: null
    }



    // function render canvas 
    function paint() {
        setting.chart = new Chart(ctx, {
            type: setting.chartType, // 'line', 'bar', 'pie', 'doughnut'
            data: {
                labels: setting.x_axis,
                datasets: [{
                    label: 'Название легенды',
                    data: setting.y_axis,
                    backgroundColor: setting.bg_color,
                    borderColor: ['#880', '#880', '#880', '#880', '#880', '#880'],
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 10,
                    pointHoverRadius: 15
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: setting.chartName
                },
                elements: {
                    point: {
                        pointStyle: 'circle'
                    }
                },
                legend: {
                    display: false,
                    // display: true,
                    fullWidth: true,
                    position: 'top',
                    labels: {
                        fontColor: 'black',
                        fontSize: 20
                    }
                },
                // hover: {
                //   mode: 'nearest',
                //   intersect: true
                // },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                tooltips: {
                    // mode: 'x'
                }
            }
        });
    }



    // logic for graps paints
    function updateType(e) {
        e.preventDefault();

        // remove classes from unactive buttons
        document.querySelectorAll('.s_menu__button').forEach(e => {
            e.classList.remove('s_menu__button--active');
        })


        // add class on buttons active
        e.path[0].classList.add('s_menu__button--active');



        const isLine = e.target.dataset.type === 'line' ? true : false;

        // line have one background color, other type have array of colors
        if (isLine) {
            setting.bg_cache = setting.bg_color;
            setting.bg_color = '#808';
        } else if (setting.bg_cache) {
            setting.bg_color = setting.bg_cache;
        } else {
            setting.bg_cache = setting.bg_color;
        }
        setting.chartType = e.target.getAttribute('data-type');
        // delete old chart and pain new cart with new setting

        setting.chart.destroy();
        paint();

        // reset graph auto 
        resetGraphAuto();
    }


    // name for cancas graph
    function updateName(e) {
        e.preventDefault();
        setting.chartName = elemInputChartName.value;
        // delete old chart and pain new cart with new setting
        setting.chart.destroy();
        paint();
    }


    // listeners for updates
    btnType.addEventListener('click', updateType, false);

    // ------------------------- end shart logic render ---------------------------------




    // ------------------------- aplication user logic ----------------------------------

    function createEditRows() {
        // settings for edit rows


        let edittableRows = document.querySelectorAll('td');
        edittableRows.forEach(element => {
            // set for all row attribute edditable
            element.setAttribute('contenteditable', "true");
        })


        // exceptions, can rewrite using filter()
        function removeFromHeaders() {
            edittableRows[0].setAttribute('contenteditable', "false");
            edittableRows[1].setAttribute('contenteditable', "false");
            edittableRows[2].setAttribute('contenteditable', "false");
        }


        // question for remove edittable fields from exports tables
        if (edittableRows[2].querySelector('span') && edittableRows[0].querySelector('span') && edittableRows[1].querySelector('span')) {

            removeFromHeaders();
            edittableRows[0].querySelector('span').setAttribute('contenteditable', "false");
            edittableRows[1].querySelector('span').setAttribute('contenteditable', "false");
            edittableRows[2].querySelector('span').setAttribute('contenteditable', "false");
        } else {
            removeFromHeaders();
        }


    }


    // autoReset grapht without clicking
    function resetbyBlur() {
        td.forEach((elem) => {
            elem.addEventListener('click', function (e) {

                // autoreset
                e.target.addEventListener('blur', resetGraphAuto);
            })
        })
    }





    // delete prev table before load file
    function resetTables() {
        let allTables = document.querySelectorAll('table');
        // override exist table
        allTables[0].innerHTML = " ";
    }



    // update new canvas via click
    function resetGraph() {
        // button reset event
        let reset = document.querySelector('.s_table__button');


        reset.addEventListener('click', function () {

            // get valuef from new table/change table
            getArraysFromTable();


            // set new values in setting for render canvas
            setting.chart.data.labels = arrTable[0];
            setting.chart.data.datasets[0].data = arrTable[1];

            // update title
            setting.chart.options.title.text = document.querySelector('.s_table__input').value;


            setting.chart.update({
                // todo animation logic
                duration: 800,
                easing: 'easeOutBounce'
            });

            
            // addCell();
            // createEditRows();

        })
    }

    // update via not click on buttons
    function resetGraphAuto() {

        // get valuef from new table/change table
        getArraysFromTable();


        // set new values in setting for render canvas
        setting.chart.data.labels = arrTable[0];
        setting.chart.data.datasets[0].data = arrTable[1];

        setting.chart.update({
            // todo animation logic
            duration: 800,
            easing: 'easeOutBounce'
        });

        // addCell();

    }



    // export in PDF
    function pdfDownload() {
        const download = document.querySelector(".s_downloadPdf");

        const ctxElem = document.getElementById("myChart");
        const ctx = ctxElem.getContext('2d');
        const img = document.getElementById('img-from-canvas');

        function getPDF() {
            // ctx.fillStyle = "rgb(200, 200, 200)";
            const imgData = ctxElem.toDataURL("image/png", 1.0);
            img.setAttribute('src', imgData)
            const pdf = new jsPDF("p", "mm", "a4");

            pdf.addImage(imgData, "PNG", 10, 10, 200, 180);
            pdf.save("my-chart.pdf");
        }

        download.addEventListener("click", getPDF);
    }
    pdfDownload();


    // export canvas in png
    function exportCanvas() {
        var button = document.querySelector('.s_downloadPng');
        button.addEventListener('click', function (e) {
            var dataURL = document.querySelector('.myChart').toDataURL('image/png');
            button.href = dataURL;
        });
    }
    exportCanvas();


    // logic for add new row in table
    function addRow() {
        let table = document.querySelector('tbody');


        document.querySelector('.s_new-row').addEventListener('click', function () {

            // console.log("lalalal")
            table.innerHTML += `<tr>
                <td></td>
                <td></td>
            </tr>`;

            createEditRows();
        })
    }

    addRow();


    // reset row additional function
    // function deleteRow(){
    //     let table = document.querySelector('tbody');


    //     document.querySelector('.s_delete-row').addEventListener('click', function(){

    //         table.querySelectorAll('tr').length = table.querySelectorAll('tr').length - 1;

    //         createEditRows();
    //     })
    // }

    // deleteRow();


    // unpdate name grapg

    // function updateGraphName(){
    //     document.querySelector('.s_table__input').textContent = setting.chart.data.datasets.label;
    // }


    // make rows in table edditable
    createEditRows();

    // function paint canvas
    paint();

    // function fileloader
    loadFile();

    // function reset graphs
    resetGraph();

    // resetAuto by event blur
    resetbyBlur();

    // ---------------------------- end aplication user logic ----------------------------
})