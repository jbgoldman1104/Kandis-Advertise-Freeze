

class BodyState {
	private body
	// readonly #bodyPadding
	constructor() {
		this.body = document.body
		// this.#bodyPadding = useScrollbarWidth()
	}

	bodyLock() {
		// const scrollbarWidth = useScrollbarWidth()
		this.body.classList.add('lock')
		// this.#body.style.paddingLeft = `${scrollbarWidth}px`
	}

	bodyUnlock() {
		this.body.classList.remove('lock')
		this.body.style.paddingRight = '0px'
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BodyState()
