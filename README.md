# ezPass
No more garbled text, ezPass creates strong passwords about stuff you like.

## How does it work?
ezPass grabs words from a Wikipedia page of your chosing, and combines them creating a long, easy to remember password.
The inspiration comes from [XKCD #936](https://xkcd.com/936/). Yeah, I know, there are lots and lots of password generators inspired by this comic, but bear with me:
The majority of them use hardcoded dictionaries with the most common english words, making bruteforcing really easy. On the other hand *ezPass* uses the greatest container of human knowledge in the world as its source, allowing not only way more *diversification* but you can choose the *topic* of your password. Neat, huh?

## Is it available in <language>?
For now, only english is supported. I might add Italian support at some point. If you want to add support for more languages, just submit a pull request. 

## Is it actually safe?
Well, yes and no. Words still exist in a limited number, so bruteforcing with the right dictionary is still possible. But if you add some numbers and symbols at the start or at the end, you should be pretty safe out there. Also, not everyone will use word-based password, which means that bruteforcing for single characters is still mainstream.

## So is it?
Yes. Any password complex enough is safe. Just don't leak them, don't use the same password on different websites and change them as often as you can.

## Can I make my own generator?
Sure, ezPass is open source and released under the MIT license. Compiling is done with [Prepros](https://prepros.io/) and the config file is included.
Sorry if the code isn't the cleanest, but if you want to improve or refactor it, you're more than welcome.

##Credits
ezPass uses the following:
[Vue.js](https://github.com/vuejs/vue)
[axios](https://github.com/axios/axios)
[lodash](https://github.com/lodash/lodash)
[v-clipboard](https://github.com/euvl/v-clipboard)
[bulma](https://github.com/jgthms/bulma)
[Font Awesome](https://fontawesome.com/)s
