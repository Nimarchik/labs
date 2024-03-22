document.addEventListener('DOMContentLoaded', function () {
	var url = '../json/date.json',
		list = document.querySelector('.catalog-inner__products')

	async function dataBase() {
		fetch(url)
			.then(respons => respons.json())
			.then(data => {
				let key
				for (key in data) {
					list.innerHTML += `
      <div class="catalog-inner__products-item">
                                    <img src="${data[key].image}" alt="" class="catalog-inner__products-img">
                                    <div class="catalog-inner__products-item-group">
                                        <h4 class="catalog-inner__products-item-title">${data[key].name}</h4>
                                        <p class="catalog-inner__products-price">${data[key].price}</p>
                                    </div>
                                    <button class="catalog-inner__products-btn">Buy</button>
                                </div>
      `
				}
			})
	}

	dataBase()
})
