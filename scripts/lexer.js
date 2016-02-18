/* lexer.js  */

    function lex()
    {
        // Grab the "raw" source code.
        var sourceCode = document.getElementById("taSourceCode").value;
        putMessage("Checking the source code against the alphabet...");
        // Trim the leading and trailing spaces.
        sourceCode = trim(sourceCode);
		// TODO: remove all spaces in the middle; remove line breaks too.
		sourceCode = sourceCode.replace(/(?:\r\n|\r|\n)/g, '@');
		sourceCode = sourceCode.replace(/ /g,"#");
		//Check String off alphabet
		sourceCode = checkAlpha(sourceCode);
		//Start the lex with the given source code
		tokenize(sourceCode);
        return sourceCode;
    }
	
	function checkAlpha(SC)
	{
		//current alphabet of the grammar
        var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','1','2','3','4','5','6','7','8','9','0','#','"','{','}','$','(',')','=','!','+','@'];
        //run through the source code to see if it fits the alphabet
        for(i = 0; i < SC.length; i++)
        {
            curr = SC.charAt(i);
            for(j = 0; j < alpha.length; j++)
            {
              if(curr == alpha[j])
              {
                //putMessage(curr);
                //putMessage(curr + " is in the alphabet!");
                break;
              }
              if(j == alpha.length - 1 && curr != alpha[j])
              {
                putMessage("ERROR " + curr + " is NOT in the alphabet.");
              }
            }
        }
		return SC;
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
		
		//create the matrix
		//TODO: deal with the space issue for id's at q0,q2,q7, ADD = and NUMS
		var matrix =
		[
		   // a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | # | " | { | } | ( | ) | = | ! | + | $ | @ | =
/*q0*/      [q51,q11,q51,q51,q51,q28,q51,q51,q7,q51,q51,q51,q51,q51,q51,q33,q51,q51,q18,q24,q51,q51,q2,q51,q51,q51,q50,q50,q50,q50,q50,q50,q50,q50,q50,q50,q0,q47,q38,q39,q40,q41,q44,q42,q46,q49,q51],
			//Start of the While check
/*q1*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q2*/      [q51,q51,q51,q51,q51,q51,q51,q3,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q3*/      [q51,q51,q51,q51,q51,q51,q51,q51,q4,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q4*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q5,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q5*/      [q51,q51,q51,q51,q6,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q6*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q6,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//End of While Check, Start of Int/If check
/*q7*/      [q51,q51,q51,q51,q51,q10,q51,q51,q51,q51,q51,q51,q51,q8,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q8*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q9,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q9*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q9,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q10*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q10,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//End of Int/If check, Start of Boolean check
/*q11*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q12,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],			
/*q12*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q13,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q13*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q14,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q14*/     [q51,q51,q51,q51,q15,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q15*/     [q16,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q16*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,  q51,q51,q17,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q17*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q17,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//End of Boolean check, start of String check
/*q18*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q19,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q19*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q20,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q20*/     [q51,q51,q51,q51,q51,q51,q51,q51,q21,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q21*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q22,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q22*/     [q51,q51,q51,q51,q51,q51,q23,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q23*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q23,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//End of String check, start of True check
/*q24*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q25,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q25*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q26,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q26*/     [q51,q51,q51,q51,q27,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q27*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q27,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//End of True check, start of False check
/*q28*/     [q29,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q29*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q30,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q30*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q31,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q31*/     [q51,q51,q51,q51,q32,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q32*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q32,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//End of False check, start of Print check
/*q33*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q34,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q34*/     [q51,q51,q51,q51,q51,q51,q51,q51,q35,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q35*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q36,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q36*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q37,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q37*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q37,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//End of Print Check, Starting Individual state checks. Starting with {
/*q38*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q38,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			// } token
/*q39*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q39,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			// ( token
/*q40*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q40,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			// ) token
/*q41*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q41,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			// != token
/*q42*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q43,q51,q51,q51,q51],
/*q43*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q43,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			// == token
/*q44*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q45,q51,q51,q51,q51],
/*q45*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q45,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			// + token
/*q46*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q46,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//Start of String checker
/*q47*/     [q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q47,q48,q47,q47,q47,q47,q47,q47,q47,q47,q47],
/*q48*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q48,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//Check for end of prog
/*q49*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q49,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
			//Check for Numbers
/*q50*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q50,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],			
		]
		
		//Make initial state
		var currState = q0;
		
		//Break check
		var breakBoolean = true;
		
		//Check NUM
		var checkNum = false;
		
		for (i = 0; i <= SC.length; i++)
		{
			//curr = SC.charAt(i);
			//putMessage(i + " and Curr is " + curr + " and the curr state is " + currState);
			if (breakBoolean == false)
			{
				//SC = "nope";
				putMessage("Woo");
				break;
			}
			else if (i == SC.length)
			{
				switch (currState)
				{
					case q6:
						putMessage("Found a While token");
						break;
					case q9:
						putMessage("Found a INT token");
						break;
					case q10:
						putMessage("Found IF token");
						break;
					case q17:
						putMessage("Found Boolean token");
						break;
					case q23:
						putMessage("Found String token");
						break;
					case q27:
						putMessage("Found True token");
						break;
					case q32:
						putMessage("Found False token");
						break;
					case q37:
						putMessage("Found Print token");
						break;
					case q38:
						putMessage("Found { token");
						break;
					case q39:
						putMessage("Found } token");
						break;
					case q40:
						putMessage("Found ( token");
						break;
					case q41:
						putMessage("Found ) token");
						break;
					case q43:
						putMessage("Found != token");
						break;
					case q45:
						putMessage("Found == token");
						break;
					case q46:
						putMessage("Found + token");
						break;
					case q48:
						putMessage("Found String Expression token");
						break;
					case q49:
						putMessage("Found $ token");
						break;
					case q50:
						putMessage("Found a number");
						break;
				}
			}
			else
			{
				curr = SC.charAt(i);
				switch (currState)
				{
					case q6:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a While token!");
							currState = q0;
							i = i-1;
							break;
						}
					case q9:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a INT token!");
							currState = q0;
							i = i-1;
							break;
						}
					case q10:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a IF token!");
							currState = q0;
							i = i-1;
							break;
						}
					case q17:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a Boolean token");
							currState = q0;
							i = i-1;
							break;
						}
					case q23:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a String token");
							currState = q0;
							i = i-1;
							break;
						}
					case q27:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a True token");
							currState = q0;
							i = i-1;
							break;
						}
					case q32:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a False token");
							currState = q0;
							i = i-1;
							break;
						}
					case q37:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a Print token");
							currState = q0;
							i = i-1;
							break;
						}
					case q38:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a { token");
							currState = q0;
							i = i-1;
							break;
						}
					case q39:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a } token");
							currState = q0;
							i = i-1;
							break;
						}
					case q40:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a ( token");
							currState = q0;
							i = i-1;
							break;
						}
					case q41:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a ) token");
							currState = q0;
							i = i-1;
							break;
						}
					case q43:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a != token");
							currState = q0;
							i = i-1;
							break;
						}
					case q45:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a == token");
							currState = q0;
							i = i-1;
							break;
						}
					case q46:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a + token");
							currState = q0;
							i = i-1;
							break;
						}
					case q48:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a String Expression token");
							currState = q0;
							i = i-1;
							break;
						}
					case q49:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a $ token");
							currState = q0;
							i = i-1;
							break;
						}
					case q50:
						lookAhead = SC.charAt(i + 1);
						lookBehind = SC.charAt(i - 1);
						if (lookAhead == '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						//Its late and im not sure how this works but it does
						else if (lookBehind == '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' && curr != '#')
						{
							breakBoolean = false;
							break;
						}
						else
						{
							putMessage("Found a Number token");
							currState = q0;
							i = i-1;
							break;
						}
					default:
						//curr = SC.charAt(i);
						//putMessage(curr);
						if(curr == 'a')
						{
							currState = matrix[currState][0];
							//putMessage(currState);
							break;
						}
						else if(curr == 'b')
						{
							currState = matrix[currState][1];
							//putMessage(currState);
							break;
						}
						else if(curr == 'c')
						{
							currState = matrix[currState][2];
							//putMessage(currState);
							break;
						}
						else if(curr == 'd')
						{
							currState = matrix[currState][3];
							//putMessage(currState);
							break;
						}
						else if(curr == 'e')
						{
							currState = matrix[currState][4];
							//putMessage(currState);
							break;
						}
						else if(curr == 'f')
						{
							currState = matrix[currState][5];
							break;
						}
						else if(curr == 'g')
						{
							currState = matrix[currState][6];
							//putMessage(currState);
							break;
						}
						else if (curr == 'h')
						{
							currState = matrix[currState][7];
							//putMessage(currState);
							break;
						}
						else if(curr == 'i')
						{
							currState = matrix[currState][8];
							break;
						}
						else if(curr == 'j')
						{
							currState = matrix[currState][9];
							//putMessage(currState);
							break;
						}
						else if(curr == 'k')
						{
							currState = matrix[currState][10];
							//putMessage(currState);
							break;
						}
						else if(curr == 'l')
						{
							currState = matrix[currState][11];
							//putMessage(currState);
							break;
						}
						else if(curr == 'm')
						{
							currState = matrix[currState][12];
							//putMessage(currState);
							break;
						}
						else if(curr == 'n')
						{
							currState = matrix[currState][13];
							//putMessage(currState);
							break;
						}
						else if(curr == 'o')
						{
							currState = matrix[currState][14];
							//putMessage(currState);
							break;
						}
						else if(curr == 'p')
						{
							currState = matrix[currState][15];
							//putMessage(currState);
							break;
						}
						else if(curr == 'q')
						{
							currState = matrix[currState][16];
							//putMessage(currState);
							break;
						}
						else if (curr == 'r')
						{
							currState = matrix[currState][17];
							//putMessage(currState);
							break;
						}
						else if (curr == 's')
						{
							currState = matrix[currState][18];
							//putMessage(currState);
							break;
						}
						else if(curr == 't')
						{
							currState = matrix[currState][19];
							break;
						}
						else if(curr == 'u')
						{
							currState = matrix[currState][20];
							break;
						}
						else if(curr == 'v')
						{
							currState = matrix[currState][21];
							//putMessage(currState);
							break;
						}
						else if (curr == 'w')
						{
							currState = matrix[currState][22];
							//putMessage(currState);
							break;
						}
						else if (curr == 'x')
						{
							currState = matrix[currState][23];
							//putMessage(currState);
							break;
						}
						else if(curr == 'y')
						{
							currState = matrix[currState][24];
							//putMessage(currState);
							break;
						}
						else if(curr == 'z')
						{
							currState = matrix[currState][25];
							//putMessage(currState);
							break;
						}
						else if(curr == '0')
						{
							currState = matrix[currState][26];
							//putMessage(currState);
							break;
						}
						else if(curr == '1')
						{
							currState = matrix[currState][27];
							//putMessage(currState);
							break;
						}
						else if(curr == '2')
						{
							currState = matrix[currState][28];
							//putMessage(currState);
							break;
						}
						else if(curr == '3')
						{
							currState = matrix[currState][29];
							//putMessage(currState);
							break;
						}
						else if(curr == '4')
						{
							currState = matrix[currState][30];
							//putMessage(currState);
							break;
						}
						else if(curr == '5')
						{
							currState = matrix[currState][31];
							//putMessage(currState);
							break;
						}
						else if(curr == '6')
						{
							currState = matrix[currState][32];
							//putMessage(currState);
							break;
						}
						else if(curr == '7')
						{
							currState = matrix[currState][33];
							//putMessage(currState);
							break;
						}
						else if(curr == '8')
						{
							currState = matrix[currState][34];
							//putMessage(currState);
							break;
						}
						else if(curr == '9')
						{
							currState = matrix[currState][35];
							//putMessage(currState);
							break;
						}
						else if(curr == '#')
						{
							currState = matrix[currState][36];
							//putMessage(currState);
							break;
						}
						else if(curr == '"')
						{
							currState = matrix[currState][37];
							//putMessage(currState);
							break;
						}
						else if(curr == '{')
						{
							currState = matrix[currState][38];
							//putMessage(currState);
							break;
						}
						else if(curr == '}')
						{
							currState = matrix[currState][39];
							//putMessage(currState);
							break;
						}
						else if(curr == '(')
						{
							currState = matrix[currState][40];
							//putMessage(currState);
							break;
						}
						else if(curr == ')')
						{
							currState = matrix[currState][41];
							//putMessage(currState);
							break;
						}
						else if(curr == '=')
						{
							currState = matrix[currState][42];
							//putMessage(currState);
							break;
						}
						else if(curr == '!')
						{
							currState = matrix[currState][43];
							//putMessage(currState);
							break;
						}
						else if(curr == '+')
						{
							currState = matrix[currState][44];
							//putMessage(currState);
							break;
						}
						else if(curr == '$')
						{
							currState = matrix[currState][45];
							//putMessage(currState);
							break;
						}
				}
			}
		}
	}
	
    function putMessage(msg) 
    {
        document.getElementById("taOutput").value += msg + "\n";
    }