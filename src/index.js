import sha256 from '../node_modules/js-sha256';
import zxcvbn from '../node_modules/zxcvbn';

document.getElementById("generate").addEventListener("click", generate, false);

function generate(){
    var website = document.getElementById("website").value;
    var key = document.getElementById("key").value;
    var length = document.getElementById("length").value;

    var passwordField = document.getElementById("passwordField");
    var timeToCrackField = document.getElementById("timeToCrack");
    var passwordScoreBar = document.getElementById("passwordScoreBar");
    var passwordScoreBarDiv = document.getElementById("passwordScoreBarDiv");
    var generatedPasswordFor = document.getElementById("generatedPasswordFor");

    //init parser
    var parser = document.createElement("a");

    //parse URL and extract domain
    parser.href = website;
    if(!(parser.hostname == 'localhost')){
        website = parser.hostname;
    }

    //calculate and format hash
    var result = sha256.hmac(website, key);
    var resultFormatted = result.slice(0, length);

    //rate password
    var data = zxcvbn(resultFormatted);
    
    //fill elements with results
    generatedPasswordFor.innerHTML = "Generated password for " + website + ":" 
    passwordField.innerHTML = resultFormatted
    passwordScoreBar.value = data.score;
    passwordScoreBarDiv.setAttribute('data-tooltip', data.score + '/4');
    timeToCrackField.innerHTML = data.crack_times_display.offline_slow_hashing_1e4_per_second;

    //rank password score
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
}
