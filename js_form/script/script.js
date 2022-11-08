const lastName = {name: "lastName", value:document.getElementById('lastName')};
const firstName = {name:"firstName", value:document.getElementById('firstName')};
const email = document.getElementById('email');
const email2 = {name: "email2", value:document.getElementById('email2')};
const password = document.getElementById('password');
const password2 = {name:"password2", value:document.getElementById('password2')};
const birthday = document.getElementById('birthday');
const rulesCheck = document.getElementById('flexCheckDefault');
const submit = document.getElementById('submit');

let formVerification = {
  firstName: false,
  lastName: false, 
  email: false, 
  email2: false,
  password: false,
  password2: false,
  birthday: false,
  rulesCheck: false
}; // chaque input!!

function verifyName(name, formVerification) {
  const nameValue = name.value.value;
  const nameWrong = name.value.nextElementSibling;
  const re = /^\S\S\S/;

  if (!(re.test(nameValue))) {
      nameWrong.style.display = "inline";
      const decideValue = name.name === "firstName" ? formVerification.firstName = false : formVerification.lastName = false;
  };
  if ((re.test(nameValue))) {
    nameWrong.style.display = "none";
    const decideValue = name.name === "firstName" ? formVerification.firstName = true : formVerification.lastName = true;

  };

};



let submitFirstName = (firstName.value).addEventListener("change", function() {
  verifyName(firstName, formVerification);
});


let submitLastName = (lastName.value).addEventListener("change", function() {
  verifyName(lastName, formVerification);
}); 


function verifyMail(mail, formVerification) {
  const mailValue = mail.value;
  const mailWrong = mail.nextElementSibling;
  const re = /[@]/;
  const dot2 = /[.]\w\w$/;
  const dot3 = /[.]\w\w\w$/;

  if (!((re.test(mailValue)) && (dot2.test(mailValue) || dot3.test(mailValue)))) {
      mailWrong.style.display = "inline";
      formVerification.email = false;
  };
  if (((re.test(mailValue)) && (dot2.test(mailValue) || dot3.test(mailValue)))) {
    mailWrong.style.display = "none";
    formVerification.email = true;
  };

};

let submitEmail = email.addEventListener("change", function() {
  verifyMail(email, formVerification);
  }, false);

function secondValidation(mail, mail2, formVerification) {
  const mailValue = mail.value;
  const mailValue2 = mail2.value.value;
  const mailWrong = mail2.value.nextElementSibling;

  if (!(mailValue === mailValue2)) {
      mailWrong.style.display = "inline"; 
      const decideValue = mail2.name === "email2" ? formVerification.email2 = false : formVerification.password2 = false;
      };
  if ((mailValue === mailValue2)) {
    mailWrong.style.display = "none";
    const decideValue = mail2.name === "email2" ? formVerification.email2 = true : formVerification.password2 = true;
  };
};

let submitEmail2 = (email2.value).addEventListener("change", function() {
  secondValidation(email, email2, formVerification);
});


function passwordValidation(password, formVerification) {
  const passwordValue = password.value;
  const passwordWrong = password.nextElementSibling;
  const re = /^....../;
  if (!(re.test(passwordValue))) {
      passwordWrong.style.display = "inline";  
      formVerification.password = false;
  };
  if ((re.test(passwordValue))) {
    passwordWrong.style.display = "none";
    formVerification.password = true;
  };
}

let submitPassword = password.addEventListener("change", function() {
  passwordValidation(password, formVerification);
});

let submitPassword2 = (password2.value).addEventListener("change", function() {
  secondValidation(password, password2, formVerification);
});




function calculateAge(date) {
  const now = new Date();
  const diff = Math.abs(now - date );
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
  return age
};

function minEighteen(date, formVerification) {
  
  const dateValue = Date.parse(date.value);
  const dateWrong = date.nextElementSibling;
  const age = calculateAge(dateValue);
  if (age < 18) {
    dateWrong.style.display = "inline";  
    formVerification.birthday = false;
  };

  if (age >= 18) {
    dateWrong.style.display = "none";
    formVerification.birthday = true;
  }
};

let submitBirthday = birthday.addEventListener("change", function () {
  minEighteen(birthday, formVerification);
});


function okWebsiteRules(formVerification) {
  const checkValue = rulesCheck.checked;
  if (checkValue) {
    formVerification.rulesCheck = true;
  }
  if (!checkValue) {
    formVerification.rulesCheck = false;
  }
};

let submitRulesCheck = rulesCheck.addEventListener("click", function () {
  okWebsiteRules(formVerification);
});




function verify(formVerification, submit) {
  const submitValue = submit.value;
  const submitWrong = submit.nextElementSibling;

  submitWrong.innerHTML = "Please complet required fields of the form:";

  Object.keys(formVerification).forEach(function(key, index) {
    if (formVerification[key] === false) {
      let message = key === "firstName" ? (submitWrong.innerHTML = submitWrong.innerHTML + " First Name")
        : key === "lastName" ? (submitWrong.innerHTML = submitWrong.innerHTML + " Last Name")
        : key === "email" ? (submitWrong.innerHTML = submitWrong.innerHTML + " Email")
        : key === "email2" ? (submitWrong.innerHTML = submitWrong.innerHTML + " Email Validation")
        : key === "password" ? (submitWrong.innerHTML = submitWrong.innerHTML + " Password")
        : key === "birthday" ? (submitWrong.innerHTML = submitWrong.innerHTML + " Password Validation")
        : key === "birthday" ? (submitWrong.innerHTML = submitWrong.innerHTML + " Be the required age")
        : (submitWrong.innerHTML = submitWrong.innerHTML + " Check the rulses");
    };
  });
  if(submitWrong.innerHTML === "Please complet required fields of the form:") {
    window.location.href = "./sub.html";
  };
  if (submitWrong.innerHTML != "Please complet required fields of the form:") {
    submitWrong.style.display = "inline";
  }
  
};

submit.addEventListener("click", function() {
  verify(formVerification, submit);
}, false);