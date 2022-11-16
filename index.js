import 'bulma/css/bulma.css';
import './node_modules/bulma-tooltip/dist/css/bulma-tooltip.min.css';
import 'material-icons/iconfont/material-icons.css';
import sha256 from './node_modules/js-sha256';
import zxcvbn from './node_modules/zxcvbn';

document.getElementById ("generate").addEventListener ("click", generate, false);

function generate(){
    var website = document.getElementById("website").value;
    var key = document.getElementById("key").value;
    var length = document.getElementById("length").value;

    var passwordField = document.getElementById("passwordField");
    var timeToCrackField = document.getElementById("timeToCrack");
    var passwordScoreBar = document.getElementById("passwordScoreBar");
    var passwordScoreBarDiv = document.getElementById("passwordScoreBarDiv");

    var result = sha256.hmac(website, key);
    var resultFormatted = result.slice(0, length);
    var data = zxcvbn(resultFormatted);
    
    passwordField.innerHTML = resultFormatted
    passwordScoreBar.value = data.score;
    passwordScoreBarDiv.setAttribute('data-tooltip', data.score + '/4');
    if (data.score == 1){
        passwordScoreBar.className = "progress is-danger";
    }
    else if (data.score == 2){
        passwordScoreBar.className = "progress is-warning";
    }
    else if (data.score == 3){
        passwordScoreBar.className = "progress is-info";
    }
    else if (data.score == 4){
        passwordScoreBar.className = "progress is-success";
    }
    timeToCrackField.innerHTML = data.crack_times_display.offline_slow_hashing_1e4_per_second;
}
