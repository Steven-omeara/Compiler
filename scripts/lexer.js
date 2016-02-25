/* lexer.js  */

    function lex()
    {
        // Grab the "raw" source code.
        var sourceCode = document.getElementById("taSourceCode").value;
        // Trim the leading and trailing spaces.
        sourceCode = trim(sourceCode);
		// TODO: remove all spaces in the middle; remove line breaks too.
		sourceCode = sourceCode.replace(/(?:\r\n|\r|\n)/g, '@');
		sourceCode = sourceCode.replace(/ /g,"#");
		sourceCode = sourceCode.replace(/\t/g,"#");
		//Start the lex with the given source code
		tokenize(sourceCode);
        return sourceCode;
    }
 
	function tokenize(SC)
	{
		//Create all the variables for the states
		var q0 = 0;
		var q1 = 1;
		var q2 = 2;
		var q3 = 3;
		var q4 = 4;
		var q5 = 5;
		var q6 = 6;
		var q7 = 7;
		var q8 = 8;
		var q9 = 9;
		var q10 = 10;
		var q11 = 11;
		var q12 = 12;
		var q13 = 13;
		var q14 = 14;
		var q15 = 15;
		var q16 = 16;
		var q17 = 17;
		var q18 = 18;
		var q19 = 19;
		var q20 = 20;
		var q21 = 21;
		var q22 = 22;
		var q23 = 23;
		var q24 = 24;
		var q25 = 25;
		var q26 = 26;
		var q27 = 27;
		var q28 = 28;
		var q29 = 29;
		var q30 = 30;
		var q31 = 31;
		var q32 = 32;
		var q33 = 33;
		var q34 = 34;
		var q35 = 35;
		var q36 = 36;
		var q37 = 37;
		var q38 = 38;
		var q39 = 39;
		var q40 = 40;
		var q41 = 41;
		var q42 = 42;
		var q43 = 43;
		var q44 = 44;
		var q45 = 45;
		var q46 = 46;
		var q47 = 47;
		var q48 = 48;
		var q49 = 49;
		var q50 = 50;
		var q51 = 51;
		var q52 = 52;
		
		//TODO: add returns/tokens
		var matrix =
		[
		   // a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | # | " | { | } | ( | ) | = | ! | + | $ | @ 
/*q0*/      [q1,q11,q1,q1,q1,q28,q1,q1,q7,q1,q1,q1,q1,q1,q1,q33,q1,q1,q18,q24,q1,q1,q2,q1,q1,q1,q50,q50,q50,q50,q50,q50,q50,q50,q50,q50,q0,q47,q38,q39,q40,q41,q44,q42,q46,q49,q0],
			//Start of ID check
/*q1*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q1,q51,q51,q51,q51,q51,q51,q51,q51,q51,q1],
			//End of ID check, start of While check
/*q2*/      [q51,q51,q51,q51,q51,q51,q51,q3,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q3*/      [q51,q51,q51,q51,q51,q51,q51,q51,q4,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q4*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q5,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q5*/      [q51,q51,q51,q51,q6,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q6*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q6,q51,q51,q51,q51,q51,q51,q51,q51,q51,q6],
			//End of While Check, Start of Int/If check
/*q7*/      [q51,q51,q51,q51,q51,q10,q51,q51,q51,q51,q51,q51,q51,q8,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q8*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q9,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q9*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q9,q51,q51,q51,q51,q51,q51,q51,q51,q51,q9],
/*q10*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q10,q51,q51,q51,q51,q51,q51,q51,q51,q51,q10],
			//End of Int/If check, Start of Boolean check
/*q11*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q12,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],			
/*q12*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q13,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q13*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q14,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q14*/     [q51,q51,q51,q51,q15,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q15*/     [q16,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q16*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q17,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q17*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q17,q51,q51,q51,q51,q51,q51,q51,q51,q51,q17],
			//End of Boolean check, start of String check
/*q18*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q19,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q19*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q20,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q20*/     [q51,q51,q51,q51,q51,q51,q51,q51,q21,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q21*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q22,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q22*/     [q51,q51,q51,q51,q51,q51,q23,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q23*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q23,q51,q51,q51,q51,q51,q51,q51,q51,q51,q23],
			//End of String check, start of True check
/*q24*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q25,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q25*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q26,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q26*/     [q51,q51,q51,q51,q27,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q27*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q27,q51,q51,q51,q51,q51,q51,q51,q51,q51,q27],
			//End of True check, start of False check
/*q28*/     [q29,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q29*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q30,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q30*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q31,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q31*/     [q51,q51,q51,q51,q32,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q32*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q32,q51,q51,q51,q51,q51,q51,q51,q51,q51,q32],
			//End of False check, start of Print check
/*q33*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q34,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q34*/     [q51,q51,q51,q51,q51,q51,q51,q51,q35,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q35*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q36,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q36*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q37,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q37*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q37,q51,q51,q51,q51,q51,q51,q51,q51,q51,q37],
			//End of Print Check, Starting Individual state checks. Starting with {
/*q38*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q38,q51,q51,q51,q51,q51,q51,q51,q51,q51,q38],
			// } token
/*q39*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q39,q51,q51,q51,q51,q51,q51,q51,q51,q51,q39],
			// ( token
/*q40*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q40,q51,q51,q51,q51,q51,q51,q51,q51,q51,q40],
			// ) token
/*q41*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q41,q51,q51,q51,q51,q51,q51,q51,q51,q51,q41],
			// != token
/*q42*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q43,q51,q51,q51,q51],
/*q43*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q43,q51,q51,q51,q51,q51,q51,q51,q51,q51,q43],
			// == token
/*q44*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q44,q51,q51,q51,q51,q51,q45,q51,q51,q51,q44],
/*q45*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q45,q51,q51,q51,q51,q51,q51,q51,q51,q51,q45],
			// + token
/*q46*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q46,q51,q51,q51,q51,q51,q51,q51,q51,q51,q46],
			//Start of String checker
		   // a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | # | " | { | } | ( | ) | = | ! | + | $ | @ 
/*q47*/     [q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q47,q48,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q48*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q48,q51,q51,q51,q51,q51,q51,q51,q51,q51,q48],
			//Check for end of prog
/*q49*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q49,q51,q51,q51,q51,q51,q51,q51,q51,q51,q49],
			//Check for Numbers
/*q50*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q50,q51,q51,q51,q51,q51,q51,q51,q51,q51,q50],
			//Error State
/*q51*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
		]
		
		//Make initial state
		var currState = q0;
		
		//Break check
		var breakBoolean = true;
		
		//Check NUM
		var checkNum = false;
		
		//check for line
		var lineNumber = 0;
		
		//Check for White Space
		var whiteSpace = 0;
		
		var errorState = false;
		
		var nonValidChar = false;

		var checkThings = "";
		
		for (i = 0; i < SC.length; i++)
		{
			if (errorState == true)
			{
				putMessage("ERROR on line " + lineNumber + " with character " + SC.charAt(i-1));
				lexCheck = false;
				break;
			}
			curr = SC.charAt(i);
			switch (curr)
			{
				//putMessage(curr);
				case 'a':
					currState = matrix[currState][0];
					//putMessage(currState);
					break;
				case 'b':
					currState = matrix[currState][1];
					break;
				case 'c':
					currState = matrix[currState][2];
					break;
				case 'd':
					currState = matrix[currState][3];
					break;
				case 'e':
					currState = matrix[currState][4];
					break;
				case 'f':
					currState = matrix[currState][5];
					break;
				case 'g':
					currState = matrix[currState][6];
					break;
				case 'h':
					currState = matrix[currState][7];
					break;
				case 'i':
					currState = matrix[currState][8];
					break;
				case 'j':
					currState = matrix[currState][9];
					break;
				case 'k':
					currState = matrix[currState][10];
					break;
				case 'l':
					currState = matrix[currState][11];
					break;
				case 'm':
					currState = matrix[currState][12];
					break;
				case 'n':
					currState = matrix[currState][13];
					break;
				case 'o':
					currState = matrix[currState][14];
					break;
				case 'p':
					currState = matrix[currState][15];
					break;
				case 'q':
					currState = matrix[currState][16];
					break;
				case 'r':
					currState = matrix[currState][17];
					break;
				case 's':
					currState = matrix[currState][18];
					break;
				case 't':
					currState = matrix[currState][19];
					break;
				case 'u':
					currState = matrix[currState][20];
					break;
				case 'v':
					currState = matrix[currState][21];
					break;
				case 'w':
					currState = matrix[currState][22];
					break;
				case 'x':
					currState = matrix[currState][23];
					break;
				case 'y':
					currState = matrix[currState][24];
					break;
				case 'z':
					currState = matrix[currState][25];
					break;
				case '0':
					currState = matrix[currState][26];
					break;
				case '1':
					currState = matrix[currState][27];
					break;
				case '2':
					currState = matrix[currState][28];
					break;
				case '3':
					currState = matrix[currState][29];
					break;
				case '4':
					currState = matrix[currState][30];
					break;
				case '5':
					currState = matrix[currState][31];
					break;
				case '6':
					currState = matrix[currState][32];
					break;
				case '7':
					currState = matrix[currState][33];
					break;
				case '8':
					currState = matrix[currState][34];
					break;
				case '9':
					currState = matrix[currState][35];
					break;
				case '#':
					currState = matrix[currState][36];
					break;
				case '"':
					currState = matrix[currState][37];
					break;
				case '{':
					currState = matrix[currState][38];
					break;
				case '}':
					currState = matrix[currState][39];
					break;
				case '(':
					currState = matrix[currState][40];
					break;
				case ')':
					currState = matrix[currState][41];
					break;
				case '=':
					currState = matrix[currState][42];
					break;
				case '!':
					currState = matrix[currState][43];
					break;
				case '+':
					currState = matrix[currState][44];
					break;
				case '$':
					currState = matrix[currState][45];
					break;
				case '@':
					currState = matrix[currState][46];
					lineNumber++;
					break;
				default:
					nonValidChar = true;
					break;
			}
			//putMessage(i + " and Curr is " + curr + " and the curr state is " + currState);
			if (nonValidChar == true)
			{
				putMessage("You have a non valid character, " + SC.charAt(i) + " on line number " + lineNumber );
				break;
			} 
			if (i == (SC.length - 1))
			{
				switch (currState)
				{
					case q1:
						putMessage("You found a ID token " + SC.charAt(i - whiteSpace));
						tokens.push(Token(SC.charAt(i - whiteSpace),"IdToken",lineNumber));
						//return tokens;
						break;
					/*
					case q3:
						lookAhead = SC.charAt(i + 1);
						checkThings = "wh";
						if(lookAhead != 'i')
						{
							putMessage("Found w id");
							putMessage("Found h id");
							checkThings = "";
							currState = q0;
						}
						break;
					case q4:
						lookAhead = SC.charAt(i + 1);
						checkThings = "whi";
						if(lookAhead != 'l')
						{
							putMessage("Found w id");
							putMessage("Found h id");
							putMessage("Found i id")
							checkThings = "";
							currState = q0;
						}
						break;
					case q5:
						lookAhead = SC.charAt(i + 1);
						checkThings = "whil";
						if(lookAhead != 'e')
						{
							putMessage("Found w id");
							putMessage("Found h id");
							putMessage("Found i id");
							putMessage("Found l id");
							checkThings = "";
							currState = q0;

						}
						break;
					*/
					case q6:
						putMessage("Found a While token");
						tokens.push(Token(null,"WhileToken",lineNumber));
						break;
					/*
					case q8:
						lookAhead = SC.charAt(i + 1);
						checkThings = "in";
						if(lookAhead != 't')
						{
							putMessage("Found i id");
							putMessage("Found n id");
							checkThings = "";
							currState = q0;
							break;
						}
					*/
					case q9:
						putMessage("Found a INT token");
						tokens.push(new Token("Int","TypeToken",lineNumber));
						break;
					case q10:
						putMessage("Found IF token");
						tokens.push(new Token(null,"IfToken",lineNumber));
						break;
					case q17:
						putMessage("Found Boolean token");
						tokens.push(new Token("Boolean","TypeToken",lineNumber));
						break;
					case q23:
						putMessage("Found String token");
						tokens.push(new Token("String","TypeToken",lineNumber));
						break;
					case q27:
						putMessage("Found True token");
						tokens.push(new Token("True","BoolVal",lineNumber));
						break;
					case q32:
						putMessage("Found False token");
						tokens.push(new Token("False","BoolVal",lineNumber));
						break;
					case q37:
						putMessage("Found Print token");
						tokens.push(new Token(null,"PrintToken",lineNumber));
						break;
					case q38:
						putMessage("Found { token");
						tokens.push(new Token(null,"LBraceToken",lineNumber));
						break;
					case q39:
						putMessage("Found } token");
						tokens.push(new Token(null,"RBraceToken",lineNumber));
						break;
					case q40:
						putMessage("Found ( token");
						tokens.push(new Token(null,"LParenToken",lineNumber));
						break;
					case q41:
						putMessage("Found ) token");
						tokens.push(new Token(null,"RParenToken",lineNumber));
						break;
					case q43:
						putMessage("Found != token");
						tokens.push(new Token("NotEqualToken","BoolOp",lineNumber));
						break;
					case q44:
						putMessage("Found = token");
						tokens.push(new Token(null,"SetEqualsToken",lineNumber));
						break;
					case q45:
						putMessage("Found == token");
						tokens.push(new Token("EquivlentToken","BoolOp",lineNumber));
						break;
					case q46:
						putMessage("Found + token");
						tokens.push(new Token(null,"PlusToken",lineNumber));
						break;
					case q48:
						putMessage("Found String Expression token");
						tokens.push(new Token(null,"StringExpToken",lineNumber));
						break;
					case q49:
						putMessage("Found $ token");
						tokens.push(new Token(null,"$Token",lineNumber));
						//var currToken = tokens.pop();
						//putMessage(currToken.getType());
						break;
					case q50:
						putMessage("Found a number " + SC.charAt(i));
						tokens.push(Token(SC.charAt(i),"NumberToken",lineNumber));
						break;
					case q51:
						putMessage("Error on line " + lineNumber + " with character " + SC.charAt(i));
						lexCheck = false;
						break;
					default:
						putMessage("You are currently in the middle of a phrase on line " + lineNumber + " at character " + SC.charAt(i));
						lexCheck = false;
						break;
				}
			}
			else
			{
				switch (currState)
				{
					case q1:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							whiteSpace = whiteSpace + 1;
							break;
						}
						else
						{
							putMessage("Found a ID token " + SC.charAt(i - whiteSpace));
							tokens.push(new Token(SC.charAt(i - whiteSpace),"IdToken",lineNumber));
							whiteSpace = 0;
							currState = q0;
							break;
						}
					/*
					case q2:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != 'h')
						{
							if(lookAhead == '#')
							{
								
								whiteSpace = whiteSpace + 1;
								currState = q1;
								break;
							}
							else
							{
								putMessage("Found w id");
								currState = q0;
								break;
							}
						}
						else
						{
							break;
						}
					case q3:
						lookAhead = SC.charAt(i + 1);
						checkThings = "wh";
						if(lookAhead != 'i')
						{
							putMessage("Found w id");
							putMessage("Found h id");
							checkThings = "";
							currState = q0;
						}
						break;
					case q4:
						lookAhead = SC.charAt(i + 1);
						checkThings = "whi";
						if(lookAhead != 'l')
						{
							putMessage("Found w id");
							putMessage("Found h id");
							putMessage("Found i id")
							checkThings = "";
							currState = q0;
						}
						break;
					case q5:
						lookAhead = SC.charAt(i + 1);
						checkThings = "whil";
						if(lookAhead != 'e')
						{
							putMessage("Found w id");
							putMessage("Found h id");
							putMessage("Found i id");
							putMessage("Found l id");
							checkThings = "";
							currState = q0;

						}
						break;
					*/
					case q6:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a While token!");
							tokens.push(new Token(null,"WhileToken",lineNumber));
							currState = q0;
							break;
						}
					case q7:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != 'n' && lookAhead != 'f')
						{
							if(lookAhead == '#' || lookAhead == '@')
							{
								
								whiteSpace = whiteSpace + 1;
								currState = q1;
								break;
							}
							else
							{
								putMessage("Found i id");
								tokens.push(new Token('i',"IdToken",lineNumber));
								currState = q0;
								break;
							}
						}
						else 
						{
							break;
						}
					/*
					case q8:
						lookAhead = SC.charAt(i + 1);
						checkThings = "in";
						if(lookAhead != 't')
						{
							putMessage("Found i id");
							putMessage("Found n id");
							checkThings = "";
							currState = q0;
							break;
						}
					*/
					case q9:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a INT token!");
							tokens.push(new Token("Int","TypeToken",lineNumber));
							currState = q0;
							break;
						}
					case q10:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a IF token!");
							tokens.push(new Token(null,"IfToken",lineNumber));
							currState = q0;
							break;
						}
					case q11:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != 'o')
						{
							if(lookAhead == '#' || lookAhead == '@')
							{
								
								whiteSpace = whiteSpace + 1;
								currState = q1;
								break;
							}
							else
							{
								putMessage("Found b id");
								tokens.push(new Token('b',"IdToken",lineNumber));
								currState = q0;
								break;
							}
						}
						else
						{
							break;
						}
					case q17:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a Boolean token");
							tokens.push(new Token("Boolean","TypeToken",lineNumber));
							currState = q0;
							break;
						}
					case q18:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != 't')
						{
							if(lookAhead == '#' || lookAhead == '@')
							{
								
								whiteSpace = whiteSpace + 1;
								currState = q1;
								break;
							}
							else
							{
								putMessage("Found s id");
								tokens.push(new Token('s',"IdToken",lineNumber));
								currState = q0;
								break;
							}
						}
						else
						{
							break;
						}
					case q23:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a String token");
							tokens.push(new Token("String","TypeToken",lineNumber));
							currState = q0;
							break;
						}
					case q24:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != 'r')
						{
							if(lookAhead == '#' || lookAhead == '@')
							{
								
								whiteSpace = whiteSpace + 1;
								currState = q1;
								break;
							}
							else
							{
								putMessage("Found t id");
								tokens.push(new Token('t',"IdToken",lineNumber));
								currState = q0;
								break;
							}
						}
						else
						{
							break;
						}
					case q27:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a True token");
							tokens.push(new Token("True","BoolVal",lineNumber));
							currState = q0;
							break;
						}
					case q28:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != 'a')
						{
							if(lookAhead == '#' || lookAhead == '@')
							{
								
								whiteSpace = whiteSpace + 1;
								currState = q1;
								break;
							}
							else
							{
								putMessage("Found f id");
								tokens.push(new Token('f',"IdToken",lineNumber));
								currState = q0;
								break;
							}
						}
						else
						{
							break;
						}
					case q32:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a False token");
							tokens.push(new Token("False","BoolVal",lineNumber));
							currState = q0;
							break;
						}
					case q33:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != 'r')
						{
							if(lookAhead == '#' || lookAhead == '@')
							{
								
								whiteSpace = whiteSpace + 1;
								currState = q1;
								break;
							}
							else
							{
								putMessage("Found p id");
								tokens.push(new Token('p',"IdToken",lineNumber));
								currState = q0;
								break;
							}
						}
						else
						{
							break;
						}
					case q37:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a Print token");
							tokens.push(new Token(null,"PrintToken",lineNumber));
							currState = q0;
							break;
						}
					case q38:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a { token");
							tokens.push(new Token(null,"LBraceToken",lineNumber));
							currState = q0;
							break;
						}
					case q39:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a } token");
							tokens.push(new Token(null,"RBraceToken",lineNumber));
							currState = q0;
							break;
						}
					case q40:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a ( token");
							tokens.push(new Token(null,"LParenToken",lineNumber));
							currState = q0;
							break;
						}
					case q41:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a ) token");
							tokens.push(new Token(null,"RParenToken",lineNumber));
							currState = q0;
							break;
						}
					
					case q43:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a != token");
							tokens.push(new Token("NotEqualToken","BoolOp",lineNumber));
							currState = q0;
							break;
						}
					case q44:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != '=')
						{
							putMessage("Found a = token");
							tokens.push(new Token(null,"SetEqualsToken",lineNumber));
							currState = q0;
							break;
						}
						else
						{
							break;
						}
					case q45:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a == token");
							tokens.push(new Token("EquivlentToken","BoolOp",lineNumber));
							currState = q0;
							break;
						}
					
					case q46:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a + token");
							tokens.push(new Token(null,"PlusToken",lineNumber));
							currState = q0;
							break;
						}
					case q48:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a String Expression token");
							tokens.push(new Token(null,"StringExpToken",lineNumber));
							currState = q0;
							break;
						}	
					case q49:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#' || lookAhead == '@')
						{
							break;
						}
						else
						{
							putMessage("Found a $ token");
							tokens.push(new Token(null,"$Token",lineNumber));
							currState = q0;
							break;
						}
					case q50:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead != '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9' || '0')
						{
							putMessage("Found a Number token " + SC.charAt(i));
							tokens.push(new Token(SC.charAt(i),"NumberToken",lineNumber));
							currState = q0;
							break;
						}
						else
						{
							break;
						}
					case q51:
						errorState = true;
						break;
					/*default:
						checkThings = checkThings + SC.charAt(i);
						putMessage(checkThings);
						break;
					*/
				}
			}
		}
	};

	function Token(value,type,currLineNumber)
	{
		this.value = value;
		this.type = type;
		this.currLineNumber = currLineNumber;
		this.getValue = function() 
		{
			return this.value;
		};
		this.getType = function()
		{
			return this.type;
		};
		this.getLN = function()
		{
			return this.currLineNumber;
		};
	};

	
    function putMessage(msg) 
    {
        document.getElementById("taOutput").value += msg + "\n";
    }