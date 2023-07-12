/*window.addEventListener("load",function(){
    var txtX = document.getElementById("txt-x");
    var txtY = document.getElementById("txt-y");
    var btnAdd = document.getElementById("btn-add");
    var txtSum = document.getElementById("txt-sum");

    btnAdd.onclick = function(){
        var x = parseInt(txtX.value);   //parseInt가 있기전에는 txtX 값은 문자열임
        var y = parseInt(txtY.value);

        txtSum.value = x+y;    //숫자를 문자열에 대입할때는 숫자가 자동으로 문자로 바뀜 
    }; */

    /* queryselector("#id") queryselector(".class")  = getElementById("")  getElementByClassName(" ")*/
    
    
    function multiply()
    {
        num1 = document.getElementById("firstNumber").value;
        num2 = document.getElementById("secondNumber").value;
        document.getElementById("result").innerHTML = num1 * num2; 
    }
    
    function divide(){
        num1 = document.getElementById("fisrtNumber").value;
        num2 = document.getElementById("secondNumber").value;
        document.getElementById("result").innerHTML = num1 /num2 ; 
    
    }
    
    function add(){
        num1 = document.getElementById("firstNumber").value;
        num2 = document.getElementById("secondNumber").value;
        document.getElementById("result").innerHTML = num1 + num2; 
    }
    
    function sub(){
        num1 = document.getElementById("firstNumber").value;
        num2 = document.getElementById("secondNumber").value;
        document.getElementById("result").innerHTML = num1 / num2; 
    }

    

    // var scale = document.getElementsByClassName("scale");
    // for (var i in scale){
    //     getNumberOfScales(scale[i]);
    // }
  
   
    

    
    
    
    
    
    function rowGenerator(index){
        return `
        <div class = "row" data-index = "${index}">
        &nbsp &nbsp  Price ${index} : &nbsp <input class = "price" style = "height : 30px ; width: 50px;"  data-index = "${index}" type = "number" step = "any" /> &nbsp Amount : &nbsp
         <input class = "count" style = "height : 30px ; width: 50px;" data-index = "${index}" type = "number" step = "any" />
         </div> `; 
    }

    
   
     function getNumberOfScales(parent){
    //     // var scale = document.getElementsByClassName("scale-count");
    //     // for (var i in scale){
    //     // const temp = parseInt(scale[i]);
    //     // const numberOfScales = isNaN(temp) || temp<0 ? 0 : temp;
    //     // return numberOfScales;
    //     // }
    //     // var a = document.querySelectorAll('.scale-count');
    //     // var i = 0;
    //     // while(i<a.length){
    //     // const temp = a[i].value ; 
    //     // const numberOfScales= isNaN(temp) || temp<0 ? 0 : temp;
    //     // return numberOfScales;
    //     // }
        
    
        const temp = parseInt(document.querySelector("." + parent + " .scale-count").value);
        const numberOfScales = isNaN(temp) || temp<0 ? 0 : temp;
        return numberOfScales; 
        }
   
    
    // var getNumber = document.querySelectorAll(".scale-count");
    // for (var i = 0; i < getNumber.length; i++){
    //     getNumber[i].addEventListener("click",getNumberOfScales);
    // }

    // let all = document.querySelectorAll(".scale-count").forEach(x=> x.onclick = getNumberOfScales);  
    


    function handleNextButtonClick(parent){
        
         const numberOfScales = getNumberOfScales(parent);
         const formOutput = document.querySelector("."+parent+" .form-output");
         let stringBuffer = " ";
         for (let index=1; index<= numberOfScales; index++){
             stringBuffer += rowGenerator(index);
         }
         formOutput.innerHTML = stringBuffer;
       }

    
    
    
    // var nextButton = document.querySelectorAll(".question-two");
    // for (var i = 0; i < nextButton.length; i++){
    //     nextButton[i].addEventListener("click",handleNextButtonClick);
    // }
 

    // let all2= document.querySelectorAll(".question-two").forEach(x=> x.onclick = handleNextButtonClick);

   
    
    
    function getAverage(parent){

        let sum = 0 ; 
        let sum_count = 0;
        const numberOfScales = getNumberOfScales(parent);
        for (let index = 1; index <= numberOfScales; index++){
            const row_price = parseFloat(document.querySelector(`div.${parent} input.price[data-index = '${index}']`).value)  ;
            const row_count = parseFloat(document.querySelector(`div.${parent} input.count[data-index = '${index}']`).value)  ;
            sum += row_price * row_count;
            sum_count += row_count; 
        }
        console.table({
            sum,
            sum_count
        })
        if (sum_count ==0 ){
            return 0;
        } else{
            return parseFloat(sum/sum_count) ; 
        }
    }



    function handleCalculateAverageButtonClick(parent) {
        const average = getAverage(parent);
        const avg1 = document.querySelector("." + parent +" .average1");
        avg1.innerHTML = average;
        
    }



    
    function stopLoss(parent){
        let res = 0;
        const avg = getAverage(parent);
        const sl = parseFloat(document.querySelector("."+ parent + " .sl").value); 
        if (sl>0 && sl<100){
        res += (100-sl)*0.01 *avg ;
        
        document.querySelector("." + parent + " .s").innerHTML = res; 
        return res;
         }
        else{
            alert("Stop Loss value should be inbetween 0 to 100 ");
        }
    }


    function stopLoss2(parent){
        let res = 0; 
        const avg = getAverage(parent); 
        const sl = document.querySelector("." + parent + " .sl").value;
        const lev1 = document.querySelector("." + parent + " .llev" ).value;
        const rsl = sl/lev1 ; 
        if (sl>=0 && sl<=100 && lev1 > 0){
            res += (100-rsl)/100*avg;
            document.querySelector("."+parent +" .s").innerHTML = res;
            return res;
        }
        else if(sl<0 || sl>100) {
            alert ("Stop Loss value should be inbetween 0 to 100 ");
        }
        else{
            alert("leverage should be positive number")
        }
    }

    function stopLoss3(parent){
        let res = 0; 
        const avg = getAverage(parent);
        const sl = document.querySelector("." + parent + " .sl").value; 
        const lev1 = document.querySelector("." + parent + " .llev").value;
        const rsl = sl/lev1;
        if (rsl>0 && rsl<100){
            res += (100+rsl)/100 * avg; 
            document.querySelector("." + parent + " .s").innerHTML = res; 
            return res;
        }
        else{
            alert("Stop Loss value should be inbetween 0 to 100")
        }
    }
   
   


    function rateOfReturn(parent1,parent1_1){
        if (getAverage(parent1)==0 || getAverage(parent1_1)==0){
            return 0;

        } else if(getAverage(parent1).sum_count != getAverage(parent1_1).sum_count){
            alert("Total amount of stocks that you are buying and selling should be same") ;
        }
         else{
        const sub = getAverage(parent1_1)-getAverage(parent1) ;    
        const ress = parseFloat(sub/getAverage(parent1)*100).toPrecision(4)+"%";
        document.querySelector("."+parent1_1+" .ress").innerHTML = ress;
        return ress;
        }
        
    }

    function rateOfReturn2(parent1,parent1_1){
        if(getAverage(parent1)==0 || getAverage(parent1_1)==0){
            return 0;
        } else{
            const sub = getAverage(parent1_1)-getAverage(parent1) ; 
            const lev1 = document.querySelector("." + parent1 + " .llev").value;
            const ress = parseFloat(sub/getAverage(parent1)*100*lev1).toPrecision(4) +"%";
            document.querySelector("."+parent1_1+" .ress").innerHTML = ress; 
            return ress; 
        }
    }

    function rateOfReturn3(parent1,parent1_1){
        if(getAverage(parent1)==0 || getAverage(parent1_1)==0){
            return 0; 
        } else{
            const sub = getAverage(parent1)-getAverage(parent1_1);
            const lev1 = document.querySelector("." + parent1 + " .llev").value;
            const ress = parseFloat(sub/getAverage(parent1)*100*lev1).toPrecision(4) + "%";
            document.querySelector("."+parent1_1+" .ress").innerHTML = ress;
            return ress;
        }
    }

    function riskToReward(parent1,parent1_1){
        const ress = parseFloat(rateOfReturn(parent1,parent1_1));
        const sl = parseFloat(document.querySelector("."+ parent1 + " .sl").value);
        document.querySelector("."+parent1_1+" .rr").innerHTML = "1 : " + (ress/sl).toPrecision(4);
    }

    function riskToReward2(parent1,parent1_1){
        const ress = parseFloat(rateOfReturn2(parent1,parent1_1));
        const sl = parseFloat(document.querySelector("."+parent1 + " .sl").value);
        document.querySelector("." + parent1_1 +" .rr").innerHTML =  "1 : " + (ress/sl).toPrecision(4); 
    }

    function riskToReward3(parent1,parent1_1){
        const ress = parseFloat(rateOfReturn3(parent1,parent1_1));
        const sl = parseFloat(document.querySelector("." + parent1 + " .sl" ).value);
        document.querySelector("." + parent1_1 + " .rr").innerHTML =  "1 : " + (ress/sl).toPrecision(4);
        }
    /*https://stackoverflow.com/questions/41531433/how-to-use-the-same-js-for-same-html-multiple-times*/


    
 
    
    /* https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-10.php */