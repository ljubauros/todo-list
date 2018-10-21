$(document).ready(function() {

    var finished = $("#finished-check")[0].checked, inprogress = $("#inprogress-check")[0].checked;
    var finishedtr = $(".todo-finished"), inprogresstr = $(".todo-inprogress");
    function logic(){
        if(finished === inprogress){
            finishedtr.fadeIn(300);
            inprogresstr.fadeIn(300);
        }
        else if(finished){
            finishedtr.fadeIn(300);
            inprogresstr.fadeOut(300);
        }
        else{
            finishedtr.fadeOut(300);
            inprogresstr.fadeIn(300);
        }
    }
    logic();
    $("#finished-check").change(function(){
        finished = this.checked;
        logic();
    });
    $("#inprogress-check").change(function(){
        inprogress = this.checked;
        logic();
    });
});