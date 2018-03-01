$(function(){
  $("#phone").mask("+7(999) 999-99-99");
  $("#payphone").mask("+7(999) 999-99-99");
});
$('a.page-scroll').bind('click', function(event) {
    var currentScroll = $('#body-container').scrollTop();
    var $anchor = $(this);
    var targetHeight = $($anchor.attr('href')).offset().top;
    if(targetHeight != 0){
        $('#body-container').stop().animate({
            scrollTop: (currentScroll + targetHeight - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    }
    else{
        $('#body-container').stop().animate({
            scrollTop: (0)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    }
});
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
function HideWeekDays(){
    $('.week-days button').removeClass('active');
}
$('.week-days button').click(function(e){
    HideWeekDays();
    $(this).addClass('active');
    var i = $('.week-days button').index($(this));
    ShowCalendarColumn(i);
});
$('.try-button').click(function(e){
    ShowApply();
});
function ShowCalendarColumn(param){
    $('.mobile .col-rest .col-140').removeClass('active')
    $('#line_mobile_1 .col-140:nth-child('+(param+1)+')').addClass('active');
    $('#line_mobile_2 .col-140:nth-child('+(param+1)+')').addClass('active');
    $('#line_mobile_3 .col-140:nth-child('+(param+1)+')').addClass('active');
}
function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
}
var currentDate = new Date(),
    currentMonday = getMonday(currentDate);
var WeekCount = 0;
var SelectedWeek = 0;
var SelectedDay = 0;
var DayCount = 0;
var IsSelected = false;
var calendarContainer = $('#calendar_container');
var selectedDate = currentDate;
var output = '';
var metro_stations = [];
metro_stations[1]='Достоевская';
metro_stations[2]='Кузнецкий мост';
metro_stations[3]='Октябрьская';
var selectedStation = '';
function getPath(param){
    var rightArrowParents = [],
    elm,
    start = document.querySelector(param);
    entry;
    for (elm = this; elm; elm = elm.parentNode) {
    entry = elm.tagName.toLowerCase();
    if (entry === "html") {
      break;
    }
    if (elm.className) {
      entry += "." + elm.className.replace(/ /g, '.');
    }
    rightArrowParents.push(entry);
  }
  rightArrowParents.reverse();
  alert(rightArrowParents.join(" "));
  return false;
}
function removeClass(obj, cls) {
  var classes = obj.className.split(' ');

  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) {
      classes.splice(i, 1); // удалить класс
      i--; // (*)
    }
  }
  obj.className = classes.join(' ');

}
function UnMarkAll(){
    var lines = $('.events').toArray();
    var buttons = $('.time-container button').toArray();
    var stations = $('.calendar .row.stations').toArray();
    $.each(lines,function(index,value){
        $(this).removeClass('active');  
    });
    $.each(buttons,function(index,value){
        $(this).removeClass('active');  
    });
    $.each(stations,function(index,value){
        $(this).removeClass('active');  
    });
}
//function FindButton(day, metroId, timeCount){
//    UnMarkAll();
//    var allButtons = $('.time-container').toArray();
//    for(var i=0;i<allButtons.length;i++){
//        var stringday = day+'';
//        var stringMetro = metroId + '';
//        if(((allButtons[i].dataset.day+'') == stringday)&&((allButtons[i].dataset.metroId+'') == stringMetro)){
//            allButtons[i].children[timeCount].classList+=' active';
//            document.querySelector('line_'+metroId).classList+=' active';
//        }
//    }
//    $.each(allButtons,function(index,value){
//        if((($(this).data('day')+'') == (day+''))&&(($(this).data('metroId')+'') == (metroId+''))){
//            $(this).children()[timeCount].addClass('active');
//            $('#line_'+metroId).addClass('active');
//        }
//    });
//}
var activeButton = null;
var activeLine = null;
function OpenCalendarWidthSelect(day, metroId, time, timeCount){
    SelectDate(day, metroId, time, timeCount);
    HideApply();
    OpenCalendar();
}
function SelectDate(day, metroId, time, timeCount){
    ShowCalendarColumn(day);
    IsSelected = true;
    SelectedDay = day;
    SelectedWeek = WeekCount;
    UnMarkAll();
    var neededId=''+day+'-'+metroId+'-'+timeCount;
    var neededId_mobile='m'+day+'-'+metroId+'-'+timeCount;
    $('#'+neededId).addClass('active');
    $('#'+neededId_mobile).addClass('active');
    $('#line_'+metroId).addClass('active');
    $('.calendar-container .row.stations:nth-child('+metroId+')').addClass('active');
    $('#line_mobile_'+metroId).addClass('active');
    HideWeekDays();
    $('.week-days .col-140:nth-child('+(day+1)+') button').addClass('active');
    ShowCalendarColumn(day);
    var date = document.querySelectorAll('.calendar .date')[day].innerText;
    var dayOfWeek = document.querySelectorAll('.calendar .day')[day].innerText;
    selectedStation = metro_stations[metroId];
    output = date + ' ' + dayOfWeek.toUpperCase() + ' ' + time;
    HideCalendar();
    ShowApply();
    $("#date-set").val(output);
    activeButton = document.querySelector('.time-container button.active');
    activeButtonMobile = document.querySelector('.col-rest .time-container button.active');
    activeLine = document.querySelector('.calendar .events.active');
    activeLineMobile = document.querySelector('.calendar .col-rest .events.active');
    activeSubLineMobile = document.querySelector('.calendar .row.stations.active');
}
function CheckSelectedWeek(){
    if(IsSelected){
        if(WeekCount!=SelectedWeek){
            removeClass(activeButton, 'active');
            removeClass(activeButtonMobile, 'active');
            removeClass(activeLine, 'active');
            removeClass(activeLineMobile, 'active');
            removeClass(activeSubLineMobile, 'active');
        }
        else if(activeButton.className == null || activeButton.className == ''){
            activeButton.className='active';
            activeButtonMobile.className='active';
            activeLine.classList+=' active';
            activeLineMobile.classList+=' active';
            activeSubLineMobile.classList+=' active';
        }
    }
}
function NextWeek(){
    calendarContainer.addClass('slideLeft');
    calendarContainer.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    function(e) {
        WeekCount++;
        FillDates(WeekCount);
        calendarContainer.removeClass('slideLeft');
        calendarContainer.addClass('slideInLeft');
        calendarContainer.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
        function(e) {
            calendarContainer.removeClass('slideInLeft');
        });
        CheckSelectedWeek();
    });
}
function PreviousWeek(){
    calendarContainer.addClass('slideRight');
    calendarContainer.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    function(e) {
        WeekCount--;
        FillDates(WeekCount);
        calendarContainer.removeClass('slideRight');
        calendarContainer.addClass('slideInRight');
        calendarContainer.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
        function(e) {
            calendarContainer.removeClass('slideInRight');
        });
        CheckSelectedWeek();
    });
}
function FillDates(param){
    var date_boxes = document.querySelectorAll('.calendar .desktop .date');
    var date_boxes_mobile = document.querySelectorAll('.calendar .mobile .date');
    var date_variable = currentMonday.addDays(param*7-1);
    for(var i=0; i<date_boxes.length; i++){
        date_variable = date_variable.addDays(1);
        var dd = date_variable.getDate();
        var mm = date_variable.getMonth() + 1;
        if(mm<10){
            var FormattedDate = dd + '.' + '0' + mm;
        }
        else{
            var FormattedDate = dd + '.' + mm;
        }
        date_boxes[i].innerText = FormattedDate;
        date_boxes_mobile[i].innerText = FormattedDate;
    }
}
function CheckEmptyCalendar(){
    var filled_columns = document.querySelectorAll('.events .col-140 button');
    for(var i=0; i<filled_columns.length; i++){
        if(filled_columns[i].innerText!=""){
            filled_columns[i].parentElement.parentElement.parentElement.classList="col col-140 exist";
        }
    }
    //var existing_divs = document.querySelectorAll('.col-140 .time-container');
//    for(var i=0;i<existing_divs.length;i++){
//        var children = existing_divs[i].children;
    $('.time-container button').each(function(){
        var parent = $(this).parent('div');
        //var div_height = parent.height() - 1;
        var div_height = 70;
        var parentCount = $(this).siblings().length + 1;
        $(this).css('lineHeight', (div_height / parentCount) + "px");
        if(parentCount>1){
            $(this).css('lineHeight', (div_height / parentCount - 1) + "px");
        }
        switch (parentCount){
            case 3:
                //$(this).css('lineHeight', (div_height / parentCount) + "px");
                $(this).css('fontSize', '16px');
                break;
       }
        if(parentCount>3){
            $(this).css('fontSize', '14px');
            $(this).css('lineHeight', '18px');
            parent.css('overflow', 'visible');
        }
    });
    //}
}
function ChooseLearn(param){
    var container = $('#learn');
    var classic_button= $('#classic-button');
    var beach_button= $('#beach-button');
    var tournir_button= $('#tournir-button');
    container.addClass(param);
    switch(param){
        case 'classic':
            classic_button.addClass('active');
            beach_button.removeClass('active');
            tournir_button.removeClass('active');
            container.removeClass('beach');
            container.removeClass('tournir');
            break;
        case 'beach':
            classic_button.removeClass('active');
            beach_button.addClass('active');
            tournir_button.removeClass('active');
            container.removeClass('classic');
            container.removeClass('tournir');
            break;
        case 'tournir':
            classic_button.removeClass('active');
            beach_button.removeClass('active');
            tournir_button.addClass('active');
            container.removeClass('beach');
            container.removeClass('classic');
            break;
    }
}
function ChooseArena(param){
    var container = $('#home_arenas');
    var kuznec_button= $('#kuznecky-button');
    var dostoevskaya_button= $('#dostoevskaya-button');
    var oktyabrskaya_button= $('#oktyabrskaya-button');
    container.addClass(param);
    switch(param){
        case 'kuznecky':
            kuznec_button.addClass('active');
            dostoevskaya_button.removeClass('active');
            oktyabrskaya_button.removeClass('active');
            container.removeClass('dostoevskaya');
            container.removeClass('oktyabrskaya');
            break;
        case 'dostoevskaya':
            kuznec_button.removeClass('active');
            dostoevskaya_button.addClass('active');
            oktyabrskaya_button.removeClass('active');
            container.removeClass('kuznecky');
            container.removeClass('oktyabrskaya');
            break;
        case 'oktyabrskaya':
            kuznec_button.removeClass('active');
            dostoevskaya_button.removeClass('active');
            oktyabrskaya_button.addClass('active');
            container.removeClass('dostoevskaya');
            container.removeClass('kuznecky');
            break;
    }
}
function HidePayApply(){
    $('#pay').css('display', 'none');
    $('#pay').css('opacity', '0');
    //$('#apply').addClass("disappearToBottom");
}
function HideApply(){
    $('#apply').css('display', 'none');
    $('#apply').css('opacity', '0');
    //$('#apply').addClass("disappearToBottom");
}
function ShowPayApply(sum){
    //$('#apply').addClass("appearFromBottom");
    $('#pay').css('display', 'block');
    $('#pay').css('opacity', '1');
    $('#pay').find('#sum').val(sum);
}
function ShowApply(){
    //$('#apply').addClass("appearFromBottom");
    $('#apply').css('display', 'block');
    $('#apply').css('opacity', '1');
}
function HideCalendar(){
    $('#calendar').css('display', 'none');
    $('#calendar').css('opacity', '0');
    //$('#apply').addClass("disappearToBottom");
}
function OpenCalendar(){
    WeekCount = SelectedWeek;
    CheckSelectedWeek();
    FillDates(WeekCount);
    //$('#apply').addClass("appearFromBottom");
    $('#calendar').css('display', 'block');
    $('#calendar').css('opacity', '1');
}
var lavel_value = 0;
function SelectLevel(param){
    var level = $('#level');
    var level_select = $('#hidden_select');
    lavel_value = param;
    switch(param){
        case 1:
            level_select.val('Начальный');
            level.text("начальный");
            break;
        case 2:
            level_select.val('Средний');
            level.text("средний");
            break;
        case 3:
            level_select.val('Продвинутый');
            level.text("продвинутый");
            break;
    }
}
function HideForm() {
    $("#form-area").hide();
}
function ShowFailure() {
    $('#message-area').html("<div class='alert alert-danger'><strong>Ошибка!</strong>Не удалось подключиться к серверу, поэтому ваше сообщение не было отправилено. Пожалуйста, проверьте ваше подключение к сети и попробуйте еще раз</div>");
}
//$(window).scroll(function () {
//    var windowScroll = window.pageYOffset;
//    var servicesScroll = $("#services").offset().top;
//    /*var examplesScroll = $("#examples").offset().top;*/
//    var contactScroll = $("#contact").offset().top;
//    if (windowScroll >= servicesScroll - 60) {
//        $("#moreId").removeClass('active');
//    }
//    else {
//        $("#moreId").addClass('active');
//    }
//    if (windowScroll >= servicesScroll - 60 && windowScroll <= contactScroll - 60) {
//        $("#servicesId").addClass('active');
//    }
//    else {
//        $("#servicesId").removeClass('active');
//    }
//    /*if (windowScroll >= examplesScroll - 60 && windowScroll <= contactScroll - 60) {
//        $("#examplesId").addClass('active');
//    }
//    else {
//        $("#examplesId").removeClass('active');
//    }*/
//    if (windowScroll >= contactScroll - 60) {
//        $("#contactId").addClass('active');
//    }
//    else {
//        $("#contactId").removeClass('active');
//    }
//});
$(document).ready(function () {
    CheckEmptyCalendar();
    FillDates(0);
    ShowCalendarColumn(0);
//    $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );
//    $( "#datepicker" ).datepicker({
//        closeText: 'Закрыть',
//        prevText: '',
//        currentText: 'Сегодня',
//        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
//            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
//        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
//            'Июл','Авг','Сен','Окт','Ноя','Дек'],
//        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
//        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
//        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
//        weekHeader: 'Не',
//        dateFormat: 'dd.mm.yy',
//        firstDay: 1,
//        isRTL: false,
//        showMonthAfterYear: false,
//        yearSuffix: ''
//    });
    ChooseLearn('classic');
    ChooseArena('kuznecky');
    if ($(window).innerWidth() >= 1366) {
        var a = $(window).innerHeight() - $('.heading').innerHeight();
        $('.main-image').css('height', a + 'px');
        $('.main-image').css('max-width', '100%');
    }
});
$(window).resize(function () {
    if ($(window).innerWidth() >= 1366) {
        var a = $(window).innerHeight() - $('.heading').innerHeight();
        $('.main-image').css('height', a + 'px');
        $('.main-image').css('max-width', '100%');
    }
});