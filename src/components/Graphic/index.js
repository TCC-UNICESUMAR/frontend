import Chart from "react-apexcharts";

import  './index.css'

function Graphic( {name, data} ) {

    console.log(data) 

    const options = {
        xaxis: {
            categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
        },
        dataLabels: {
            style: {
              colors: ['#FFFFFF']
            }
          },
          fill: {
            colors: ['#59D678']
          }
    }

    const series = [{
        name: name,
        data: data,
    }]

    return (
        <div className="conatainer-dash">
            <h2 className="title-dash">{name}</h2>
            <Chart 
                options={options}
                series={series}
                type="bar"
                width="400"
                height="250"
            />
        </div>
    )
}

export default Graphic;