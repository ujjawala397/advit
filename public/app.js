function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchWin(data.matchWin);
  visualizeExtrarun(data.Extrarun);
  visualizeBowlerEco(data.bowlerEco);
  visualizeWinVenue(data.WinVenue);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}



function visualizeMatchWin(matchWin){
  const finalResult = [];
  const team = [];
  const season = Object.keys(matchWin).map((season)=>season);
  for(let i=0;i<season.length;i++)
  {
    team.push(Object.keys(matchWin[season[i]]));
  }
  const teams = [...new Set([].concat.apply([],team))]
  console.log(teams)
  for(let i in teams){
     let tempArr = []
      for(let j in season){
        
        if(matchWin[season[j]].hasOwnProperty(teams[i]))
          tempArr.push(matchWin[season[j]][teams[i]])
          else tempArr.push(0)
       }
     finalResult.push({name:teams[i],data:tempArr});

  }
   Highcharts.chart("match-win", {
    chart: {
      renderTo: 'match-win',
      type: "column"
    },
    title: {
      text: "Matches Won"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      categories:[...season],
      crosshair: true
    
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches won vs stadium"
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: .2,
          borderWidth: 0
      }
  },
  series:finalResult
  
  });
}
function visualizeExtrarun(Extrarun) {
  const seriesData = [];
  for (let key in Extrarun) {
    seriesData.push([key,Extrarun[key]]);
  }
Highcharts.chart("Extra-run", {
  chart: {
    type: "column"
  },
  title: {
    text: "Extra run for 2016"
  },
  subtitle: {
    text:
      'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
  },
  xAxis: {
    type: "category",
    labels: {
      rotation: -45,
      style: {
          fontSize: '15px',
          fontFamily: 'Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: "Extra Runs"
    }
  },
  legend: {
      enabled: !1
  },
  tooltip: {
      pointFormat: 'Extra runs: <b>{point.y:0.1f} </b>'
  },
  series: [{
  name:"bowlers",   
  data: seriesData,
  dataLabels: {
      enabled: !0,
      rotation: 0,
      color: "#FFFFFF",
      align: "center",
      y: 25,
      style: {
          fontSize: "15px",
          fontFamily: "Verdana, sans-serif"
      }
  }
}]
});

}
function visualizeBowlerEco(bowlerEco) {
  const seriesData = [];
  for (let key in bowlerEco) {
    seriesData.push([key,parseFloat(bowlerEco[key])]);
  }
  Highcharts.chart("bowler-Eco", {
      chart: {
        type: "column"
      },
      title: {
        text: "Top economical bowlers in 2015"
      },
      subtitle: {
        text:
          'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          pointInterval:.20,
          style: {
              fontSize: '15px',
              fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Economy"
        }
      },
      legend: {
          enabled: !1
      },
      tooltip: {
          pointFormat: 'Top economical bowlers in 2015: <b>{point.y:0.1f} </b>'
      },
      series: [{
      name:"bowlers",   
      data: seriesData,
      dataLabels: {
          enabled: !0,
          rotation: 0,
          color: "#FFFFFF",
          align: "center",
          y: 25,
          style: {
              fontSize: "15px",
              fontFamily: "Verdana, sans-serif"
          }
      }
    }]
    });
  

}
function visualizeWinVenue(WinVenue) {
  const finalResult = [];
  const team = [];
  const matchAvenue = Object.keys(WinVenue).map((avenue)=>avenue);
  console.log(matchAvenue,"matchAvenue")
  for(let i=0;i<matchAvenue.length;i++)
  {
    team.push(Object.keys(WinVenue[matchAvenue[i]]));
  }
  const teams = [...new Set([].concat.apply([],team))]
  
  
 
  const seriesData = [];
  teams.forEach(team => {
      let winCounts = [];
      for(let i=0; i < matchAvenue.length; i++) { 
          const avenueData = WinVenue[matchAvenue[i]];
          const teamWinsAtAvenue = avenueData[team] || 0;
          winCounts.push(teamWinsAtAvenue);
      }
      const teamWins = {name: team, data: winCounts};
      seriesData.push(teamWins);
  });

  const config = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Stacked bar chart'
      },
      xAxis: {categories: matchAvenue},
      yAxis: {
          min: 0,
          title: {
              text: 'Matches Won Vs Stadium'
          }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: seriesData
  };

  console.log(seriesData,"seriesData");
  Highcharts.chart('container', config);
  console.log(Highcharts.chart);
}

function VisualizeEconomicBowler(){
  
  
  var year=document.getElementById('year').value
  console.log(year)
  let url = "/economy?year=" + year
  fetch(url)
     .then(r=>r.json())
     .then(visulazietopTen)

}

function visulazietopTen(data) {

    const seriesData = []

    for (let year in data['top_ten_econom']) {
      seriesData.push([year,parseFloat(data['top_ten_econom'][year])]);
    } 
    Highcharts.chart("top-economical",{
     chart: {
       type:'column'
      },
      title: {
        text: "Top economical bowlers in  year" +" "+data['year']
      },
      subtitle: {
        text:
          'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          pointInterval:.20,
          style: {
              fontSize: '15px',
              fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Economy"
        }
      },
      legend: {
          enabled: !1
      },
      tooltip: {
          pointFormat: 'Top economical bowlers in : <b>{point.y:0.1f} </b>'
      },
      series: [{
      name:"bowlers",   
      data: seriesData,
      dataLabels: {
          enabled: !0,
          rotation: 0,
          color: "#FFFFFF",
          align: "center",
          y: 25,
          style: {
              fontSize: "15px",
              fontFamily: "Verdana, sans-serif"
          }
      }
  }]
  });
};




