const showData = async (phnName) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${phnName}`
  let res = await fetch(url),
    data = await res.json()
  phoneDetails(data.data)
}
const phonPraint = document.getElementById('phon-Details')
const phoneDetails = (phones) => {

  // show more baki

  const showMoreBtn = document.getElementById('show-more-btn')
  if (phones.length > 10) {
    phones = phones.slice(0, 10)
    showMoreBtn.classList.remove("hidden")
  }
  else {
    showMoreBtn.classList.add("hidden")
  }
  phones = phones.slice(0, 6)
  const noFoundMassege = document.getElementById('massege');
  if (phones.length === 0) {
    noFoundMassege.classList.remove('hidden');
  }
  else {
    noFoundMassege.classList.add('hidden');
  }
  phonPraint.innerHTML = "";

  phones.forEach(phone => {
    // console.log(phone)
    const phoneDiv = document.createElement('div');
    phoneDiv.className = "card card-compact w-96 bg-base-100 shadow-2xl my-16"
    phoneDiv.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                   <h2 class="card-title">${phone.brand}</h2>
                   <p>${phone.phone_name}</p>                  
                   <div class="card-actions justify-end">
                     <button class="btn btn-primary">Buy Now</button>
                   </div>
                  
                     <label onclick ="loadDitails('${phone[0].slug}')" for="my-modal">Details</label>
              </div> 
        `
    phonPraint.appendChild(phoneDiv)
    console.log(phones)
  });
  laoding(false)
}

// spiner

const searchBtn = document.getElementById('search-btn');
searchBtn.onclick = () => {
  laoding(true)
  const inputInfo = document.getElementById('input-info');
  showData(inputInfo.value)
  inputInfo.value = '';
}
const laoding = (isLadiong) => {
  const loadingSpine = document.getElementById('loading-spiner');
  if (isLadiong) {
    loadingSpine.classList.remove('hidden')
  }
  else {
    loadingSpine.classList.add('hidden')
  }
}

//  model baki

const loadDitails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  let res = await fetch(url),
    data = await res.json()
    phoneDitails(data.data)
}
const phoneDitails = (phones) => {
  const modalTitle = document.getElementById('modal-title');
  modalTitle.innerText = `${phones.brand}`
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
  <img src="${phones.image}" alt="">
  <p>${phones.name}</p>
  <p>${phones.releaseDate}</p>
  `
  console.log(phones)
}


 





// const form = document.getElementById('from');
// form.onsubmit = (e) =>{
//   e.preventDefault()
//   const inputInfo = document.getElementById('input-info');
//   showData(inputInfo.value)
//   inputInfo.value='';

// }