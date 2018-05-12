const ctx = document.getElementById("myChart");
const docName = document.querySelector(".s_docName");
const nameGraph = docName.querySelector("span");
// const elemInputChartName = document.getElementById("nameChartIn");
const btnType = document.querySelector(".btn-type-wrp");
/* ========== DOM ELEMENTS END ========== */
const tbd = document.querySelector("tbody");
const tr = tbd.querySelectorAll("tr");
const tdTb = document.querySelectorAll("td");
/* ============ CHART SETTING ============ */

function getArraysFromTable() {
  const quantity = tr.length;
  const td0 = Array.from(tr, el => el.querySelectorAll('td')[0].textContent);
  const td1 = Array.from(tr, el => el.querySelectorAll('td')[1].textContent);
  return arrTable = [td0, td1];
}
getArraysFromTable();

let meanings = arrTable[1];
let name = arrTable[0];
let colorCell = ["hsl(81, 94%, 50%)", "hsl(162, 95%, 50%)", "hsl(141, 91%, 50%)", "hsl(164, 92%, 50%)", "hsl(219, 94%, 50%)", "hsl(260, 95%, 50%)", "hsl(11, 93%, 50%)", "hsl(238, 94%, 50%)", "hsl(289, 94%, 50%)", "hsl(78, 92%, 50%)"];

function show() {
  console.log(meanings);
};

tdTb.forEach(er => {
  er.addEventListener('click', show);
});

const setting = {
  chart: {},
  chartType: 'bar',
  chartName: 'My Chart',
  x_axis: name,
  y_axis: arrTable[1],
  bg_color: colorCell,
  bg_cache: null

  /* ========== CHART SETTING END ========== */
  /* ========== CHART CREATING  ============ */
};function paint() {
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
/* ========== CHART CREATING END ============ */

/* ========== CHART UPDATE TYPE ============ */
function updateType(e) {
  e.preventDefault();

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
  console.log(setting.chartType);
  // delete old chart and pain new cart with new setting
  setting.chart.destroy();
  paint();
}
/* ========== CHART UPDATE TYPE END ============ */
/* ========== CHART UPDATE NAME  ============ */
function updateName(e) {
  e.preventDefault();
  setting.chartName = elemInputChartName.value;
  // delete old chart and pain new cart with new setting
  setting.chart.destroy();
  paint();
}
/* ========== CHART UPDATE NAME END ============ */

/* ============ LISTNER ============ */
btnType.addEventListener('click', updateType, false);
// elemInputChartName.addEventListener('blur', updateName, false);
/* ========== LISTNER END ========== */

paint();