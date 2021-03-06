const vowels = new Map([['a', true],['e', true],['i', true],['o', true],['u', true]])

const isVowel = (char) => vowels.has(char.toLowerCase())

const isLetter = (char) => char.length === 1 && char.match(/[a-z]/i)

const hasUpperCase = (str) => str.match(/[A-Z]/)

const shembetengifyWord = (word, strength) => {
	if (strength < 1) strength = 1
	if (strength > 5) strength = 5
	let finalWord = ''
	let useNextCandidate = true
	let skippedCount = 0
	for (let i = word.length - 1; i >= 0; i--) {
		let toPrepend = word[i]
		if (i != word.length - 1 && i != 0 && isVowel(word[i]) && isLetter(word[i-1]) && isLetter(word[i+1])) {
			if (useNextCandidate) {
				toPrepend = hasUpperCase(word[i]) ? word[i] + 'MB' + word[i] + 'T' + word[i] : word[i] + 'mb' + word[i] + 't' + word[i]
				skippedCount = 0
			} else {
				skippedCount++
			}
			if (strength == 1) useNextCandidate = false // 1 is special case
			else useNextCandidate = skippedCount >= 3 - (Math.ceil(strength) - 2) // If 2 skip 3, if 3 skip 2, if 4 skip 1, if 5 skip 0
		}
		finalWord = toPrepend + finalWord
	}
	return finalWord
}

const shembetengify = (str, strength) => str.split('\n').map(line => line.replace(/\s/g, ' ')).join('\n').split(' ').map(word => shembetengifyWord(word, strength)).join(' ')

const deshembetengify = (str) => {
	let finalString = ''
	for (let i = 0; i < str.length; i++) {
		finalString += str[i]
		/*
		If the current char is:
		- Not the first or within the last 6 in the string
		- Not the first in a word (is preceeded by a letter)
		- A vowel
		- Next 5 chars are in the expected shembeteng pattern, followed by non-whitespace
		Then skip the next 6 chars
		*/
		if (
			i != 0 &&
			i < str.length - 6 &&
			isLetter(str[i-1]) &&
			isVowel(str[i]) &&
			(
				str[i+1].toLowerCase() == 'm' &&
				str[i+2].toLowerCase() == 'b' &&
				str[i+3].toLowerCase() == str[i].toLowerCase() &&
				str[i+4].toLowerCase() == 't' &&
				str[i+5].toLowerCase() == str[i].toLowerCase() &&
				isLetter(str[i+6])
			)
		) {
			i += 5
		}
	}
	return finalString
}