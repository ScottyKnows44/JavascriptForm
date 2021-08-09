const array = [
    {
        question: "Who was 14-0 as the Pittsburgh starting quarterback in 2004?",
        answer: "Ben Roethlisberger",
        category: "Draft",
        points: 100
    }, {
        question: "Who was fined more than $13,000 for his touchdown celebration in a Monday night game?",
        answer: "Marcus Peters",
        category: "Records",
        points: 100
    },  {
        question: "How many yards is the penalty in the NFL for a chop block?",
        answer: "Fifteen Yard Penalty",
        category: "History",
        points: 100
    },  {
        question: "What Super Bowl team included Brown, Sims and Romanowski?",
        answer: "Oakland Raiders",
        category: "Trades",
        points: 100
    },  {
        question: "Who did the Chargers pick in the second round of the 2015 NFL draft?",
        answer: "Denzel Perryman",
        category: "Miscellaneous",
        points: 100
    },  {
        question: "In 2001, Bubba Franks made the NFL Pro Bowl for which team?",
        answer: "Green Bay Packers",
        category: "Draft",
        points: 200
    },  {
        question: "Who was the MVP of Super Bowl XXVI between the Washington Redskins and the Buffalo Bills?",
        answer: "Mark Rypien",
        category: "Records",
        points: 200
    },  {
        question: "Who was the MVP for the Super Bowl game played in February 2014?",
        answer: "Malcolm Smith",
        category: "History",
        points: 200
    },  {
        question: "What are the Cincinnati Bengals' cheerleaders called?",
        answer: "Ben-Gals",
        category: "Trades",
        points: 200
    },  {
        question: "Who coached the Philadelphia Eagles in 2008?",
        answer: "Andy Reid",
        category: "Miscellaneous",
        points: 200
    },  {
        question: "Who was the only Heisman Trophy winner on the Raiders' roster in 2013?",
        answer: "Charles Woodson",
        category: "Draft",
        points: 300
    },  {
        question: "What NFL team had the first pick in the 2017 NFL draft?",
        answer: "Cleveland Browns",
        category: "Records",
        points: 300
    },  {
        question: "Which Raiders kicker made every field goal attempt inside 50 yards in 2012?",
        answer: "Sebastian Janikowski",
        category: "History",
        points: 300
    },  {
        question: "The Colts spend their second and third picks in the 2012 draft on which position?",
        answer: "Tight End",
        category: "Trades",
        points: 300
    },  {
        question: "Vontae Davis led the Dolphins in what category in 2011?",
        answer: "Interceptions",
        category: "Miscellaneous",
        points: 300
    },  {
        question: "How many touchdowns did Philip Rivers throw for in the 2015?",
        answer: "29 TDs",
        category: "Draft",
        points: 400
    },  {
        question: "Which Ravens player had an assault trial in June of 2005?",
        answer: "Terrell Suggs",
        category: "Records",
        points: 400
    },  {
        question: "In the same year as \"Spygate\" what award did head coach of the Patriots Bill Belichick receive?",
        answer: "NFL Coach of the Year Award",
        category: "History",
        points: 400
    },  {
        question: "Which defensive tackle did the Vikings take with their first pick in the 2013 draft?",
        answer: "Sharrif Floyd",
        category: "Trades",
        points: 400
    },  {
        question: "Drew Brees broke which of these quarterback's records of 48 consecutive games with a touchdown?",
        answer: "Johnny Unitas",
        category: "Miscellaneous",
        points: 400
    },  {
        question: "Who became the Giants' new offensive coordinator during the 2014 offseason?",
        answer: "Ben McAdoo",
        category: "Draft",
        points: 500
    },  {
        question: "Which Dolphins player was named an All-Pro in 2012 after accumulating 15 sacks?",
        answer: "Cameron Wake",
        category: "Records",
        points: 500
    },  {
        question: "2012 was the Raiders' first full season after the death of what owner?",
        answer: "Al Davis",
        category: "History",
        points: 500
    },  {
        question: "Who coached the San Francisco 49ers in a blowout win in Super Bowl XXIV?",
        answer: "George Seifert",
        category: "Trades",
        points: 500
    },  {
        question: "Who was the Baltimore Ravens' backup quarterback for Joe Flacco in the 2011 NFL season?",
        answer: "Tyrod Taylor",
        category: "Miscellaneous",
        points: 500
    },         
];
const categoryNames = ["Draft", "Records", "History", "Trades", "Miscellaneous"]

function getQuestion(category, totalPoints){
    return array.filter(function(x) {
       return x.category == categoryNames[category] && x.points == totalPoints 
    });
}

$(document).ready(() =>{
    let count = 0;
    let current = 100;
    while(count <5){

        for(let i=0; i<5;i++){
            let textForCard = getQuestion(i, current);
            
            $("<div class=\"card stylesForCards\" ><div id=\"card" + categoryNames[i]+ textForCard[0].points +  "id\" class=\"card-body\"><p class=\"card-text\">" + current + "</p></div></div>").appendTo("#board").click(() =>{
                if($("#question").children().length < 1 ){
                    $("<p id=\"cardQuestion\" >Question :"  + textForCard[0].question + "</p>").appendTo("#question")
                }
                $("#question-dialog").dialog({
                    width: 400, resizable: false, modal: true, draggable: false,
                    close:() =>{
                        if($("#answer").children().length > 0 ){
                               $("#cardAnswer").remove();   
                        }
                        if($("#question").children().length > 0 ){
                            $("#cardQuestion").remove(); 
                        }
                    },
                    buttons:{
                        "Answer": () => {
                            if($("#answer").children().length < 1){
                                $("<p id=\"cardAnswer\"> Answer: " + textForCard[0].answer + "</p>").appendTo("#answer");
                                console.log("#card" + categoryNames[i]+ textForCard[0].points  + "id");
                                $("#card" + categoryNames[i]+ textForCard[0].points + "id").css({"background-color":"#61ffff"});
                            }
                            
                        }
                    }           
                })
            }); 
        }
        current += 100;
        count += 1;
    }
});