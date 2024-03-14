document.body.onload = function () {
    const ads = document.querySelector('.ads'),
        close = document.querySelector('.ads__content-group-svg'),
        btnDeny = document.querySelector('.ads__content-btn-deny'),
        btnAccept = document.querySelector('.ads__content-btn-accept')

   let time =  setTimeout(function timeAds() {
            ads.classList.add('ads--show')
            close.addEventListener('click', () => {
                ads.classList.remove('ads--show')
                time = setTimeout(timeAds, 5000);
            })
            btnDeny.addEventListener('click', ()=>{
                ads.classList.remove('ads--show')
            })
            
        }, 1000)
        btnAccept.addEventListener('click', ()=>{
            clearTimeout(time)
            ads.classList.remove('ads--show')
        })
}















