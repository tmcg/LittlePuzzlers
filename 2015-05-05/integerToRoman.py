
import unittest


def integerToRoman(n):
    number = n
    result = ''

    # Reduce the problem to max three digits
    result += 'M'*(number / 1000)
    number = number % 1000

    # Pad with zeroes to ensure exactly three digits
    sn = ('000'+str(number))[-3:]

    # Determine the correct numerals for hundreds, tens, ones
    for i in range(0,3):
        cn = int(sn[i])
        (ma,mb,mc) = [('C','D','M'),('X','L','C'),('I','V','X')][i]
        if cn == 4:
            result += ma + mb
        elif cn == 9:
            result += ma + mc
        elif cn in [0,1,2,3]:
            result += ma * cn
        elif cn in [5,6,7,8]:
            result += mb + (ma * (cn - 5))

    return result


class TestIntegerToRoman(unittest.TestCase):
    def test_0(self):
        self.assertEqual(integerToRoman(0),'')

    def test_1(self):
        self.assertEqual(integerToRoman(1),'I')

    def test_3(self):
        self.assertEqual(integerToRoman(3),'III')

    def test_4(self):
        self.assertEqual(integerToRoman(4),'IV')

    def test_5(self):
        self.assertEqual(integerToRoman(5),'V')

    def test_6(self):
        self.assertEqual(integerToRoman(6),'VI')

    def test_9(self):
        self.assertEqual(integerToRoman(9),'IX')

    def test_10(self):
        self.assertEqual(integerToRoman(10),'X')

    def test_11(self):
        self.assertEqual(integerToRoman(11),'XI')

    def test_19(self):
        self.assertEqual(integerToRoman(19),'XIX')

    def test_20(self):
        self.assertEqual(integerToRoman(20),'XX')

    def test_42(self):
        self.assertEqual(integerToRoman(42),'XLII')

    def test_50(self):
        self.assertEqual(integerToRoman(50),'L')

    def test_91(self):
        self.assertEqual(integerToRoman(91),'XCI')

    def test_431(self):
        self.assertEqual(integerToRoman(442),'CDXLII')

    def test_1989(self):
        self.assertEqual(integerToRoman(1989),'MCMLXXXIX')

    def test_1984(self):
        self.assertEqual(integerToRoman(1984),'MCMLXXXIV')

    def test_1554(self):
        self.assertEqual(integerToRoman(1554),'MDLIV');

    def test_1996(self):
        self.assertEqual(integerToRoman(1996),'MCMXCVI')

    def test_2015(self):
        self.assertEqual(integerToRoman(2015),'MMXV')

    def test_3000(self):
        self.assertEqual(integerToRoman(3000),'MMM')

    def test_3001(self):
        self.assertEqual(integerToRoman(3001),'MMMI')

if __name__ == '__main__':
    unittest.main()


