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
		//TODO: deal with the space issue for id's at q0,q2,q7
		var matrix =
		[
		   // a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | # | " | { | } | ( | ) | = | $ | ! | + | @
/*q0*/      [q51,q51,q51,q51,q51,q51,q51,q51,q7,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q2,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q0],
			//Start of the While check
/*q1*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q2*/      [q51,q51,q51,q51,q51,q51,q51,q3,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q3*/      [q51,q51,q51,q51,q51,q51,q51,q51,q4,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q4*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q5,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q5*/      [q51,q51,q51,q51,q6,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q6*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q6],
			//End of While Check, Start of Int/If check
/*q7*/      [q51,q51,q51,q51,q51,q10,q51,q51,q51,q51,q51,q51,q51,q8,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q8*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q9,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51],
/*q9*/      [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q9],
/*q10*/     [q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q51,q10],
		]
		
		//Make initial state
		var currState = q0;
		
		for (i = 0; i <= SC.length; i++)
		{
			putMessage(i + " and Curr is ");
			if (i == SC.length)
			{
				switch (currState)
				{
					case q6:
						putMessage("Found a While token!");
						//currState = q0;
						break;
					case q9:
						putMessage("Found a INT token!");
						break;
					case q10:
						putMessage("Found IF token");
						break;
				}
			}
			else
			{
				switch (currState)
				{
					case q6:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead = '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a While token!");
							currState = q0;
						}
					case q9:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead = '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a INT token!");
							currState = q0;
							break;
						}
					case q10:
						lookAhead = SC.charAt(i + 1);
						if (lookAhead = '#')
						{
							//putMessage("You are at the space loop");
							break;
						}
						else
						{
							putMessage("Found a IF token!");
							currState = q0;
							break;
						}
					default:
						curr = SC.charAt(i);
						putMessage(curr);
						if(curr == 'e')
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
						else if (curr == 'h')
						{
							currState = matrix[currState][7];
							//putMessage(currState);
							break;
						}
						else if(curr == 'i')
						{
							currState = matrix[currState][8];
							putMessage("You are at I");
							break;
						}
						else if(curr == 'l')
						{
							currState = matrix[currState][11];
							//putMessage(currState);
							break;
						}
						else if(curr == 'n')
						{
							currState = matrix[currState][13];
							break;
						}
						else if(curr == 't')
						{
							currState = matrix[currState][19];
							break;
						}
						else if (curr == 'w')
						{
							currState = matrix[currState][22];
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