// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //Hide results
  document.getElementById('results').style.display='none';
  
  //show loading
  document.getElementById('loading').style.display='block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// calculate results
function calculateResults(){
  console.log('calculating...');
  
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthPay = document.getElementById('monthly-payment');
  const totalInt = document.getElementById('total-interest');
  const totalPay = document.getElementById('total-payment');

  const principal =parseFloat(amount.value);
  const calcInt = parseFloat(interest.value)/100/12;
  const calcPay = parseFloat(years.value)*12;
  // compute monthly payments 
  const x = Math.pow(1+calcInt,calcPay);
  const monthly = (principal*x*calcInt)/(x-1);

  if(isFinite(monthly)){
    monthPay.value = monthly.toFixed(2);
    totalPay.value =(monthly*calcPay).toFixed(2);
    totalInt.value =((monthly*calcPay)-principal).toFixed(2);
    
    //show results
    document.getElementById('results').style.display='block';
    //hide loader
    document.getElementById('loading').style.display='none';
  }else{
    showError('Please check your numbers!!');
  }
  
}
  // show error function
  function showError(error){
    //show results
    document.getElementById('results').style.display='none';
    //hide loader
    document.getElementById('loading').style.display='none';
    
    // create div
    const errorDiv = document.createElement('div');
    
    // get elements
    const card=document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    // add class
    errorDiv.className='alert alert.danger';
    
    // create text node and append
    errorDiv.appendChild(document.createTextNode(error));
    
    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);

  }
  function clearError(){
    document.querySelector('.alert').remove();
  }

