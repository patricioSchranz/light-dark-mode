// -------------------------------
// VARIABLES
// -------------------------------

// --- DOM ELEMENTS ---
const
    toggleSwitch = document.querySelector('input[type="checkbox"]'),
    nav = document.querySelector('.nav'),
    currentThemeInfo = document.querySelector('.theme-switcher_mode-info-container'),
    cardImages = document.querySelectorAll('.about_card_img'),
    textBox = document.querySelector('.text-box')


// --- LOCAL STORAGE ---
const currentTheme = localStorage.getItem('theme')


// -------------------------------
// CALLBACK FUNCTIONS
// -------------------------------

// => change the src of the card images
const changeCardImages = (currentMode, activatedMode)=>{
    cardImages.forEach(cardImage =>{
        // console.log('card image src', cardImage.src)
        console.log('current mode', currentMode)

        // note: if you want to pass a variable in a regular expression, you must use the regular expression constructor 
        //       -> the literal method (/ /g) don`t understand variables as variables
        const pattern = new RegExp(currentMode, 'g')
        console.log('pattern', pattern)

        const newSrc = cardImage.src.replace(pattern, activatedMode)
        cardImage.src = newSrc
        
        // console.log(newSrc)
    })
}

// => toggle the color theme
const toggleColorTheme = (color)=>{
    // console.log('children of the theme info'currentThemeInfo.children)
    
    color === 'light'
    ? textBox.style.background = 'rgb(0 0 0 / 50%)'
    : textBox.style.background = 'rgb(255 255 255 / 50%)'

    color === 'light'
    ? currentThemeInfo.children[0].textContent = 'Light'
    : currentThemeInfo.children[0].textContent = 'Dark'

    color === 'light'
    ? currentThemeInfo.children[1].classList.replace('fa-moon', 'fa-sun')
    : currentThemeInfo.children[1].classList.replace('fa-sun', 'fa-moon')

    color === 'light'
    ? changeCardImages('_dark', '_light')
    : changeCardImages('_light', '_dark')

}


// => switch the color theme
const switchTheme = (event)=>{
    console.log(event.target.checked)

    // => when the checkbox is checked, dark mode is activated
    if(event.target.checked){
        // => set data attribute 'theme' to the root element of the document (in this case the html element), with the value 'dark'
        document.documentElement.setAttribute('data-theme', 'dark')

        // => save the user selection in the local storage
        localStorage.setItem('theme', 'dark')

        // => toggle to dark mode
        toggleColorTheme('dark')
    }
    // => when checkbox is unchecked, the light mode is active/activated
    else{
        // => set data attribute and value to the root element of the document
        document.documentElement.setAttribute('data-theme', 'light');

        // => save the user selection in the local storage
        localStorage.setItem('theme', 'light');

        // => toggle to light mode
        toggleColorTheme('light')
    }
}



// -------------------------------
// EVENT LISTENERS / HANDLERS
// -------------------------------

// => toggle the color mode
toggleSwitch.addEventListener('click', switchTheme)



// ----------------------------------------------------------
// MUST BE ALWAYS EXECUTED WHEN THE SCRIPT LOADS
// ----------------------------------------------------------

// => if there exists a theme entry in the local storage, activate the saved color theme
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme)

    if(currentTheme === 'dark'){
        toggleSwitch.checked = true
        toggleColorTheme('dark')
    }
}