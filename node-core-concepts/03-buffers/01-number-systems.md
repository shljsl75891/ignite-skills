## Binary Number System (Base 2)

The most basic unit for storing digital information is called a **bit**. A bit can be either 0 or 1.

```
1 Byte = 8 Bits
```

These is called base 2 number system because:

- We need to multiply each digit by 2 raised to the power of its position to get the decimal value.
- A bit can only have 2 possible values = 0 or 1.

(1011)<sub>2</sub> = 1 \* 2<sup>3</sup> + 0 \* 2<sup>2</sup> + 1 \* 2<sup>1</sup> + 1 \* 2<sup>0</sup> = (11)<sub>10</sub>

> The left most position is called `Most Significant Bit (MSB)` as it has the most impact in magnitude of the value. <br>
> The right most position is called `Least Significant Bit (LSB)` as it has the least impact in magnitude of the value.

## Decimal Number System (Base 10)

The decimal number system is the most common number system that we use in our daily life. It has 10 digits from 0 to 9. It is very easier to understand for humans.

It is called base 10 number system because:

- We need to multiply each digit by 10 raised to the power of its position to get the decimal value.
- A digit can have 10 possible values = 0, 1, 2, 3, 4, 5, 6, 7, 8, or 9.

(1234)<sub>10</sub> = 1 \* 10<sup>3</sup> + 2 \* 10<sup>2</sup> + 3 \* 10<sup>1</sup> + 4 \* 10<sup>0</sup>

> The left most position is called `Most Significant Digit (MSD)` as it has the most impact in magnitude of the value. <br>
> The right most position is called `Least Significant Digit (LSD)` as it has the least impact in magnitude of the value.

## Hexadecimal Number System (Base 16)

_**Ques.** We understood the binary number system exist because computer understand 0 and 1s. The decimal number exists because it is easy for humans to understand. But why do we need hexadecimal number system?_

**Ans.** Because conversion between binary and hexadecimal is insanely easy. 4 bites can be represented by a single hexadecimal digit. It is very easy to deal with hexadecimal numbers in programming and computing but not in real daily life.

(0x1A3F)<sub>16</sub> = 1 \* 16<sup>3</sup> + 10 \* 16<sup>2</sup> + 3 \* 16<sup>1</sup> + 15 \* 16<sup>0</sup> = (6719)<sub>10</sub>

Let's say we have file having contents of 4000 bits. It means it has 4000 zeroes or ones. If we represent the contents of the file in hexadecimal, it will only need 1000 characters, and it is very easy to convert it into binary.

> It is really much important to spend time learning the fundamentals compared to learning tools and frameworks which will be outdated in few years.

Hexadecimals are much common then we think. Examples:

- `#FFFFFF` = CSS Color Codes
- `%20` = space in URL encoding
- `&#xA9` = © in HTML, XHTML and XML

> As decimal and hexadecimal look similar, we generally represent hexadecimal with a prefix `0x` or `0X` to avoid confusion in UNIX.
