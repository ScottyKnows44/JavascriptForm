const array = [
    {
        question: "What month is the NFL draft?",
        answer: "April",
        category: "Draft",
        points: 100,
        answered: false
    }, {
        question: "Which QB holds the record for most Superbowl wins?",
        answer: "Tom Brady",
        category: "Records",
        points: 100,
        answered: false
    },  {
        question: "Who won the First SuperBowl?",
        answer: "Green Bay Packers",
        category: "History",
        points: 100,
        answered: false
    },  {
        question: "Philladelphia traded away this superbowl MVP in March of 2015",
        answer: "Nick Foles",
        category: "Trades",
        points: 100,
        answered: false
    },  {
        question: "Who did the Chargers pick in the second round of the 2015 NFL draft?",
        answer: "Denzel Perryman",
        category: "Miscellaneous",
        points: 100,
        answered: false
    },  {
        question: "Who is the most recent first overall pick to win Rookie of the Year?",
        answer: "Cam Newton",
        category: "Draft",
        points: 200,
        answered: false
    },  {
        question: "The 2007 New England Patriots had a perfect regular season, only to lose Super Bowl XLII to which team?",
        answer: "New York Giants",
        category: "Records",
        points: 200,
        answered: false
    },  {
        question: "Which team lost 4 back to back SuperBowls from 1991-94?",
        answer: "Buffilo Bills",
        category: "History",
        points: 200,
        answered: false
    },  {
        question: "After being drafted, which team traded Eli Manning to the Giants in 2004",
        answer: "San Diego Chargers",
        category: "Trades",
        points: 200,
        answered: false
    },  {
        question: "Who coached the Philadelphia Eagles in 2008?",
        answer: "Andy Reid",
        category: "Miscellaneous",
        points: 200,
        answered: false
    },  {
        question: "The Falcons traded three picks and a player to the Chargers in 2001 for a first-round pick. Which player did they draft?",
        answer: "Michael Vick",
        category: "Draft",
        points: 300,
        answered: false
    },  {
        question: "Who was the first player in history to catch 15,000 passing yards in their career?",
        answer: "Jerry Rice",
        category: "Records",
        points: 300,
        answered: false
    },  {
        question: " Which state was the original home of the Arizona Cardinals?",
        answer: "Chicago",
        category: "History",
        points: 300,
        answered: false
    },  {
        question: "The Saints traded their whole 1998 draft and next years 1st round pick for which player",
        answer: "Ricky Williams",
        category: "Trades",
        points: 300,
        answered: false
    },  {
        question: "Vontae Davis led the Dolphins in what category in 2011?",
        answer: "Interceptions",
        category: "Miscellaneous",
        points: 300,
        answered: false
    },  {
        question: "Who did the San Francisco 49ers trade with on draft day in 1985 to acquire Jerry Rice?",
        answer: "New England Patriots",
        category: "Draft",
        points: 400,
        answered: false
    },  {
        question: "Which running back had the most touchdowns in one season?",
        answer: "Emmitt Smith",
        category: "Records",
        points: 400,
        answered: false
    },  {
        question: "What year was Houston Oilers last season in the NFL",
        answer: "1996",
        category: "History",
        points: 400,
        answered: false
    },  {
        question: "San Diego Chargers Traded away 2 first round picks, a second round pick, and 2 players to Select this NFL Bust?",
        answer: "Ryan Leaf",
        category: "Trades",
        points: 400,
        answered: false
    },  {
        question: "Drew Brees broke which of these quarterback's records of 48 consecutive games with a touchdown?",
        answer: "Johnny Unitas",
        category: "Miscellaneous",
        points: 400,
        answered: false
    },  {
        question: "Who is the last defensive player taken No. 1 in the NFL Draft to be inducted into the Pro Football Hall of Fame?",
        answer: "Bruce Smith. The Bills selected Bruce Smith with the No. 1 pick in 1985. Smith was inducted into the Pro Football Hall of Fame in 2009.",
        category: "Draft",
        points: 500,
        answered: false
    },  {
        question: "Before even joining the NFL, I took Washington to a Pac-8 title. I was the 1978 Rose Bowl MVP, then a CFL MVP in 1983. Although I played for the Vikings, Seahawks, and Chiefs, I made my name in Houston for 10 seasons. I set a record for making eight consecutive Pro Bowl appearances for a quarterback. I was also the first quarterback to complete 400 passes in a season. After 17 seasons, I finally retired in 2000. Who am I?",
        answer: "Warren Moon",
        category: "Records",
        points: 500,
        answered: false
    },  {
        question: "In 1964, this Minnesota Viking great ran a fumble all the way to the end zone, but it was the wrong one causing a saftey!",
        answer: "Jim Marshall",
        category: "History",
        points: 500,
        answered: false
    },  {
        question: "After being drafted by the Buccaneers, two years later this future Hall of Famer was traded to San Franciso in 1987 for a second, and fourth round pick to be a back-up.",
        answer: "Steve Young",
        category: "Trades",
        points: 500,
        answered: false
    },  {
        question: "Who was the Baltimore Ravens' backup quarterback for Joe Flacco in the 2011 NFL season?",
        answer: "Tyrod Taylor",
        category: "Miscellaneous",
        points: 500,
        answered: false
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
    let score = 0;
    while(count <5){

        for(let i=0; i<5;i++){
            let textForCard = getQuestion(i, current);
            $("<div class=\"card stylesForCards\" ><div id=\"card" + categoryNames[i]+ textForCard[0].points +  "id\" class=\"card-body\"><p class=\"card-text\">" + current + "</p></div></div>").appendTo("#board").click(() =>{
                
                if( $("#card" + categoryNames[i]+ textForCard[0].points + "id").css("background-color") !== "rgb(97, 255, 255)"){
                    if($("#question").children().length < 1 ){
                        $("<p id=\"cardQuestion\" >Question: "  + textForCard[0].question + "</p>").appendTo("#question")
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
                            $("#guess").val("");
                        },
                        buttons:{
                            "Answer": () => {
                                let guess = $("#guess").val(); 
                                
                                if($("#answer").children().length < 1){
                                    if($.trim(guess.toLowerCase()) === textForCard[0].answer.toLowerCase()){
                                        $("<p id=\"cardAnswer\"> Correct! the answer is, " + textForCard[0].answer + "</p>").appendTo("#answer");
                                        $("#card" + categoryNames[i]+ textForCard[0].points + "id").css({"background-color":"#61ffff"});
                                        score += textForCard[0].points;
                                        $("#score").html("Score: " + score);
                                        array[arrayTracker].answered = true;
                                    
                                    } else{
                                        $("<p id=\"cardAnswer\"> That is incorrect! the answer is, " + textForCard[0].answer + "</p>").appendTo("#answer");
                                        $("#card" + categoryNames[i]+ textForCard[0].points + "id").css({"background-color":"#61ffff"});
                                        score -= textForCard[0].points;
                                        $("#score").html("Score: " + score);
                                        array[arrayTracker].answered = true;
                                    }
                                }             
                            }
                        }           
                    })
                }
                
            }); 
        }
        current += 100;
        count += 1;
    }
    $("#score").html("Score: " + score);

});