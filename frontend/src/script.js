console.log("Weather-app");

const Datatable = document.getElementById("DataTable");
const Datalist = document.getElementById("Dataspecifier");
const DataAmount = document.getElementById("Amount");
const Api = document.getElementById("API");

function apiurl(Datatype, Amount) {
  if (Api.value < 2) {
    if (Amount < 1) {
      return `https://webapi19sa-1.course.tamk.cloud/v1/weather/${Datatype}`;
    } else {
      return `https://webapi19sa-1.course.tamk.cloud/v1/weather/${Datatype}/${Amount}`;
    }
  } else {
    return `https://iotweb088.course.tamk.cloud/api/v1/weather`;
  }
}

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

const myAsyncFunction = async () => {
  console.log("Entering async function..");

  const Datatype = Datalist.value;
  console.log("Datatype: ", Datatype);

  const Amount = DataAmount.value;
  console.log("DataAmount: ", Amount);

  // First query the API and get the server response to a variable
  const path = apiurl(Datatype, Amount);
  //let path = `https://webapi19sa-1.course.tamk.cloud/v1/weather/${Datatype}/${Amount}`
  console.log(Api.value);
  console.log(path);

  let data;
  if (API.value < 2) {
    if (Amount > 23) {
      const serverResponse = await fetch(path);
      // Then get the data from the response with .json() method
      let tmp = await serverResponse.json();
      data = tmp.reverse();
    } else {
      const serverResponse = await fetch(path);
      // Then get the data from the response with .json() method
      let tmp = await serverResponse.json();
      data = tmp.reverse();
    }
  } else {
    if (Amount > 23) {
      const serverResponse = await fetch(
        `http://iotweb088.course.tamk.cloud/api/v1/weather`,
        { mode: "no-cors" }
      );
      // Then get the data from the response with .json() method
      let tmp = await serverResponse.json();
      data = tmp.reverse();
    } else {
      const serverResponse = await fetch(
        "http://iotweb088.course.tamk.cloud/api/v1/weather",
        { mode: "no-cors" }
      );
      // Then get the data from the response with .json() method
      let tmp = await serverResponse.json();
      data = tmp.reverse();
    }
  }

  // Note the usage of "await" keyword above.
  console.log("Data:", data);

  // Make sure the <tbody> is empty (in case of multiple myAsyncFunction calls)
  Datatable.textContent = "";

  // Loop over timeline data
  let id = 0;
  for (var index in data) {
    var keys;
    if (Datatype === "limit") {
      keys = Object.keys(data[index].data);
    } else {
      keys = Object.keys(data[index]);
    }
    var type;
    let cellDataArray = [];
    id = id + 1;
    if (Datatype === "limit") {
      type = keys[0];
    }
    else if (Amount == 0 ) {
      type = keys[2];
    }
    else {
      type = keys[1];
    }
    console.log(type);
    // Create <td> element to insort into <tbody> for each day of data
    const row = document.createElement("tr");

    // Create array containing data to be inserted into the table.
    // Each array item is inserted to a cell in the <table>
    if (Datatype === "limit") {
      var values = Object.values(data[index].data);
      cellDataArray = [id, type, dateParse(data[index].date_time), values[0]];
    } else {
      cellDataArray = [
        id,
        type,
        dateParse(data[index].date_time),
        data[index].humidity_out ||
          data[index].humidity_in ||
          data[index].rain ||
          data[index].temperature ||
          data[index].wind_direction ||
          data[index].wind_speed ||
          data[index].R5_Humidity_in ||
          data[index].WindSpeed_R8 ||
          data[index].light ||
          data[index].rain,
      ];
    }

    // Loop over the array items and create <td> elements
    for (cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      // Insert the data into <td> element
      cell.appendChild(cellText);

      // Insert <td> element into <tr> element
      row.appendChild(cell);
    }

    // Insert <tr> element into <tbody> element
    Datatable.appendChild(row);
  }
};

getDataButton.addEventListener("click", () => {
  console.log("click");
  myAsyncFunction();
});
