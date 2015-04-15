// This file was generated on Wed Apr 15, 2015 16:38 (UTC-07) by REx v5.33 which is Copyright (c) 1979-2015 by Gunther Rademacher <grd@gmx.net>
// REx command line: CMSParser.ebnf -javascript -ll 3 -tree -backtrack

function CMSParser(string, parsingEventHandler)
{
  init(string, parsingEventHandler);

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
      if (l1 != 43)                 // '||'
      {
        break;
      }
      shift(43);                    // '||'
      parse_IntersectionPath();
    }
    eventHandler.endNonterminal("UnionPath", e0);
  }

  function try_UnionPath()
  {
    try_IntersectionPath();
    for (;;)
    {
      if (l1 != 43)                 // '||'
      {
        break;
      }
      shiftT(43);                   // '||'
      try_IntersectionPath();
    }
  }

  function parse_IntersectionPath()
  {
    eventHandler.startNonterminal("IntersectionPath", e0);
    parse_PrimaryPath();
    for (;;)
    {
      lookahead1(17);               // EOF | '&&' | ')' | '||'
      if (l1 != 9)                  // '&&'
      {
        break;
      }
      shift(9);                     // '&&'
      parse_PrimaryPath();
    }
    eventHandler.endNonterminal("IntersectionPath", e0);
  }

  function try_IntersectionPath()
  {
    try_PrimaryPath();
    for (;;)
    {
      lookahead1(17);               // EOF | '&&' | ')' | '||'
      if (l1 != 9)                  // '&&'
      {
        break;
      }
      shiftT(9);                    // '&&'
      try_PrimaryPath();
    }
  }

  function parse_PrimaryPath()
  {
    eventHandler.startNonterminal("PrimaryPath", e0);
    lookahead1(14);                 // NCName | '(' | '<'
    switch (l1)
    {
      case 10:                        // '('
        shift(10);                    // '('
        parse_Path();
        shift(11);                    // ')'
        break;
      default:
        parse_QueryNode();
        for (;;)
        {
          lookahead1(24);             // EOF | '&&' | ')' | '+.' | '.' | '.+' | '||'
          switch (l1)
          {
            case 13:                    // '+.'
            case 15:                    // '.'
            case 16:                    // '.+'
              lookahead2(14);           // NCName | '(' | '<'
              switch (lk)
              {
                case 205:                 // '+.' NCName
                case 207:                 // '.' NCName
                case 208:                 // '.+' NCName
                  lookahead3(28);         // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
                  break;
                case 653:                 // '+.' '('
                case 655:                 // '.' '('
                case 656:                 // '.+' '('
                  lookahead3(14);         // NCName | '(' | '<'
                  break;
                case 1229:                // '+.' '<'
                case 1231:                // '.' '<'
                case 1232:                // '.+' '<'
                  lookahead3(1);          // NCName
                  break;
              }
              break;
            default:
              lk = l1;
          }
          if (lk != 5                 // EOF
              && lk != 9                 // '&&'
              && lk != 11                // ')'
              && lk != 43)               // '||'
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
                  case 15:              // '.'
                    shiftT(15);         // '.'
                    break;
                  case 13:              // '+.'
                    shiftT(13);         // '+.'
                    break;
                  default:
                    shiftT(16);         // '.+'
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
            case 15:                    // '.'
              shift(15);                // '.'
              break;
            case 13:                    // '+.'
              shift(13);                // '+.'
              break;
            default:
              shift(16);                // '.+'
          }
          parse_PrimaryPath();
        }
    }
    eventHandler.endNonterminal("PrimaryPath", e0);
  }

  function try_PrimaryPath()
  {
    lookahead1(14);                 // NCName | '(' | '<'
    switch (l1)
    {
      case 10:                        // '('
        shiftT(10);                   // '('
        try_Path();
        shiftT(11);                   // ')'
        break;
      default:
        try_QueryNode();
        for (;;)
        {
          lookahead1(24);             // EOF | '&&' | ')' | '+.' | '.' | '.+' | '||'
          switch (l1)
          {
            case 13:                    // '+.'
            case 15:                    // '.'
            case 16:                    // '.+'
              lookahead2(14);           // NCName | '(' | '<'
              switch (lk)
              {
                case 205:                 // '+.' NCName
                case 207:                 // '.' NCName
                case 208:                 // '.+' NCName
                  lookahead3(28);         // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
                  break;
                case 653:                 // '+.' '('
                case 655:                 // '.' '('
                case 656:                 // '.+' '('
                  lookahead3(14);         // NCName | '(' | '<'
                  break;
                case 1229:                // '+.' '<'
                case 1231:                // '.' '<'
                case 1232:                // '.+' '<'
                  lookahead3(1);          // NCName
                  break;
              }
              break;
            default:
              lk = l1;
          }
          if (lk != 5                 // EOF
              && lk != 9                 // '&&'
              && lk != 11                // ')'
              && lk != 43)               // '||'
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
                  case 15:              // '.'
                    shiftT(15);         // '.'
                    break;
                  case 13:              // '+.'
                    shiftT(13);         // '+.'
                    break;
                  default:
                    shiftT(16);         // '.+'
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
            case 15:                    // '.'
              shiftT(15);               // '.'
              break;
            case 13:                    // '+.'
              shiftT(13);               // '+.'
              break;
            default:
              shiftT(16);               // '.+'
          }
          try_PrimaryPath();
        }
    }
  }

  function parse_QueryNode()
  {
    eventHandler.startNonterminal("QueryNode", e0);
    if (l1 == 19)                   // '<'
    {
      parse_TypeCast();
    }
    parse_NodeName();
    lookahead1(27);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    switch (l1)
    {
      case 19:                        // '<'
        lookahead2(25);               // '$' | '(' | '@' | 'exists' | 'isempty' | 'isnull' | 'not'
        switch (lk)
        {
          case 531:                     // '<' '$'
            lookahead3(19);             // 'avg' | 'count' | 'max' | 'min' | 'sum'
            break;
          case 1683:                    // '<' '@'
            lookahead3(1);              // NCName
            break;
        }
        break;
      default:
        lk = l1;
    }
    if (lk == 13971                 // '<' '@' NCName
        || lk == 115219                // '<' '$' 'avg'
        || lk == 119315                // '<' '$' 'count'
        || lk == 147987                // '<' '$' 'max'
        || lk == 152083                // '<' '$' 'min'
        || lk == 164371)               // '<' '$' 'sum'
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
          try_Filter();
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
        memoize(1, e0, lk);
      }
    }
    if (lk == -1
        || lk == 659                   // '<' '('
        || lk == 2003                  // '<' 'exists'
        || lk == 2195                  // '<' 'isempty'
        || lk == 2259                  // '<' 'isnull'
        || lk == 2451)                 // '<' 'not'
    {
      parse_Filter();
    }
    lookahead1(27);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    if (l1 == 19)                   // '<'
    {
      parse_Aggregation();
    }
    lookahead1(26);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '{' | '||'
    if (l1 == 42)                   // '{'
    {
      parse_Projection();
    }
    eventHandler.endNonterminal("QueryNode", e0);
  }

  function try_QueryNode()
  {
    if (l1 == 19)                   // '<'
    {
      try_TypeCast();
    }
    try_NodeName();
    lookahead1(27);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    switch (l1)
    {
      case 19:                        // '<'
        lookahead2(25);               // '$' | '(' | '@' | 'exists' | 'isempty' | 'isnull' | 'not'
        switch (lk)
        {
          case 531:                     // '<' '$'
            lookahead3(19);             // 'avg' | 'count' | 'max' | 'min' | 'sum'
            break;
          case 1683:                    // '<' '@'
            lookahead3(1);              // NCName
            break;
        }
        break;
      default:
        lk = l1;
    }
    if (lk == 13971                 // '<' '@' NCName
        || lk == 115219                // '<' '$' 'avg'
        || lk == 119315                // '<' '$' 'count'
        || lk == 147987                // '<' '$' 'max'
        || lk == 152083                // '<' '$' 'min'
        || lk == 164371)               // '<' '$' 'sum'
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
          try_Filter();
          memoize(1, e0A, -1);
        }
        catch (p1A)
        {
          b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
          b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
            b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
              b3 = b3A; e3 = e3A; end = e3A; }}}
          memoize(1, e0A, -2);
        }
        lk = -2;
      }
    }
    if (lk == -1
        || lk == 659                   // '<' '('
        || lk == 2003                  // '<' 'exists'
        || lk == 2195                  // '<' 'isempty'
        || lk == 2259                  // '<' 'isnull'
        || lk == 2451)                 // '<' 'not'
    {
      try_Filter();
    }
    lookahead1(27);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    if (l1 == 19)                   // '<'
    {
      try_Aggregation();
    }
    lookahead1(26);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '{' | '||'
    if (l1 == 42)                   // '{'
    {
      try_Projection();
    }
  }

  function parse_NodeName()
  {
    eventHandler.startNonterminal("NodeName", e0);
    lookahead1(1);                  // NCName
    shift(3);                       // NCName
    lookahead1(28);                 // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
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
    lookahead1(28);                 // EOF | '!' | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
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
    shift(19);                      // '<'
    parse_TypeName();
    for (;;)
    {
      lookahead1(13);               // ',' | '>'
      if (l1 != 14)                 // ','
      {
        break;
      }
      shift(14);                    // ','
      parse_TypeName();
    }
    shift(24);                      // '>'
    eventHandler.endNonterminal("TypeCast", e0);
  }

  function try_TypeCast()
  {
    shiftT(19);                     // '<'
    try_TypeName();
    for (;;)
    {
      lookahead1(13);               // ',' | '>'
      if (l1 != 14)                 // ','
      {
        break;
      }
      shiftT(14);                   // ','
      try_TypeName();
    }
    shiftT(24);                     // '>'
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
    lookahead1(27);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    if (l1 == 19)                   // '<'
    {
      parse_Filter();
    }
    eventHandler.endNonterminal("Aggregation", e0);
  }

  function try_Aggregation()
  {
    try_Group();
    lookahead1(27);                 // EOF | '&&' | ')' | '+.' | '.' | '.+' | '<' | '{' | '||'
    if (l1 == 19)                   // '<'
    {
      try_Filter();
    }
  }

  function parse_Group()
  {
    eventHandler.startNonterminal("Group", e0);
    shift(19);                      // '<'
    parse_AttributeList();
    shift(24);                      // '>'
    eventHandler.endNonterminal("Group", e0);
  }

  function try_Group()
  {
    shiftT(19);                     // '<'
    try_AttributeList();
    shiftT(24);                     // '>'
  }

  function parse_Filter()
  {
    eventHandler.startNonterminal("Filter", e0);
    shift(19);                      // '<'
    parse_Expression();
    shift(24);                      // '>'
    eventHandler.endNonterminal("Filter", e0);
  }

  function try_Filter()
  {
    shiftT(19);                     // '<'
    try_Expression();
    shiftT(24);                     // '>'
  }

  function parse_Projection()
  {
    eventHandler.startNonterminal("Projection", e0);
    shift(42);                      // '{'
    lookahead1(15);                 // '$' | '*' | '@'
    switch (l1)
    {
      case 12:                        // '*'
        shift(12);                    // '*'
        break;
      default:
        parse_AttributeList();
    }
    lookahead1(9);                  // '}'
    shift(44);                      // '}'
    eventHandler.endNonterminal("Projection", e0);
  }

  function try_Projection()
  {
    shiftT(42);                     // '{'
    lookahead1(15);                 // '$' | '*' | '@'
    switch (l1)
    {
      case 12:                        // '*'
        shiftT(12);                   // '*'
        break;
      default:
        try_AttributeList();
    }
    lookahead1(9);                  // '}'
    shiftT(44);                     // '}'
  }

  function parse_AttributeList()
  {
    eventHandler.startNonterminal("AttributeList", e0);
    parse_Attribute();
    for (;;)
    {
      lookahead1(16);               // ',' | '>' | '}'
      if (l1 != 14)                 // ','
      {
        break;
      }
      shift(14);                    // ','
      parse_Attribute();
    }
    eventHandler.endNonterminal("AttributeList", e0);
  }

  function try_AttributeList()
  {
    try_Attribute();
    for (;;)
    {
      lookahead1(16);               // ',' | '>' | '}'
      if (l1 != 14)                 // ','
      {
        break;
      }
      shiftT(14);                   // ','
      try_Attribute();
    }
  }

  function parse_Attribute()
  {
    eventHandler.startNonterminal("Attribute", e0);
    lookahead1(10);                 // '$' | '@'
    switch (l1)
    {
      case 26:                        // '@'
        parse_SearchAttr();
        break;
      default:
        parse_AggregateAttr();
    }
    eventHandler.endNonterminal("Attribute", e0);
  }

  function try_Attribute()
  {
    lookahead1(10);                 // '$' | '@'
    switch (l1)
    {
      case 26:                        // '@'
        try_SearchAttr();
        break;
      default:
        try_AggregateAttr();
    }
  }

  function parse_SearchAttr()
  {
    eventHandler.startNonterminal("SearchAttr", e0);
    shift(26);                      // '@'
    parse_AttrName();
    for (;;)
    {
      lookahead1(30);               // '!=' | ')' | ',' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'and' |
                                    // 'in' | 'or' | '}'
      if (l1 != 15)                 // '.'
      {
        break;
      }
      shift(15);                    // '.'
      lookahead1(3);                // '$'
      shift(8);                     // '$'
      parse_AttrName();
    }
    eventHandler.endNonterminal("SearchAttr", e0);
  }

  function try_SearchAttr()
  {
    shiftT(26);                     // '@'
    try_AttrName();
    for (;;)
    {
      lookahead1(30);               // '!=' | ')' | ',' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'and' |
                                    // 'in' | 'or' | '}'
      if (l1 != 15)                 // '.'
      {
        break;
      }
      shiftT(15);                   // '.'
      lookahead1(3);                // '$'
      shiftT(8);                    // '$'
      try_AttrName();
    }
  }

  function parse_AggregateAttr()
  {
    eventHandler.startNonterminal("AggregateAttr", e0);
    shift(8);                       // '$'
    parse_AggFunc();
    lookahead1(4);                  // '('
    shift(10);                      // '('
    lookahead1(12);                 // ')' | '@'
    if (l1 == 26)                   // '@'
    {
      parse_SearchAttr();
    }
    shift(11);                      // ')'
    eventHandler.endNonterminal("AggregateAttr", e0);
  }

  function try_AggregateAttr()
  {
    shiftT(8);                      // '$'
    try_AggFunc();
    lookahead1(4);                  // '('
    shiftT(10);                     // '('
    lookahead1(12);                 // ')' | '@'
    if (l1 == 26)                   // '@'
    {
      try_SearchAttr();
    }
    shiftT(11);                     // ')'
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
    lookahead1(19);                 // 'avg' | 'count' | 'max' | 'min' | 'sum'
    switch (l1)
    {
      case 37:                        // 'min'
        shift(37);                    // 'min'
        break;
      case 36:                        // 'max'
        shift(36);                    // 'max'
        break;
      case 28:                        // 'avg'
        shift(28);                    // 'avg'
        break;
      case 40:                        // 'sum'
        shift(40);                    // 'sum'
        break;
      default:
        shift(29);                    // 'count'
    }
    eventHandler.endNonterminal("AggFunc", e0);
  }

  function try_AggFunc()
  {
    lookahead1(19);                 // 'avg' | 'count' | 'max' | 'min' | 'sum'
    switch (l1)
    {
      case 37:                        // 'min'
        shiftT(37);                   // 'min'
        break;
      case 36:                        // 'max'
        shiftT(36);                   // 'max'
        break;
      case 28:                        // 'avg'
        shiftT(28);                   // 'avg'
        break;
      case 40:                        // 'sum'
        shiftT(40);                   // 'sum'
        break;
      default:
        shiftT(29);                   // 'count'
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
      if (l1 != 39)                 // 'or'
      {
        break;
      }
      shift(39);                    // 'or'
      parse_AndExpr();
    }
    eventHandler.endNonterminal("OrExpr", e0);
  }

  function try_OrExpr()
  {
    try_AndExpr();
    for (;;)
    {
      if (l1 != 39)                 // 'or'
      {
        break;
      }
      shiftT(39);                   // 'or'
      try_AndExpr();
    }
  }

  function parse_AndExpr()
  {
    eventHandler.startNonterminal("AndExpr", e0);
    parse_NotExpr();
    for (;;)
    {
      lookahead1(18);               // ')' | '>' | 'and' | 'or'
      if (l1 != 27)                 // 'and'
      {
        break;
      }
      shift(27);                    // 'and'
      parse_NotExpr();
    }
    eventHandler.endNonterminal("AndExpr", e0);
  }

  function try_AndExpr()
  {
    try_NotExpr();
    for (;;)
    {
      lookahead1(18);               // ')' | '>' | 'and' | 'or'
      if (l1 != 27)                 // 'and'
      {
        break;
      }
      shiftT(27);                   // 'and'
      try_NotExpr();
    }
  }

  function parse_NotExpr()
  {
    eventHandler.startNonterminal("NotExpr", e0);
    lookahead1(25);                 // '$' | '(' | '@' | 'exists' | 'isempty' | 'isnull' | 'not'
    if (l1 == 38)                   // 'not'
    {
      shift(38);                    // 'not'
    }
    parse_PrimaryExpr();
    eventHandler.endNonterminal("NotExpr", e0);
  }

  function try_NotExpr()
  {
    lookahead1(25);                 // '$' | '(' | '@' | 'exists' | 'isempty' | 'isnull' | 'not'
    if (l1 == 38)                   // 'not'
    {
      shiftT(38);                   // 'not'
    }
    try_PrimaryExpr();
  }

  function parse_PrimaryExpr()
  {
    eventHandler.startNonterminal("PrimaryExpr", e0);
    lookahead1(22);                 // '$' | '(' | '@' | 'exists' | 'isempty' | 'isnull'
    switch (l1)
    {
      case 8:                         // '$'
        lookahead2(19);               // 'avg' | 'count' | 'max' | 'min' | 'sum'
        switch (lk)
        {
          case 1800:                    // '$' 'avg'
          case 1864:                    // '$' 'count'
          case 2312:                    // '$' 'max'
          case 2376:                    // '$' 'min'
          case 2568:                    // '$' 'sum'
            lookahead3(4);              // '('
            break;
        }
        break;
      case 26:                        // '@'
        lookahead2(1);                // NCName
        switch (lk)
        {
          case 218:                     // '@' NCName
            lookahead3(29);             // '!=' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'in'
            break;
        }
        break;
      default:
        lk = l1;
    }
    if (lk == 42760                 // '$' 'avg' '('
        || lk == 42824                 // '$' 'count' '('
        || lk == 43272                 // '$' 'max' '('
        || lk == 43336                 // '$' 'min' '('
        || lk == 43528                 // '$' 'sum' '('
        || lk == 61658)                // '@' NCName '.'
    {
      lk = memoized(2, e0);
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
        memoize(2, e0, lk);
      }
    }
    switch (lk)
    {
      case 10:                        // '('
        shift(10);                    // '('
        parse_Expression();
        shift(11);                    // ')'
        break;
      case -3:
      case 135386:                    // '@' NCName 'in'
        parse_InExpr();
        break;
      case -4:
      case 94426:                     // '@' NCName '=~'
        parse_RegexExpr();
        break;
      case 31:                        // 'exists'
        parse_ExistExpr();
        break;
      case -6:
      case 90330:                     // '@' NCName '=&'
        parse_SubQueryExpr();
        break;
      case 35:                        // 'isnull'
        parse_IsnullExpr();
        break;
      case 34:                        // 'isempty'
        parse_IsemptyExpr();
        break;
      default:
        parse_CompExpr();
    }
    eventHandler.endNonterminal("PrimaryExpr", e0);
  }

  function try_PrimaryExpr()
  {
    lookahead1(22);                 // '$' | '(' | '@' | 'exists' | 'isempty' | 'isnull'
    switch (l1)
    {
      case 8:                         // '$'
        lookahead2(19);               // 'avg' | 'count' | 'max' | 'min' | 'sum'
        switch (lk)
        {
          case 1800:                    // '$' 'avg'
          case 1864:                    // '$' 'count'
          case 2312:                    // '$' 'max'
          case 2376:                    // '$' 'min'
          case 2568:                    // '$' 'sum'
            lookahead3(4);              // '('
            break;
        }
        break;
      case 26:                        // '@'
        lookahead2(1);                // NCName
        switch (lk)
        {
          case 218:                     // '@' NCName
            lookahead3(29);             // '!=' | '.' | '<' | '<=' | '=' | '=&' | '=~' | '>' | '>=' | 'in'
            break;
        }
        break;
      default:
        lk = l1;
    }
    if (lk == 42760                 // '$' 'avg' '('
        || lk == 42824                 // '$' 'count' '('
        || lk == 43272                 // '$' 'max' '('
        || lk == 43336                 // '$' 'min' '('
        || lk == 43528                 // '$' 'sum' '('
        || lk == 61658)                // '@' NCName '.'
    {
      lk = memoized(2, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2; var l3A = l3;
        var b3A = b3; var e3A = e3;
        try
        {
          try_CompExpr();
          memoize(2, e0A, -2);
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
            memoize(2, e0A, -3);
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
              memoize(2, e0A, -4);
              lk = -9;
            }
            catch (p4A)
            {
              lk = -6;
              b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
              b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
                  b3 = b3A; e3 = e3A; end = e3A; }}}
              memoize(2, e0A, -6);
            }
          }
        }
      }
    }
    switch (lk)
    {
      case 10:                        // '('
        shiftT(10);                   // '('
        try_Expression();
        shiftT(11);                   // ')'
        break;
      case -3:
      case 135386:                    // '@' NCName 'in'
        try_InExpr();
        break;
      case -4:
      case 94426:                     // '@' NCName '=~'
        try_RegexExpr();
        break;
      case 31:                        // 'exists'
        try_ExistExpr();
        break;
      case -6:
      case 90330:                     // '@' NCName '=&'
        try_SubQueryExpr();
        break;
      case 35:                        // 'isnull'
        try_IsnullExpr();
        break;
      case 34:                        // 'isempty'
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
    lookahead1(21);                 // '!=' | '<' | '<=' | '=' | '>' | '>='
    switch (l1)
    {
      case 21:                        // '='
        shift(21);                    // '='
        break;
      case 7:                         // '!='
        shift(7);                     // '!='
        break;
      case 24:                        // '>'
        shift(24);                    // '>'
        break;
      case 19:                        // '<'
        shift(19);                    // '<'
        break;
      case 25:                        // '>='
        shift(25);                    // '>='
        break;
      default:
        shift(20);                    // '<='
    }
    parse_Value();
    eventHandler.endNonterminal("CompExpr", e0);
  }

  function try_CompExpr()
  {
    try_Attribute();
    lookahead1(21);                 // '!=' | '<' | '<=' | '=' | '>' | '>='
    switch (l1)
    {
      case 21:                        // '='
        shiftT(21);                   // '='
        break;
      case 7:                         // '!='
        shiftT(7);                    // '!='
        break;
      case 24:                        // '>'
        shiftT(24);                   // '>'
        break;
      case 19:                        // '<'
        shiftT(19);                   // '<'
        break;
      case 25:                        // '>='
        shiftT(25);                   // '>='
        break;
      default:
        shiftT(20);                   // '<='
    }
    try_Value();
  }

  function parse_InExpr()
  {
    eventHandler.startNonterminal("InExpr", e0);
    parse_Attribute();
    lookahead1(8);                  // 'in'
    shift(33);                      // 'in'
    parse_ValueList();
    eventHandler.endNonterminal("InExpr", e0);
  }

  function try_InExpr()
  {
    try_Attribute();
    lookahead1(8);                  // 'in'
    shiftT(33);                     // 'in'
    try_ValueList();
  }

  function parse_RegexExpr()
  {
    eventHandler.startNonterminal("RegexExpr", e0);
    parse_Attribute();
    lookahead1(7);                  // '=~'
    shift(23);                      // '=~'
    parse_ExpValue();
    eventHandler.endNonterminal("RegexExpr", e0);
  }

  function try_RegexExpr()
  {
    try_Attribute();
    lookahead1(7);                  // '=~'
    shiftT(23);                     // '=~'
    try_ExpValue();
  }

  function parse_SubQueryExpr()
  {
    eventHandler.startNonterminal("SubQueryExpr", e0);
    parse_Attribute();
    lookahead1(6);                  // '=&'
    shift(22);                      // '=&'
    parse_Query();
    eventHandler.endNonterminal("SubQueryExpr", e0);
  }

  function try_SubQueryExpr()
  {
    try_Attribute();
    lookahead1(6);                  // '=&'
    shiftT(22);                     // '=&'
    try_Query();
  }

  function parse_ExistExpr()
  {
    eventHandler.startNonterminal("ExistExpr", e0);
    shift(31);                      // 'exists'
    parse_Attribute();
    eventHandler.endNonterminal("ExistExpr", e0);
  }

  function try_ExistExpr()
  {
    shiftT(31);                     // 'exists'
    try_Attribute();
  }

  function parse_IsnullExpr()
  {
    eventHandler.startNonterminal("IsnullExpr", e0);
    shift(35);                      // 'isnull'
    parse_Attribute();
    eventHandler.endNonterminal("IsnullExpr", e0);
  }

  function try_IsnullExpr()
  {
    shiftT(35);                     // 'isnull'
    try_Attribute();
  }

  function parse_IsemptyExpr()
  {
    eventHandler.startNonterminal("IsemptyExpr", e0);
    shift(34);                      // 'isempty'
    parse_Attribute();
    eventHandler.endNonterminal("IsemptyExpr", e0);
  }

  function try_IsemptyExpr()
  {
    shiftT(34);                     // 'isempty'
    try_Attribute();
  }

  function parse_ValueList()
  {
    eventHandler.startNonterminal("ValueList", e0);
    lookahead1(4);                  // '('
    shift(10);                      // '('
    parse_Value();
    for (;;)
    {
      lookahead1(11);               // ')' | ','
      if (l1 != 14)                 // ','
      {
        break;
      }
      shift(14);                    // ','
      parse_Value();
    }
    shift(11);                      // ')'
    eventHandler.endNonterminal("ValueList", e0);
  }

  function try_ValueList()
  {
    lookahead1(4);                  // '('
    shiftT(10);                     // '('
    try_Value();
    for (;;)
    {
      lookahead1(11);               // ')' | ','
      if (l1 != 14)                 // ','
      {
        break;
      }
      shiftT(14);                   // ','
      try_Value();
    }
    shiftT(11);                     // ')'
  }

  function parse_Value()
  {
    eventHandler.startNonterminal("Value", e0);
    lookahead1(20);                 // IntegerLiteral | DecimalLiteral | StringLiteral | 'date' | 'false' | 'true'
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
      case 30:                        // 'date'
        parse_DateVal();
        break;
      default:
        parse_BoolVal();
    }
    eventHandler.endNonterminal("Value", e0);
  }

  function try_Value()
  {
    lookahead1(20);                 // IntegerLiteral | DecimalLiteral | StringLiteral | 'date' | 'false' | 'true'
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
      case 30:                        // 'date'
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
    lookahead1(23);                 // ')' | '/i' | '/s' | '>' | 'and' | 'or'
    if (l1 == 17                    // '/i'
        || l1 == 18)                   // '/s'
    {
      switch (l1)
      {
        case 17:                      // '/i'
          shift(17);                  // '/i'
          break;
        default:
          shift(18);                  // '/s'
      }
    }
    eventHandler.endNonterminal("ExpValue", e0);
  }

  function try_ExpValue()
  {
    try_StrVal();
    lookahead1(23);                 // ')' | '/i' | '/s' | '>' | 'and' | 'or'
    if (l1 == 17                    // '/i'
        || l1 == 18)                   // '/s'
    {
      switch (l1)
      {
        case 17:                      // '/i'
          shiftT(17);                 // '/i'
          break;
        default:
          shiftT(18);                 // '/s'
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
      case 41:                        // 'true'
        shift(41);                    // 'true'
        break;
      default:
        shift(32);                    // 'false'
    }
    eventHandler.endNonterminal("BoolVal", e0);
  }

  function try_BoolVal()
  {
    switch (l1)
    {
      case 41:                        // 'true'
        shiftT(41);                   // 'true'
        break;
      default:
        shiftT(32);                   // 'false'
    }
  }

  function parse_DateVal()
  {
    eventHandler.startNonterminal("DateVal", e0);
    shift(30);                      // 'date'
    lookahead1(4);                  // '('
    shift(10);                      // '('
    lookahead1(0);                  // IntegerLiteral
    shift(1);                       // IntegerLiteral
    lookahead1(5);                  // ')'
    shift(11);                      // ')'
    eventHandler.endNonterminal("DateVal", e0);
  }

  function try_DateVal()
  {
    shiftT(30);                     // 'date'
    lookahead1(4);                  // '('
    shiftT(10);                     // '('
    lookahead1(0);                  // IntegerLiteral
    shiftT(1);                      // IntegerLiteral
    lookahead1(5);                  // ')'
    shiftT(11);                     // ')'
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
    memo[(e << 2) + i] = v;
  }

  function memoized(i, e)
  {
    var v = memo[(e << 2) + i];
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
  for (var i = 0; i < 45; i += 32)
  {
    var j = i;
    var i0 = (i >> 5) * 92 + s - 1;
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
      /*   0 */ 47, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 1,
      /*  36 */ 4, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1, 16, 17, 18, 1, 19,
      /*  65 */ 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 1,
      /*  92 */ 22, 1, 1, 21, 1, 23, 24, 25, 26, 27, 28, 29, 21, 30, 21, 21, 31, 32, 33, 34, 35, 21, 36, 37, 38, 39, 40, 21,
      /* 120 */ 41, 42, 21, 43, 44, 45, 46, 1
    ];

CMSParser.MAP1 =
    [
      /*   0 */ 108, 124, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 156, 181, 181, 181, 181,
      /*  21 */ 181, 214, 215, 213, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
      /*  42 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
      /*  63 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
      /*  84 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
      /* 105 */ 214, 214, 214, 247, 261, 385, 277, 331, 338, 354, 370, 314, 314, 314, 306, 432, 424, 432, 424, 432, 432,
      /* 126 */ 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 401, 401, 401, 401, 401, 401, 401,
      /* 147 */ 417, 432, 432, 432, 432, 432, 432, 432, 432, 292, 314, 314, 315, 313, 314, 314, 432, 432, 432, 432, 432,
      /* 168 */ 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 314, 314, 314, 314, 314, 314, 314, 314,
      /* 189 */ 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314,
      /* 210 */ 314, 314, 314, 431, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432,
      /* 231 */ 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 314, 47, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 256 */ 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1,
      /* 289 */ 16, 17, 18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 21, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      /* 323 */ 1, 1, 1, 1, 1, 1, 1, 12, 19, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 1, 22, 1,
      /* 352 */ 1, 21, 1, 23, 24, 25, 26, 27, 28, 29, 21, 30, 21, 21, 31, 32, 33, 34, 35, 21, 36, 37, 38, 39, 40, 21, 41,
      /* 379 */ 42, 21, 43, 44, 45, 46, 1, 2, 3, 1, 4, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 12, 12, 12, 12, 12, 12, 12, 12,
      /* 409 */ 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 1, 21, 21, 21, 21,
      /* 436 */ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21
    ];

CMSParser.MAP2 =
    [
      /*  0 */ 57344, 63744, 64976, 65008, 65536, 983040, 63743, 64975, 65007, 65533, 983039, 1114111, 1, 21, 1, 21, 21, 1
    ];

CMSParser.INITIAL =
    [
      /*  0 */ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      /* 29 */ 30, 31
    ];

CMSParser.TRANSITION =
    [
      /*    0 */ 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 768,
      /*   21 */ 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 876, 865, 768, 769, 769, 769, 769, 769,
      /*   42 */ 769, 769, 769, 769, 769, 769, 1096, 769, 1094, 769, 778, 769, 769, 1095, 769, 769, 769, 769, 769, 769, 769,
      /*   63 */ 769, 901, 902, 1198, 787, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 797, 807,
      /*   84 */ 860, 769, 769, 873, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 768, 769, 769, 1095, 769,
      /*  105 */ 769, 769, 769, 769, 769, 769, 769, 1210, 1208, 1208, 884, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769,
      /*  126 */ 769, 769, 1002, 949, 951, 894, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 990, 769,
      /*  147 */ 769, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 910, 768, 769, 769, 932,
      /*  168 */ 769, 769, 769, 769, 769, 769, 769, 769, 769, 984, 989, 1220, 768, 769, 769, 769, 769, 769, 769, 769, 769,
      /*  189 */ 769, 769, 769, 769, 769, 769, 933, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769,
      /*  210 */ 812, 942, 768, 1388, 960, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 770, 769, 768, 769, 769,
      /*  231 */ 1095, 769, 769, 769, 769, 769, 769, 769, 769, 959, 769, 847, 933, 768, 852, 769, 769, 769, 968, 977, 1096,
      /*  252 */ 769, 769, 769, 769, 769, 1268, 924, 1083, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 789,
      /*  273 */ 769, 1346, 1068, 768, 769, 998, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 1295, 1010, 1258, 768,
      /*  293 */ 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 1018, 1278, 1024, 768, 769, 769, 769, 769, 769,
      /*  314 */ 769, 769, 769, 769, 769, 769, 1109, 934, 769, 933, 768, 769, 769, 769, 769, 968, 977, 1096, 769, 769, 769,
      /*  335 */ 769, 1109, 934, 769, 933, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769,
      /*  356 */ 1034, 769, 769, 1095, 769, 769, 769, 769, 769, 769, 769, 769, 1109, 934, 1173, 799, 768, 1043, 769, 769,
      /*  376 */ 769, 968, 977, 1096, 769, 769, 769, 769, 1109, 934, 769, 933, 768, 769, 769, 1095, 769, 968, 977, 1096,
      /*  396 */ 769, 769, 769, 769, 1109, 934, 920, 933, 768, 769, 769, 769, 769, 968, 977, 1096, 769, 769, 769, 769, 1109,
      /*  417 */ 934, 817, 933, 768, 769, 769, 915, 769, 968, 977, 1096, 769, 769, 769, 769, 1109, 934, 1026, 1051, 768,
      /*  437 */ 769, 769, 769, 1140, 1059, 1076, 1096, 769, 769, 769, 769, 1109, 934, 822, 933, 768, 769, 769, 1095, 769,
      /*  457 */ 968, 977, 1096, 769, 769, 769, 769, 1109, 934, 769, 933, 768, 769, 769, 1322, 769, 769, 769, 769, 769, 769,
      /*  478 */ 769, 769, 1109, 1104, 1111, 1119, 768, 1127, 1238, 769, 1366, 769, 769, 769, 769, 769, 769, 769, 1109, 934,
      /*  498 */ 769, 933, 768, 769, 769, 769, 1342, 769, 1377, 1138, 769, 769, 769, 769, 1109, 934, 1064, 933, 768, 769,
      /*  518 */ 769, 769, 1148, 1150, 769, 769, 769, 769, 769, 769, 1109, 934, 769, 1158, 1166, 769, 769, 1095, 1181, 1196,
      /*  538 */ 769, 769, 769, 769, 769, 769, 1109, 934, 1188, 886, 768, 1206, 769, 1218, 769, 769, 769, 769, 769, 769,
      /*  558 */ 769, 769, 1109, 934, 769, 933, 768, 769, 769, 769, 769, 769, 842, 769, 769, 769, 769, 769, 1109, 934, 769,
      /*  579 */ 933, 1228, 769, 1236, 1095, 769, 769, 769, 769, 769, 769, 769, 769, 1109, 934, 1291, 933, 768, 769, 1130,
      /*  599 */ 769, 769, 1336, 969, 769, 769, 769, 769, 769, 1109, 934, 827, 933, 768, 769, 769, 1095, 1246, 769, 1254,
      /*  619 */ 1266, 769, 769, 769, 769, 1109, 934, 769, 933, 768, 1318, 769, 1401, 837, 779, 769, 769, 769, 769, 769,
      /*  639 */ 769, 1109, 934, 769, 933, 768, 1276, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 1109, 934, 769, 933,
      /*  660 */ 768, 769, 832, 1035, 769, 769, 769, 769, 769, 769, 769, 769, 1109, 934, 769, 933, 768, 769, 769, 769, 769,
      /*  681 */ 769, 769, 1090, 769, 769, 769, 769, 769, 769, 769, 1286, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769,
      /*  702 */ 769, 769, 769, 769, 1303, 1313, 1330, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 1354,
      /*  722 */ 1355, 1305, 768, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 1363, 769, 769,
      /*  743 */ 1374, 769, 769, 769, 769, 769, 769, 769, 769, 769, 769, 1385, 1396, 769, 769, 769, 769, 769, 769, 769, 769,
      /*  764 */ 769, 769, 769, 769, 33, 0, 0, 0, 0, 0, 0, 0, 0, 55, 640, 0, 0, 0, 0, 0, 0, 0, 86, 0, 1152, 0, 0, 0, 0, 0,
      /*  794 */ 0, 34, 35, 0, 37, 0, 0, 0, 0, 0, 0, 39, 544, 37, 0, 37, 37, 37, 0, 0, 0, 0, 45, 0, 0, 0, 0, 47, 0, 0, 0, 0,
      /*  826 */ 48, 0, 0, 0, 0, 49, 0, 0, 0, 0, 70, 0, 0, 0, 0, 77, 0, 0, 0, 0, 89, 0, 0, 0, 0, 302, 0, 0, 0, 0, 429, 302,
      /*  858 */ 0, 0, 33, 2944, 0, 0, 1280, 0, 0, 0, 0, 896, 50, 50, 0, 0, 0, 2944, 0, 0, 0, 0, 0, 50, 0, 0, 0, 1408, 0, 0,
      /*  888 */ 0, 0, 0, 0, 40, 544, 1536, 0, 1536, 1536, 1536, 0, 1536, 0, 0, 0, 1152, 0, 0, 0, 0, 1152, 56, 0, 56, 56,
      /*  914 */ 56, 0, 0, 0, 0, 3584, 0, 0, 0, 42, 0, 0, 0, 0, 0, 2611, 0, 0, 2176, 0, 0, 0, 0, 0, 0, 0, 544, 0, 2105, 0,
      /*  944 */ 2105, 2105, 2105, 2048, 2048, 0, 0, 0, 1536, 1536, 0, 0, 0, 0, 1536, 257, 0, 0, 0, 0, 0, 0, 0, 1792, 81, 0,
      /*  970 */ 0, 0, 0, 0, 0, 0, 4096, 87, 0, 0, 0, 0, 0, 91, 0, 0, 0, 1920, 0, 1920, 0, 0, 0, 0, 0, 0, 0, 1664, 0, 1024,
      /* 1000 */ 2688, 3328, 0, 0, 0, 0, 0, 1536, 0, 0, 3200, 0, 3200, 0, 0, 3252, 0, 3200, 0, 0, 3456, 0, 3456, 0, 0, 3456,
      /* 1026 */ 0, 0, 0, 0, 0, 0, 53, 0, 60, 0, 0, 0, 0, 0, 0, 0, 4736, 0, 0, 64, 0, 0, 0, 67, 68, 0, 53, 0, 0, 0, 0, 0,
      /* 1058 */ 544, 81, 0, 3968, 0, 5376, 0, 0, 0, 43, 0, 0, 0, 0, 0, 2875, 2875, 0, 87, 0, 4224, 0, 0, 0, 91, 0, 0, 0,
      /* 1086 */ 2560, 2560, 2611, 2611, 0, 0, 0, 4480, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 36, 0, 0, 0, 0, 0, 544, 0, 0, 0, 0,
      /* 1115 */ 0, 0, 54, 0, 0, 54, 0, 0, 0, 36, 36, 544, 0, 0, 65, 0, 0, 0, 0, 0, 71, 2432, 0, 0, 4608, 0, 0, 0, 0, 0, 0,
      /* 1146 */ 79, 0, 0, 5248, 0, 0, 0, 0, 0, 0, 85, 0, 0, 58, 0, 0, 0, 0, 0, 544, 33, 0, 0, 4352, 0, 0, 61, 0, 0, 39, 41,
      /* 1177 */ 0, 0, 0, 39, 4864, 0, 0, 0, 0, 0, 80, 0, 0, 40, 0, 0, 0, 0, 40, 0, 82, 0, 0, 0, 0, 0, 0, 1152, 0, 0, 63, 0,
      /* 1209 */ 0, 0, 0, 0, 0, 1408, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 1920, 0, 33, 0, 0, 0, 0, 0, 0, 5120, 69, 0, 0, 0, 0,
      /* 1241 */ 0, 0, 0, 2304, 0, 0, 0, 75, 0, 0, 0, 0, 4992, 0, 3840, 0, 88, 0, 0, 0, 0, 0, 3252, 3252, 0, 92, 0, 0, 0, 0,
      /* 1271 */ 0, 0, 0, 2560, 0, 62, 0, 0, 0, 0, 0, 0, 0, 3456, 0, 0, 0, 5504, 5504, 5504, 0, 0, 0, 44, 0, 0, 0, 0, 0,
      /* 1300 */ 3200, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 5760, 0, 38, 0, 38, 38, 38, 0, 0, 0, 66, 0, 0, 0, 0, 0, 3712, 0, 0,
      /* 1330 */ 33, 0, 0, 0, 0, 5632, 0, 0, 0, 83, 0, 84, 0, 0, 0, 76, 0, 0, 0, 0, 0, 2816, 0, 0, 0, 5760, 0, 0, 0, 0, 0,
      /* 1361 */ 0, 0, 33, 0, 3072, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 3072, 0, 0, 0, 0, 0, 90, 0, 0, 0, 768, 0, 0, 0, 0, 0, 0,
      /* 1393 */ 429, 0, 0, 768, 0, 768, 768, 768, 0, 0, 0, 73, 0, 0, 74, 0
    ];

CMSParser.EXPECTED =
    [
      /*   0 */ 46, 50, 160, 54, 58, 62, 66, 70, 90, 74, 103, 167, 172, 83, 87, 102, 93, 113, 107, 113, 111, 122, 98, 142,
      /*  24 */ 142, 119, 142, 126, 130, 134, 137, 115, 170, 79, 143, 141, 96, 77, 121, 148, 152, 143, 156, 144, 158, 164,
      /*  46 */ 2, 8, 16, 256, 1024, 2048, 4194304, 8388608, 67110912, 16793600, 525320, 67113216, 16793600, 2592,
      /*  60 */ 150996992, 805306368, 1073741846, 54001792, -2080373504, 151390208, 109088, -2080373504, 109088, 633376,
      /*  70 */ 633440, 66617472, 200853632, 8, 512, 0, 134217728, 0, 64, 0, 0, 48, 256, 0x80000000, 0, 393216, 8192, 65536,
      /*  88 */ 0, 12582912, 16, 4194304, 8388608, 0, 0, 1073741824, 0, 12, 0, 0, 16, 0, 134217728, 268435456, 536870912, 0,
      /* 106 */ 0, 16, 536870912, 1073741824, 0, 16, 536870912, 0, 0x80000000, 0, 0, 0, 2, 2, 4096, 0, 0, 0, 16,
      /* 125 */ 0x80000000, 4096, 2048, 128, 304, 513, 0, 12, 128, 2048, 76, 3072, 3072, 2, 4226, 0, 512, 0, 0, 0, 0, 1, 0,
      /* 148 */ 32, 256, 0, 1, 512, 0, 12, 64, 512, 0, 4, 8, 0, 0, 67109120, 18432, 4, 8, 0, 4, 6, 1073741824, 0, 2048, 0,
      /* 173 */ 128, 1048576, 33554432
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
      "'and'",
      "'avg'",
      "'count'",
      "'date'",
      "'exists'",
      "'false'",
      "'in'",
      "'isempty'",
      "'isnull'",
      "'max'",
      "'min'",
      "'not'",
      "'or'",
      "'sum'",
      "'true'",
      "'{'",
      "'||'",
      "'}'"
    ];

// End
