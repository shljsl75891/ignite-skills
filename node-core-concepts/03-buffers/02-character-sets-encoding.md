# Character Sets and Character Encoding

## Character Sets

Now, as we know computed only can understand binary numbers. Then a question come to mind, how computers understand characters? The answer is _Character Sets._

Character sets are a kind of mapping b/w characters and numbers. The two most commpon character sets are:

- **[Unicode](https://home.unicode.org/)**:
  - A standard tht define letters, digits, and symbols from all languages, and assigns them a unique number worldwide.
  - People and Language Experts work together to ensure that every character is represented.
  - This keep growing with new versions, adding new characters as needed. As of v15.1, it contains 1,49,813 characters.
- **ASCII**: American Standard Code for Information Interchange. We also have ASCII character set. It is for **_English_** language only.
  - It is a subset of Unicode, containing 128 characters.
  - Each character is represented by a number from 0 to 127.
  - It includes letters, digits, punctuation marks, and control characters.
  - It is not growing anymore, as it is a fixed set of characters.
  - Each ASCII character is represented by 8 bits, and MSB (Most Significant Bit) is always 0.

> Simply type the following command in your terminal to see the ASCII character set:
>
> ```sh
> man ascii
> ```

Through these character sets, we have a way to represent characters in form of numbers. For example, letter `s` = (115)<sub>10</sub> = (01110011)<sub>2</sub> in Unicode and ASCII.

## Character Encoding

On top of these character sets, we have **Character Encoding** (One of the most importnant encoding system in computers).

> It is a system of assigning a sequence of bytes (zeroes and ones) to a character.

**ENCODERS** - They are responsible for converting something meaningful to humans into binary numbers. Eg. Text, Images, Audio, Video, PDF etc to Binary Numbers.

```
Meaningful to Humans -> Encoders -> Binary Numbers
```

**DECODERS** - They are responsible for converting binary numbers back to something meaningful to humans. Eg. Binary Numbers to Text, Images, Audio, Video, PDF etc.

```
Binary Numbers -> Decoders -> Meaningful to Humans
```

#### We should appreciate the fact that:

- This is builtin into the core of all operating systems. If any operating system is without character encoding, we can't deal with text, characters, symbols, strings etc. in that.
- As we keep typing, the character encoding system will convert the characters into binary numbers using some kind of encoder, and store them in memory.
- When we read the text, the character encoding system will convert the binary numbers back to characters using some kind of decoder. This everything happens behind the scenes, and we don't have to worry about it.

> UTF-8 = (Unicode Transformation Format)-8 here means the 8 bits are used to represent each character.

In another character encoding system, we can see same characters will be stored in completely different way. If we encode characters using different encoding and decode them using different encoding, we will get completely different characters, or may be weird characters. So, it is very important to use the same encoding for both encoding and decoding.
