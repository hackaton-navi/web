import BasePage from "../../components/BasePage";
import _Plot from "../../components/Plotly/Plot"
import _Slider from "../../components/Slider"

import * as React from 'react';


var data=[
  {
    x: [1, 2, 3],
    y: [2, 6, 3],
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: 'red'},
  }
];
var layout = {
  title: 'Title',
	xaxis:{title: 'X AXIS'},
	yaxis:{title: 'Y AXIS'},
	zaxis:{title: 'Z AXIS'},
};

const Home = () => {
  const [valueMin, setValueMin] = React.useState([10, 30]);
  const [valueMed, setValueMed] = React.useState([40, 60]);
  const [valueMax, setValueMax] = React.useState([70, 90]);

  return (
    <BasePage title="Home">
    <div className="row">
      <div className="col-6">
        <h3>Rentabilidade por faixa de Score</h3>
        <_Plot
        data={data}
        layout={layout}
        />
        <div className="row">
          <div className="col-3">
            <p>Maiores Scores</p>
            <_Slider value={valueMax} setValue={setValueMax}/>
          </div>
          <div className="col-3">
            <p>Médios Scores</p>
            <_Slider value={valueMed} setValue={setValueMed}/>
          </div>
          <div className="col-3">
            <p>Menores Scores</p>
            <_Slider value={valueMin} setValue={setValueMin}/>
          </div>
        </div>
      </div>
      <div className="col-6">
        <h3>Rentabilidade por faixa de Score</h3>
        <_Plot
        data={data}
        layout={layout}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-6">
        <h3>Rentabilidade por faixa de Score</h3>
        <_Plot
        data={data}
        layout={layout}
        />
      </div>
      <div className="col-6">
        <h3>Rentabilidade por faixa de Score</h3>
        <_Plot
        data={data}
        layout={layout}
        />
      </div>
    </div>

    </BasePage>
  );
};

export default Home;
