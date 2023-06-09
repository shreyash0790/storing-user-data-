// // Multiple Element Selectors
// console.log(document.querySelectorAll('.item'));
// console.log(document.getElementsByTagName('li'));
// console.log(document.getElementsByClassName('item'));;;

// const items = document.querySelectorAll('.item');
// items.forEach((item) => console.log(item));


// // MANIPULATING THE DOM
// const ul = document.querySelector('.items');
// // ul.remove();
// // ul.lastElementChild.remove();
// ul.firstElementChild.textContent = 'Hello';
// ul.children[1].innerText = 'Brad';
// ul.lastElementChild.innerHTML = '<h1>Hello</h1>';

// const btn = document.querySelector('.btn');
// // btn.style.background = 'red';


// // EVENTS

// // Mouse Event
// btn.addEventListener('click', e => {
//   e.preventDefault();
//   console.log(e.target.className);
//   document.getElementById('my-form').style.background = '#ccc';
//   document.querySelector('body').classList.add('bg-dark');
//   ul.lastElementChild.innerHTML = '<h1>Changed</h1>';
// });

// // Keyboard Event
// const nameInput = document.querySelector('#name');
// nameInput.addEventListener('input', e => {
//   document.querySelector('.container').append(nameInput.value);
// });




// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    let name=nameInput.value;
    let email=emailInput.value;
    let  obj={
      name,
      email
    }
    // storing the items
     axios.post("https://crudcrud.com/api/010c5fb05b4b48bd8792670e0c11e9b3/objDATA",obj).then((response)=> {console.log(response)}).catch((err)=> {console.log(err)})
  // const existingData = JSON.parse(localStorage.getItem(email)) || [];
  // existingData.push(obj);

  // localStorage.setItem(email, JSON.stringify(existingData));

  var lii = document.createElement('li');
 
  // Add class
  lii.className = 'item';
  // Add text node with input value
  lii.appendChild(document.createTextNode(nameInput.value+ ' '+ '=>'));
  lii.appendChild(document.createTextNode(emailInput.value));
  userList.appendChild(lii);
  
  // Create del button element
  var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('Delete'));

  // Append del button to li
  lii.appendChild(deleteBtn);

  // Append li to list
  userList.appendChild(lii);

  // Create del button element
  var editBtn = document.createElement('button');

  // Add classes to del button
  editBtn.className = 'btn';

  // Append text node
  editBtn.appendChild(document.createTextNode('Edit'));

  // Append del button to li
  lii.appendChild(editBtn);

  // Append li to list
  userList.appendChild(lii);


//   deleteBtn.addEventListener('click', function(e) {
//     e.preventDefault();

//     // const existingData = JSON.parse(localStorage.getItem(email)) || [];

//     // existingData.splice(existingData.findIndex(item => item.name === name && item.email === email), 1);
//     //   localStorage.setItem(email, JSON.stringify(existingData));
//     //   if(existingData.length === 0) {
//     //     localStorage.removeItem(email);
//     //   }

//     // lii.remove();

//   });
  
//    editBtn.addEventListener('click', function(e) {
//     e.preventDefault();
   
//  // retrieve the name and email from the clicked list item and display them in the form fields
//  nameInput.value = name;
//  emailInput.value = email;
 
//  const existingData = JSON.parse(localStorage.getItem(email)) || [];

//  existingData.splice(existingData.findIndex(item => item.name === name && item.email === email), 1);
//       localStorage.setItem(email, JSON.stringify(existingData));
//       if(existingData.length === 0) {
//         localStorage.removeItem(email);
//       }

//  // remove the list item from the DOM
//  lii.remove();
    
//   });

  // clear the fields 
  nameInput.value ='' ;
  emailInput.value = '';
  }
}
window.addEventListener('DOMContentLoaded',()=>{
  axios.get('https://crudcrud.com/api/010c5fb05b4b48bd8792670e0c11e9b3/objDATA')
  .then((response) => {
    const users = response.data; // Assuming the response contains an array of user objects

    // Clear the user list
    userList.innerHTML = '';

    // Iterate over each user and create list items
    users.forEach((user) => {
      const li = document.createElement('li');
      li.className = 'item';
      li.appendChild(document.createTextNode(`${user.name} => ${user.email}`));
      
      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn';
      deleteBtn.appendChild(document.createTextNode('Delete'));

      // Create edit button
      const editBtn = document.createElement('button');
      editBtn.className = 'btn';
      editBtn.appendChild(document.createTextNode('Edit'));

      // Append buttons to list item
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      // Append list item to user list
      userList.appendChild(li);

      // Delete button click event handler
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const userId = user._id; 
        axios.delete(`https://crudcrud.com/api/010c5fb05b4b48bd8792670e0c11e9b3/objDATA/${userId}`)
          .then((response) => {
           
            console.log(response);
        
            li.remove(); 
          })
          .catch((error) => {
           
            console.log(error);
          });
            
      });

      // Edit button click event handler
      editBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const userId = user._id; 
        nameInput.value = user.name;
        emailInput.value = user.email;
      
        li.remove();
        performUpdate();
      
      
      
        function performUpdate() {
          const updatedName = nameInput.value;
          const updatedEmail = emailInput.value;
      
          // Update the user object
          const updatedUser = {
            _id: userId, 
            name: updatedName,
            email: updatedEmail,
          };
      
          // Send a PUT request to the CRUD API to update the user
          axios.put(`https://crudcrud.com/api/010c5fb05b4b48bd8792670e0c11e9b3/objDATA/${userId}`, updatedUser)
            .then((response) => {
              // Handle successful update
              console.log(response);
      
              // Update the list item text with the updated values
              li.firstChild.textContent = `${updatedName} => ${updatedEmail}`;
      
              nameInput.value = '';
              emailInput.value = '';
            })
            .catch((error) => {
              // Handle error during update
              console.log(error);
            });
            axios.delete(`https://crudcrud.com/api/010c5fb05b4b48bd8792670e0c11e9b3/objDATA/${userId}`)
          .then((response) => {
           
            console.log(response);
        
            li.remove(); 
          })
          .catch((error) => {
           
            console.log(error);
          });
      }});
    });
  }).catch((err)=>{console.log(err)})
})


