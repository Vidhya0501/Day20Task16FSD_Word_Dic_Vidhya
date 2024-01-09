var input_data=document.querySelector(".user-input");
var search=document.querySelector("#search-btn");
var audio_result=document.querySelector(".card-footer");
var sound=document.querySelector("#sound");

async function getMeaning(word){

        try {
                var res=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                var data=await res.json();
                console.log(data);
            
                document.querySelector(".card-title").innerHTML=word;
                document.querySelector(".card-subtitle").innerHTML=data[0].phonetic;
                document.querySelector(".card-text").innerHTML=`${data[0].meanings[0].definitions[0].definition}<br>
                ${data[0].meanings[0].definitions[0].example ||""}`; 
            
                audio_result.innerHTML=`<button onclick="getSound()"><i class="fa-solid fa-volume-high"></i></button>`;
                
                sound.setAttribute("src",`${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`);
                console.log(sound);
                console.log(data[0].phonetics[0].audio);
            
                document.querySelector("#result").style.display="block";
                document.querySelector(".error").style.display="none";
                
        } catch (error) {
                document.querySelector(".error").style.display="block";
                document.querySelector(".result").style.display="none";
        }
   
}


search.addEventListener("click",()=>{
    getMeaning(input_data.value);
})

input_data.addEventListener("keydown",(event) => {
        if (event.key === 'Enter') {
                getMeaning(input_data.value);
        }
      });

function getSound(){
        sound.play();
}

