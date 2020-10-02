function WinVenue(matches) {
    const result = {};
    for (let match of matches) {
      const winner = match.winner;
      const venue = match.venue
      if(result[venue])
      {
        if(result[venue][winner])
        {
          result[venue][winner]+=1
        }
        else{
          result[venue][winner]=1
        }
      }
      else{
        result[venue]={}
        result[venue][winner]=1
      }
    }
    return result
  }
  
  module.exports = WinVenue;
  