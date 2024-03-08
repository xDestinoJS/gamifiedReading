let dayCompletions = document.getElementById("dayCompletions")
let dayTemplate = document.createElement("button")

let titleEl = document.getElementById("titleEl")
let pageEl = document.getElementById("pageEl")
let daysEl = document.getElementById("daysEl")


let pages = 0
let days = 0
let pagesADay = 0

if (!Cookies.get("pages") || !Cookies.get("days") || !Cookies.get("title") || !Cookies.get("completedDays")) {
    Cookies.set('title', "")
    Cookies.set('pages', "")
    Cookies.set('days', "")
    Cookies.set("completedDays", "[]")
}

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

let completedDays = JSON.parse(Cookies.get("completedDays"))

setInterval(() => {
    pages = pageEl.value || Cookies.get("pages") || ""
    let tempDays = daysEl.value || Cookies.get("days") || ""
    let tempPagesADay = Math.ceil(pages/tempDays) 
    let title = titleEl.value || Cookies.get("title") || ""

    titleEl.value = title || ""
    pageEl.value = pages || ""
    daysEl.value = tempDays || ""

    Cookies.set("completedDays", JSON.stringify(completedDays))

    if (days != tempDays || pagesADay != tempPagesADay) {
        days = tempDays
        pagesADay = tempPagesADay

        Cookies.set('title', title)
        Cookies.set('pages', pages)
        Cookies.set('days', days)

        renderDays(days, completedDays)
    }

    const completed = document.getElementsByClassName("completed")
    completedDays = []
    
    for (let i = 0; i < completed.length; i++) {
        const day = completed[i].id;
        if (!completedDays.includes(day)) completedDays.push(day)
    }
}, 1);

function renderDays(days, completedDays){
    dayCompletions.innerHTML = ""
    
    for (let i = 0; i < days; i++) {
        const newDayButton = dayTemplate.cloneNode()
        const p = document.createElement("p")
        p.innerHTML = `${pagesADay} Pages`
        
        newDayButton.innerHTML = `Day ${i+1}`

        newDayButton.id = i+1
    
        completedDays.forEach((element, index) => {
            completedDays[index] = parseInt(element)
        });

        if (completedDays.includes(i+1)) newDayButton.classList.add("completed")
        else newDayButton.classList.remove("completed")

    console.log(completedDays)

        newDayButton.append(p)
        
        newDayButton.setAttribute("onclick", `readDay(${i+1})`)
        dayCompletions.append(newDayButton)
    }
}

function readDay(day) {
    const button = document.getElementById(day)
    
    if (button.classList.contains("completed")) button.classList.remove("completed")
    else button.classList.add("completed")

    if (button.classList.contains("completed")) {
        fireConfetti()
    }
}

let x = 0
let y = 0

function fireConfetti(){
    const count = 300,
    defaults = {
        origin: { y:0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}