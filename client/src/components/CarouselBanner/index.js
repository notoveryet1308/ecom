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
		const carosuelLinks = [...document.querySelectorAll('.carosuelBanner-link')]
		let carosuelCounter = 0
		setInterval(() => {
			if (carosuelLinks.length === carosuelCounter) {
				carosuelCounter = 0
				carosuelLinks.forEach((node) => {
					node.style.transform = null
				})
			}
			const currentCarosuel = carosuelLinks[carosuelCounter]
			currentCarosuel.style.transform = `translateX(${-(
				carosuelCounter * 100
			)}%)`

			carosuelCounter += 1
		}, 5000)
	},
	render: () => `
    <div class='carosuelBanner-container'>
      <div class='carosuelBanner-content' style="width: ${
				carosuelData.length * 100
			}%">
         ${carosuelData.map((el) => Carosuel.render({ ...el })).join('\n')}
      </div>
    </div>
  `,
}

export default CarouselBanner
