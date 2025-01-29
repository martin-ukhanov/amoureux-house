let isIntroComplete = $state(false);

export class IsIntroComplete {
	static get() {
		return isIntroComplete;
	}

	static set(isComplete: boolean) {
		isIntroComplete = isComplete;
	}
}
