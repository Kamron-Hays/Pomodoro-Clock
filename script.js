$(document).ready(function()
 {
    var sessionTime = 25;
    var breakTime = 5;

    $('#mode').text('Session');
    $('#timer').text(sessionTime);
    $('#session .val').val(sessionTime);
	$('#break .val').val(breakTime);

    $('#session .val').on('input', function()
    {
        let value = parseInt($(this).val(), 10);

        if ( value <= 0 || isNaN(value) )
        {
            value = sessionTime;
            $(this).val(sessionTime);
        }
        
        $('#timer').text(value);
        sessionTime = value;
    });
});
