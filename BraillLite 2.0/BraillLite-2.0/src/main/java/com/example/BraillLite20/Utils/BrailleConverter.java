package com.example.BraillLite20.Utils;
import java.util.*;
public class BrailleConverter {

    private static final HashMap<Character,Character> brailleMap = new HashMap<>();

    static {
        brailleMap.put('a', '\u2801');
        brailleMap.put('b', '\u2803');
        brailleMap.put('c', '\u2809');
        brailleMap.put('d', '\u2819');
        brailleMap.put('e', '\u2811');
        brailleMap.put('f', '\u280B');
        brailleMap.put('g', '\u281B');
        brailleMap.put('h', '\u2813');
        brailleMap.put('i', '\u280A');
        brailleMap.put('j', '\u281A');
        brailleMap.put('k', '\u2805');
        brailleMap.put('l', '\u2807');
        brailleMap.put('m', '\u280D');
        brailleMap.put('n', '\u281D');
        brailleMap.put('o', '\u2815');
        brailleMap.put('p', '\u280F');
        brailleMap.put('q', '\u281F');
        brailleMap.put('r', '\u2817');
        brailleMap.put('s', '\u280E');
        brailleMap.put('t', '\u281E');
        brailleMap.put('u', '\u2825');
        brailleMap.put('v', '\u2827');
        brailleMap.put('w', '\u283A');
        brailleMap.put('x', '\u282D');
        brailleMap.put('y', '\u283D');
        brailleMap.put('z', '\u2835');


        brailleMap.put(' ', ' ');

    }
    public static String toBraille(String input) {
        if (input == null) {
            return "";
        }

        StringBuilder sb = new StringBuilder();

        for (char ch : input.toLowerCase().toCharArray()) {
            Character brailleChar = brailleMap.get(ch);
            if (brailleChar != null) {
                sb.append(brailleChar);
            } else {

                sb.append(' ');
            }
        }

        return sb.toString();
    }
}
