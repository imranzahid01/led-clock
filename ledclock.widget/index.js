command: "echo Hello World! ",
refreshFrequency: 1000,

render: function () {
  return "\
  <div class=\"clock-container\">     \
    <div class=\"clock\">             \
      <div class=\"digit hours\">     \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
      </div>                          \
                                      \
      <div class=\"digit hours\">     \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
      </div>                          \
                                      \
      <div class=\"seperator\">       \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
      </div>                          \
                                      \
      <div class=\"digit minutes\">   \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
      </div>                          \
                                      \
      <div class=\"digit minutes\">   \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
        <div class=\"segment\"></div> \
      </div>                          \
    </div>                            \
  </div>";
},

style: "                                  \n\
  bottom: 1px                             \n\
  left: 1350px                            \n\
  font-family: Helvetica Neue             \n\
  font-size: 11px                         \n\
  color: #fff                             \n\
                                          \n\
  .clock-container                        \n\
    border-radius: 10px                   \n\
    background: rgba(#000, 0.7)           \n\
    padding-top: 3px                      \n\
    padding-bottom: 3px                   \n\
    padding-left: 8px                     \n\
    padding-right: 8px                    \n\
    width: 95px                           \n\
                                          \n\
  .clock                                  \n\
    width: 90px;                          \n\
    padding-top:1px;                      \n\
    padding-left:1px;                     \n\
                                          \n\
  .digit, .seperator                      \n\
    width:15px;                           \n\
    height:25px;                          \n\
    position:relative;                    \n\
    display:inline-block;                 \n\
                                          \n\
  .seperator                              \n\
    width:8px;                            \n\
                                          \n\
  .digit .segment, .seperator .segment    \n\
    background:#c00                       \n\
    border-radius:2px                     \n\
    position:absolute                     \n\
    opacity:0.15                          \n\
    transition:opacity 0.2s               \n\
    -webkit-transition:opacity 0.2s       \n\
    -ms-transition:opacity 0.2s           \n\
    -moz-transition:opacity 0.2s          \n\
    -o-transition:opacity 0.2s            \n\
                                          \n\
  .digit .segment.on, .seperator .segment \n\
    opacity:0.75;                         \n\
    box-shadow:0 0 5px rgba(255,0,0,0.7); \n\
    transition:opacity 0s;                \n\
    -webkit-transition:opacity 0s;        \n\
    -ms-transition:opacity 0s;            \n\
    -moz-transition:opacity 0s;           \n\
    -o-transition:opacity 0s;             \n\
                                          \n\
  .digit .segment:nth-child(1)            \n\
    top:0px                               \n\
    left:2px                              \n\
    right:2px                             \n\
    height:2px                            \n\
                                          \n\
  .digit .segment:nth-child(2)            \n\
    top:2px                               \n\
    right:0px                             \n\
    width:2px                             \n\
    height:10px                           \n\
                                          \n\
  .digit .segment:nth-child(3)            \n\
    top:14px                              \n\
    right:0px                             \n\
    width:2px                             \n\
    height:10px                           \n\
                                          \n\
  .digit .segment:nth-child(4)            \n\
    top:24px                              \n\
    left:2px                              \n\
    right:2px                             \n\
    height:2px                            \n\
                                          \n\
  .digit .segment:nth-child(5)            \n\
    top:14px                              \n\
    left:0px                              \n\
    width:2px                             \n\
    height:10px                           \n\
                                          \n\
  .digit .segment:nth-child(6)            \n\
    top:2px                               \n\
    left:0px                              \n\
    width:2px                             \n\
    height:10px                           \n\
                                          \n\
  .digit .segment:nth-child(7)            \n\
    top:12px                              \n\
    left:2px                              \n\
    right:2px                             \n\
    height:2px                            \n\
                                          \n\
  .seperator .segment:nth-child(1)        \n\
    top:4px                               \n\
    left:3px                              \n\
    width:2px                             \n\
    height:6px                            \n\
                                          \n\
  .seperator .segment:nth-child(2)        \n\
    top:16px                              \n\
    left:3px                              \n\
    width:2px                             \n\
    height:6px                            \n\
",

update: function (output, domEl) {
  var digitSegments = [
    [1,2,3,4,5,6],
    [2,3],
    [1,2,7,5,4],
    [1,2,7,3,4],
    [6,7,2,3],
    [1,6,7,3,4],
    [1,6,5,4,3,7],
    [1,2,3],
    [1,2,3,4,5,6,7],
    [1,2,7,3,6]
  ];

  var setNumber = function(digit, number, on) {
    var segments = digit.querySelectorAll('.segment');
    var current = parseInt(digit.getAttribute('data-value'));

    // only switch if number has changed or wasn't set
    if (!isNaN(current) && current != number) {
      // unset previous number
      digitSegments[current].forEach(function(digitSegment, index) {
        setTimeout(function() {
          segments[digitSegment-1].classList.remove('on');
        }, index*45)
      });
    }

    if (isNaN(current) || current != number) {
      // set new number after
      setTimeout(function() {
        digitSegments[number].forEach(function(digitSegment, index) {
          setTimeout(function() {
            segments[digitSegment-1].classList.add('on');
          }, index*45)
        });
      }, 250);
      digit.setAttribute('data-value', number);
    }
  }

  var _hours = domEl.querySelectorAll('.hours');
  var _minutes = domEl.querySelectorAll('.minutes');
  var date = new Date();
  var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
  setNumber(_hours[0], Math.floor(hours/10), 1);
  setNumber(_hours[1], hours%10, 1);
  setNumber(_minutes[0], Math.floor(minutes/10), 1);
  setNumber(_minutes[1], minutes%10, 1);
}