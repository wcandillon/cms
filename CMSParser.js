// This file was generated on Wed Apr 15, 2015 16:48 (UTC-07) by REx v5.33 which is Copyright (c) 1979-2015 by Gunther Rademacher <grd@gmx.net>
// REx command line: CMSParser.ebnf -javascript -ll 3 -tree -backtrack -name CMSParser -a cms

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
    l2 = 0;
    l3 = 0;
    end = e;
    ex = -1;
    memo = {};
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

  function try_Query()
  {
    try_Path();
    shiftT(5);                      // EOF
  };

  function parse_Path()
  {
    eventHandler.startNonterminal("Path", e0);
    parse_UnionPath();
    eventHandler.endNonterminal("Path", e0);
  }

  function try_Path()
  {
    try_UnionPath();
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

  function try_UnionPath()
  {
    try_IntersectionPath();
    for (;;)
    {
      if (l1 != 45)                 // '||'
      {
        break;
      }
      shiftT(45);                   // '||'
      try_IntersectionPath();
    }
  }

  function parse_IntersectionPath()
  {
    eventHandler.startNonterminal("IntersectionPath", e0);
    parse_PrimaryPath();
    for (;;)
    {
      lookahead1(15);               // EOF | '&&' | ')' | '||'
      if (l1 != 14)                 // '&&'
      {
        break;
      }
      shift(14);                    // '&&'
      parse_PrimaryPath();
    }
    eventHandler.endNonterminal("IntersectionPath", e0);
  }

  function try_IntersectionPath()
  {
    try_PrimaryPath();
    for (;;)
    {
      lookahead1(15);               // EOF | '&&' | ')' | '||'
      if (l1 != 14)                 // '&&'
      {
        break;
      }
      shiftT(14);                   // '&&'
      try_PrimaryPath();
    }
  }

  function parse_PrimaryPath()
  {
    eventHandler.startNonterminal("PrimaryPath", e0);
    lookahead1(13);                 // NCName | '(' | '<'
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
          lookahead1(21);             // EOF | '&&' | ')' | '+.' | '.' | '.+' | '||'
          switch (l1)
          {
            case 18:                    // '+.'
            case 20:                    // '.'
            case 21:                    // '.+'
              lookahead2(13);           // NCName | '(' | '<'
              switch (lk)
              {
                case 210:                 // '+.' NCName
                case 212:                 // '.' NCName
                case 213:                 // '.+' NCName
                  lookahead3(29);         // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
                  break;
                case 978:                 // '+.' '('
                case 980:                 // '.' '('
                case 981:                 // '.+' '('
                  lookahead3(13);         // NCName | '(' | '<'
                  break;
                case 1554:                // '+.' '<'
                case 1556:                // '.' '<'
                case 1557:                // '.+' '<'
                  lookahead3(1);          // NCName
                  break;
              }
              break;
            default:
              lk = l1;
          }
          if (lk != 5                 // EOF
              && lk != 14                // '&&'
              && lk != 16                // ')'
              && lk != 45)               // '||'
          {
            lk = memoized(0, e0);
            if (lk == 0)
            {
              var b0A = b0; var e0A = e0; var l1A = l1;
              var b1A = b1; var e1A = e1; var l2A = l2;
              var b2A = b2; var e2A = e2; var l3A = l3;
              var b3A = b3; var e3A = e3;
              try
              {
                switch (l1)
                {
                  case 20:              // '.'
                    shiftT(20);         // '.'
                    break;
                  case 18:              // '+.'
                    shiftT(18);         // '+.'
                    break;
                  default:
                    shiftT(21);         // '.+'
                }
                try_PrimaryPath();
                lk = -1;
              }
              catch (p1A)
              {
                lk = -2;
              }
              b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
              b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                  b3 = b3A; e3 = e3A; end = e3A; }}}
              memoize(0, e0, lk);
            }
          }
          if (lk != -1)
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
          parse_PrimaryPath();
        }
    }
    eventHandler.endNonterminal("PrimaryPath", e0);
  }

  function try_PrimaryPath()
  {
    lookahead1(13);                 // NCName | '(' | '<'
    switch (l1)
    {
      case 15:                        // '('
        shiftT(15);                   // '('
        try_Path();
        shiftT(16);                   // ')'
        break;
      default:
        try_QueryNode();
        for (;;)
        {
          lookahead1(21);             // EOF | '&&' | ')' | '+.' | '.' | '.+' | '||'
          switch (l1)
          {
            case 18:                    // '+.'
            case 20:                    // '.'
            case 21:                    // '.+'
              lookahead2(13);           // NCName | '(' | '<'
              switch (lk)
              {
                case 210:                 // '+.' NCName
                case 212:                 // '.' NCName
                case 213:                 // '.+' NCName
                  lookahead3(29);         // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
                  break;
                case 978:                 // '+.' '('
                case 980:                 // '.' '('
                case 981:                 // '.+' '('
                  lookahead3(13);         // NCName | '(' | '<'
                  break;
                case 1554:                // '+.' '<'
                case 1556:                // '.' '<'
                case 1557:                // '.+' '<'
                  lookahead3(1);          // NCName
                  break;
              }
              break;
            default:
              lk = l1;
          }
          if (lk != 5                 // EOF
              && lk != 14                // '&&'
              && lk != 16                // ')'
              && lk != 45)               // '||'
          {
            lk = memoized(0, e0);
            if (lk == 0)
            {
              var b0A = b0; var e0A = e0; var l1A = l1;
              var b1A = b1; var e1A = e1; var l2A = l2;
              var b2A = b2; var e2A = e2; var l3A = l3;
              var b3A = b3; var e3A = e3;
              try
              {
                switch (l1)
                {
                  case 20:              // '.'
                    shiftT(20);         // '.'
                    break;
                  case 18:              // '+.'
                    shiftT(18);         // '+.'
                    break;
                  default:
                    shiftT(21);         // '.+'
                }
                try_PrimaryPath();
                memoize(0, e0A, -1);
                continue;
              }
              catch (p1A)
              {
                b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
                b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                  b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                    b3 = b3A; e3 = e3A; end = e3A; }}}
                memoize(0, e0A, -2);
                break;
              }
            }
          }
          if (lk != -1)
          {
            break;
          }
          switch (l1)
          {
            case 20:                    // '.'
              shiftT(20);               // '.'
              break;
            case 18:                    // '+.'
              shiftT(18);               // '+.'
              break;
            default:
              shiftT(21);               // '.+'
          }
          try_PrimaryPath();
        }
    }
  }

  function parse_QueryNode()
  {
    eventHandler.startNonterminal("QueryNode", e0);
    if (l1 == 24)                   // '<'
    {
      parse_TypeCast();
    }
    parse_NodeName();
    lookahead1(26);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
    if (l1 == 32)                   // '['
    {
      parse_Filter();
    }
    lookahead1(24);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    if (l1 == 24)                   // '<'
    {
      parse_Aggregation();
    }
    lookahead1(23);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '{' | '||'
    if (l1 == 44)                   // '{'
    {
      parse_Projection();
    }
    eventHandler.endNonterminal("QueryNode", e0);
  }

  function try_QueryNode()
  {
    if (l1 == 24)                   // '<'
    {
      try_TypeCast();
    }
    try_NodeName();
    lookahead1(26);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
    if (l1 == 32)                   // '['
    {
      try_Filter();
    }
    lookahead1(24);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    if (l1 == 24)                   // '<'
    {
      try_Aggregation();
    }
    lookahead1(23);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '{' | '||'
    if (l1 == 44)                   // '{'
    {
      try_Projection();
    }
  }

  function parse_NodeName()
  {
    eventHandler.startNonterminal("NodeName", e0);
    lookahead1(1);                  // NCName
    shift(3);                       // NCName
    lookahead1(29);                 // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
    if (l1 == 6)                    // '!'
    {
      shift(6);                     // '!'
      lookahead1(1);                // NCName
      shift(3);                     // NCName
    }
    eventHandler.endNonterminal("NodeName", e0);
  }

  function try_NodeName()
  {
    lookahead1(1);                  // NCName
    shiftT(3);                      // NCName
    lookahead1(29);                 // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '[' | '{' | '||'
    if (l1 == 6)                    // '!'
    {
      shiftT(6);                    // '!'
      lookahead1(1);                // NCName
      shiftT(3);                    // NCName
    }
  }

  function parse_TypeCast()
  {
    eventHandler.startNonterminal("TypeCast", e0);
    shift(24);                      // '<'
    parse_TypeName();
    for (;;)
    {
      lookahead1(12);               // ',' | '>'
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

  function try_TypeCast()
  {
    shiftT(24);                     // '<'
    try_TypeName();
    for (;;)
    {
      lookahead1(12);               // ',' | '>'
      if (l1 != 19)                 // ','
      {
        break;
      }
      shiftT(19);                   // ','
      try_TypeName();
    }
    shiftT(29);                     // '>'
  }

  function parse_TypeName()
  {
    eventHandler.startNonterminal("TypeName", e0);
    lookahead1(1);                  // NCName
    shift(3);                       // NCName
    eventHandler.endNonterminal("TypeName", e0);
  }

  function try_TypeName()
  {
    lookahead1(1);                  // NCName
    shiftT(3);                      // NCName
  }

  function parse_Aggregation()
  {
    eventHandler.startNonterminal("Aggregation", e0);
    parse_Group();
    lookahead1(25);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '[' | '{' | '||'
    if (l1 == 32)                   // '['
    {
      parse_Filter();
    }
    eventHandler.endNonterminal("Aggregation", e0);
  }

  function try_Aggregation()
  {
    try_Group();
    lookahead1(25);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '[' | '{' | '||'
    if (l1 == 32)                   // '['
    {
      try_Filter();
    }
  }

  function parse_Group()
  {
    eventHandler.startNonterminal("Group", e0);
    shift(24);                      // '<'
    parse_AttributeList();
    shift(29);                      // '>'
    eventHandler.endNonterminal("Group", e0);
  }

  function try_Group()
  {
    shiftT(24);                     // '<'
    try_AttributeList();
    shiftT(29);                     // '>'
  }

  function parse_Filter()
  {
    eventHandler.startNonterminal("Filter", e0);
    shift(32);                      // '['
    parse_Expression();
    shift(33);                      // ']'
    eventHandler.endNonterminal("Filter", e0);
  }

  function try_Filter()
  {
    shiftT(32);                     // '['
    try_Expression();
    shiftT(33);                     // ']'
  }

  function parse_Projection()
  {
    eventHandler.startNonterminal("Projection", e0);
    shift(44);                      // '{'
    lookahead1(22);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '*' | '@'
    switch (l1)
    {
      case 17:                        // '*'
        shift(17);                    // '*'
        break;
      default:
        parse_AttributeList();
    }
    lookahead1(9);                  // '}'
    shift(46);                      // '}'
    eventHandler.endNonterminal("Projection", e0);
  }

  function try_Projection()
  {
    shiftT(44);                     // '{'
    lookahead1(22);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '*' | '@'
    switch (l1)
    {
      case 17:                        // '*'
        shiftT(17);                   // '*'
        break;
      default:
        try_AttributeList();
    }
    lookahead1(9);                  // '}'
    shiftT(46);                     // '}'
  }

  function parse_AttributeList()
  {
    eventHandler.startNonterminal("AttributeList", e0);
    parse_Attribute();
    for (;;)
    {
      lookahead1(14);               // ',' | '>' | '}'
      if (l1 != 19)                 // ','
      {
        break;
      }
      shift(19);                    // ','
      parse_Attribute();
    }
    eventHandler.endNonterminal("AttributeList", e0);
  }

  function try_AttributeList()
  {
    try_Attribute();
    for (;;)
    {
      lookahead1(14);               // ',' | '>' | '}'
      if (l1 != 19)                 // ','
      {
        break;
      }
      shiftT(19);                   // ','
      try_Attribute();
    }
  }

  function parse_Attribute()
  {
    eventHandler.startNonterminal("Attribute", e0);
    lookahead1(19);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '@'
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

  function try_Attribute()
  {
    lookahead1(19);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '@'
    switch (l1)
    {
      case 31:                        // '@'
        try_SearchAttr();
        break;
      default:
        try_AggregateAttr();
    }
  }

  function parse_SearchAttr()
  {
    eventHandler.startNonterminal("SearchAttr", e0);
    shift(31);                      // '@'
    parse_AttrName();
    for (;;)
    {
      lookahead1(31);               // '!=' | ')' | ',' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | ']' |
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

  function try_SearchAttr()
  {
    shiftT(31);                     // '@'
    try_AttrName();
    for (;;)
    {
      lookahead1(31);               // '!=' | ')' | ',' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | ']' |
                                    // 'and' | 'in' | 'or' | '}'
      if (l1 != 20)                 // '.'
      {
        break;
      }
      shiftT(20);                   // '.'
      lookahead1(3);                // '$'
      shiftT(8);                    // '$'
      try_AttrName();
    }
  }

  function parse_AggregateAttr()
  {
    eventHandler.startNonterminal("AggregateAttr", e0);
    parse_AggFunc();
    lookahead1(4);                  // '('
    shift(15);                      // '('
    lookahead1(11);                 // ')' | '@'
    if (l1 == 31)                   // '@'
    {
      parse_SearchAttr();
    }
    shift(16);                      // ')'
    eventHandler.endNonterminal("AggregateAttr", e0);
  }

  function try_AggregateAttr()
  {
    try_AggFunc();
    lookahead1(4);                  // '('
    shiftT(15);                     // '('
    lookahead1(11);                 // ')' | '@'
    if (l1 == 31)                   // '@'
    {
      try_SearchAttr();
    }
    shiftT(16);                     // ')'
  }

  function parse_AttrName()
  {
    eventHandler.startNonterminal("AttrName", e0);
    lookahead1(1);                  // NCName
    shift(3);                       // NCName
    eventHandler.endNonterminal("AttrName", e0);
  }

  function try_AttrName()
  {
    lookahead1(1);                  // NCName
    shiftT(3);                      // NCName
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

  function try_AggFunc()
  {
    switch (l1)
    {
      case 12:                        // '$min'
        shiftT(12);                   // '$min'
        break;
      case 11:                        // '$max'
        shiftT(11);                   // '$max'
        break;
      case 9:                         // '$avg'
        shiftT(9);                    // '$avg'
        break;
      case 13:                        // '$sum'
        shiftT(13);                   // '$sum'
        break;
      default:
        shiftT(10);                   // '$count'
    }
  }

  function parse_Expression()
  {
    eventHandler.startNonterminal("Expression", e0);
    parse_OrExpr();
    eventHandler.endNonterminal("Expression", e0);
  }

  function try_Expression()
  {
    try_OrExpr();
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

  function try_OrExpr()
  {
    try_AndExpr();
    for (;;)
    {
      if (l1 != 42)                 // 'or'
      {
        break;
      }
      shiftT(42);                   // 'or'
      try_AndExpr();
    }
  }

  function parse_AndExpr()
  {
    eventHandler.startNonterminal("AndExpr", e0);
    parse_NotExpr();
    for (;;)
    {
      lookahead1(16);               // ')' | ']' | 'and' | 'or'
      if (l1 != 34)                 // 'and'
      {
        break;
      }
      shift(34);                    // 'and'
      parse_NotExpr();
    }
    eventHandler.endNonterminal("AndExpr", e0);
  }

  function try_AndExpr()
  {
    try_NotExpr();
    for (;;)
    {
      lookahead1(16);               // ')' | ']' | 'and' | 'or'
      if (l1 != 34)                 // 'and'
      {
        break;
      }
      shiftT(34);                   // 'and'
      try_NotExpr();
    }
  }

  function parse_NotExpr()
  {
    eventHandler.startNonterminal("NotExpr", e0);
    lookahead1(30);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' | '@' | 'exists' | 'isempty' |
                                    // 'isnull' | 'not'
    if (l1 == 41)                   // 'not'
    {
      shift(41);                    // 'not'
    }
    parse_PrimaryExpr();
    eventHandler.endNonterminal("NotExpr", e0);
  }

  function try_NotExpr()
  {
    lookahead1(30);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' | '@' | 'exists' | 'isempty' |
                                    // 'isnull' | 'not'
    if (l1 == 41)                   // 'not'
    {
      shiftT(41);                   // 'not'
    }
    try_PrimaryExpr();
  }

  function parse_PrimaryExpr()
  {
    eventHandler.startNonterminal("PrimaryExpr", e0);
    lookahead1(28);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' | '@' | 'exists' | 'isempty' |
                                    // 'isnull'
    switch (l1)
    {
      case 31:                        // '@'
        lookahead2(1);                // NCName
        switch (lk)
        {
          case 223:                     // '@' NCName
            lookahead3(27);             // '!=' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'in'
            break;
        }
        break;
      case 9:                         // '$avg'
      case 10:                        // '$count'
      case 11:                        // '$max'
      case 12:                        // '$min'
      case 13:                        // '$sum'
        lookahead2(4);                // '('
        switch (lk)
        {
          case 969:                     // '$avg' '('
          case 970:                     // '$count' '('
          case 971:                     // '$max' '('
          case 972:                     // '$min' '('
          case 973:                     // '$sum' '('
            lookahead3(11);             // ')' | '@'
            break;
        }
        break;
      default:
        lk = l1;
    }
    if (lk == 66505                 // '$avg' '(' ')'
        || lk == 66506                 // '$count' '(' ')'
        || lk == 66507                 // '$max' '(' ')'
        || lk == 66508                 // '$min' '(' ')'
        || lk == 66509                 // '$sum' '(' ')'
        || lk == 82143                 // '@' NCName '.'
        || lk == 127945                // '$avg' '(' '@'
        || lk == 127946                // '$count' '(' '@'
        || lk == 127947                // '$max' '(' '@'
        || lk == 127948                // '$min' '(' '@'
        || lk == 127949)               // '$sum' '(' '@'
    {
      lk = memoized(1, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2; var l3A = l3;
        var b3A = b3; var e3A = e3;
        try
        {
          try_CompExpr();
          lk = -2;
        }
        catch (p2A)
        {
          try
          {
            b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
            b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
              b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                b3 = b3A; e3 = e3A; end = e3A; }}}
            try_InExpr();
            lk = -3;
          }
          catch (p3A)
          {
            try
            {
              b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
              b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                  b3 = b3A; e3 = e3A; end = e3A; }}}
              try_RegexExpr();
              lk = -4;
            }
            catch (p4A)
            {
              lk = -6;
            }
          }
        }
        b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
        b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
          b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
            b3 = b3A; e3 = e3A; end = e3A; }}}
        memoize(1, e0, lk);
      }
    }
    switch (lk)
    {
      case 15:                        // '('
        shift(15);                    // '('
        parse_Expression();
        shift(16);                    // ')'
        break;
      case -3:
      case 155871:                    // '@' NCName 'in'
        parse_InExpr();
        break;
      case -4:
      case 114911:                    // '@' NCName '=~'
        parse_RegexExpr();
        break;
      case 36:                        // 'exists'
        parse_ExistExpr();
        break;
      case -6:
      case 110815:                    // '@' NCName '=&'
        parse_SubQueryExpr();
        break;
      case 40:                        // 'isnull'
        parse_IsnullExpr();
        break;
      case 39:                        // 'isempty'
        parse_IsemptyExpr();
        break;
      default:
        parse_CompExpr();
    }
    eventHandler.endNonterminal("PrimaryExpr", e0);
  }

  function try_PrimaryExpr()
  {
    lookahead1(28);                 // '$avg' | '$count' | '$max' | '$min' | '$sum' | '(' | '@' | 'exists' | 'isempty' |
                                    // 'isnull'
    switch (l1)
    {
      case 31:                        // '@'
        lookahead2(1);                // NCName
        switch (lk)
        {
          case 223:                     // '@' NCName
            lookahead3(27);             // '!=' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'in'
            break;
        }
        break;
      case 9:                         // '$avg'
      case 10:                        // '$count'
      case 11:                        // '$max'
      case 12:                        // '$min'
      case 13:                        // '$sum'
        lookahead2(4);                // '('
        switch (lk)
        {
          case 969:                     // '$avg' '('
          case 970:                     // '$count' '('
          case 971:                     // '$max' '('
          case 972:                     // '$min' '('
          case 973:                     // '$sum' '('
            lookahead3(11);             // ')' | '@'
            break;
        }
        break;
      default:
        lk = l1;
    }
    if (lk == 66505                 // '$avg' '(' ')'
        || lk == 66506                 // '$count' '(' ')'
        || lk == 66507                 // '$max' '(' ')'
        || lk == 66508                 // '$min' '(' ')'
        || lk == 66509                 // '$sum' '(' ')'
        || lk == 82143                 // '@' NCName '.'
        || lk == 127945                // '$avg' '(' '@'
        || lk == 127946                // '$count' '(' '@'
        || lk == 127947                // '$max' '(' '@'
        || lk == 127948                // '$min' '(' '@'
        || lk == 127949)               // '$sum' '(' '@'
    {
      lk = memoized(1, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2; var l3A = l3;
        var b3A = b3; var e3A = e3;
        try
        {
          try_CompExpr();
          memoize(1, e0A, -2);
          lk = -9;
        }
        catch (p2A)
        {
          try
          {
            b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
            b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
              b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                b3 = b3A; e3 = e3A; end = e3A; }}}
            try_InExpr();
            memoize(1, e0A, -3);
            lk = -9;
          }
          catch (p3A)
          {
            try
            {
              b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
              b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                  b3 = b3A; e3 = e3A; end = e3A; }}}
              try_RegexExpr();
              memoize(1, e0A, -4);
              lk = -9;
            }
            catch (p4A)
            {
              lk = -6;
              b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
              b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                  b3 = b3A; e3 = e3A; end = e3A; }}}
              memoize(1, e0A, -6);
            }
          }
        }
      }
    }
    switch (lk)
    {
      case 15:                        // '('
        shiftT(15);                   // '('
        try_Expression();
        shiftT(16);                   // ')'
        break;
      case -3:
      case 155871:                    // '@' NCName 'in'
        try_InExpr();
        break;
      case -4:
      case 114911:                    // '@' NCName '=~'
        try_RegexExpr();
        break;
      case 36:                        // 'exists'
        try_ExistExpr();
        break;
      case -6:
      case 110815:                    // '@' NCName '=&'
        try_SubQueryExpr();
        break;
      case 40:                        // 'isnull'
        try_IsnullExpr();
        break;
      case 39:                        // 'isempty'
        try_IsemptyExpr();
        break;
      case -9:
        break;
      default:
        try_CompExpr();
    }
  }

  function parse_CompExpr()
  {
    eventHandler.startNonterminal("CompExpr", e0);
    parse_Attribute();
    lookahead1(18);                 // '!=' | '<' | '<=' | '=' | '>' | '>='
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

  function try_CompExpr()
  {
    try_Attribute();
    lookahead1(18);                 // '!=' | '<' | '<=' | '=' | '>' | '>='
    switch (l1)
    {
      case 26:                        // '='
        shiftT(26);                   // '='
        break;
      case 7:                         // '!='
        shiftT(7);                    // '!='
        break;
      case 29:                        // '>'
        shiftT(29);                   // '>'
        break;
      case 24:                        // '<'
        shiftT(24);                   // '<'
        break;
      case 30:                        // '>='
        shiftT(30);                   // '>='
        break;
      default:
        shiftT(25);                   // '<='
    }
    try_Value();
  }

  function parse_InExpr()
  {
    eventHandler.startNonterminal("InExpr", e0);
    parse_Attribute();
    lookahead1(8);                  // 'in'
    shift(38);                      // 'in'
    parse_ValueList();
    eventHandler.endNonterminal("InExpr", e0);
  }

  function try_InExpr()
  {
    try_Attribute();
    lookahead1(8);                  // 'in'
    shiftT(38);                     // 'in'
    try_ValueList();
  }

  function parse_RegexExpr()
  {
    eventHandler.startNonterminal("RegexExpr", e0);
    parse_Attribute();
    lookahead1(7);                  // '=~'
    shift(28);                      // '=~'
    parse_ExpValue();
    eventHandler.endNonterminal("RegexExpr", e0);
  }

  function try_RegexExpr()
  {
    try_Attribute();
    lookahead1(7);                  // '=~'
    shiftT(28);                     // '=~'
    try_ExpValue();
  }

  function parse_SubQueryExpr()
  {
    eventHandler.startNonterminal("SubQueryExpr", e0);
    parse_Attribute();
    lookahead1(6);                  // '=&'
    shift(27);                      // '=&'
    parse_Query();
    eventHandler.endNonterminal("SubQueryExpr", e0);
  }

  function try_SubQueryExpr()
  {
    try_Attribute();
    lookahead1(6);                  // '=&'
    shiftT(27);                     // '=&'
    try_Query();
  }

  function parse_ExistExpr()
  {
    eventHandler.startNonterminal("ExistExpr", e0);
    shift(36);                      // 'exists'
    parse_Attribute();
    eventHandler.endNonterminal("ExistExpr", e0);
  }

  function try_ExistExpr()
  {
    shiftT(36);                     // 'exists'
    try_Attribute();
  }

  function parse_IsnullExpr()
  {
    eventHandler.startNonterminal("IsnullExpr", e0);
    shift(40);                      // 'isnull'
    parse_Attribute();
    eventHandler.endNonterminal("IsnullExpr", e0);
  }

  function try_IsnullExpr()
  {
    shiftT(40);                     // 'isnull'
    try_Attribute();
  }

  function parse_IsemptyExpr()
  {
    eventHandler.startNonterminal("IsemptyExpr", e0);
    shift(39);                      // 'isempty'
    parse_Attribute();
    eventHandler.endNonterminal("IsemptyExpr", e0);
  }

  function try_IsemptyExpr()
  {
    shiftT(39);                     // 'isempty'
    try_Attribute();
  }

  function parse_ValueList()
  {
    eventHandler.startNonterminal("ValueList", e0);
    lookahead1(4);                  // '('
    shift(15);                      // '('
    parse_Value();
    for (;;)
    {
      lookahead1(10);               // ')' | ','
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

  function try_ValueList()
  {
    lookahead1(4);                  // '('
    shiftT(15);                     // '('
    try_Value();
    for (;;)
    {
      lookahead1(10);               // ')' | ','
      if (l1 != 19)                 // ','
      {
        break;
      }
      shiftT(19);                   // ','
      try_Value();
    }
    shiftT(16);                     // ')'
  }

  function parse_Value()
  {
    eventHandler.startNonterminal("Value", e0);
    lookahead1(17);                 // IntegerLiteral | DecimalLiteral | StringLiteral | 'date' | 'false' | 'true'
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

  function try_Value()
  {
    lookahead1(17);                 // IntegerLiteral | DecimalLiteral | StringLiteral | 'date' | 'false' | 'true'
    switch (l1)
    {
      case 1:                         // IntegerLiteral
        try_IntVal();
        break;
      case 2:                         // DecimalLiteral
        try_DoubleVal();
        break;
      case 4:                         // StringLiteral
        try_StrVal();
        break;
      case 35:                        // 'date'
        try_DateVal();
        break;
      default:
        try_BoolVal();
    }
  }

  function parse_IntVal()
  {
    eventHandler.startNonterminal("IntVal", e0);
    shift(1);                       // IntegerLiteral
    eventHandler.endNonterminal("IntVal", e0);
  }

  function try_IntVal()
  {
    shiftT(1);                      // IntegerLiteral
  }

  function parse_DoubleVal()
  {
    eventHandler.startNonterminal("DoubleVal", e0);
    shift(2);                       // DecimalLiteral
    eventHandler.endNonterminal("DoubleVal", e0);
  }

  function try_DoubleVal()
  {
    shiftT(2);                      // DecimalLiteral
  }

  function parse_ExpValue()
  {
    eventHandler.startNonterminal("ExpValue", e0);
    parse_StrVal();
    lookahead1(20);                 // ')' | '/i' | '/s' | ']' | 'and' | 'or'
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

  function try_ExpValue()
  {
    try_StrVal();
    lookahead1(20);                 // ')' | '/i' | '/s' | ']' | 'and' | 'or'
    if (l1 == 22                    // '/i'
        || l1 == 23)                   // '/s'
    {
      switch (l1)
      {
        case 22:                      // '/i'
          shiftT(22);                 // '/i'
          break;
        default:
          shiftT(23);                 // '/s'
      }
    }
  }

  function parse_StrVal()
  {
    eventHandler.startNonterminal("StrVal", e0);
    lookahead1(2);                  // StringLiteral
    shift(4);                       // StringLiteral
    eventHandler.endNonterminal("StrVal", e0);
  }

  function try_StrVal()
  {
    lookahead1(2);                  // StringLiteral
    shiftT(4);                      // StringLiteral
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

  function try_BoolVal()
  {
    switch (l1)
    {
      case 43:                        // 'true'
        shiftT(43);                   // 'true'
        break;
      default:
        shiftT(37);                   // 'false'
    }
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

  function try_DateVal()
  {
    shiftT(35);                     // 'date'
    lookahead1(4);                  // '('
    shiftT(15);                     // '('
    lookahead1(0);                  // IntegerLiteral
    shiftT(1);                      // IntegerLiteral
    lookahead1(5);                  // ')'
    shiftT(16);                     // ')'
  }

  function shift(t)
  {
    if (l1 == t)
    {
      eventHandler.terminal(CMSParser.TOKEN[l1], b1, e1 > size ? size : e1);
      b0 = b1; e0 = e1; l1 = l2; if (l1 != 0) {
      b1 = b2; e1 = e2; l2 = l3; if (l2 != 0) {
        b2 = b3; e2 = e3; l3 = 0; }}
    }
    else
    {
      error(b1, e1, 0, l1, t);
    }
  }

  function shiftT(t)
  {
    if (l1 == t)
    {
      b0 = b1; e0 = e1; l1 = l2; if (l1 != 0) {
      b1 = b2; e1 = e2; l2 = l3; if (l2 != 0) {
        b2 = b3; e2 = e3; l3 = 0; }}
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

  function lookahead2(set)
  {
    if (l2 == 0)
    {
      l2 = match(set);
      b2 = begin;
      e2 = end;
    }
    lk = (l2 << 6) | l1;
  }

  function lookahead3(set)
  {
    if (l3 == 0)
    {
      l3 = match(set);
      b3 = begin;
      e3 = end;
    }
    lk |= l3 << 12;
  }

  function error(b, e, s, l, t)
  {
    if (e >= ex)
    {
      bx = b;
      ex = e;
      sx = s;
      lx = l;
      tx = t;
    }
    throw new self.ParseException(bx, ex, sx, lx, tx);
  }

  var lk, b0, e0;
  var l1, b1, e1;
  var l2, b2, e2;
  var l3, b3, e3;
  var bx, ex, sx, lx, tx;
  var eventHandler;
  var memo;

  function memoize(i, e, v)
  {
    memo[(e << 1) + i] = v;
  }

  function memoized(i, e)
  {
    var v = memo[(e << 1) + i];
    return typeof v != "undefined" ? v : 0;
  }

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
    var i0 = (i >> 5) * 94 + s - 1;
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
      /*  0 */ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      /* 29 */ 30, 31, 32
    ];

CMSParser.TRANSITION =
    [
      /*    0 */ 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1432,
      /*   21 */ 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 800, 827, 1432, 949, 949, 949, 949, 949,
      /*   42 */ 949, 949, 949, 949, 949, 949, 1431, 949, 1432, 949, 811, 949, 949, 1432, 949, 949, 949, 949, 949, 949, 949,
      /*   63 */ 949, 1333, 949, 841, 1451, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 950, 803, 821,
      /*   84 */ 835, 949, 1358, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1432, 949, 949, 1432, 949,
      /*  105 */ 949, 949, 949, 949, 949, 949, 949, 1195, 1194, 949, 1060, 1432, 949, 949, 949, 949, 949, 949, 949, 949,
      /*  125 */ 949, 949, 949, 1206, 849, 852, 860, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949,
      /*  146 */ 1347, 949, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 971, 868, 1432, 949,
      /*  166 */ 1055, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 887, 949, 960, 1432, 949, 949, 949, 949, 949, 949,
      /*  187 */ 949, 949, 949, 949, 949, 949, 949, 949, 949, 910, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949,
      /*  208 */ 949, 949, 922, 929, 1432, 937, 1399, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1101, 949,
      /*  228 */ 1432, 949, 949, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 948, 949, 958, 949, 910, 968, 949, 949, 990,
      /*  249 */ 949, 979, 1429, 949, 949, 949, 949, 949, 1319, 987, 998, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949,
      /*  270 */ 949, 949, 1111, 949, 1006, 1477, 1432, 1296, 1017, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1073,
      /*  290 */ 899, 894, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1425, 1418, 879, 1432, 949,
      /*  310 */ 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1181, 902, 949, 949, 910, 949, 949, 949, 990, 949, 979,
      /*  331 */ 1429, 949, 949, 949, 949, 1181, 902, 949, 949, 910, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949,
      /*  352 */ 949, 949, 949, 1026, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1040,
      /*  373 */ 949, 949, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1050, 1183, 1432, 949, 949, 949, 949,
      /*  393 */ 949, 949, 949, 949, 949, 949, 949, 1181, 902, 1068, 1141, 910, 874, 1081, 949, 1091, 949, 979, 1429, 949,
      /*  413 */ 949, 949, 949, 1181, 902, 949, 949, 910, 949, 949, 1432, 990, 949, 979, 1429, 949, 949, 949, 949, 1181,
      /*  433 */ 902, 949, 949, 910, 949, 1109, 949, 990, 949, 979, 1429, 949, 949, 949, 949, 1181, 902, 1119, 949, 910,
      /*  453 */ 949, 949, 1129, 990, 949, 979, 1429, 949, 949, 949, 949, 1181, 902, 949, 1268, 910, 949, 949, 949, 1032,
      /*  473 */ 1140, 1149, 1429, 949, 949, 949, 949, 1181, 902, 1157, 949, 910, 949, 949, 1432, 990, 949, 979, 1429, 949,
      /*  493 */ 949, 949, 949, 1181, 902, 949, 949, 910, 949, 949, 949, 949, 1167, 949, 949, 949, 949, 949, 949, 1181,
      /*  513 */ 1177, 949, 1242, 910, 949, 1191, 949, 1203, 949, 949, 949, 949, 949, 949, 949, 1181, 902, 949, 949, 910,
      /*  533 */ 949, 949, 1308, 949, 949, 1286, 1447, 949, 949, 949, 949, 1181, 902, 949, 949, 910, 949, 1214, 949, 949,
      /*  553 */ 1132, 949, 949, 949, 949, 949, 949, 1181, 902, 949, 1121, 1224, 949, 949, 1432, 1097, 1463, 1264, 949, 949,
      /*  573 */ 949, 949, 949, 1181, 902, 1232, 1367, 910, 949, 949, 1250, 949, 949, 949, 949, 949, 949, 949, 949, 1181,
      /*  593 */ 902, 949, 949, 910, 949, 949, 949, 949, 949, 1009, 949, 949, 949, 949, 949, 1181, 902, 949, 949, 910, 1258,
      /*  614 */ 949, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 1181, 902, 949, 949, 910, 949, 1276, 949, 813, 1216,
      /*  634 */ 949, 1284, 949, 949, 949, 949, 1181, 902, 1294, 949, 910, 949, 949, 1304, 1237, 949, 1385, 1316, 949, 949,
      /*  654 */ 949, 949, 1181, 902, 949, 949, 910, 949, 949, 1327, 1345, 1355, 1366, 949, 949, 949, 949, 949, 1181, 902,
      /*  674 */ 949, 949, 910, 949, 949, 1169, 949, 949, 949, 949, 949, 949, 949, 949, 1181, 902, 949, 949, 910, 949, 1159,
      /*  695 */ 949, 949, 1381, 949, 949, 949, 949, 949, 949, 1181, 902, 949, 949, 910, 949, 949, 949, 949, 949, 949, 1403,
      /*  716 */ 949, 949, 949, 949, 949, 949, 1042, 1375, 1432, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949,
      /*  737 */ 1018, 940, 1393, 1411, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1440, 949, 1083, 1432,
      /*  757 */ 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 1459, 949, 1337, 949, 949, 949,
      /*  778 */ 949, 949, 949, 949, 949, 949, 949, 912, 914, 1471, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949, 949,
      /*  799 */ 949, 0, 0, 47, 0, 0, 0, 0, 0, 38, 0, 38, 0, 640, 0, 0, 0, 0, 0, 0, 0, 83, 38, 38, 38, 0, 0, 38, 0, 0, 0,
      /*  830 */ 47, 0, 896, 0, 47, 0, 34, 3584, 0, 0, 1920, 0, 0, 0, 50, 0, 0, 50, 0, 0, 0, 2176, 2176, 0, 0, 0, 2176,
      /*  857 */ 2176, 0, 2176, 2176, 2176, 2176, 0, 0, 2176, 0, 2176, 52, 52, 52, 0, 0, 52, 0, 0, 0, 60, 61, 0, 0, 0, 0,
      /*  883 */ 4096, 0, 4096, 0, 0, 0, 2560, 0, 2560, 0, 2560, 0, 0, 0, 3889, 0, 0, 0, 3889, 0, 0, 0, 0, 0, 545, 0, 0,
      /*  910 */ 545, 34, 0, 0, 0, 0, 0, 0, 0, 768, 0, 768, 0, 42, 0, 0, 0, 2741, 0, 2741, 2741, 2741, 2688, 0, 2741, 0,
      /*  936 */ 2688, 0, 0, 426, 0, 0, 0, 0, 0, 39, 0, 39, 257, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 299, 0, 0, 0, 0, 0, 0, 0,
      /*  967 */ 2560, 0, 426, 299, 0, 0, 0, 0, 0, 52, 0, 52, 0, 88, 0, 0, 0, 0, 0, 93, 0, 0, 3248, 0, 0, 0, 0, 0, 82, 0, 0,
      /*  998 */ 3200, 0, 3200, 3248, 0, 3200, 0, 3248, 0, 0, 3456, 0, 0, 0, 0, 0, 91, 0, 0, 3968, 0, 0, 0, 0, 0, 0, 0, 39,
      /* 1026 */ 0, 4224, 4224, 0, 0, 4224, 0, 0, 0, 80, 0, 82, 4608, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 5760, 4352, 0, 0, 0,
      /* 1054 */ 4352, 0, 0, 0, 0, 2816, 0, 0, 0, 0, 2048, 0, 2048, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 3840, 0, 3840, 0, 0, 63,
      /* 1083 */ 0, 0, 0, 0, 0, 0, 0, 6016, 76, 0, 0, 0, 0, 82, 0, 0, 0, 81, 0, 0, 0, 0, 51, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0,
      /* 1116 */ 0, 35, 36, 0, 44, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 4480, 0, 0, 0, 0, 0, 1792, 0, 86, 5632, 0, 0, 0, 0, 0, 0,
      /* 1147 */ 0, 40, 0, 88, 4864, 0, 0, 0, 0, 93, 0, 45, 0, 0, 0, 0, 0, 0, 67, 0, 0, 1280, 0, 0, 0, 0, 0, 0, 74, 0, 37,
      /* 1178 */ 0, 0, 0, 0, 545, 0, 0, 0, 0, 0, 0, 0, 4352, 0, 0, 2944, 0, 0, 0, 0, 0, 2048, 0, 0, 0, 77, 0, 79, 0, 0, 0,
      /* 1209 */ 0, 0, 2176, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 85, 0, 545, 34, 0, 0, 4992, 0, 0, 59, 41, 0, 0, 0, 41, 0, 0, 0,
      /* 1240 */ 0, 5376, 0, 0, 0, 37, 56, 0, 56, 37, 69, 0, 0, 0, 0, 0, 0, 75, 5504, 0, 0, 0, 0, 62, 0, 0, 0, 89, 0, 0, 0,
      /* 1271 */ 0, 55, 0, 55, 0, 0, 66, 3072, 0, 0, 0, 0, 68, 0, 4736, 0, 0, 0, 0, 0, 0, 92, 0, 0, 46, 0, 0, 0, 0, 0, 0,
      /* 1302 */ 1024, 3328, 0, 34, 0, 71, 0, 0, 0, 0, 72, 0, 0, 0, 1408, 0, 94, 0, 0, 0, 0, 0, 3200, 0, 0, 0, 70, 0, 0, 0,
      /* 1332 */ 73, 0, 0, 0, 1152, 0, 0, 0, 0, 0, 3712, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 2304, 0, 0, 0, 84, 0, 0, 0, 0, 0,
      /* 1363 */ 3584, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 41, 5760, 5760, 5760, 0, 0, 5760, 0, 0, 0, 1536, 0, 0, 0, 0, 90, 0, 0,
      /* 1392 */ 0, 39, 39, 39, 0, 0, 39, 0, 0, 0, 2432, 0, 0, 0, 0, 0, 5120, 0, 0, 0, 34, 0, 0, 0, 0, 5888, 0, 0, 0, 4096,
      /* 1422 */ 0, 0, 4096, 0, 0, 0, 4096, 0, 0, 0, 0, 34, 0, 0, 0, 0, 0, 0, 0, 6016, 0, 0, 0, 0, 6016, 0, 0, 0, 5248, 0,
      /* 1452 */ 0, 0, 0, 50, 0, 50, 0, 0, 34, 0, 3712, 0, 0, 0, 0, 1664, 0, 0, 0, 768, 768, 768, 0, 0, 768, 0, 0, 0, 3510,
      /* 1481 */ 0, 0, 0, 3510
    ];

CMSParser.EXPECTED =
    [
      /*   0 */ 47, 59, 133, 63, 67, 71, 75, 79, 83, 87, 148, 105, 93, 97, 52, 111, 103, 52, 112, 109, 116, 55, 139, 53, 54,
      /*  25 */ 99, 54, 120, 141, 124, 127, 131, 89, 137, 151, 54, 54, 145, 156, 54, 145, 152, 54, 162, 160, 50, 163, 2, 8,
      /*  49 */ 16, 256, 0, 0, 16, 0, 0, 0, 0, 16, 32768, 65536, 134217728, 268435456, 537395200, 16809992, 537395200,
      /*  66 */ 81952, 65536, 22, 1728053376, -2147467776, 12648448, 3489824, -2147336704, 3489824, 20267040, 3489824,
      /*  77 */ 20267040, 2131755136, -2147435008, 20267104, -2147435008, 2132344960, 8, 16, 134217728, 268435456, 0, 16384,
      /*  89 */ 0, 0, 64, 0, 1073741824, 15872, 12582912, 262144, 2097152, 402653184, 0, 0, 64, 16384, 6144, 8192, 0, 0,
      /* 107 */ 128, 33554432, 4096, 8192, 0, 0, 512, 1024, 2048, 0, 16, 0, 1024, 16384, 8192, 1030, 2088, 0, 12288, 12288,
      /* 127 */ 12289, 64, 400, 12289, 912, 17478, 0, 0, 589824, -2147418112, 8192, 4, 1024, 0, 0, 0, 1030, 8192, 16, 384,
      /* 147 */ 512, 0, 4, 6, 0, 8, 32, 2048, 0, 4, 8, 32, 2048, 32, 0, 16, 128, 256, 0, 128
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
