import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  data: { chartData: number[] }[];
  color: string;
}

interface ApexChartState {
  options: {
    chart: {
      height: number;
      width: number;
      type: string;
      toolbar: {
        show: boolean;
      };
      sparkline: {
        enabled: boolean;
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    stroke: {
      curve: string;
      width: number;
    };
    grid: {
      show: boolean;
    };
    xaxis: {
      labels: {
        show: boolean;
      };
      axisBorder: {
        show: boolean;
      };
    };
    yaxis: {
      labels: {
        show: boolean;
      };
      axisBorder: {
        show: boolean;
      };
    };
  };
}

class ApexChart extends Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 50,
          width: 50,
          type: "line",
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
          width: "10%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactApexChart
          options={this.state.options}
          series={data.map((item, index) => ({
            name: `Series ${index + 1}`,
            data: item.chartData,
            color: color, // Pass the color prop to each series
          }))}
          type="line"
        />
      </div>
    );
  }
}

export default ApexChart;
