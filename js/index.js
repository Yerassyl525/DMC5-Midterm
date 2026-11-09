$(document).ready(function() {

    $(".faq-answer").hide();

    $(".faq-question").click(function() {
        $(this).next(".faq-answer").stop(true, true).slideToggle();
    });

    $(".faq-item").hover(
        function() {
            $(this).addClass("faq-hover");
        },
        function() {
            $(this).removeClass("faq-hover");
        }
    );

});