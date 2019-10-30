# ezPass
No more garbled text, ezPass creates strong passwords about stuff you like.

## How does it work?
ezPass grabs words from a Wikipedia page of your chosing, and combines them creating a long, easy to remember password.

The inspiration comes from [XKCD #936](https://xkcd.com/936/)... yeah, I know, there are lots and lots of password generators inspired by this comic, but bear with me: most of them use **dictionaries** with the most common english words, making bruteforcing really easy. On the other hand **ezPass** uses the greatest container of human knowledge in the world as its source, allowing not only way more **variety** but you can choose the **topic** of your password. *Neat, huh?*

## Is it available in \<language\>?
For now, only english is supported. I might add Italian support at some point. If you want to add support for more languages, just submit a pull request.

## Why is this better than just random characters?
For a character-by-character bruteforcing algorithm `dgFYUfigUI5_` and `HappyHorse5_` will take similar amounts of time in order to be cracked.

### So is this safer than regular passwords?
Well, *yes and no*. Words still come in a finite number, so if you have a complete enough **dictionary**, word-by-word bruteforcing could crack your password in seconds. That being said, ezPass relies on Wikipedia which means it can wield a gigantic amount of words. If you choose a **specific** enough topic, hackers will have a **tough** time cracking your password and you will hardly ever forget it.

Also, if you add some numbers and symbols at the end and/or the start of your password, it will become even safer!

#### This didn't really answer my question. Is it safe?
**Sure**, any password complex enough is safe, and the ones **ezPass** generates are also easy to remember.
Just don't **leak** them, don't use the same password on different websites and change them as often as you can.

## Can I make my own generator?
Yup, ezPass is open source and released under the MIT license. Compiling is done with [Prepros](https://prepros.io/) and the config file is included.
Sorry if the code isn't the cleanest, but if you want to improve or refactor it, you're more than welcome.

## Credits
ezPass uses the following:
- [Vue.js](https://github.com/vuejs/vue)
- [axios](https://github.com/axios/axios)
- [lodash](https://github.com/lodash/lodash)
- [v-clipboard](https://github.com/euvl/v-clipboard)
- [bulma](https://github.com/jgthms/bulma)
- [Font Awesome](https://fontawesome.com/)s
