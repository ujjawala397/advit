function Extrarun(matches, deliveries) {
    let result = {}
    let arr = []
    let arr1 = []
    let sum = 0;
    let arr2 = []
    console.log(deliveries.slice(0, 5))
  
    let numid = matches.filter(match => match.season === "2016")
    //let eid = numid.map(obj=>obj.id)
    let ids = numid.map(obj => obj.id)
  
    let match_id = deliveries.map(obj => obj.match_id)
  
    let fed_id = [...new Set(match_id)]
    let abc = []
  
    for (let i of ids) {
      for (let j of fed_id) {
        if (i === j) {
          abc.push(j)
        }
      }
    }
    for (let obj of deliveries) {
      for (let i of abc) {
        if (obj.match_id === i) {
          arr1.push(obj)
        }
      }
    }
    for (let ar of arr1) {
      if (result[ar.bowling_team]) {
        result[ar.bowling_team] += parseInt(ar.extra_runs)
      }
      else {
        result[ar.bowling_team] = parseInt(ar.extra_runs)
      }
    }
    return result
  }
  module.exports = Extrarun;
  