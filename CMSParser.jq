jsoniq version "1.0" encoding "UTF-8";

(: This file was generated on Wed Jun 24, 2015 20:35 (UTC+02) by REx v5.34 which is Copyright (c) 1979-2015 by Gunther Rademacher <grd@gmx.net> :)
(: REx command line: CMSParser.ebnf -xquery -ll 2 -backtrack :)

(:~
 : The parser that was generated for the CMSParser grammar.
 :)
module namespace p="CMSParser";
declare default function namespace "http://www.w3.org/2005/xpath-functions";

(:~
 : The index of the parser state for accessing the combined
 : (i.e. level > 1) lookahead code.
 :)
declare variable $p:lk as xs:integer := 1;

(:~
 : The index of the parser state for accessing the position in the
 : input string of the begin of the token that has been shifted.
 :)
declare variable $p:b0 as xs:integer := 2;

(:~
 : The index of the parser state for accessing the position in the
 : input string of the end of the token that has been shifted.
 :)
declare variable $p:e0 as xs:integer := 3;

(:~
 : The index of the parser state for accessing the code of the
 : level-1-lookahead token.
 :)
declare variable $p:l1 as xs:integer := 4;

(:~
 : The index of the parser state for accessing the position in the
 : input string of the begin of the level-1-lookahead token.
 :)
declare variable $p:b1 as xs:integer := 5;

(:~
 : The index of the parser state for accessing the position in the
 : input string of the end of the level-1-lookahead token.
 :)
declare variable $p:e1 as xs:integer := 6;

(:~
 : The index of the parser state for accessing the token code that
 : was expected when an error was found.
 :)
declare variable $p:error as xs:integer := 7;

(:~
 : The index of the parser state that points to the first entry
 : used for collecting action results.
 :)
declare variable $p:result as xs:integer := 8;

(:~
 : The codepoint to charclass mapping for 7 bit codepoints.
 :)
declare variable $p:MAP0 as xs:integer+ :=
(
  49, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 1, 4, 1, 5,
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1, 16, 17, 18, 1, 19, 20, 20, 20, 20, 20,
  20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 23, 24, 1, 21, 1, 25, 26, 27,
  28, 29, 30, 31, 21, 32, 21, 21, 33, 34, 35, 36, 37, 21, 38, 39, 40, 41, 42, 21, 43, 44, 21, 45, 46, 47, 48, 1
);

(:~
 : The codepoint to charclass mapping for codepoints below the surrogate block.
 :)
declare variable $p:MAP1 as xs:integer+ :=
(
  108, 124, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 156, 181, 181, 181, 181, 181, 214,
  215, 213, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 247, 261, 416, 277, 331, 369, 385,
  401, 314, 314, 314, 306, 353, 345, 353, 345, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353,
  353, 353, 432, 432, 432, 432, 432, 432, 432, 338, 353, 353, 353, 353, 353, 353, 353, 353, 292, 314, 314, 315, 313,
  314, 314, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 314, 314, 314,
  314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314,
  314, 314, 314, 314, 314, 314, 352, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353,
  353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 314, 49, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1, 16, 17, 18, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 21, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12,
  19, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 1, 21, 21, 21, 21, 21, 21, 21, 21,
  21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 23, 24, 1, 21, 1, 25, 26, 27, 28, 29,
  30, 31, 21, 32, 21, 21, 33, 34, 35, 36, 37, 21, 38, 39, 40, 41, 42, 21, 43, 44, 21, 45, 46, 47, 48, 1, 2, 3, 1, 4, 1,
  5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
);

(:~
 : The codepoint to charclass mapping for codepoints above the surrogate block.
 :)
declare variable $p:MAP2 as xs:integer+ :=
(
  57344, 63744, 64976, 65008, 65536, 983040, 63743, 64975, 65007, 65533, 983039, 1114111, 1, 21, 1, 21, 21, 1
);

(:~
 : The token-set-id to DFA-initial-state mapping.
 :)
declare variable $p:INITIAL as xs:integer+ :=
(
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
);

(:~
 : The DFA transition table.
 :)
declare variable $p:TRANSITION as xs:integer+ :=
(
  979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 970, 979, 979, 979,
  979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1349, 800, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  979, 979, 909, 969, 979, 1116, 979, 979, 908, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1198, 980, 1231, 819, 979,
  979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 875, 835, 878, 979, 1057, 979, 979, 979, 979, 979, 979,
  979, 979, 979, 979, 979, 979, 979, 970, 979, 979, 908, 979, 979, 979, 979, 979, 979, 979, 979, 979, 825, 827, 979,
  843, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1041, 864, 857, 1045, 979, 979, 979, 979, 979, 979,
  979, 979, 979, 979, 979, 979, 979, 979, 886, 970, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  979, 900, 906, 979, 917, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1385, 931, 979, 1288, 979, 979, 979, 979,
  979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1450, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  979, 979, 1316, 943, 949, 1112, 967, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 978, 970, 979, 979,
  908, 979, 979, 979, 979, 979, 979, 979, 979, 979, 988, 811, 979, 1450, 997, 979, 979, 1261, 979, 1037, 1009, 979, 979,
  979, 979, 979, 979, 1020, 849, 1031, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 889, 892,
  979, 1376, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1053, 920, 923, 979, 979, 979, 979, 979, 979, 979,
  979, 979, 979, 979, 979, 979, 1067, 1065, 1075, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1098,
  1097, 979, 1450, 979, 979, 979, 1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 979,
  979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1184, 1106, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  979, 979, 979, 979, 979, 1432, 979, 979, 908, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 959, 1124, 1370, 979,
  979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1098, 1133, 1138, 1294, 1274, 979, 979, 1147, 979, 1037, 1009,
  979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 908, 1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098,
  1097, 979, 1450, 989, 979, 979, 1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098, 1155, 979, 1450, 979, 979, 870,
  1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098, 1097, 979, 1192, 979, 979, 979, 1461, 1210, 1081, 1009, 979,
  979, 979, 979, 979, 1098, 1224, 979, 1450, 979, 979, 908, 1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098, 1097,
  979, 1450, 979, 979, 979, 979, 1248, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 1395, 1242, 979, 1260, 979, 1269,
  979, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 1405, 979, 979, 979, 1282, 979, 979, 979,
  979, 979, 1098, 1097, 979, 1450, 1125, 979, 979, 979, 1339, 1314, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1364,
  1324, 1414, 908, 1202, 1234, 935, 979, 979, 979, 979, 979, 979, 1098, 1333, 1338, 1300, 979, 979, 1429, 1347, 979,
  979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 979, 979, 979, 1325, 979, 979, 979, 979, 979, 979,
  1098, 1097, 979, 1450, 1357, 979, 908, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 1139, 1384,
  1393, 979, 1403, 1413, 1180, 979, 979, 979, 979, 979, 1098, 1422, 979, 1450, 979, 979, 1012, 1023, 979, 1480, 1440,
  979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 1306, 955, 1445, 1458, 979, 979, 979, 979, 979, 979, 1098,
  1097, 979, 1450, 979, 979, 979, 1469, 979, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 1478,
  979, 1001, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 979, 979, 979, 979, 1470, 979, 979,
  979, 979, 979, 979, 979, 1168, 1174, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1086, 1488,
  1089, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1213, 1216, 979, 1162, 979, 979, 979, 979, 979, 979,
  979, 979, 979, 979, 979, 979, 979, 979, 979, 970, 979, 1252, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  806, 1496, 809, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 0, 896, 0, 44, 0, 30, 0, 0, 0, 0, 768, 0,
  0, 0, 0, 0, 0, 292, 0, 40, 0, 40, 0, 0, 30, 0, 0, 0, 0, 2048, 0, 0, 0, 0, 0, 0, 31, 0, 31, 31, 31, 0, 31, 2048, 0,
  2048, 0, 0, 30, 0, 0, 0, 0, 3200, 0, 3245, 3200, 2176, 2176, 0, 2176, 2176, 2176, 0, 2176, 0, 0, 0, 2176, 2176, 0, 0,
  0, 0, 4480, 0, 0, 0, 0, 31, 0, 0, 0, 30, 1920, 0, 0, 0, 2304, 0, 0, 0, 0, 0, 0, 3502, 0, 30, 0, 0, 0, 42, 0, 42, 42,
  42, 0, 42, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 2816, 0, 0, 0, 0, 0, 0, 3887, 0, 30, 0, 0, 0, 2560, 0, 2560, 0, 0, 0, 0,
  0, 83, 0, 0, 0, 2731, 0, 2731, 2731, 2731, 0, 2731, 0, 2688, 0, 30, 0, 0, 0, 72, 0, 0, 0, 0, 0, 4352, 0, 0, 0, 2432,
  0, 0, 0, 0, 0, 0, 30, 0, 0, 41, 0, 0, 0, 0, 0, 0, 0, 0, 40, 257, 0, 0, 0, 0, 0, 0, 0, 58, 0, 0, 419, 292, 0, 0, 0, 0,
  0, 1536, 0, 0, 0, 87, 0, 0, 0, 0, 30, 0, 65, 0, 0, 0, 0, 3200, 0, 0, 0, 0, 0, 0, 5376, 0, 0, 3200, 0, 3245, 0, 30, 0,
  0, 0, 82, 0, 0, 0, 0, 0, 2176, 0, 2176, 0, 30, 0, 0, 0, 3840, 0, 3840, 0, 0, 0, 0, 0, 3584, 0, 0, 0, 0, 4096, 0, 0, 0,
  0, 0, 0, 4096, 4096, 0, 4096, 0, 0, 30, 0, 0, 0, 82, 4864, 0, 0, 0, 0, 32, 0, 0, 0, 30, 0, 5888, 0, 0, 541, 0, 0, 0,
  0, 0, 0, 0, 4224, 0, 0, 0, 30, 0, 0, 0, 419, 0, 0, 0, 0, 0, 640, 0, 0, 4352, 0, 0, 0, 0, 0, 0, 0, 59, 0, 0, 541, 0, 0,
  33, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 70, 0, 0, 0, 0, 76, 0, 0, 541, 0, 0, 0, 37, 0, 0, 0, 6016, 0, 30, 0, 0, 0, 5760,
  5760, 5760, 0, 5760, 0, 0, 0, 30, 0, 0, 0, 4736, 0, 0, 0, 0, 0, 4224, 0, 4224, 49, 0, 49, 0, 541, 30, 0, 0, 0, 1152,
  0, 0, 0, 0, 0, 75, 0, 0, 4608, 0, 5632, 0, 0, 0, 0, 0, 0, 6016, 0, 0, 0, 0, 0, 0, 541, 0, 0, 0, 38, 0, 0, 40, 0, 0, 0,
  0, 0, 0, 1664, 0, 50, 0, 50, 48, 541, 30, 0, 0, 0, 1280, 0, 0, 0, 0, 0, 3712, 0, 0, 2944, 0, 0, 0, 0, 0, 0, 0, 76, 0,
  0, 71, 0, 73, 0, 0, 0, 0, 54, 55, 0, 57, 86, 0, 0, 0, 0, 5248, 0, 0, 0, 2560, 0, 30, 0, 0, 0, 33, 541, 30, 0, 0, 0,
  34, 541, 30, 0, 0, 0, 64, 0, 0, 0, 67, 0, 80, 0, 0, 0, 0, 0, 0, 35, 0, 53, 0, 0, 0, 0, 0, 0, 0, 85, 0, 0, 541, 0, 0,
  34, 0, 0, 0, 0, 0, 0, 0, 1792, 0, 69, 0, 0, 0, 0, 0, 0, 44, 0, 0, 5504, 0, 0, 0, 0, 56, 0, 0, 51, 0, 541, 30, 0, 0, 0,
  4352, 0, 30, 0, 0, 0, 1024, 3328, 0, 3968, 0, 3072, 0, 0, 0, 0, 0, 0, 0, 2560, 0, 62, 0, 0, 0, 0, 0, 0, 48, 0, 0, 77,
  0, 0, 0, 0, 0, 0, 66, 0, 79, 0, 0, 0, 0, 0, 0, 0, 4992, 0, 0, 541, 0, 0, 0, 39, 0, 0, 63, 0, 0, 0, 0, 0, 52, 0, 0, 0,
  0, 1408, 0, 88, 0, 0, 0, 0, 78, 0, 0, 0, 0, 541, 30, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 74, 0, 76, 68, 0, 0, 0, 0, 0, 0,
  0, 5120, 61, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 32, 0, 32, 32, 32, 0, 32, 0, 768, 0, 768, 768, 768, 0, 768
);

(:~
 : The DFA-state to expected-token-set mapping.
 :)
declare variable $p:EXPECTED as xs:integer+ :=
(
  44, 53, 57, 61, 65, 69, 73, 77, 93, 104, 97, 101, 115, 114, 83, 115, 80, 108, 115, 112, 49, 116, 114, 141, 140, 86,
  120, 123, 127, 89, 131, 146, 114, 133, 137, 145, 114, 137, 146, 114, 152, 150, 47, 153, 2, 8, 16, 256, 0, 0, 16, 1024,
  0, 32768, 65536, 0, 589824, -2147418112, 537395200, 16809992, 537395200, 81952, 65536, 22, -2147467776, 12648448,
  3489824, -2147336704, 3489824, 20267040, 3489824, 2130706560, 20267040, -2147435008, 20267104, -2147435008,
  2132344960, 8, 16, 16384, 0, 0, 0, 512, 1024, 6144, 8192, 1030, 2088, 0, 0, 0, 8192, 0, 0, 4, 6, 12582912, 262144,
  2097152, 128, 33554432, 402653184, 1073741824, 0, 0, 0, 15872, 1024, 2048, 4096, 8192, 0, 1024, 0, 0, 0, 0, 16, 0,
  1030, 8192, 0, 12288, 12289, 64, 12289, 400, 12289, 912, 17478, 4, 1024, 0, 0, 0, 64, 16, 384, 512, 0, 0, 0, 16384, 0,
  4, 8, 32, 2048, 0, 32, 0, 16, 128, 256, 0, 128
);

(:~
 : The token-string table.
 :)
declare variable $p:TOKEN as xs:string+ :=
(
  "(0)",
  "IntegerLiteral",
  "DecimalLiteral",
  "NCName",
  "StringLiteral",
  "EOF",
  "'!'",
  "'!='",
  "'$'",
  "'$avg'",
  "'$count'",
  "'$max'",
  "'$min'",
  "'$sum'",
  "'&amp;&amp;'",
  "'('",
  "')'",
  "'*'",
  "'+.'",
  "','",
  "'.'",
  "'.+'",
  "'/i'",
  "'/s'",
  "'<'",
  "'<='",
  "'='",
  "'=&amp;'",
  "'=~'",
  "'>'",
  "'>='",
  "'@'",
  "'['",
  "']'",
  "'and'",
  "'date'",
  "'exists'",
  "'false'",
  "'in'",
  "'isempty'",
  "'isnull'",
  "'not'",
  "'or'",
  "'true'",
  "'{'",
  "'||'",
  "'}'"
);

(:~
 : Match next token in input string, starting at given index, using
 : the DFA entry state for the set of tokens that are expected in
 : the current context.
 :
 : @param $input the input string.
 : @param $begin the index where to start in input string.
 : @param $token-set the expected token set id.
 : @return a sequence of three: the token code of the result token,
 : with input string begin and end positions. If there is no valid
 : token, return the negative id of the DFA state that failed, along
 : with begin and end positions of the longest viable prefix.
 :)
declare function p:match($input as xs:string,
                         $begin as xs:integer,
                         $token-set as xs:integer) as xs:integer+
{
  let $result := $p:INITIAL[1 + $token-set]
  return p:transition($input,
                      $begin,
                      $begin,
                      $begin,
                      $result,
                      $result mod 128,
                      0)
};

(:~
 : The DFA state transition function. If we are in a valid DFA state, save
 : it's result annotation, consume one input codepoint, calculate the next
 : state, and use tail recursion to do the same again. Otherwise, return
 : any valid result or a negative DFA state id in case of an error.
 :
 : @param $input the input string.
 : @param $begin the begin index of the current token in the input string.
 : @param $current the index of the current position in the input string.
 : @param $end the end index of the result in the input string.
 : @param $result the result code.
 : @param $current-state the current DFA state.
 : @param $previous-state the  previous DFA state.
 : @return a sequence of three: the token code of the result token,
 : with input string begin and end positions. If there is no valid
 : token, return the negative id of the DFA state that failed, along
 : with begin and end positions of the longest viable prefix.
 :)
declare function p:transition($input as xs:string,
                              $begin as xs:integer,
                              $current as xs:integer,
                              $end as xs:integer,
                              $result as xs:integer,
                              $current-state as xs:integer,
                              $previous-state as xs:integer) as xs:integer+
{
  if ($current-state = 0) then
    let $result := $result idiv 128
    return
      if ($result != 0) then
      (
        $result - 1,
        $begin,
        $end
      )
      else
      (
        - $previous-state,
        $begin,
        $current - 1
      )
  else
    let $c0 := (string-to-codepoints(substring($input, $current, 1)), 0)[1]
    let $c1 :=
      if ($c0 < 128) then
        $p:MAP0[1 + $c0]
      else if ($c0 < 55296) then
        let $c1 := $c0 idiv 16
        let $c2 := $c1 idiv 32
        return $p:MAP1[1 + $c0 mod 16 + $p:MAP1[1 + $c1 mod 32 + $p:MAP1[1 + $c2]]]
      else
        p:map2($c0, 1, 6)
    let $current := $current + 1
    let $i0 := 128 * $c1 + $current-state - 1
    let $i1 := $i0 idiv 8
    let $next-state := $p:TRANSITION[$i0 mod 8 + $p:TRANSITION[$i1 + 1] + 1]
    return
      if ($next-state > 127) then
        p:transition($input, $begin, $current, $current, $next-state, $next-state mod 128, $current-state)
      else
        p:transition($input, $begin, $current, $end, $result, $next-state, $current-state)
};

(:~
 : Recursively translate one 32-bit chunk of an expected token bitset
 : to the corresponding sequence of token strings.
 :
 : @param $result the result of previous recursion levels.
 : @param $chunk the 32-bit chunk of the expected token bitset.
 : @param $base-token-code the token code of bit 0 in the current chunk.
 : @return the set of token strings.
 :)
declare function p:token($result as xs:string*,
                         $chunk as xs:integer,
                         $base-token-code as xs:integer) as xs:string*
{
  if ($chunk = 0) then
    $result
  else
    p:token
    (
      ($result, if ($chunk mod 2 != 0) then $p:TOKEN[$base-token-code] else ()),
      if ($chunk < 0) then $chunk idiv 2 + 2147483648 else $chunk idiv 2,
      $base-token-code + 1
    )
};

(:~
 : Calculate expected token set for a given DFA state as a sequence
 : of strings.
 :
 : @param $state the DFA state.
 : @return the set of token strings
 :)
declare function p:expected-token-set($state as xs:integer) as xs:string*
{
  if ($state > 0) then
    for $t in 0 to 1
    let $i0 := $t * 88 + $state - 1
    let $i1 := $i0 idiv 4
    return p:token((), $p:EXPECTED[$i0 mod 4 + $p:EXPECTED[$i1 + 1] + 1], $t * 32 + 1)
  else
    ()
};

(:~
 : Classify codepoint by doing a tail recursive binary search for a
 : matching codepoint range entry in MAP2, the codepoint to charclass
 : map for codepoints above the surrogate block.
 :
 : @param $c the codepoint.
 : @param $lo the binary search lower bound map index.
 : @param $hi the binary search upper bound map index.
 : @return the character class.
 :)
declare function p:map2($c as xs:integer, $lo as xs:integer, $hi as xs:integer) as xs:integer
{
  if ($lo > $hi) then
    0
  else
    let $m := ($hi + $lo) idiv 2
    return
      if ($p:MAP2[$m] > $c) then
        p:map2($c, $lo, $m - 1)
      else if ($p:MAP2[6 + $m] < $c) then
        p:map2($c, $m + 1, $hi)
      else
        $p:MAP2[12 + $m]
};

(:~
 : Parse Projection.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Projection($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(44, $input, $state)                 (: '{' :)
  let $state := p:lookahead1(18, $input, $state)            (: '$avg' | '$count' | '$max' | '$min' | '$sum' | '*' | '@' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 17) then                       (: '*' :)
      let $state := p:shift(17, $input, $state)             (: '*' :)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:parse-AttributeList($input, $state)
      return $state
  let $state := p:lookahead1(6, $input, $state)             (: '}' :)
  let $state := p:shift(46, $input, $state)                 (: '}' :)
  return $state
};

(:~
 : Parse the 1st loop of production AttributeList (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-AttributeList-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    let $state := p:lookahead1(11, $input, $state)          (: ',' | '>' | '}' :)
    return
      if ($state[$p:l1] != 19) then                         (: ',' :)
        $state
      else
        let $state := p:shift(19, $input, $state)           (: ',' :)
        let $state := p:parse-Attribute($input, $state)
        return p:parse-AttributeList-1($input, $state)
};

(:~
 : Parse AttributeList.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-AttributeList($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-Attribute($input, $state)
  let $state := p:parse-AttributeList-1($input, $state)
  return $state
};

(:~
 : Parse Group.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Group($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(24, $input, $state)                 (: '<' :)
  let $state := p:parse-AttributeList($input, $state)
  let $state := p:shift(29, $input, $state)                 (: '>' :)
  return $state
};

(:~
 : Parse Aggregation.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Aggregation($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-Group($input, $state)
  let $state := p:lookahead1(21, $input, $state)            (: EOF | '&&' | ')' | '+.' | '.' | '.+' | '[' | '{' | '||' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 32) then                       (: '[' :)
      let $state := p:parse-Filter($input, $state)
      return $state
    else
      $state
  return $state
};

(:~
 : Parse SubQueryExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-SubQueryExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(27, $input, $state)                 (: '=&' :)
  let $state := p:parse-Query($input, $state)
  return $state
};

(:~
 : Parse ExpValue.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-ExpValue($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-StrVal($input, $state)
  let $state := p:lookahead1(16, $input, $state)            (: ')' | '/i' | '/s' | ']' | 'and' | 'or' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 22                             (: '/i' :)
          or $state[$p:l1] = 23) then                       (: '/s' :)
      let $state :=
        if ($state[$p:error]) then
          $state
        else if ($state[$p:l1] = 22) then                   (: '/i' :)
          let $state := p:shift(22, $input, $state)         (: '/i' :)
          return $state
        else if ($state[$p:error]) then
          $state
        else
          let $state := p:shift(23, $input, $state)         (: '/s' :)
          return $state
      return $state
    else
      $state
  return $state
};

(:~
 : Parse RegexExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-RegexExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(28, $input, $state)                 (: '=~' :)
  let $state := p:parse-ExpValue($input, $state)
  return $state
};

(:~
 : Parse the 1st loop of production ValueList (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-ValueList-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    let $state := p:lookahead1(7, $input, $state)           (: ')' | ',' :)
    return
      if ($state[$p:l1] != 19) then                         (: ',' :)
        $state
      else
        let $state := p:shift(19, $input, $state)           (: ',' :)
        let $state := p:parse-Value($input, $state)
        return p:parse-ValueList-1($input, $state)
};

(:~
 : Parse ValueList.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-ValueList($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(4, $input, $state)             (: '(' :)
  let $state := p:shift(15, $input, $state)                 (: '(' :)
  let $state := p:parse-Value($input, $state)
  let $state := p:parse-ValueList-1($input, $state)
  let $state := p:shift(16, $input, $state)                 (: ')' :)
  return $state
};

(:~
 : Parse InExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-InExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(38, $input, $state)                 (: 'in' :)
  let $state := p:parse-ValueList($input, $state)
  return $state
};

(:~
 : Parse DateVal.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-DateVal($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(35, $input, $state)                 (: 'date' :)
  let $state := p:lookahead1(4, $input, $state)             (: '(' :)
  let $state := p:shift(15, $input, $state)                 (: '(' :)
  let $state := p:lookahead1(0, $input, $state)             (: IntegerLiteral :)
  let $state := p:shift(1, $input, $state)                  (: IntegerLiteral :)
  let $state := p:lookahead1(5, $input, $state)             (: ')' :)
  let $state := p:shift(16, $input, $state)                 (: ')' :)
  return $state
};

(:~
 : Parse BoolVal.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-BoolVal($input as xs:string, $state as item()+) as item()+
{
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 43) then                       (: 'true' :)
      let $state := p:shift(43, $input, $state)             (: 'true' :)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:shift(37, $input, $state)             (: 'false' :)
      return $state
  return $state
};

(:~
 : Parse StrVal.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-StrVal($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(2, $input, $state)             (: StringLiteral :)
  let $state := p:shift(4, $input, $state)                  (: StringLiteral :)
  return $state
};

(:~
 : Parse DoubleVal.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-DoubleVal($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(2, $input, $state)                  (: DecimalLiteral :)
  return $state
};

(:~
 : Parse IntVal.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-IntVal($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(1, $input, $state)                  (: IntegerLiteral :)
  return $state
};

(:~
 : Parse Value.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Value($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(14, $input, $state)            (: IntegerLiteral | DecimalLiteral | StringLiteral |
                                                               'date' | 'false' | 'true' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 1) then                        (: IntegerLiteral :)
      let $state := p:parse-IntVal($input, $state)
      return $state
    else if ($state[$p:l1] = 2) then                        (: DecimalLiteral :)
      let $state := p:parse-DoubleVal($input, $state)
      return $state
    else if ($state[$p:l1] = 4) then                        (: StringLiteral :)
      let $state := p:parse-StrVal($input, $state)
      return $state
    else if ($state[$p:l1] = 35) then                       (: 'date' :)
      let $state := p:parse-DateVal($input, $state)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:parse-BoolVal($input, $state)
      return $state
  return $state
};

(:~
 : Parse CompExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-CompExpr($input as xs:string, $state as item()+) as item()+
{
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 26) then                       (: '=' :)
      let $state := p:shift(26, $input, $state)             (: '=' :)
      return $state
    else if ($state[$p:l1] = 7) then                        (: '!=' :)
      let $state := p:shift(7, $input, $state)              (: '!=' :)
      return $state
    else if ($state[$p:l1] = 29) then                       (: '>' :)
      let $state := p:shift(29, $input, $state)             (: '>' :)
      return $state
    else if ($state[$p:l1] = 24) then                       (: '<' :)
      let $state := p:shift(24, $input, $state)             (: '<' :)
      return $state
    else if ($state[$p:l1] = 30) then                       (: '>=' :)
      let $state := p:shift(30, $input, $state)             (: '>=' :)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:shift(25, $input, $state)             (: '<=' :)
      return $state
  let $state := p:parse-Value($input, $state)
  return $state
};

(:~
 : Parse IsemptyExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-IsemptyExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(39, $input, $state)                 (: 'isempty' :)
  let $state := p:parse-Attribute($input, $state)
  return $state
};

(:~
 : Parse IsnullExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-IsnullExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(40, $input, $state)                 (: 'isnull' :)
  let $state := p:parse-Attribute($input, $state)
  return $state
};

(:~
 : Parse AggFunc.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-AggFunc($input as xs:string, $state as item()+) as item()+
{
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 12) then                       (: '$min' :)
      let $state := p:shift(12, $input, $state)             (: '$min' :)
      return $state
    else if ($state[$p:l1] = 11) then                       (: '$max' :)
      let $state := p:shift(11, $input, $state)             (: '$max' :)
      return $state
    else if ($state[$p:l1] = 9) then                        (: '$avg' :)
      let $state := p:shift(9, $input, $state)              (: '$avg' :)
      return $state
    else if ($state[$p:l1] = 13) then                       (: '$sum' :)
      let $state := p:shift(13, $input, $state)             (: '$sum' :)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:shift(10, $input, $state)             (: '$count' :)
      return $state
  return $state
};

(:~
 : Parse AggregateAttr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-AggregateAttr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-AggFunc($input, $state)
  let $state := p:lookahead1(4, $input, $state)             (: '(' :)
  let $state := p:shift(15, $input, $state)                 (: '(' :)
  let $state := p:lookahead1(8, $input, $state)             (: ')' | '@' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 31) then                       (: '@' :)
      let $state := p:parse-SearchAttr($input, $state)
      return $state
    else
      $state
  let $state := p:shift(16, $input, $state)                 (: ')' :)
  return $state
};

(:~
 : Parse AttrName.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-AttrName($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(1, $input, $state)             (: NCName :)
  let $state := p:shift(3, $input, $state)                  (: NCName :)
  return $state
};

(:~
 : Parse the 1st loop of production SearchAttr (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-SearchAttr-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    let $state := p:lookahead1(27, $input, $state)          (: '!=' | ')' | ',' | '.' | '<' | '<=' | '=' | '=&' | '=~' |
                                                               '>' | '>=' | ']' | 'and' | 'in' | 'or' | '}' :)
    return
      if ($state[$p:l1] != 20) then                         (: '.' :)
        $state
      else
        let $state := p:shift(20, $input, $state)           (: '.' :)
        let $state := p:lookahead1(3, $input, $state)       (: '$' :)
        let $state := p:shift(8, $input, $state)            (: '$' :)
        let $state := p:parse-AttrName($input, $state)
        return p:parse-SearchAttr-1($input, $state)
};

(:~
 : Parse SearchAttr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-SearchAttr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(31, $input, $state)                 (: '@' :)
  let $state := p:parse-AttrName($input, $state)
  let $state := p:parse-SearchAttr-1($input, $state)
  return $state
};

(:~
 : Parse Attribute.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Attribute($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(15, $input, $state)            (: '$avg' | '$count' | '$max' | '$min' | '$sum' | '@' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 31) then                       (: '@' :)
      let $state := p:parse-SearchAttr($input, $state)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:parse-AggregateAttr($input, $state)
      return $state
  return $state
};

(:~
 : Parse ExistExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-ExistExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(36, $input, $state)                 (: 'exists' :)
  let $state := p:parse-Attribute($input, $state)
  return $state
};

(:~
 : Parse PrimaryExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-PrimaryExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(24, $input, $state)            (: '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' |
                                                               '@' | 'exists' | 'isempty' | 'isnull' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 15) then                       (: '(' :)
      let $state := p:shift(15, $input, $state)             (: '(' :)
      let $state := p:parse-Expression($input, $state)
      let $state := p:shift(16, $input, $state)             (: ')' :)
      return $state
    else if ($state[$p:l1] = 36) then                       (: 'exists' :)
      let $state := p:parse-ExistExpr($input, $state)
      return $state
    else if ($state[$p:l1] = 40) then                       (: 'isnull' :)
      let $state := p:parse-IsnullExpr($input, $state)
      return $state
    else if ($state[$p:l1] = 39) then                       (: 'isempty' :)
      let $state := p:parse-IsemptyExpr($input, $state)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:parse-Attribute($input, $state)
      let $state := p:lookahead1(22, $input, $state)        (: '!=' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'in' :)
      let $state :=
        if ($state[$p:error]) then
          $state
        else if ($state[$p:l1] = 38) then                   (: 'in' :)
          let $state := p:parse-InExpr($input, $state)
          return $state
        else if ($state[$p:l1] = 28) then                   (: '=~' :)
          let $state := p:parse-RegexExpr($input, $state)
          return $state
        else if ($state[$p:l1] = 27) then                   (: '=&' :)
          let $state := p:parse-SubQueryExpr($input, $state)
          return $state
        else if ($state[$p:error]) then
          $state
        else
          let $state := p:parse-CompExpr($input, $state)
          return $state
      return $state
  return $state
};

(:~
 : Parse NotExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-NotExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(26, $input, $state)            (: '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' |
                                                               '@' | 'exists' | 'isempty' | 'isnull' | 'not' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 41) then                       (: 'not' :)
      let $state := p:shift(41, $input, $state)             (: 'not' :)
      return $state
    else
      $state
  let $state := p:parse-PrimaryExpr($input, $state)
  return $state
};

(:~
 : Parse the 1st loop of production AndExpr (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-AndExpr-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    let $state := p:lookahead1(13, $input, $state)          (: ')' | ']' | 'and' | 'or' :)
    return
      if ($state[$p:l1] != 34) then                         (: 'and' :)
        $state
      else
        let $state := p:shift(34, $input, $state)           (: 'and' :)
        let $state := p:parse-NotExpr($input, $state)
        return p:parse-AndExpr-1($input, $state)
};

(:~
 : Parse AndExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-AndExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-NotExpr($input, $state)
  let $state := p:parse-AndExpr-1($input, $state)
  return $state
};

(:~
 : Parse the 1st loop of production OrExpr (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-OrExpr-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    if ($state[$p:l1] != 42) then                           (: 'or' :)
      $state
    else
      let $state := p:shift(42, $input, $state)             (: 'or' :)
      let $state := p:parse-AndExpr($input, $state)
      return p:parse-OrExpr-1($input, $state)
};

(:~
 : Parse OrExpr.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-OrExpr($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-AndExpr($input, $state)
  let $state := p:parse-OrExpr-1($input, $state)
  return $state
};

(:~
 : Parse Expression.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Expression($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-OrExpr($input, $state)
  return $state
};

(:~
 : Parse Filter.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Filter($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(32, $input, $state)                 (: '[' :)
  let $state := p:parse-Expression($input, $state)
  let $state := p:shift(33, $input, $state)                 (: ']' :)
  return $state
};

(:~
 : Parse NodeName.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-NodeName($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(1, $input, $state)             (: NCName :)
  let $state := p:shift(3, $input, $state)                  (: NCName :)
  let $state := p:lookahead1(25, $input, $state)            (: EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' |
                                                               '{' | '||' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 6) then                        (: '!' :)
      let $state := p:shift(6, $input, $state)              (: '!' :)
      let $state := p:lookahead1(1, $input, $state)         (: NCName :)
      let $state := p:shift(3, $input, $state)              (: NCName :)
      return $state
    else
      $state
  return $state
};

(:~
 : Parse TypeName.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-TypeName($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(1, $input, $state)             (: NCName :)
  let $state := p:shift(3, $input, $state)                  (: NCName :)
  return $state
};

(:~
 : Parse the 1st loop of production TypeCast (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-TypeCast-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    let $state := p:lookahead1(9, $input, $state)           (: ',' | '>' :)
    return
      if ($state[$p:l1] != 19) then                         (: ',' :)
        $state
      else
        let $state := p:shift(19, $input, $state)           (: ',' :)
        let $state := p:parse-TypeName($input, $state)
        return p:parse-TypeCast-1($input, $state)
};

(:~
 : Parse TypeCast.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-TypeCast($input as xs:string, $state as item()+) as item()+
{
  let $state := p:shift(24, $input, $state)                 (: '<' :)
  let $state := p:parse-TypeName($input, $state)
  let $state := p:parse-TypeCast-1($input, $state)
  let $state := p:shift(29, $input, $state)                 (: '>' :)
  return $state
};

(:~
 : Parse QueryNode.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-QueryNode($input as xs:string, $state as item()+) as item()+
{
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 24) then                       (: '<' :)
      let $state := p:parse-TypeCast($input, $state)
      return $state
    else
      $state
  let $state := p:parse-NodeName($input, $state)
  let $state := p:lookahead1(23, $input, $state)            (: EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' |
                                                               '||' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 32) then                       (: '[' :)
      let $state := p:parse-Filter($input, $state)
      return $state
    else
      $state
  let $state := p:lookahead1(20, $input, $state)            (: EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 24) then                       (: '<' :)
      let $state := p:parse-Aggregation($input, $state)
      return $state
    else
      $state
  let $state := p:lookahead1(19, $input, $state)            (: EOF | '&&' | ')' | '+.' | '.' | '.+' | '{' | '||' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 44) then                       (: '{' :)
      let $state := p:parse-Projection($input, $state)
      return $state
    else
      $state
  return $state
};

(:~
 : Parse the 1st loop of production PrimaryPath (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-PrimaryPath-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    let $state := p:lookahead1(17, $input, $state)          (: EOF | '&&' | ')' | '+.' | '.' | '.+' | '||' :)
    return
      if ($state[$p:l1] != 18                               (: '+.' :)
      and $state[$p:l1] != 20                               (: '.' :)
      and $state[$p:l1] != 21) then                         (: '.+' :)
        $state
      else
        let $state :=
          if ($state[$p:error]) then
            $state
          else if ($state[$p:l1] = 20) then                 (: '.' :)
            let $state := p:shift(20, $input, $state)       (: '.' :)
            return $state
          else if ($state[$p:l1] = 18) then                 (: '+.' :)
            let $state := p:shift(18, $input, $state)       (: '+.' :)
            return $state
          else if ($state[$p:error]) then
            $state
          else
            let $state := p:shift(21, $input, $state)       (: '.+' :)
            return $state
        let $state := p:lookahead1(10, $input, $state)      (: NCName | '(' | '<' :)
        let $state :=
          if ($state[$p:error]) then
            $state
          else if ($state[$p:l1] = 15) then                 (: '(' :)
            let $state := p:shift(15, $input, $state)       (: '(' :)
            let $state := p:parse-Path($input, $state)
            let $state := p:shift(16, $input, $state)       (: ')' :)
            return $state
          else if ($state[$p:error]) then
            $state
          else
            let $state := p:parse-QueryNode($input, $state)
            return $state
        return p:parse-PrimaryPath-1($input, $state)
};

(:~
 : Parse PrimaryPath.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-PrimaryPath($input as xs:string, $state as item()+) as item()+
{
  let $state := p:lookahead1(10, $input, $state)            (: NCName | '(' | '<' :)
  let $state :=
    if ($state[$p:error]) then
      $state
    else if ($state[$p:l1] = 15) then                       (: '(' :)
      let $state := p:shift(15, $input, $state)             (: '(' :)
      let $state := p:parse-Path($input, $state)
      let $state := p:shift(16, $input, $state)             (: ')' :)
      return $state
    else if ($state[$p:error]) then
      $state
    else
      let $state := p:parse-QueryNode($input, $state)
      let $state := p:parse-PrimaryPath-1($input, $state)
      return $state
  return $state
};

(:~
 : Parse the 1st loop of production IntersectionPath (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-IntersectionPath-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    let $state := p:lookahead1(12, $input, $state)          (: EOF | '&&' | ')' | '||' :)
    return
      if ($state[$p:l1] != 14) then                         (: '&&' :)
        $state
      else
        let $state := p:shift(14, $input, $state)           (: '&&' :)
        let $state := p:parse-PrimaryPath($input, $state)
        return p:parse-IntersectionPath-1($input, $state)
};

(:~
 : Parse IntersectionPath.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-IntersectionPath($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-PrimaryPath($input, $state)
  let $state := p:parse-IntersectionPath-1($input, $state)
  return $state
};

(:~
 : Parse the 1st loop of production UnionPath (zero or more). Use
 : tail recursion for iteratively updating the parser state.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-UnionPath-1($input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else
    if ($state[$p:l1] != 45) then                           (: '||' :)
      $state
    else
      let $state := p:shift(45, $input, $state)             (: '||' :)
      let $state := p:parse-IntersectionPath($input, $state)
      return p:parse-UnionPath-1($input, $state)
};

(:~
 : Parse UnionPath.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-UnionPath($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-IntersectionPath($input, $state)
  let $state := p:parse-UnionPath-1($input, $state)
  return $state
};

(:~
 : Parse Path.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Path($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-UnionPath($input, $state)
  return $state
};

(:~
 : Parse Query.
 :
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:parse-Query($input as xs:string, $state as item()+) as item()+
{
  let $state := p:parse-Path($input, $state)
  let $state := p:shift(5, $input, $state)                  (: EOF :)
  return $state
};

(:~
 : Create a textual error message from a parsing error.
 :
 : @param $input the input string.
 : @param $error the parsing error descriptor.
 : @return the error message.
 :)
declare function p:error-message($input as xs:string, $error as element(error)) as xs:string
{
  let $begin := xs:integer($error/@b)
  let $context := string-to-codepoints(substring($input, 1, $begin - 1))
  let $linefeeds := index-of($context, 10)
  let $line := count($linefeeds) + 1
  let $column := ($begin - $linefeeds[last()], $begin)[1]
  return
    if ($error/@o) then
      concat
      (
        "syntax error, found ", $p:TOKEN[$error/@o + 1], "&#10;",
        "while expecting ", $p:TOKEN[$error/@x + 1], "&#10;",
        "at line ", string($line), ", column ", string($column), "&#10;",
        "...", substring($input, $begin, 32), "..."
      )
    else
      let $expected := p:expected-token-set($error/@s)
      return
        concat
        (
          "lexical analysis failed&#10;",
          "while expecting ",
          "["[exists($expected[2])],
          string-join($expected, ", "),
          "]"[exists($expected[2])],
          "&#10;",
          if ($error/@e = $begin) then
            ""
          else
            concat("after successfully scanning ", string($error/@e - $begin), " characters "),
          "at line ", string($line), ", column ", string($column), "&#10;",
          "...", substring($input, $begin, 32), "..."
        )
};

(:~
 : Shift one token, i.e. compare lookahead token 1 with expected
 : token and in case of a match, shift lookahead tokens down such that
 : l1 becomes the current token, and higher lookahead tokens move down.
 : When lookahead token 1 does not match the expected token, raise an
 : error by saving the expected token code in the error field of the
 : parser state.
 :
 : @param $code the expected token.
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:shift($code as xs:integer, $input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:error]) then
    $state
  else if ($state[$p:l1] = $code) then
  (
    subsequence($state, $p:l1, $p:e1 - $p:l1 + 1),
    0,
    $state[$p:e1],
    subsequence($state, $p:e1)
  )
  else
  (
    subsequence($state, 1, $p:error - 1),
    element error
    {
      attribute b {$state[$p:b1]},
      attribute e {$state[$p:e1]},
      if ($state[$p:l1] < 0) then
        attribute s {- $state[$p:l1]}
      else
        (attribute o {$state[$p:l1]}, attribute x {$code})
    },
    subsequence($state, $p:error + 1)
  )
};

(:~
 : Lookahead one token on level 1.
 :
 : @param $set the code of the DFA entry state for the set of valid tokens.
 : @param $input the input string.
 : @param $state the parser state.
 : @return the updated parser state.
 :)
declare function p:lookahead1($set as xs:integer, $input as xs:string, $state as item()+) as item()+
{
  if ($state[$p:l1] != 0) then
    $state
  else
    let $match := p:match($input, $state[$p:b1], $set)
    return
    (
      $match[1],
      subsequence($state, $p:lk + 1, $p:l1 - $p:lk - 1),
      $match,
      subsequence($state, $p:e1 + 1)
    )
};

(:~
 : Parse start symbol Query from given string.
 :
 : @param $s the string to be parsed.
 : @return the result as generated by parser actions.
 :)
declare function p:parse-Query($s as xs:string) as item()*
{
  let $state := p:parse-Query($s, (0, 1, 1, 0, 1, 0, false()))
  let $error := $state[$p:error]
  return
    if ($error) then
      element ERROR {$error/@*, p:error-message($s, $error)}
    else
      subsequence($state, $p:result)
};

(: End :)
