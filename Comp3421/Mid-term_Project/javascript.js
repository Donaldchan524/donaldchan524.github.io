// education detail
var organization = new Array("Cannan Kindergarten", "Hong Kong Southern District Government Primary School", "Aberdeen Baptist Lui Ming Choi College","Hong Kong Institute of Vocational Education (Tsing Yi)","The Hong Kong Polytechnic University");
var image_name = new Array("cannan", "hksdgps", "ablmcc", "ive_ty" , "polyu");
var couse_name = new Array("Kindergarten", "Primary School", "Secondary School","Higher Diploma in Data Science and Analytics","BSc (Hons) in Data Science and Analytics");
var year = new Array("2002 - 2005", "2005 - 2011", "2011 - 2017","2017 - 2019 ","2019 - present");
var loc = new Array("Shop 7B, 1/F, Aberdeen Centre, Hong Kong", "325 Apleichau Bridge Road, Apleichau, Hong Kong", "18 Lei Tung Estate Rd Ap Lei Chau","20 Tsing Yi Road Tsing Yi Island New Territories","Hung Hom, Kowloon, Hong Kong");
var website = new Array("https://www.cannan.edu.hk/", "https://www.hksdgps.edu.hk/", "https://www.ablmcc.edu.hk","https://www.vtc.edu.hk/html/tc/index.html","https://www.polyu.edu.hk/en/");

var slideIndex1 = 4;

function showschool(x){
    slideIndex1 += x;
    if (slideIndex1 >= organization.length) {slideIndex1 = 0}    
    if (slideIndex1 < 0) {slideIndex1 = (organization.length-1)}
    document.getElementById("logo").setAttribute("src","image/"+ image_name[slideIndex1] + ".jpg" );
    document.getElementById("organization").innerHTML=("Organization: "+organization[slideIndex1]);
    document.getElementById("course").innerHTML=("Course: "+couse_name[slideIndex1]);
    document.getElementById("year").innerHTML=("Year: "+year[slideIndex1]);
    document.getElementById("location").innerHTML=("Location: "+loc[slideIndex1]);
    document.getElementById("website").innerHTML=(website[slideIndex1]);
    document.getElementById("website").setAttribute("href",website[slideIndex1] );
}

function check_answer(){
    var q1=document.question.q1.value;
    var q2=document.question.q2.value;
    var q3=document.question.q3.value;
    var q4=document.question.q4.value;
    var q5=document.question.q5.value;
    var q6=document.question.q6.value;
    var count=0;
    var quizresult =" "
        
    if(q1=="b"){
        count++;
    }else{
        quizresult += "\nMy name is Donald.";
    }
    if(q2==20){
        count++;
    }else{
        quizresult += "\nI am 20 year old.";
    }
    if(q3=="b"){
        count++;
    }else{
        quizresult += "\nBasketball is my favourite sport";
    }
    if(q4=="d"){
        count++;
    }else{
        quizresult += "\nMy major is Data Science and Analytics. Also I like it.";       
    }
    if(q5=="d"){
        count++; 
    }else{
        quizresult += "\nI received my Higher Diploma at the Hong Kong Institute of Vocational Education(IVE) also is Data Science and Analytics too.";
    }
    if(q6=="d"){
        count++; 
    }else{
        quizresult += "\nNow I am study in The Hong Kong Polytechnic University";
    }
    
    if(count!=6){
        alert("In this quiz you got "+count+" out of 6 marks. \nHere is the correct answer:" + quizresult +"\nTry again");  
    }else{
        alert("Good Job!!! \nAll correct.");
    }
}
