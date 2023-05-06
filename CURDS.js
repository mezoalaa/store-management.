let title= document.getElementById("title");
let price= document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads= document.getElementById("ads");
let discount = document.getElementById("discount");
let total= document.getElementById("total");
let category= document.getElementById("category");
let submit= document.getElementById("submit");

let mood ="create";
let tmp; 
// tmp هو عنصر مساعد لل i 
// بحيث اني اقدر اساوية واعدل براحتييييييييي

function getTotal(){
    if (price.value !=''){
        let=result = (+price.value + +taxes.value + +ads.value )- +discount.value;
        total.innerHTML=result;
        total.style.background="#040";
  
    }
    else{
        total.innerHTML='';
        total.style.background= "rgb(37, 41, 80)";
        

    }
}

let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}
else{
    dataPro=[];
}

submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price : price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount : discount.value,
        total: total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),

    }
    if(title.value !='' && price.value !='' && category.value !='' && newpro.count < 150 ){
        
      if(mood==="create"){
        if(newpro.count > 1){
          for(let x =0 ; x < newpro.count;x++){
            dataPro.push(newpro);
          }
        }
        else{
        dataPro.push(newpro);
        }
      }else {
        dataPro [   tmp  ]= newpro;
        mood="create";
        submit.innerHTML ='Create ';
        count.style.display='block';
       }
       clearData()
   
    }

   
    localStorage.setItem('product',JSON.stringify(dataPro));
 
    showData()
}
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}

function showData(){
    getTotal()
    let table ='';
    for(let i = 0; i < dataPro.length ; i++){
        table += `
        <tr>
           <td>${i+1}</th>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
           <td><button onclick ="updateData(${i})" id="update" >update </button></td>
           <td><button onclick= "deleteData(${i})" id="delete" >delete </button></td>

        </tr>`
        //console.log(table)
    }

    document.getElementById('tbody').innerHTML=table;
    let btnDelateAll=document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelateAll.innerHTML=`
        <button onclick="DeleteAll()">Delete All(${dataPro.length}) </button> `
    }
    else{
        btnDelateAll.innerHTML='';

    }
}
showData()

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product= JSON.stringify(dataPro);
    showData()

}

function DeleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

function updateData(i){
    title.value =dataPro[i].title;
    price.value =dataPro[i].price;
    taxes.value =dataPro[i].taxes;
    ads.value =dataPro[i].ads;
    discount.value =dataPro[i].discount;
    getTotal()
    count.style.display='none'
    category.value =dataPro[i].category;
    submit.innerHTML='Update';
    mood="Update";
    tmp =i;
    scroll({
        top:0 ,
        behavior:"smooth",
    })

}

// SCEARH من خلال TITLE

let searchMod = 'title';

function getSearchMood(id){
    let search=document.getElementById("search");
    if(id == "searchTitle" ){
        searchMod = 'title';
      

    }else{
        searchMod = 'category';
      
    }
    search.placeholder="Search By "+searchMod;
    search.focus()
    search.value='';
    showData()

}



function searchData(value){

    let table='';
    for(let i =0  ; i < dataPro.length; i++){

      if (searchMod =="title"){
        
      
            if (dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                   <td>${i}</th>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td><button onclick ="updateData(${i})" id="update" >update </button></td>
                   <td><button onclick= "deleteData(${i})" id="delete" >delete </button></td>
        
                </tr>`

  

            }
        }


      else{
       
            if (dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                   <td>${i}</th>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td><button onclick ="updateData(${i})" id="update" >update </button></td>
                   <td><button onclick= "deleteData(${i})" id="delete" >delete </button></td>
        
                </tr>`

  

            }
        }

    }
    document.getElementById('tbody').innerHTML=table;

}





