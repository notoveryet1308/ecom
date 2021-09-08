import './_style.scss'

const LinkButtonPrimary = {
	render: ({ to, display }) => `
    <div class='button-container'>
      <a href='#${to}' class='linkButton linkButton-Primary button'>${display}</a>
    </div>
  `,
}

const LinkIconButton = {
	render: ({ to, display, icon }) => `
  <div class='button-container'>
  
  <a href='#${to}' class='linkButton linkIconButton'>
  <i class="ph-${icon} icon"></i>
  ${display}
  </a>
</div>
  `,
}

export { LinkButtonPrimary, LinkIconButton }
