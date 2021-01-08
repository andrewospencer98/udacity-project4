import { containsText } from "..";
document.addEventListener('DOMContentLoaded', function () {
const btn_submit = document.getElementById('btn_submit');
btn_submit.addEventListener('click', handleSubmit);
});

function forTesting(){
    return true;
}

function handleSubmit(event) {
    event.preventDefault();
    const text = document.getElementById('text').value;
    
    if(containsText(text)==true){
        document.getElementById("warning").innerHTML = "";
        getMySentiment('/getSentiment', {text: text})

        .then(function(data){
            updateUI(data);
            return true;
        });
    } else {
        document.getElementById("warning").innerHTML = "Must enter text";
        return false;
    }
}

/* Function to POST data */
const getMySentiment = async (url='', text={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 
            'Content-Type': 'application/json'
         },
        body: JSON.stringify(text),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error: ',error);
    }
}

const updateUI =(data)=> {
    document.getElementById("results").innerHTML = 'agreement = ' + data.agreement + ". subjectivity = " + data.subjectivity;
    return true;
}


export { handleSubmit, updateUI, forTesting }
