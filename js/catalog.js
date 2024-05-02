window.addEventListener('DOMContentLoaded', function () {
	var url = '../json/date.json',
		list = document.querySelector('.catalog-inner__products')
	async function dataBase() {
		fetch(url)
			.then(respons => respons.json())
			.then(data => {
				let key
				for (key in data) {
					list.innerHTML += `
      <div class="catalog-inner__products-item" data-category="${data[key].data}" data-product-id="${data[key].dataprod}">
                                    <img src="${data[key].image}" alt="" class="catalog-inner__products-img">
                                    <div class="catalog-inner__products-item-group">
                                        <h4 class="catalog-inner__products-item-title">${data[key].name}</h4>
                                        <p class="catalog-inner__products-price">${data[key].price}</p>
                                    </div>
                                    <button id="testBtn" class="catalog-inner__products-btn">Buy</button>
                                </div>
      `

					let btnAlls = document.querySelectorAll(
						'.catalog-inner__products-btn'
					)
					let itemCount = document.querySelector('.countBasket')
					let count = 0

					function countCards() {
						count++
						itemCount.textContent = count
					}

					let removeItem = function () {
						// count = Math.max(0, count - 1)
						count = 0
						itemCount.textContent = count
					}

					btnAlls.forEach(button => {
						button.addEventListener('click', () => {
							countCards()
							let productsItem = button.closest('.catalog-inner__products-item')
							let itemData = productsItem.dataset.productId
							let itemName = productsItem.querySelector(
								'.catalog-inner__products-item-title'
							).innerHTML
							let itemPrice = productsItem.querySelector(
								'.catalog-inner__products-price'
							).innerHTML
							let itemImgLink = productsItem.querySelector(
								'.catalog-inner__products-img'
							).src
							let basketItemList = document.querySelector('.basket-inner__list')
							let allItemBasketLi = document.querySelector(
								`li[data-product-id="${itemData}"]`
							)

							if (allItemBasketLi) {
								let countItem = allItemBasketLi.querySelector('.count')
								countItem.innerHTML = parseInt(countItem.innerHTML) + 1
							} else {
								let itemCardsLi = document.createElement('li')
								itemCardsLi.dataset.productId = itemData
								itemCardsLi.innerHTML = `<img src="${itemImgLink}" class="basket-inner__item">
				<div class="basket-content">
				<h6 class="basket-title">${itemName}</h6>
				<p class="basket-inner__peice">${itemPrice}</p>
				<div class="countGroup">
				Quantity:
				<span class="count">1</span>
				</div>
				<button class="basket-inner__remove">Remove</button>
				</div>`

								basketItemList.appendChild(itemCardsLi)

								let btnRemove = document.querySelectorAll(
									'.basket-inner__remove'
								)
								btnRemove.forEach(button => {
									button.addEventListener('click', () => {
										let itemCardsLi = button.closest('li')
										basketItemList.removeChild(itemCardsLi)
										removeItem()
										
									})
								})
							}
						})
					})
				}
			})
	}
	dataBase()
})

const filter = document.querySelector('.catalog-inner__filter-list')
filter.addEventListener('change', function () {
	document.querySelectorAll('.catalog-inner__products-item').forEach(
		function (n) {
			n.classList.toggle(
				'hidden',
				this.length && !this.includes(n.dataset.category)
			)
		},
		Array.from(this.querySelectorAll(':checked'), n => n.dataset.id)
	)
})

filter.dispatchEvent(new Event('change'))

let basketOpenIcon = document.querySelector('.basket-icon'),
	basketClose = document.querySelector('.basket__close'),
	basketOpen = document.querySelector('.basket-wrapper')

function basketOpens(open, close) {
	open.addEventListener('click', () => {
		basketOpen.classList.add('basket-main--show')
	})
	close.addEventListener('click', () => {
		basketOpen.classList.remove('basket-main--show')
	})
}
basketOpens(basketOpenIcon, basketClose)
