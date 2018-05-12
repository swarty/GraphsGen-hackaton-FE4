const inputLoadExcelFile = document.getElementById('loadExcel');
const parentTable = document.getElementById('outfile');

inputLoadExcelFile.addEventListener('change', addToHTML, false);

function addToHTML (e) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.addEventListener("loadend", function() {
        const data = new Uint8Array(reader.result);
        const wb = XLSX.read(data, {type:'array'});
        process_wb(wb);
    });
}

function process_wb(wb) {                            // имя листа документа - берем 1-й, но можно и по названию sheet:"page 1"
	parentTable.innerHTML = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]], {editable:true}).replace("<table", '<table id="table" border="1"');
}