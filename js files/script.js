
const siteName =document.getElementById('siteName');
const siteURL =document.getElementById('siteURL');
const addBtn = document.getElementById('submitBtn');
const bookMarksRow = document.getElementById('bookmarks');
const closeBtn = document.getElementById('close')
const alertDiv = document.getElementById('alertMsg')
var x = document.getElementByClassName
var bookMarksArr = [];

function checkLocalStorage(){
   if(localStorage.getItem('bookmarks') != null){
      bookMarksArr = JSON.parse(localStorage.getItem('bookmarks')) ;
      displayBookMArks(bookMarksArr);
   }
}
checkLocalStorage();

function recordBookMark(){
   if(siteName.classList.contains('is-valid') && siteURL.classList.contains('is-valid')){
      addBooMarktoArr();
      addBooMarktoLocalStorage(bookMarksArr);
      resetForm();
      displayBookMArks(bookMarksArr);
   }else{
      alertDiv.classList.remove('d-none');
      alertDiv.classList.add('d-block');
      console.log('fdsd');
   }
}
function addBooMarktoArr(){
   const bookMark = {
      siteName: siteName.value,
      siteURL: siteURL.value}

      bookMarksArr.push(bookMark);
}
function addBooMarktoLocalStorage(){
   localStorage.setItem('bookmarks', JSON.stringify(bookMarksArr));
}
function resetForm(){
   siteName.value = "";
   siteURL.value = "";
   siteName.classList.remove('is-valid');
   siteURL.classList.remove('is-valid');
}
function displayBookMArks(arr){
   var bookMarksContent =``;
   for(var i =0; i<arr.length; i++ ){
      bookMarksContent += ` 
      <tr>
      <td>${i+1}</td>
      <td>${arr[i].siteName}</td>
      <td>
         <button  class="btn text-capitalize btn-visit text-light">
            <a href="https://${arr[i].siteURL}" target='_blank' class="text-decoration-none text-light">
               <i class="fa-regular fa-eye pe-2 text-light"></i>
               visit
            </a>
         </button>
      </td>
      <td>
         <button onclick='removeBookMark(${i})' class="btn text-capitalize btn-delete text-light">
            <i class="fa-solid fa-trash-can pe-2 text-light"></i>
            delete
         </button>
      </td>
   </tr>`
   }
   bookMarksRow.innerHTML = bookMarksContent ;
}

function removeBookMark(index){

   Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb1d36",
      cancelButtonColor: "#9eb23b",
      confirmButtonText: "Yes, delete it!"
   }).then((result) => {
      if (result.isConfirmed) {
         bookMarksArr.splice(index ,1);
         addBooMarktoLocalStorage();
         displayBookMArks(bookMarksArr);
         Swal.fire({
            title: "Deleted!",
            text: "Your book mark has been deleted.",
            icon: "success"
         });
      }
   });




   
}

function validateInput(field){

   var regex = {
      siteName :/^[a-zA-Z\d]{3,}$/,
      siteURL : /^[A-Za-z]*\.?[A-Za-z0-9]{3,}\.[a-zA-Z]{2,}$/
   }
   if(regex[field.id].test(field.value)){
      field.classList.add('is-valid')
      field.classList.remove('is-invalid')
   }else{
      field.classList.add('is-invalid')
      field.classList.remove('is-valid')
   }
}

function closeAlert(){
   alertDiv.classList.add('d-none');
}