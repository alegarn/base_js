const lastName = document.getElementById('lastName');
const firstName = document.getElementById('firstName');
const email = document.getElementById('email');
const email2 = document.getElementById('email2');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const birthday = document.getElementById('birthday');
const rulesCheck = document.getElementById('flexCheckDefault');
const submit = document.getElementById('submit');

function verifyName(name) {
  const nameValue = name.value;
  const nameWrong = name.nextElementSibling;
  const re = /^\S\S\S/;

  if (!(re.test(nameValue))) {
      nameWrong.style.display = "inline";
      let result = {resultName: false};
      console.log(result);
      return(result)
  };
  if ((re.test(nameValue))) {
    nameWrong.style.display = "none";
    let result = {resultName: true};
    console.log(result);
    return(result);
  };

};



let submitFirstName = firstName.addEventListener("change", function() {
  verifyName(firstName);
});


let submitLastName = lastName.addEventListener("change", function() {
  verifyName(lastName);
}); 


function verifyMail(mail) {
  const mailValue = mail.value;
  const mailWrong = mail.nextElementSibling;
  const re = /[@]/;
  const dot2 = /[.]\w\w$/;
  const dot3 = /[.]\w\w\w$/;

  if (!((re.test(mailValue)) && (dot2.test(mailValue) || dot3.test(mailValue)))) {
      mailWrong.style.display = "inline";
      return({resultMail: false});
  };
  if (((re.test(mailValue)) && (dot2.test(mailValue) || dot3.test(mailValue)))) {
    mailWrong.style.display = "none";
    return({resultMail: true});
  };

};

let submitEmail = email.addEventListener("change", function() {
  verifyMail(email);
  }, false);

function secondValidation(mail, mail2) {
  const mailValue = mail.value;
  const mailValue2 = mail2.value;
  const mailWrong = mail2.nextElementSibling;

  if (!(mailValue === mailValue2)) {
      mailWrong.style.display = "inline";  
      return({resultMail2: false});
  };
  if ((mailValue === mailValue2)) {
    mailWrong.style.display = "none";
    return({resultMail2: true});
  };
};

let submitEmail2 = email2.addEventListener("change", function() {
  secondValidation(email, email2)
})


function passwordValidation(password) {
  const passwordValue = password.value;
  const passwordWrong = password.nextElementSibling;
  const re = /^....../;
  if (!(re.test(passwordValue))) {
      passwordWrong.style.display = "inline";  
      return({resultPassword: false});
  };
  if ((re.test(passwordValue))) {
    passwordWrong.style.display = "none";
    return({resultPassword:true});
  };
}

let submitPassword = password.addEventListener("change", function() {
  passwordValidation(password);
});

let submitPassword2 = password2.addEventListener("change", function() {
  secondValidation(password, password2);
});




function calculateAge(date) {
  const now = new Date();
  const diff = Math.abs(now - date );
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
  return age
};

function minEighteen(date) {
  
  const dateValue = Date.parse(date.value);
  const dateWrong = date.nextElementSibling;
  const age = calculateAge(dateValue);
  if (age < 18) {
    dateWrong.style.display = "inline";  
    return({resultAge:false});
  };

  if (age >= 18) {
    dateWrong.style.display = "none";
    return({resultAge:true});
  }
};

let submitBirthday = birthday.addEventListener("change", function () {
  minEighteen(birthday);
});


function okWebsiteRules() {
  const checkValue = rulesCheck.checked;
  if (checkValue) {
    return({resultCheck: true});
  }
  if (!checkValue) {
    return({resultCheck: false});
  }
};

let submitRulesCheck = rulesCheck.addEventListener("click", okWebsiteRules);




function verify(submitFirstName, submitLastName, submitEmail, submitEmail2, submitPassword, submitPassword2, submitBirthday, submitRulesChecksubmitfirstName, submitlastName, submitEmail, submitEmail2, submitPassword, submitPassword2, submitBirthday, submitRulesCheck) {
  const formVerification = [submitFirstName, submitLastName, submitEmail, submitEmail2, submitPassword, submitPassword2, submitBirthday, submitRulesCheck];
  console.log(submitFirstName);
  console.log(Object.keys(formVerification));
  Object.keys(formVerification).forEach(function(key, index) {
    console.log(formVerification[key]); 
  });
  const result = formVerification.filter((value) => {
    if(!value) {
      return(value);
    }
  
  })

  if(!value) {
    const submitWrong = submit.nextElementSibling;
    submitWrong.style.display = "inline";  
  }

};

submit.addEventListener("click", function() {
  verify(submitFirstName, submitLastName, submitEmail, submitEmail2, submitPassword, submitPassword2, submitBirthday, submitRulesCheck);
}, false);