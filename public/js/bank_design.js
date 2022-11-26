//DESIGENING WORK
window.onscroll = () => {
    const title = document.querySelector('header');
    if (this.scrollY <= 1) title.className = "titlecolorbefore";
    else title.className = "titlecolorafter";

};




//validation signin form


function formValidation() {


    if (document.reg.name1.value == "") {
        alert("Please provide your name!");
        document.reg.name1.focus();
        return false;
    }
    if (document.reg.mail.value == "") {
        alert("Please provide your Email!");
        document.reg.mail.focus();
        return false;
    }
    if (document.reg.pno.value == "") {

        alert("Please provide your phone number.");
        document.reg.pno.focus();
        return false;
    }
    if (document.reg.addr.value == "") {

        alert("Please provide your ADDRESS.");
        document.reg.addr.focus();
        return false;
    }
    if (document.reg.fname.value == "") {

        alert("Please provide your FATHER'S NAME.");
        document.reg.fname.focus();
        return false;
    }
    if (document.reg.pass.value == "") {
        alert("Please provide your password!");
        return false;
    }
    return (true);

}


function formValidationlogin() {

    if (document.login.acco.value == "") {

        alert("Please provide your ACCOUNT NUMBER.");
        document.login.acco.focus();
        return false;
    }
    if (document.login.passwrd.value == "") {

        alert("Please provide your PASSWORD.");
        document.login.passwrd.focus();
        return false;
    }
    return (true);

}
document.getElementById("burger").addEventListener("click", () => {
    let box = document.getElementById("bgrbox");
    box.classList.toggle('bgrclass2');
})







// document.querySelector('#signup').addEventListener('click', signup);

// function signup() {
//     document.getElementById('main').style.display = "none";
//     document.getElementById('formid').style.display = "flex";
//     document.getElementById('sign-up-form').style.display = "flex";

// }
// document.getElementById('login').addEventListener('click', () => {
//     document.getElementById('login-form').style.display = "flex";
//     document.getElementById('main').style.display = "none";
//     document.getElementById('logindiv').style.display = "flex";

// });

// for night mode
// document.getElementById('moon').addEventListener('click', () => {
//     document.getElementById('moon').style.display = "none";
//     document.getElementById('sun').style.display = "block";
// });
// document.getElementById('sun').addEventListener('click', () => {
//     document.getElementById('moon').style.display = "block";
//     document.getElementById('sun').style.display = "none";
// });