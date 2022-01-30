const canvasElement = document.getElementById("temp");
const canvasElement2 = document.getElementById("humidity_in");
const canvasElement3 = document.getElementById("humidity_out");
const canvasElement4 = document.getElementById("light");
const canvasElement5 = document.getElementById("rain");
const amount = document.getElementById("Amount");
let data_temp = [];
let data_hum_in = [];
let data_hum_out = [];
let data_light = [];
let data_rain = [];
let myChart;
let myChart2;
let myChart3;
let myChart4;
let myChart5;

//JSON packet
function dateParse(date) {
  let constructed_date;
  const year = date.substring(0, 4);
  const day = date.substring(8, 10);
  const month = date.substring(5, 7);
  const hour = parseInt(date.substring(11, 13)) + 3;
  const minutes = date.substring(14, 16);
  const seconds = date.substring(17, 19);
  constructed_date =
    hour < 10
      ? "0" +
        hour +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        day +
        "-" +
        month +
        "-" +
        year
      : hour +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        day +
        "-" +
        month +
        "-" +
        year;
  return constructed_date;
}

function apiurl(Datatype, Amount) {
  if (Amount < 1) {
    return `https://webapi19sa-1.course.tamk.cloud/v1/weather/${Datatype}`;
  } else {
    return `https://webapi19sa-1.course.tamk.cloud/v1/weather/${Datatype}/${Amount}}`;
  }
}

const myAsyncFunction = async (
  Datatype,
  Amount,
  data_list,
  canvas,
  canvasId
) => {
  console.log("Entering async function..");

  data_list = [];
  canvas = "";

  // First query the API and get the server response to a variable
  const path = apiurl(Datatype, Amount);
  console.log(path);

  const serverResponse = await fetch(path);

  // Then get the data from the response with .json() method
  const data = await serverResponse.json();
  data_list = data;

  // Note the usage of "await" keyword above.
  console.log("Data:", data_list);
  if (Datatype === "temperature") {
    canvas = new Chart(canvasId, {
      type: "line",
      data: {
        labels: data_list.map((values) => values.date_time),
        datasets: [
          {
            label: "Temperature",
            data: data_list.map((values) => values.temperature),
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                tooltipFormat: "d.L.Y HH:MM:SS",
              },
            },
          ],
        },
      },
    });
  }
  if (Datatype === "humidity_in") {
    canvas = new Chart(canvasId, {
      type: "line",
      data: {
        labels: data_list.map((values) => values.date_time),
        datasets: [
          {
            label: "Humidity in",
            data: data_list.map((values) => values.humidity_in),

            borderColor: "black",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                tooltipFormat: "d.L.Y HH:MM:SS",
              },
            },
          ],
        },
      },
    });
  }
  if (Datatype === "humidity_out") {
    canvas = new Chart(canvasId, {
      type: "line",
      data: {
        labels: data_list.map((values) => values.date_time),
        datasets: [
          {
            label: "Humidity out",
            data: data_list.map((values) => values.humidity_out),

            borderColor: "black",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                tooltipFormat: "d.L.Y HH:MM:SS",
              },
            },
          ],
        },
      },
    });
  }
  if (Datatype === "light") {
    canvas = new Chart(canvasId, {
      type: "line",
      data: {
        labels: data_list.map((values) => values.date_time),
        datasets: [
          {
            label: "Light",
            data: data_list.map((values) => values.light),

            borderColor: "black",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                tooltipFormat: "d.L.Y HH:MM:SS",
              },
            },
          ],
        },
      },
    });
  }
  if (Datatype === "rain") {
    canvas = new Chart(canvasId, {
      type: "bar",
      data: {
        labels: data_list.map((values) => values.date_time),
        datasets: [
          {
            label: "rain",
            data: data_list.map((values) => values.rain),

            borderColor: "black",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                tooltipFormat: "d.L.Y HH:MM:SS",
              },
            },
          ],
        },
      },
    });
  }
};

function canvasData() {
  myAsyncFunction(
    "temperature",
    amount.value,
    data_temp,
    myChart,
    canvasElement
  );
  myAsyncFunction(
    "humidity_in",
    amount.value,
    data_hum_in,
    myChart2,
    canvasElement2
  );
  myAsyncFunction(
    "humidity_out",
    amount.value,
    data_hum_out,
    myChart3,
    canvasElement3
  );
  myAsyncFunction("light", amount.value, data_light, myChart4, canvasElement4);
  myAsyncFunction("rain", amount.value, data_rain, myChart5, canvasElement5);
}
canvasData();
document.getElementById("Amount").onchange = canvasData;
