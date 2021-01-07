import { containsText } from "..";

const btn_submit = document.getElementById('btn_submit');
btn_submit.addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const text = document.getElementById('text').value;
    
    if(containsText(text)==true){
        document.getElementById("warning").innerHTML = "";
        getMySentiment('/getSentiment', {text: text})

        .then(function(data){
            // postData('/addSentimentData', {sentiment: data.main.temp, date: data.dt, feelings: feelings})
        
            updateUI(data);
        });
    } else {
        document.getElementById("warning").innerHTML = "Must enter text";
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

}


export { handleSubmit }
