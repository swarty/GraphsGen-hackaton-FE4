const ctx = document.getElementById("myChart");
const btnType = document.querySelector(".btn-type-wrp");
const tbd = document.querySelector("tbody");
const trd = tbd.querySelectorAll("tr");
// const tdColor = document.querySelectorySelectorAll(".paint"); 
const activeColor = document.querySelector(".blockColors");
const firstLine = document.querySelector(".first");
const nextLine = document.querySelector(".next");
const endLine = document.querySelector(".end");
const color1 = ['#ed1c24', '#fff200', '#00a651', '#00aeef', '#9e1f63', '#ec008c', '#be1e2d', '#ef4136'];
const color2 = ['#f15a29', '#f7941d', '#fbb040', '#d7df23', '#8dc63f', '#39b54a', '#009444', '#006838'];
const color3 = ['#2bb673', '#00a79d', '#27aae1', '#1b75bc', '#2b3990', '#262262', '#662d91', '#92278f'];
let colorCell = ["hsl(81, 94%, 50%)", "hsl(162, 95%, 50%)", "hsl(141, 91%, 50%)", "hsl(164, 92%, 50%)", "hsl(219, 94%, 50%)", "hsl(260, 95%, 50%)", "hsl(11, 93%, 50%)", "hsl(238, 94%, 50%)", "hsl(289, 94%, 50%)", "hsl(78, 92%, 50%)"];

function getArraysFromTable() {
  const quantity = trd.length;
  const td0 = Array.from(trd, el => el.querySelectorAll('td')[0].textContent);
  const td1 = Array.from(trd, el => el.querySelectorAll('td')[1].textContent);
  return arrTable = [td0, td1];
}
getArraysFromTable();

let meanings = arrTable[1];
let name = arrTable[0];

function addCell(value) {

  // tdColor.classList.add('paint');
  const tdColor = '<td class=\"paint\"></td>';
  trd.forEach(col => {
    col.insertAdjacentHTML('beforeend', tdColor);
  });
  // trd.forEach((col, index) => {
  //   let tdColor = '<td class=\"paint\"></td>';
  //   trd.insertAdjacentHTML('beforeend', tdColor);
  //   tdColor.setAttribute('data-paint', value);
  //   tdColor.setAttribute('data-index', index);
  //   tdColor.addEventListener('click', show);    
  // });

  // td.forEach( (col, index) => {
  //   col.setAttribute('data-paint', value);
  //   col.setAttribute('data-index', index);
  //   col.addEventListener('click', show);
  // });
}

addCell(null);

// function addColorCell(value) {
//   tdColor.forEach( (col, index) => {
//     col.setAttribute('data-paint', value);
//     col.setAttribute('data-index', index);
//     col.addEventListener('click', show);
//   });
// };
// addColorCell(null);

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

let id = null;

function show(e) {
  activeColor.style.display = 'flex';
  id = e.target.getAttribute('data-index');
  console.log(id);
};

activeColor.addEventListener('click', function (e) {
  let color = e.target.getAttribute('data-color');
  for (let index = 0; index < colorCell.length; index++) {
    colorCell[id] = color;
  };
  setting.chart.destroy();
  paint();
  tdColor[id].style.backgroundColor = color;
  activeColor.style.display = 'none';
  id = null;
});

const setting = {
  chart: {},
  chartType: 'bar',
  chartName: 'My Chart',
  x_axis: name,
  y_axis: arrTable[1],
  bg_color: colorCell,
  bg_cache: null
};

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
  setting.chartType = e.target.textContent;

  // delete old chart and pain new cart with new setting
  setting.chart.destroy();
  paint();
}

function updateName(e) {
  e.preventDefault();
  setting.chartName = elemInputChartName.value;
  // delete old chart and pain new cart with new setting
  setting.chart.destroy();
  paint();
}

btnType.addEventListener('click', updateType, false);
paint();