import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";

const Home = ({ smallStats }) => {
  const [loaded, setLoaded] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [rowNames, setRowNames] = useState([]);
  const [labels, setLabels] = useState([]);
  const [users,setUsers] = useState([])
  const [styleData, setStyleData] = useState([]);
  const [colors, setColors] = useState([
    ["rgba(0, 184, 216, 0.1)", "rgb(0, 184, 216)"],
    ["rgba(23,198,113,0.1)", "rgb(23,198,113)"],
    ["rgba(255,180,0,0.1)", "rgb(255,180,0)"],
    ["rgba(255,65,105,0.1)", "rgb(255,65,105)"],
    ["rgb(0,123,255,0.1)", "rgb(0,123,255)"]
  ]);

  useEffect(() => {
    const config = {
      apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
      spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
    };
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${
      config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

    const fetchData = () => {
      try {
        var dataObjects = [];
        var columns = [];
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let fetchedData = data.valueRanges[0].values;
            columns = fetchedData[0];
            columns.map((col, idx) => {
              if(col==='users')
              {
                var x= [
                  fetchedData.map((rw,idc) => {

                    if (idc !== 0) {
                     
                      return rw[idx];
                    }
                    return null
                  })
                ]
                setUsers( x[0].slice(1,x[0].length).map(Number))
              }
              dataObjects.push({
                
                [col]: [
                  fetchedData.map((row, index) => {

                    if (index !== 0) {
                     
                      return row[idx];
                    }
                    return null;
                  })
                ],
                "name":[col]
              });
            });
            setFinalData(dataObjects);
            setLoaded(true);
          });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(
    () => {
      if (finalData.length > 0) {
        // for (const [col, vals] in finalData) {
        const rownames = finalData
          .find(car => car.month)
          ["month"]["0"].filter(el => el != null);
          setRowNames(rownames)
          finalData.map((obj) => {
          
            const sizes=obj[Object.keys(obj)[0]]["0"].filter(el => el != null).length
            setLabels(new Array(sizes).fill(null))
          setStyleData(currentArray => [
            ...currentArray,
            { 
              label: Object.keys(obj)[0].replace(/_/g," "),
              value: obj[Object.keys(obj)[0]]["0"]
                .filter(el => el != null)
                .pop(),
              percentage:
                String(
                  (
                    ((obj[Object.keys(obj)[0]]["0"]
                      .filter(el => el != null)
                      .pop() -
                      obj[Object.keys(obj)[0]]["0"]
                        .filter(el => el != null)
                        .shift()) /
                      obj[Object.keys(obj)[0]]["0"]
                        .filter(el => el != null)
                        .shift()) *
                    100
                  ).toFixed(2)
                ) + "%",
              increase:
                ((obj[Object.keys(obj)[0]]["0"].filter(el => el != null).pop() -
                  obj[Object.keys(obj)[0]]["0"]
                    .filter(el => el != null)
                    .shift()) /
                  (obj[Object.keys(obj)[0]]["0"]
                    .filter(el => el != null)
                    .pop() +
                    obj[Object.keys(obj)[0]]["0"]
                      .filter(el => el != null)
                      .shift())) *
                  100 >
                0,
              chartLabels: rowNames,
              attrs: {
                md: "2",
                sm: "2"
              },
              datasets: [
                {
                  label: "Last Month",
                  fill: "start",
                  borderWidth: 1.5,
                  backgroundColor: colors[Math.floor(Math.random() * 4)][0],
                  borderColor: colors[Math.floor(Math.random() * 4)][1],
                  data: obj[Object.keys(obj)[0]]["0"].filter(el => el != null)
                }
              ]
            }
          ]);
        });
      }
      // }
    },
    [loaded]
  );

  return (
    <Container fluid className="main-content-container px-4">
      {" "}

      {/* Page Header */}{" "}
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Blog Overview Last Month"
          subtitle="Dashboard"
          className="text-sm-left mb-3"
        />
      </Row>
      {/* Small Stats Blocks */}{" "}
      <Row>
        {" "}
        {finalData.length > 0
          ? styleData.map((stats, idx) => (
              <Col className="text-sm col-lg mb-4" key={idx} {...stats.attrs}>
                <SmallStats
                  id={`small-stats-${idx}`}
                  variation="1"
                  chartData={stats.datasets}
                  chartLabels={labels}
                  label={stats.label}
                  value={stats.value}
                  percentage={stats.percentage}
                  increase={stats.increase}
                  decrease={stats.decrease}
                />{" "}
              </Col>
            ))
          : ""}{" "}
      </Row>
      <Row>
        {" "}
        {console.log(users)}
        {/* Users Overview */}{" "}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <UsersOverview userData={users} />
        </Col>
        {/* Users by Device */}{" "}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <UsersByDevice />
        </Col>
        
      </Row>{" "}
    </Container>
  );
};



export default Home;
