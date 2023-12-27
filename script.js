//OOP: Nesne Tabanlı Programlama
//Object

function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;

    this.cevabiKontrolEt = function (verilenCevap) {
        return this.dogruCevap === verilenCevap;
    }
}



let sorular = [
    new Soru ("Hangisi javascript paket  yönetim uygulamasıdır?" , { a:"Node.js", b:"Typescript", c:"Npm" }, "c"),
    new Soru ("JavaScript'te 'NaN' ifadesi neyi temsil eder?" , { a:"Not a Node", b:"Numeric Answer Negative", c:"Not a Number" }, "c"),
    new Soru ("JavaScript'te 'let' ve 'const' arasındaki fark nedir?" , { a:"let, sabit bir değişkeni tanımlamak için kullanılır.", b:"const, değeri değiştirilemeyen bir değişkeni tanımlamak için kullanılır.", c:"let, sadece döngülerde kullanılabilir" }, "b"),
    new Soru ("JavaScript'te 'hoisting' kavramı nedir??" , { a:"Fonksiyonların yukarı taşınmasıdır.", b:"Değişkenlerin tanımlanmasının önceki bir aşamada gerçekleşmesidir.", c:"JavaScript'te kullanılan bir programlama dilidir." }, "b")
]

function Quiz (sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
}

Quiz.prototype.soruGetir = function() {
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);
document.querySelector(".btn-start").addEventListener("click", function(){
    document.querySelector(".quiz_box").classList.add("active");
    soruGoster(quiz.soruGetir())
    document.querySelector(".next_btn").classList.remove("show");

})


document.querySelector(".next_btn").addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex +1) {
        soruGoster(quiz.soruGetir())
        document.querySelector(".next_btn").classList.remove("show");
        quiz.soruIndex += 1;
        } else {
            console.log("quiz bitti");
        }
})


function soruGoster(soru) {
    let question = `<span>${soru.soruMetni}</span>`;
    let options = '';

    for(let cevap in soru.cevapSecenekleri){
        options +=
        `
            <div class="option">
                <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
            </div>
        
        `;
    }

    const option_list = document.querySelector(".option_list");
    const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
    const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

    document.querySelector(".question_text").innerHTML = question;
    option_list.innerHTML = options;

    const option = option_list.querySelectorAll(".option");

    for (let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

function optionSelected(option) {
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if (soru.cevabiKontrolEt(cevap)) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);

    }

    const option_list = document.querySelector(".option_list");
    const optionArray = Array.from(option_list.children);

    for (let i = 0; i < optionArray.length; i++) {
        optionArray[i].classList.add("disabled");
    }

    document.querySelector(".next_btn").classList.add("show");

}
