$(document).ready(function()
 {
    const defaultSessionTime = 25;
    const defaultBreakTime = 5;

    var sessionTime = defaultSessionTime;
    var breakTime = defaultBreakTime;
    var mode = "Session";
    var modeElement = document.getElementById("mode");
    var timer = sessionTime * 60;
    var intervalID = null;

    $('#session .val').val(sessionTime);
	$('#break .val').val(breakTime);
    $('#mode').text(mode);
    $('#timer').text( toTimeString(timer) );

    function toTimeString(seconds)
    {
        let date = new Date(null);
        date.setSeconds(seconds); // overflows for values above 24 hours
        let time = date.toISOString();

        if ( time.substr(11, 2) === "00" )
        {
            time = time.substr(14, 5);
        }
        else
        {
            time = time.substr(11, 8); 
        }
        
        return time;
    }
    
    function decrementTimer()
    {
        if ( timer === 0 )
        {
            if ( mode === "Session" )
            {
                mode = "Break";
                timer = breakTime * 60;
            }
            else // mode === "Break"
            {
                mode = "Session";
                timer = sessionTime * 60;
            }
            
            $('#mode').text(mode);
            setModeElementColor();
        }
        else
        {
            timer -= 1;
        }

        $('#timer').text( toTimeString(timer) );
    }
    
    function setModeElementColor()
    {
        if ( intervalID === null )
        {
            modeElement.style.color = "black";
        }
        else if ( mode === "Session" )
        {
            modeElement.style.color = "limegreen";
        }
        else // mode === "Break"
        {
            modeElement.style.color = "red";
        }
    }
    
    function stop()
    {
        if ( intervalID != null )
        {
            clearInterval(intervalID);
            intervalID = null;
        }

        timer = sessionTime * 60;
        mode = "Session";
        $('#timer').text( toTimeString(timer) );
        $('#mode').text(mode);
        setModeElementColor();
        $('#play_pause i').text("play_arrow");
    }
    
    $('#play_pause').on('click', function()
    {
		if ( intervalID === null )
        {
            // run the specified function every 1000 milliseconds
            intervalID = setInterval(decrementTimer, 1000);
            $('#play_pause i').text("pause");
		}
        else
        {
            // stop calling the function specified in setInterval
            clearInterval(intervalID);
            intervalID = null;
            $('#play_pause i').text("play_arrow");
        }

        $('#timer').text( toTimeString(timer) );
        setModeElementColor();
	});
    
    $('#stop').on('click', stop);

    $('#reset').on('click', function()
    {
        sessionTime = defaultSessionTime;
        breakTime = defaultBreakTime;
        stop();
        $('#session .val').val(sessionTime);
        $('#break .val').val(breakTime);
    });
    
    $('#session .val').on('input', function()
    {
        if ( intervalID === null )
        {
            let value = parseInt($(this).val(), 10);

            if ( value <= 0 || isNaN(value) )
            {
                value = sessionTime;
                $(this).val(sessionTime);
            }
            else if ( value > (23*60) )
            {
                value = 23 * 60; // limit to 23 hours
                $(this).val(value);
            }

            sessionTime = value;
            timer = sessionTime * 60;
            $('#timer').text( toTimeString(timer) );
        }
        else
        {
            $(this).val(sessionTime);
        }
    });
    
    $('#break .val').on('input', function()
    {
        if ( intervalID === null )
        {
            let value = parseInt($(this).val(), 10);

            if ( value <= 0 || isNaN(value) )
            {
                value = breakTime;
                $(this).val(breakTime);
            }
            else if ( value > (23*60) )
            {
                value = 23 * 60; // limit to 23 hours
                $(this).val(value);
            }

            breakTime = value;
        }
        else
        {
            $(this).val(breakTime);
        }
    });
});
