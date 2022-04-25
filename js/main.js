let scrollBtn = document.querySelector('.scrollBtn');

scrollBtn.addEventListener('click',() => {

    window.scrollTo({
        top : '0',
        behavior : 'smooth'
    })
})
// console.log(scrollBtn)

// links sections

let sections = document.querySelectorAll('section');

let links = document.querySelectorAll('.header ul li');

links.forEach(link => {

    link.addEventListener('click',() => {

        document.querySelector('.header ul li.active').classList.remove('active');

        link.classList.add('active');

        sections.forEach(section => {

            let target = link.dataset.filter;

            if(section.classList.contains(target))
            {
                section.scrollIntoView({
                    behavior :'smooth'
                })
            }
        })
    })
})



// explore Btn

let exploreBtn = document.querySelector('.title .btn');

let hadithSection = document.querySelector('.hadith');

exploreBtn.addEventListener('click',() => {
    
    hadithSection.scrollIntoView({

        behavior : 'smooth'

    })
})


// Header Active

let header = document.querySelector('.header');



window.addEventListener('scroll',() => {

    // console.log(scrollY)

    window.scrollY > 100 ? header.classList.add('active') : header.classList.remove('active');

    if(window.scrollY > 500)
    {
        scrollBtn.classList.add('active');
    }
    else
    {
        scrollBtn.classList.remove('active');
    }
    
})

// changHadith

let hadithContainer = document.querySelector('.hadithContainer');

let number = document.querySelector('.number');

let next = document.querySelector('.next');

let prev = document.querySelector('.prev');

let hadithIndex = 0;

changHadith()
function changHadith()
{
    fetch('https://api.hadith.sutanlab.id/books/muslim?range=1-300')
    .then(response => response.json())
    .then(data => {
        
        let Hadiths = data.data.hadiths;

        next.addEventListener('click',() => {

            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
            hadithChanger()
        })

        prev.addEventListener('click',() => {

            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
            hadithChanger()
        })
        

        hadithChanger()
        function hadithChanger()
        {
            hadithContainer.innerText = Hadiths[hadithIndex].arab;
            number.innerText = `300 - ${hadithIndex + 1}`;
        }
    
    })
}

// getSurahs
let surahsContainer = document.querySelector('.surahsContainer');



getSurahs()

function getSurahs()
{

    fetch('http://api.alquran.cloud/v1/meta')

    .then(response => response.json())

    .then(data => {

        // console.log(data)

        let surahs = data.data.surahs.references;

        let numberOfSurahs = 114;

        surahsContainer.innerHTML = ``;
        for (let i = 0; i < numberOfSurahs; i++) 
        {
            surahsContainer.innerHTML +=
            `
                <div class="surah">
                    <p>${surahs[i].name}</p>
                    <p>${surahs[i].englishName} </p>
                </div>

            `
        }

        let surahsTitles = document.querySelectorAll('.surah');

        let ayat = document.querySelector('.ayat');

        let surahPopup = document.querySelector('.surah-popup');


        surahsTitles.forEach( (title,index) => {

            // console.log(title)
            // console.log(index)

            title.addEventListener('click',() => {

                fetch(`http://api.alquran.cloud/v1/surah/${index + 1} `)

                .then(response => response.json())

                .then(data => {

                    let ayats = data.data.ayahs;

                    ayat.innerHTML = ``;

                    ayats.forEach(ayah => {

                        // console.log(ayah.text);
                        // console.log(ayah.numberInSurah);

                        surahPopup.classList.add('active');

                        ayat.innerHTML +=
                        `
                            <p> (${ayah.numberInSurah}) - ${ayah.text} </p>
                        `

                    })
                })
            })

        })

        let closePopup = document.querySelector('.closePopup');

        closePopup.addEventListener('click',() =>{

            surahPopup.classList.remove('active');
            
        })
    })
}


// getPrayTimes


let cards = document.querySelector('.cards');

getPrayTimes()

function getPrayTimes()
{
    fetch('http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')

    .then(response => response.json())

    .then(data => {

        let times = data.data.timings;

        cards.innerHTML = ``;

        for (let time in times) 
        {
            // console.log(times[time])

            cards.innerHTML +=
            `   
                <div class="card">
                    <div class="circle">
                        <svg>
                            <circle cx="100" cy="100" r="100"></circle>
                        </svg>
                        <div class="pray-time">${times[time]}</div>
                    </div>
                    <p>${time}</p>
                </div>

            `
        }
    })
}

// Active Sidebar

let bars = document.querySelector('.bars');

let Sidebar = document.querySelector('.header ul');

bars.addEventListener('click',() => {

    Sidebar.classList.toggle('active');

})
