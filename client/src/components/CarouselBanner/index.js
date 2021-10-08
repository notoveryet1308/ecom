import './_style.scss'
import carosuel1 from '../../images/banner-1.jpg'
import carosuel2 from '../../images/banner-2.jpg'
import carosuel3 from '../../images/banner-3.jpg'

const carosuelData = [
  {
    src: carosuel1,
  },
  {
    src: carosuel2,
  },
  {
    src: carosuel3,
  },
]

const Carosuel = {
  render: ({ href, src }) => `
    <a  class='carosuelBanner-link ${src}'>
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
