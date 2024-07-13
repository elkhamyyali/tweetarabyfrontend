import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  data: { chartData: number[] }[];
  color: string;
}

interface ApexChartState {
  options: ApexCharts.ApexOptions;
}

class ApexChart extends Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 50,
          width: 50,
          type: "line", // Specify the chart type here
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        grid: {
          show: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      },
    };
  }

  render() {
    const { data, color } = this.props;

    return (
      <div
        style={{
          width: "100%",
          height: "300px", // Adjust height as needed
        }}
      >
        <ReactApexChart
          options={this.state.options}
          series={data.map((item, index) => ({
            name: `Series ${index + 1}`,
            data: item.chartData,
          }))}
          type="line" // Specify the chart type here as well
        />
      </div>
    );
  }
}

export default ApexChart;
