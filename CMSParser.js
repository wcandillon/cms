// This file was generated on Thu Apr 23, 2015 17:18 (UTC-07) by REx v5.33 which is Copyright (c) 1979-2015 by Gunther Rademacher <grd@gmx.net>
// REx command line: CMSParser.ebnf -tree -javascript -a cms

                                                            // line 2 "CMSParser.ebnf"
                                                            var CMSParser = exports.CMSParser = function CMSParser(string, parsingEventHandler)
                                                            {
                                                              init(string, parsingEventHandler);
                                                            // line 9 "CMSParser.js"
  var self = this;

  this.ParseException = function(b, e, s, o, x)
  {
    var
      begin = b,
      end = e,
      state = s,
      offending = o,
      expected = x;

    this.getBegin = function() {return begin;};
    this.getEnd = function() {return end;};
    this.getState = function() {return state;};
    this.getExpected = function() {return expected;};
    this.getOffending = function() {return offending;};

    this.getMessage = function()
    {
      return offending < 0 ? "lexical analysis failed" : "syntax error";
    };
  };

  function init(string, parsingEventHandler)
  {
    eventHandler = parsingEventHandler;
    input = string;
    size = string.length;
    reset(0, 0, 0);
  }

  this.getInput = function()
  {
    return input;
  };

  function reset(l, b, e)
  {
            b0 = b; e0 = b;
    l1 = l; b1 = b; e1 = e;
    end = e;
    eventHandler.reset(input);
  }

  this.getOffendingToken = function(e)
  {
    var o = e.getOffending();
    return o >= 0 ? CMSParser.TOKEN[o] : null;
  };

  this.getExpectedTokenSet = function(e)
  {
    var expected;
    if (e.getExpected() < 0)
    {
      expected = CMSParser.getTokenSet(- e.getState());
    }
    else
    {
      expected = [CMSParser.TOKEN[e.getExpected()]];
    }
    return expected;
  };

  this.getErrorMessage = function(e)
  {
    var tokenSet = this.getExpectedTokenSet(e);
    var found = this.getOffendingToken(e);
    var prefix = input.substring(0, e.getBegin());
    var lines = prefix.split("\n");
    var line = lines.length;
    var column = lines[line - 1].length + 1;
    var size = e.getEnd() - e.getBegin();
    return e.getMessage()
         + (found == null ? "" : ", found " + found)
         + "\nwhile expecting "
         + (tokenSet.length == 1 ? tokenSet[0] : ("[" + tokenSet.join(", ") + "]"))
         + "\n"
         + (size == 0 || found != null ? "" : "after successfully scanning " + size + " characters beginning ")
         + "at line " + line + ", column " + column + ":\n..."
         + input.substring(e.getBegin(), Math.min(input.length, e.getBegin() + 64))
         + "...";
  };

  this.parse_Query = function()
  {
    eventHandler.startNonterminal("Query", e0);
    parse_Path();
    shift(5);                       // EOF
    eventHandler.endNonterminal("Query", e0);
  };

  function parse_Path()
  {
    eventHandler.startNonterminal("Path", e0);
    parse_UnionPath();
    eventHandler.endNonterminal("Path", e0);
  }

  function parse_UnionPath()
  {
    eventHandler.startNonterminal("UnionPath", e0);
    parse_IntersectionPath();
    for (;;)
    {
      if (l1 != 45)                 // '||'
      {
        break;
      }
      shift(45);                    // '||'
      parse_IntersectionPath();
    }
    eventHandler.endNonterminal("UnionPath", e0);
  }

  function parse_IntersectionPath()
  {
    eventHandler.startNonterminal("IntersectionPath", e0);
    parse_PrimaryPath();
    for (;;)
    {
      lookahead1(12);               // EOF | '&&' | ')' | '||'
      if (l1 != 14)                 // '&&'
      {
        break;
      }
      shift(14);                    // '&&'
      parse_PrimaryPath();
    }
    eventHandler.endNonterminal("IntersectionPath", e0);
  }

  function parse_PrimaryPath()
  {
    eventHandler.startNonterminal("PrimaryPath", e0);
    lookahead1(10);                 // NCName | '(' | '<'
    switch (l1)
    {
    case 15:                        // '('
      shift(15);                    // '('
      parse_Path();
      shift(16);                    // ')'
      break;
    default:
      parse_QueryNode();
      for (;;)
      {
        lookahead1(17);             // EOF | '&&' | ')' | '+.' | '.' | '.+' | '||'
        if (l1 != 18                // '+.'
         && l1 != 20                // '.'
         && l1 != 21)               // '.+'
        {
          break;
        }
        switch (l1)
        {
        case 20:                    // '.'
          shift(20);                // '.'
          break;
        case 18:                    // '+.'
          shift(18);                // '+.'
          break;
        default:
          shift(21);                // '.+'
        }
        lookahead1(10);             // NCName | '(' | '<'
        switch (l1)
        {
        case 15:                    // '('
          shift(15);                // '('
          parse_Path();
          shift(16);                // ')'
          break;
        default:
          parse_QueryNode();
        }
      }
    }
    eventHandler.endNonterminal("PrimaryPath", e0);
  }

  function parse_QueryNode()
  {
    eventHandler.startNonterminal("QueryNode", e0);
    if (l1 == 24)                   // '<'
    {
      parse_TypeCast();
    }
    parse_NodeName();
    lookahead1(23);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
    if (l1 == 32)                   // '['
    {
      parse_Filter();
    }
    lookahead1(20);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    if (l1 == 24)                   // '<'
    {
      parse_Aggregation();
    }
    lookahead1(19);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '{' | '||'
    if (l1 == 44)                   // '{'
    {
      parse_Projection();
    }
    eventHandler.endNonterminal("QueryNode", e0);
  }

  function parse_NodeName()
  {
    eventHandler.startNonterminal("NodeName", e0);
    lookahead1(1);                  // NCName
    shift(3);                       // NCName
    lookahead1(25);                 // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
    if (l1 == 6)                    // '!'
    {
      shift(6);                     // '!'
      lookahead1(1);                // NCName
      shift(3);                     // NCName
    }
    eventHandler.endNonterminal("NodeName", e0);
  }

  function parse_TypeCast()
  {
    eventHandler.startNonterminal("TypeCast", e0);
    shift(24);                      // '<'
    parse_TypeName();
    for (;;)
    {
      lookahead1(9);                // ',' | '>'
      if (l1 != 19)                 // ','
      {
        break;
      }
      shift(19);                    // ','
      parse_TypeName();
    }
    shift(29);                      // '>'
    eventHandler.endNonterminal("TypeCast", e0);
  }

  function parse_TypeName()
  {
    eventHandler.startNonterminal("TypeName", e0);
    lookahead1(1);                  // NCName
    shift(3);                       // NCName
    eventHandler.endNonterminal("TypeName", e0);
  }

  function parse_Aggregation()
  {
    eventHandler.startNonterminal("Aggregation", e0);
    parse_Group();
    lookahead1(21);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '[' | '{' | '||'
    if (l1 == 32)                   // '['
    {
      parse_Filter();
    }
    eventHandler.endNonterminal("Aggregation", e0);
  }

  function parse_Group()
  {
    eventHandler.startNonterminal("Group", e0);
    shift(24);                      // '<'
    parse_AttributeList();
    shift(29);                      // '>'
    eventHandler.endNonterminal("Group", e0);
  }

  function parse_Filter()
  {
    eventHandler.startNonterminal("Filter", e0);
    shift(32);                      // '['
    parse_Expression();
    shift(33);                      // ']'
    eventHandler.endNonterminal("Filter", e0);
  }

  function parse_Projection()
  {
    eventHandler.startNonterminal("Projection", e0);
    shift(44);                      // '{'
    lookahead1(18);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '*' | '@'
    switch (l1)
    {
    case 17:                        // '*'
      shift(17);                    // '*'
      break;
    default:
      parse_AttributeList();
    }
    lookahead1(6);                  // '}'
    shift(46);                      // '}'
    eventHandler.endNonterminal("Projection", e0);
  }

  function parse_AttributeList()
  {
    eventHandler.startNonterminal("AttributeList", e0);
    parse_Attribute();
    for (;;)
    {
      lookahead1(11);               // ',' | '>' | '}'
      if (l1 != 19)                 // ','
      {
        break;
      }
      shift(19);                    // ','
      parse_Attribute();
    }
    eventHandler.endNonterminal("AttributeList", e0);
  }

  function parse_Attribute()
  {
    eventHandler.startNonterminal("Attribute", e0);
    lookahead1(15);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '@'
    switch (l1)
    {
    case 31:                        // '@'
      parse_SearchAttr();
      break;
    default:
      parse_AggregateAttr();
    }
    eventHandler.endNonterminal("Attribute", e0);
  }

  function parse_SearchAttr()
  {
    eventHandler.startNonterminal("SearchAttr", e0);
    shift(31);                      // '@'
    parse_AttrName();
    for (;;)
    {
      lookahead1(27);               // '!=' | ')' | ',' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | ']' |
                                    // 'and' | 'in' | 'or' | '}'
      if (l1 != 20)                 // '.'
      {
        break;
      }
      shift(20);                    // '.'
      lookahead1(3);                // '$'
      shift(8);                     // '$'
      parse_AttrName();
    }
    eventHandler.endNonterminal("SearchAttr", e0);
  }

  function parse_AggregateAttr()
  {
    eventHandler.startNonterminal("AggregateAttr", e0);
    parse_AggFunc();
    lookahead1(4);                  // '('
    shift(15);                      // '('
    lookahead1(8);                  // ')' | '@'
    if (l1 == 31)                   // '@'
    {
      parse_SearchAttr();
    }
    shift(16);                      // ')'
    eventHandler.endNonterminal("AggregateAttr", e0);
  }

  function parse_AttrName()
  {
    eventHandler.startNonterminal("AttrName", e0);
    lookahead1(1);                  // NCName
    shift(3);                       // NCName
    eventHandler.endNonterminal("AttrName", e0);
  }

  function parse_AggFunc()
  {
    eventHandler.startNonterminal("AggFunc", e0);
    switch (l1)
    {
    case 12:                        // '$min'
      shift(12);                    // '$min'
      break;
    case 11:                        // '$max'
      shift(11);                    // '$max'
      break;
    case 9:                         // '$avg'
      shift(9);                     // '$avg'
      break;
    case 13:                        // '$sum'
      shift(13);                    // '$sum'
      break;
    default:
      shift(10);                    // '$count'
    }
    eventHandler.endNonterminal("AggFunc", e0);
  }

  function parse_Expression()
  {
    eventHandler.startNonterminal("Expression", e0);
    parse_OrExpr();
    eventHandler.endNonterminal("Expression", e0);
  }

  function parse_OrExpr()
  {
    eventHandler.startNonterminal("OrExpr", e0);
    parse_AndExpr();
    for (;;)
    {
      if (l1 != 42)                 // 'or'
      {
        break;
      }
      shift(42);                    // 'or'
      parse_AndExpr();
    }
    eventHandler.endNonterminal("OrExpr", e0);
  }

  function parse_AndExpr()
  {
    eventHandler.startNonterminal("AndExpr", e0);
    parse_NotExpr();
    for (;;)
    {
      lookahead1(13);               // ')' | ']' | 'and' | 'or'
      if (l1 != 34)                 // 'and'
      {
        break;
      }
      shift(34);                    // 'and'
      parse_NotExpr();
    }
    eventHandler.endNonterminal("AndExpr", e0);
  }

  function parse_NotExpr()
  {
    eventHandler.startNonterminal("NotExpr", e0);
    lookahead1(26);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' | '@' | 'exists' | 'isempty' |
                                    // 'isnull' | 'not'
    if (l1 == 41)                   // 'not'
    {
      shift(41);                    // 'not'
    }
    parse_PrimaryExpr();
    eventHandler.endNonterminal("NotExpr", e0);
  }

  function parse_PrimaryExpr()
  {
    eventHandler.startNonterminal("PrimaryExpr", e0);
    lookahead1(24);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' | '@' | 'exists' | 'isempty' |
                                    // 'isnull'
    switch (l1)
    {
    case 15:                        // '('
      shift(15);                    // '('
      parse_Expression();
      shift(16);                    // ')'
      break;
    case 36:                        // 'exists'
      parse_ExistExpr();
      break;
    case 40:                        // 'isnull'
      parse_IsnullExpr();
      break;
    case 39:                        // 'isempty'
      parse_IsemptyExpr();
      break;
    default:
      parse_Attribute();
      lookahead1(22);               // '!=' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'in'
      switch (l1)
      {
      case 38:                      // 'in'
        parse_InExpr();
        break;
      case 28:                      // '=~'
        parse_RegexExpr();
        break;
      case 27:                      // '=&'
        parse_SubQueryExpr();
        break;
      default:
        parse_CompExpr();
      }
    }
    eventHandler.endNonterminal("PrimaryExpr", e0);
  }

  function parse_CompExpr()
  {
    eventHandler.startNonterminal("CompExpr", e0);
    switch (l1)
    {
    case 26:                        // '='
      shift(26);                    // '='
      break;
    case 7:                         // '!='
      shift(7);                     // '!='
      break;
    case 29:                        // '>'
      shift(29);                    // '>'
      break;
    case 24:                        // '<'
      shift(24);                    // '<'
      break;
    case 30:                        // '>='
      shift(30);                    // '>='
      break;
    default:
      shift(25);                    // '<='
    }
    parse_Value();
    eventHandler.endNonterminal("CompExpr", e0);
  }

  function parse_InExpr()
  {
    eventHandler.startNonterminal("InExpr", e0);
    shift(38);                      // 'in'
    parse_ValueList();
    eventHandler.endNonterminal("InExpr", e0);
  }

  function parse_RegexExpr()
  {
    eventHandler.startNonterminal("RegexExpr", e0);
    shift(28);                      // '=~'
    parse_ExpValue();
    eventHandler.endNonterminal("RegexExpr", e0);
  }

  function parse_SubQueryExpr()
  {
    eventHandler.startNonterminal("SubQueryExpr", e0);
    shift(27);                      // '=&'
    parse_Query();
    eventHandler.endNonterminal("SubQueryExpr", e0);
  }

  function parse_ExistExpr()
  {
    eventHandler.startNonterminal("ExistExpr", e0);
    shift(36);                      // 'exists'
    parse_Attribute();
    eventHandler.endNonterminal("ExistExpr", e0);
  }

  function parse_IsnullExpr()
  {
    eventHandler.startNonterminal("IsnullExpr", e0);
    shift(40);                      // 'isnull'
    parse_Attribute();
    eventHandler.endNonterminal("IsnullExpr", e0);
  }

  function parse_IsemptyExpr()
  {
    eventHandler.startNonterminal("IsemptyExpr", e0);
    shift(39);                      // 'isempty'
    parse_Attribute();
    eventHandler.endNonterminal("IsemptyExpr", e0);
  }

  function parse_ValueList()
  {
    eventHandler.startNonterminal("ValueList", e0);
    lookahead1(4);                  // '('
    shift(15);                      // '('
    parse_Value();
    for (;;)
    {
      lookahead1(7);                // ')' | ','
      if (l1 != 19)                 // ','
      {
        break;
      }
      shift(19);                    // ','
      parse_Value();
    }
    shift(16);                      // ')'
    eventHandler.endNonterminal("ValueList", e0);
  }

  function parse_Value()
  {
    eventHandler.startNonterminal("Value", e0);
    lookahead1(14);                 // IntegerLiteral | DecimalLiteral | StringLiteral | 'date' | 'false' | 'true'
    switch (l1)
    {
    case 1:                         // IntegerLiteral
      parse_IntVal();
      break;
    case 2:                         // DecimalLiteral
      parse_DoubleVal();
      break;
    case 4:                         // StringLiteral
      parse_StrVal();
      break;
    case 35:                        // 'date'
      parse_DateVal();
      break;
    default:
      parse_BoolVal();
    }
    eventHandler.endNonterminal("Value", e0);
  }

  function parse_IntVal()
  {
    eventHandler.startNonterminal("IntVal", e0);
    shift(1);                       // IntegerLiteral
    eventHandler.endNonterminal("IntVal", e0);
  }

  function parse_DoubleVal()
  {
    eventHandler.startNonterminal("DoubleVal", e0);
    shift(2);                       // DecimalLiteral
    eventHandler.endNonterminal("DoubleVal", e0);
  }

  function parse_ExpValue()
  {
    eventHandler.startNonterminal("ExpValue", e0);
    parse_StrVal();
    lookahead1(16);                 // ')' | '/i' | '/s' | ']' | 'and' | 'or'
    if (l1 == 22                    // '/i'
     || l1 == 23)                   // '/s'
    {
      switch (l1)
      {
      case 22:                      // '/i'
        shift(22);                  // '/i'
        break;
      default:
        shift(23);                  // '/s'
      }
    }
    eventHandler.endNonterminal("ExpValue", e0);
  }

  function parse_StrVal()
  {
    eventHandler.startNonterminal("StrVal", e0);
    lookahead1(2);                  // StringLiteral
    shift(4);                       // StringLiteral
    eventHandler.endNonterminal("StrVal", e0);
  }

  function parse_BoolVal()
  {
    eventHandler.startNonterminal("BoolVal", e0);
    switch (l1)
    {
    case 43:                        // 'true'
      shift(43);                    // 'true'
      break;
    default:
      shift(37);                    // 'false'
    }
    eventHandler.endNonterminal("BoolVal", e0);
  }

  function parse_DateVal()
  {
    eventHandler.startNonterminal("DateVal", e0);
    shift(35);                      // 'date'
    lookahead1(4);                  // '('
    shift(15);                      // '('
    lookahead1(0);                  // IntegerLiteral
    shift(1);                       // IntegerLiteral
    lookahead1(5);                  // ')'
    shift(16);                      // ')'
    eventHandler.endNonterminal("DateVal", e0);
  }

  function shift(t)
  {
    if (l1 == t)
    {
      eventHandler.terminal(CMSParser.TOKEN[l1], b1, e1 > size ? size : e1);
      b0 = b1; e0 = e1; l1 = 0;
    }
    else
    {
      error(b1, e1, 0, l1, t);
    }
  }

  function lookahead1(set)
  {
    if (l1 == 0)
    {
      l1 = match(set);
      b1 = begin;
      e1 = end;
    }
  }

  function error(b, e, s, l, t)
  {
    throw new self.ParseException(b, e, s, l, t);
  }

  var     b0, e0;
  var l1, b1, e1;
  var eventHandler;

  var input;
  var size;
  var begin;
  var end;

  function match(tokenSetId)
  {
    begin = end;
    var current = end;
    var result = CMSParser.INITIAL[tokenSetId];
    var state = 0;

    for (var code = result & 127; code != 0; )
    {
      var charclass;
      var c0 = current < size ? input.charCodeAt(current) : 0;
      ++current;
      if (c0 < 0x80)
      {
        charclass = CMSParser.MAP0[c0];
      }
      else if (c0 < 0xd800)
      {
        var c1 = c0 >> 4;
        charclass = CMSParser.MAP1[(c0 & 15) + CMSParser.MAP1[(c1 & 31) + CMSParser.MAP1[c1 >> 5]]];
      }
      else
      {
        if (c0 < 0xdc00)
        {
          var c1 = current < size ? input.charCodeAt(current) : 0;
          if (c1 >= 0xdc00 && c1 < 0xe000)
          {
            ++current;
            c0 = ((c0 & 0x3ff) << 10) + (c1 & 0x3ff) + 0x10000;
          }
        }
        var lo = 0, hi = 5;
        for (var m = 3; ; m = (hi + lo) >> 1)
        {
          if (CMSParser.MAP2[m] > c0) hi = m - 1;
          else if (CMSParser.MAP2[6 + m] < c0) lo = m + 1;
          else {charclass = CMSParser.MAP2[12 + m]; break;}
          if (lo > hi) {charclass = 0; break;}
        }
      }

      state = code;
      var i0 = (charclass << 7) + code - 1;
      code = CMSParser.TRANSITION[(i0 & 7) + CMSParser.TRANSITION[i0 >> 3]];

      if (code > 127)
      {
        result = code;
        code &= 127;
        end = current;
      }
    }

    result >>= 7;
    if (result == 0)
    {
      end = current - 1;
      var c1 = end < size ? input.charCodeAt(end) : 0;
      if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      return error(begin, end, state, -1, -1);
    }

    return (result & 63) - 1;
  }
}

CMSParser.getTokenSet = function(tokenSetId)
{
  var set = [];
  var s = tokenSetId < 0 ? - tokenSetId : CMSParser.INITIAL[tokenSetId] & 127;
  for (var i = 0; i < 47; i += 32)
  {
    var j = i;
    var i0 = (i >> 5) * 88 + s - 1;
    var f = CMSParser.EXPECTED[(i0 & 3) + CMSParser.EXPECTED[i0 >> 2]];
    for ( ; f != 0; f >>>= 1, ++j)
    {
      if ((f & 1) != 0)
      {
        set.push(CMSParser.TOKEN[j]);
      }
    }
  }
  return set;
};

CMSParser.MAP0 =
[
  /*   0 */ 49, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 1,
  /*  36 */ 4, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1, 16, 17, 18, 1, 19,
  /*  65 */ 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22,
  /*  92 */ 23, 24, 1, 21, 1, 25, 26, 27, 28, 29, 30, 31, 21, 32, 21, 21, 33, 34, 35, 36, 37, 21, 38, 39, 40, 41, 42,
  /* 119 */ 21, 43, 44, 21, 45, 46, 47, 48, 1
];

CMSParser.MAP1 =
[
  /*   0 */ 108, 124, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 156, 181, 181, 181, 181,
  /*  21 */ 181, 214, 215, 213, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  42 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  63 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  84 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /* 105 */ 214, 214, 214, 247, 261, 416, 277, 331, 369, 385, 401, 314, 314, 314, 306, 353, 345, 353, 345, 353, 353,
  /* 126 */ 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 432, 432, 432, 432, 432, 432, 432,
  /* 147 */ 338, 353, 353, 353, 353, 353, 353, 353, 353, 292, 314, 314, 315, 313, 314, 314, 353, 353, 353, 353, 353,
  /* 168 */ 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 314, 314, 314, 314, 314, 314, 314, 314,
  /* 189 */ 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314,
  /* 210 */ 314, 314, 314, 352, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353,
  /* 231 */ 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 314, 49, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 256 */ 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1,
  /* 289 */ 16, 17, 18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 21, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  /* 323 */ 1, 1, 1, 1, 1, 1, 1, 12, 19, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
  /* 352 */ 1, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
  /* 379 */ 21, 22, 23, 24, 1, 21, 1, 25, 26, 27, 28, 29, 30, 31, 21, 32, 21, 21, 33, 34, 35, 36, 37, 21, 38, 39, 40,
  /* 406 */ 41, 42, 21, 43, 44, 21, 45, 46, 47, 48, 1, 2, 3, 1, 4, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 12, 12, 12, 12,
  /* 436 */ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
];

CMSParser.MAP2 =
[
  /*  0 */ 57344, 63744, 64976, 65008, 65536, 983040, 63743, 64975, 65007, 65533, 983039, 1114111, 1, 21, 1, 21, 21, 1
];

CMSParser.INITIAL =
[
  /*  0 */ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
];

CMSParser.TRANSITION =
[
  /*    0 */ 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 970, 979,
  /*   21 */ 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1349, 800, 979, 979, 979, 979, 979, 979,
  /*   42 */ 979, 979, 979, 979, 979, 979, 909, 969, 979, 1116, 979, 979, 908, 979, 979, 979, 979, 979, 979, 979, 979,
  /*   63 */ 979, 1198, 980, 1231, 819, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 875, 835, 878,
  /*   84 */ 979, 1057, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 970, 979, 979, 908, 979, 979,
  /*  105 */ 979, 979, 979, 979, 979, 979, 979, 825, 827, 979, 843, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  /*  126 */ 979, 979, 1041, 864, 857, 1045, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 886,
  /*  147 */ 970, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 900, 906, 979, 917, 979, 979,
  /*  168 */ 979, 979, 979, 979, 979, 979, 979, 979, 1385, 931, 979, 1288, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  /*  189 */ 979, 979, 979, 979, 979, 979, 1450, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1316,
  /*  210 */ 943, 949, 1112, 967, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 978, 970, 979, 979, 908,
  /*  231 */ 979, 979, 979, 979, 979, 979, 979, 979, 979, 988, 811, 979, 1450, 997, 979, 979, 1261, 979, 1037, 1009,
  /*  251 */ 979, 979, 979, 979, 979, 979, 1020, 849, 1031, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  /*  272 */ 979, 979, 889, 892, 979, 1376, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1053, 920, 923, 979,
  /*  293 */ 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1067, 1065, 1075, 979, 979, 979, 979, 979, 979,
  /*  314 */ 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 979, 1261, 979, 1037, 1009, 979, 979, 979,
  /*  334 */ 979, 979, 1098, 1097, 979, 1450, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  /*  354 */ 1184, 1106, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1432, 979, 979, 908,
  /*  375 */ 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 959, 1124, 1370, 979, 979, 979, 979, 979, 979, 979, 979,
  /*  396 */ 979, 979, 979, 979, 1098, 1133, 1138, 1294, 1274, 979, 979, 1147, 979, 1037, 1009, 979, 979, 979, 979, 979,
  /*  416 */ 1098, 1097, 979, 1450, 979, 979, 908, 1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098, 1097, 979,
  /*  435 */ 1450, 989, 979, 979, 1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098, 1155, 979, 1450, 979, 979, 870,
  /*  455 */ 1261, 979, 1037, 1009, 979, 979, 979, 979, 979, 1098, 1097, 979, 1192, 979, 979, 979, 1461, 1210, 1081,
  /*  474 */ 1009, 979, 979, 979, 979, 979, 1098, 1224, 979, 1450, 979, 979, 908, 1261, 979, 1037, 1009, 979, 979, 979,
  /*  494 */ 979, 979, 1098, 1097, 979, 1450, 979, 979, 979, 979, 1248, 979, 979, 979, 979, 979, 979, 979, 1098, 1097,
  /*  514 */ 1395, 1242, 979, 1260, 979, 1269, 979, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979,
  /*  534 */ 1405, 979, 979, 979, 1282, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 1125, 979, 979, 979, 1339, 1314,
  /*  554 */ 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1364, 1324, 1414, 908, 1202, 1234, 935, 979, 979, 979, 979,
  /*  574 */ 979, 979, 1098, 1333, 1338, 1300, 979, 979, 1429, 1347, 979, 979, 979, 979, 979, 979, 979, 979, 1098, 1097,
  /*  594 */ 979, 1450, 979, 979, 979, 979, 979, 1325, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 1357, 979,
  /*  614 */ 908, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 1139, 1384, 1393, 979, 1403, 1413,
  /*  634 */ 1180, 979, 979, 979, 979, 979, 1098, 1422, 979, 1450, 979, 979, 1012, 1023, 979, 1480, 1440, 979, 979, 979,
  /*  654 */ 979, 979, 1098, 1097, 979, 1450, 979, 979, 1306, 955, 1445, 1458, 979, 979, 979, 979, 979, 979, 1098, 1097,
  /*  674 */ 979, 1450, 979, 979, 979, 1469, 979, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979,
  /*  694 */ 1478, 979, 1001, 979, 979, 979, 979, 979, 979, 979, 1098, 1097, 979, 1450, 979, 979, 979, 979, 979, 979,
  /*  714 */ 1470, 979, 979, 979, 979, 979, 979, 979, 1168, 1174, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  /*  735 */ 979, 979, 1086, 1488, 1089, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 1213, 1216, 979,
  /*  755 */ 1162, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 979, 970, 979, 1252, 979, 979,
  /*  776 */ 979, 979, 979, 979, 979, 979, 979, 979, 979, 806, 1496, 809, 979, 979, 979, 979, 979, 979, 979, 979, 979,
  /*  797 */ 979, 979, 979, 0, 896, 0, 44, 0, 30, 0, 0, 0, 0, 768, 0, 0, 0, 0, 0, 0, 292, 0, 40, 0, 40, 0, 0, 30, 0, 0,
  /*  827 */ 0, 0, 2048, 0, 0, 0, 0, 0, 0, 31, 0, 31, 31, 31, 0, 31, 2048, 0, 2048, 0, 0, 30, 0, 0, 0, 0, 3200, 0, 3245,
  /*  856 */ 3200, 2176, 2176, 0, 2176, 2176, 2176, 0, 2176, 0, 0, 0, 2176, 2176, 0, 0, 0, 0, 4480, 0, 0, 0, 0, 31, 0,
  /*  881 */ 0, 0, 30, 1920, 0, 0, 0, 2304, 0, 0, 0, 0, 0, 0, 3502, 0, 30, 0, 0, 0, 42, 0, 42, 42, 42, 0, 42, 0, 0, 0,
  /*  911 */ 30, 0, 0, 0, 0, 0, 0, 0, 2816, 0, 0, 0, 0, 0, 0, 3887, 0, 30, 0, 0, 0, 2560, 0, 2560, 0, 0, 0, 0, 0, 83, 0,
  /*  942 */ 0, 0, 2731, 0, 2731, 2731, 2731, 0, 2731, 0, 2688, 0, 30, 0, 0, 0, 72, 0, 0, 0, 0, 0, 4352, 0, 0, 0, 2432,
  /*  969 */ 0, 0, 0, 0, 0, 0, 30, 0, 0, 41, 0, 0, 0, 0, 0, 0, 0, 0, 40, 257, 0, 0, 0, 0, 0, 0, 0, 58, 0, 0, 419, 292,
  /* 1001 */ 0, 0, 0, 0, 0, 1536, 0, 0, 0, 87, 0, 0, 0, 0, 30, 0, 65, 0, 0, 0, 0, 3200, 0, 0, 0, 0, 0, 0, 5376, 0, 0,
  /* 1032 */ 3200, 0, 3245, 0, 30, 0, 0, 0, 82, 0, 0, 0, 0, 0, 2176, 0, 2176, 0, 30, 0, 0, 0, 3840, 0, 3840, 0, 0, 0, 0,
  /* 1061 */ 0, 3584, 0, 0, 0, 0, 4096, 0, 0, 0, 0, 0, 0, 4096, 4096, 0, 4096, 0, 0, 30, 0, 0, 0, 82, 4864, 0, 0, 0, 0,
  /* 1090 */ 32, 0, 0, 0, 30, 0, 5888, 0, 0, 541, 0, 0, 0, 0, 0, 0, 0, 4224, 0, 0, 0, 30, 0, 0, 0, 419, 0, 0, 0, 0, 0,
  /* 1121 */ 640, 0, 0, 4352, 0, 0, 0, 0, 0, 0, 0, 59, 0, 0, 541, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 70, 0, 0, 0,
  /* 1153 */ 0, 76, 0, 0, 541, 0, 0, 0, 37, 0, 0, 0, 6016, 0, 30, 0, 0, 0, 5760, 5760, 5760, 0, 5760, 0, 0, 0, 30, 0, 0,
  /* 1182 */ 0, 4736, 0, 0, 0, 0, 0, 4224, 0, 4224, 49, 0, 49, 0, 541, 30, 0, 0, 0, 1152, 0, 0, 0, 0, 0, 75, 0, 0, 4608,
  /* 1211 */ 0, 5632, 0, 0, 0, 0, 0, 0, 6016, 0, 0, 0, 0, 0, 0, 541, 0, 0, 0, 38, 0, 0, 40, 0, 0, 0, 0, 0, 0, 1664, 0,
  /* 1242 */ 50, 0, 50, 48, 541, 30, 0, 0, 0, 1280, 0, 0, 0, 0, 0, 3712, 0, 0, 2944, 0, 0, 0, 0, 0, 0, 0, 76, 0, 0, 71,
  /* 1272 */ 0, 73, 0, 0, 0, 0, 54, 55, 0, 57, 86, 0, 0, 0, 0, 5248, 0, 0, 0, 2560, 0, 30, 0, 0, 0, 33, 541, 30, 0, 0,
  /* 1302 */ 0, 34, 541, 30, 0, 0, 0, 64, 0, 0, 0, 67, 0, 80, 0, 0, 0, 0, 0, 0, 35, 0, 53, 0, 0, 0, 0, 0, 0, 0, 85, 0,
  /* 1334 */ 0, 541, 0, 0, 34, 0, 0, 0, 0, 0, 0, 0, 1792, 0, 69, 0, 0, 0, 0, 0, 0, 44, 0, 0, 5504, 0, 0, 0, 0, 56, 0, 0,
  /* 1366 */ 51, 0, 541, 30, 0, 0, 0, 4352, 0, 30, 0, 0, 0, 1024, 3328, 0, 3968, 0, 3072, 0, 0, 0, 0, 0, 0, 0, 2560, 0,
  /* 1394 */ 62, 0, 0, 0, 0, 0, 0, 48, 0, 0, 77, 0, 0, 0, 0, 0, 0, 66, 0, 79, 0, 0, 0, 0, 0, 0, 0, 4992, 0, 0, 541, 0,
  /* 1426 */ 0, 0, 39, 0, 0, 63, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 1408, 0, 88, 0, 0, 0, 0, 78, 0, 0, 0, 0, 541, 30, 0, 0,
  /* 1458 */ 0, 0, 81, 0, 0, 0, 0, 0, 74, 0, 76, 68, 0, 0, 0, 0, 0, 0, 0, 5120, 61, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 32,
  /* 1490 */ 0, 32, 32, 32, 0, 32, 0, 768, 0, 768, 768, 768, 0, 768
];

CMSParser.EXPECTED =
[
  /*   0 */ 44, 53, 57, 61, 65, 69, 73, 77, 93, 104, 97, 101, 115, 114, 83, 115, 80, 108, 115, 112, 49, 116, 114, 141,
  /*  24 */ 140, 86, 120, 123, 127, 89, 131, 146, 114, 133, 137, 145, 114, 137, 146, 114, 152, 150, 47, 153, 2, 8, 16,
  /*  47 */ 256, 0, 0, 16, 1024, 0, 32768, 65536, 0, 589824, -2147418112, 537395200, 16809992, 537395200, 81952, 65536,
  /*  63 */ 22, -2147467776, 12648448, 3489824, -2147336704, 3489824, 20267040, 3489824, 2130706560, 20267040,
  /*  73 */ -2147435008, 20267104, -2147435008, 2132344960, 8, 16, 16384, 0, 0, 0, 512, 1024, 6144, 8192, 1030, 2088, 0,
  /*  90 */ 0, 0, 8192, 0, 0, 4, 6, 12582912, 262144, 2097152, 128, 33554432, 402653184, 1073741824, 0, 0, 0, 15872,
  /* 108 */ 1024, 2048, 4096, 8192, 0, 1024, 0, 0, 0, 0, 16, 0, 1030, 8192, 0, 12288, 12289, 64, 12289, 400, 12289, 912,
  /* 130 */ 17478, 4, 1024, 0, 0, 0, 64, 16, 384, 512, 0, 0, 0, 16384, 0, 4, 8, 32, 2048, 0, 32, 0, 16, 128, 256, 0,
  /* 156 */ 128
];

CMSParser.TOKEN =
[
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
  "'&&'",
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
  "'=&'",
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
];

// End
