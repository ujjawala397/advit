function top_ten_economy(matches, deliveries,year) {
    const result = {}
    
    let season_ball = []
    let run_per_bowler = {}
    let match = matches.filter(obj => obj.season === year)

    for (let obj of match) {
        for (let del of deliveries) {
            if (obj.id === del.match_id) {
                season_ball.push(del)
            }
        }
    }

    for (let obj of season_ball) {


        let bowler = obj.bowler

        if (result[bowler]) {
            
            if(obj.wide_runs==0 && obj.noball_runs==0){
                result[bowler] += 1
            }
            else{
                result[bowler] += 0
            }

        }
        else {
            if(obj.wide_runs==0 && obj.noball_runs==0){
                result[bowler] = 1
            }
            else{
                result[bowler] = 0
            }
            
        }
    }
    for (let obj of season_ball) {
        let bowler = obj.bowler
        let total_runs = obj.total_runs
        if (run_per_bowler[bowler]) {

            run_per_bowler[bowler] += parseInt(total_runs) 
        }
        else {
            run_per_bowler[bowler] = parseInt(total_runs)
        }
    }
    let final = []
    for (let bowl in result) {
        for (let run in run_per_bowler) {
            if (bowl === run) {
                let semi = []
                let economy = 0
                economy = (run_per_bowler[run] /result[bowl])*6
                let eco=economy.toFixed(2)
                semi.push(run, eco)
                //console.log(semi)
                final.push(semi)

            }

        }
    }

    //return final
     final.sort((f,g)=> f[1] - g[1])
     let score = final.slice(0,10)
     console.log(score)
     let res={}
    for(let i=0;i<score.length;i++)
    {
         
       if(!res[score[i][0]])
       {
           res[score[i][0]]=score[i][1]
       }

    }
   return res
}
module.exports = top_ten_economy;