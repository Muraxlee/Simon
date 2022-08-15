
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gp = [];
var level = 1;
var w = 0;
var wb = 0;
function pushgp(ar)
{
    for(var i=0;i<ar.length;i++)
    {
        gp.push(ar[i]);
    }
}
$(document).keydown(function() {
   if(w === 0)
   {
        setTimeout(function(){
            w=1;
            gamePattern = [];
            nextSequence();
            pushgp(gamePattern);
            $("#level-title").text("Level "+ level);
        }, 100);
   }
});

$(".btn").click(function (){

    
    var elmId = $(this).attr("id");
    w=1;
   
        $("#"+elmId).addClass("pressed");

        sounds(elmId);

        $(document).ready(function(){setTimeout(function(){

            $("#"+elmId).removeClass("pressed");

            }, 100);
        });

    if(wb === 0)
    {
        if(elmId == gp.shift())
        {
            game();        
        }
        else
        {
            wb=1;
            worng();
        }
    }
    else
    {
        $("#"+elmId).addClass("pressed");
        sounds("wrong");
        $(document).ready(function(){setTimeout(function(){

            $("#"+elmId).removeClass("pressed");

            }, 100);
        });

        $("body").css({"background-color": "red"});

        $(document).ready(function(){setTimeout(function(){

            $("body").css({"background-color": "#011F3F"});

            }, 100);
        });
    }
}); 

function worng()
{
    
    $("body").css({"background-color": "red"});
    $(document).ready(function(){setTimeout(function(){

        $("body").css({"background-color": "#011F3F"});

        }, 100);
    });
    gamePattern = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");
    sounds("wrong");
    
    $(document).keydown(function() {
        setTimeout(function(){
            if(!(wb === 0))
            {
                wb = 0;
                level = 1;
                gamePattern = [];
                nextSequence();
                pushgp(gamePattern);
                $("#level-title").text("Level "+ level);
            }
        }, 500);
    });
    
}

function game(){

   if(gp.length === 0)
   {
        level++;
        $("#level-title").text("Level "+ level);
       setTimeout(function(){
                nextSequence();
                pushgp(gamePattern);
        }, 1000);
        
   }

}


function nextSequence(){

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).addClass("pressed");

    sounds(randomChosenColour);

    $(document).ready(function(){setTimeout(function(){

        $("#"+randomChosenColour).removeClass("pressed");

        }, 100);
    });
}

function sounds(colour){
    var audio = new Audio("sounds/"+ colour + ".mp3");
    audio.play();  
}

