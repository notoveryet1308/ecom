import './_style.scss'
import carosuel1 from '../../images/carosuel-1.jpeg'
import carosuel2 from '../../images/carosuel-2.jpeg'
import carosuel3 from '../../images/carosuel-3.jpeg'

const carosuelData = [
	{
		src: carosuel1,
		href: '/#/electronics/mobile',
	},
	{
		src: carosuel2,
		href: '/#/electronics/mobile',
	},
	{
		src: carosuel3,
		href: '/#/fashion/men/topwear',
	},
]

const Carosuel = {
	render: ({ href, src }) => `
    <a href='${href}' class='carosuelBanner-link ${src}'>
      <div class="carosuelBanner-image" style="background-image: url(${src})">
   
      </div>
    </a>
  `,
}

const CarouselBanner = {
	afterRender: () => {
		const carosuelContainer = document.querySelector('.carosuelBanner-content')
		const initCarosuelData = carosuelData[0]
    carosuelContainer.insertAdjacentHTML('beforeend', Carosuel.render({ ...initCarosuelData }))
		let carosuelCounter = 1;
    setInterval(() => {
			if (carosuelCounter === carosuelData.length) {
				carosuelCounter = 0;
			}
			carosuelContainer.innerHTML = null
			const currentCarosuel = carosuelCounter;
			const data = carosuelData[currentCarosuel]
			carosuelContainer.insertAdjacentHTML('beforeend', Carosuel.render({ ...data }))
			carosuelCounter += 1;
		}, 5000)
	},
	render: () => `
    <div class='carosuelBanner-container'>
      <div class='carosuelBanner-content'>
        
      </div>
    </div>
  `,
}

export default CarouselBanner
