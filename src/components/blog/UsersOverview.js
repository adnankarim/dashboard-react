import React from "react";
import PropTypes from "prop-types";
import { Row, Card, CardHeader, CardBody } from "shards-react";

import Chart from "../../utils/chart";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading:false,
      
        chartData: {
          labels: Array.from(new Array(12), (_, i) => (i === 0 ? 1 : i)),
          datasets: [
            {
              label: "2018",
              fill: "start",
              data: [
                8272,
                10340,
                12335,
                16156,
                20195,
                25244,
                31555,
                39444,
                49305,
                61631,
                77039,
                96299
              ],
              backgroundColor: "rgba(0,123,255,0.1)",
              borderColor: "rgba(0,123,255,1)",
              pointBackgroundColor: "#ffffff",
              pointHoverBackgroundColor: "rgb(0,123,255)",
              borderWidth: 1.5,
              pointRadius: 0,
              pointHoverRadius: 3
            }
          ]
        }
      
    };
    this.setState((state,props)=>props.userData)
    this.canvasRef = React.createRef();
  }
 
 
  componentDidMount() {
    this.setState({
      chartData: {
        labels: Array.from(new Array(12), (_, i) => (i === 0 ? 1 : i)),
        datasets: [
          {
            label: "2018",
            fill: "start",
            data: [
              8272,
              10340,
              1292335,
              16156,
              20195,
              25244,
              31555,
              39444,
              49305,
              61631,
              77039,
              96299
            ],
            backgroundColor: "rgba(0,123,255,0.1)",
            borderColor: "rgba(0,123,255,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgb(0,123,255)",
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3
          },
          
        ],
        loading:false
      }})
    if (!this.state.loading) {
      const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: "top"
          },
          elements: {
            line: {
              // A higher value makes the line look skewed at this ratio.
              tension: 0.3
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  callback(tick, index) {
                    // Jump every 7 values on the X axis labels to avoid clutter.
                    return index % 7 !== 0 ? "" : tick;
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMax: 45,
                  callback(tick) {
                    if (tick === 0) {
                      return tick;
                    }
                    // Format the amounts using Ks for thousands.
                    return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                  }
                }
              }
            ]
          },
          hover: {
            mode: "nearest",
            intersect: false
          },
          tooltips: {
            custom: false,
            mode: "nearest",
            intersect: false
          }
        },

        ...this.props.chartOptions
      };

      const BlogUsersOverview = new Chart(this.canvasRef.current, {
        type: "LineWithLine",
        data: this.state.chartData,
        options: chartOptions
      });

      // They can still be triggered on hover.
      const buoMeta = BlogUsersOverview.getDatasetMeta(0);
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[
        this.state.chartData.datasets[0].data.length - 1
      ]._model.radius = 0;

      // Render the chart.
      BlogUsersOverview.render();
    }
  }
  changeUsers = () => {
    this.setState({ color: "blue" });
  };
 
  render() {
    const { title,userData } = this.props;
    return (
      <div>
        <div>{this.state.userData}</div>
        {
        
        [0,8].length > 0 ? (
          <Card small className="h-100">
            <CardHeader className="border-bottom">
              <h6 className="m-0">{title}</h6>
            </CardHeader>
            <CardBody className="pt-0">
              <Row className="border-bottom py-2 bg-light" />
              <canvas
                height="120"
                ref={this.canvasRef}
                style={{ maxWidth: "100% !important" }}
              />
            </CardBody>
          </Card>
        ) : (
          ""
        )}
      </div>
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

UsersOverview.defaultProps = {
  title: "Users Overview",
  chartData: {
    labels: Array.from(new Array(12), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "2018",
        fill: "start",
        data: [
          8272,
          10340,
          12925,
          16156,
          20195,
          25244,
          31555,
          39444,
          49305,
          61631,
          77039,
          96299
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      }
    ]
  }
};

export default UsersOverview;
