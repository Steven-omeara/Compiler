function codegen(AST)
{
	var runtime = [];
	var statictable = [];
	var jumptable = [];
	var currlocation = 0;
	var currTregister = 2;
	var currheaplocation = 255;
	var currStaticEntry = new staticentry();
	var jcounter = 0;

	function staticentry(temp, vara, address, type)
	{
		this.temp = temp;
		this.vara = vara;
		this.address = address;
		this.type = type;

		this.getTemp = function()
		{
			return this.temp;
		};
		this.getVara = function()
		{
			return this.vara;
		};
		this.getAddress = function()
		{
			return this.address;
		};
		this.setAddress = function(address)
		{
			this.address = address;
		};
		this.getType = function()
		{
			return this.type;
		};
	}

	function addtojump(templocation, newaddress)
	{
		for (j = 0; j < jumptable.length; j++)
        {
        	if(jumptable[j].getTemp() == templocation)
        	{
        		//console.log(jumptable[j].getTemp() + " " + newaddress);
        		jumptable[j].setDist(newaddress);
        	}	
        } 
	}

	function addjump(temp, dist)
	{
		this.temp = temp;
		this.dist = dist;
		this.getTemp = function()
		{
			return this.temp;
		};
		this.setDist = function(dist)
		{
			this.dist = dist;
		}
		this.getDist = function()
		{
			return this.dist;
		}
	}

	function scanST(varname)
	{
		for(i = 0; i < statictable.length; i++)
		{
			if (varname == statictable[i].getVara())
			{
				return statictable[i].getTemp().substring(0,2);
				break;
			}
		}
	}

	function scanSTforType(varname)
	{
		for(i = 0; i < statictable.length; i++)
		{
			if (varname == statictable[i].getVara())
			{
				return statictable[i].getType();
				break;
			}
		}
	}

	for (var i = 0; i < 256; i++)
	{
		runtime[i] = "00";
	}

	statictable.push(new staticentry("T0XX", "Temp0", "none", "Int"));
	statictable.push(new staticentry("T1XX", "Temp1", "none", "Int"));

	function addByte(bytename)
	{
		runtime[currlocation] = bytename;
		if (document.getElementById("verboseoutput").checked == true && errorCount < 1)
		{
			putMessage("Added " + bytename + " to the runtime");
		}
		currlocation++;
	}

	function cgAST(AST)
	{
		 function expand(node)
        {

        	function block(node)
        	{
        		for (var i = 0; i < node.children.length; i++)
            	{
                	checkStmtList(node.children[i]);
            	}
        	}

        	function checkStmtList(node)
        	{
        		if(node.name == "varDecl")
        		{
        			if(node.children[0].name == "Int")
        			{
        				statictable.push(new staticentry("T" + currTregister + "XX", node.children[1].name, "+" + currlocation, "Int"));
        				addByte("A9");
        				addByte("00");
        				addByte("8D");
        				addByte("T" + currTregister);
        				currTregister += 1;
        				addByte("XX");
        			}
        			else if(node.children[0].name == "Boolean")
        			{
        				statictable.push(new staticentry("T" + currTregister + "XX", node.children[1].name, "+" + currlocation, "Boolean"));
        				addByte("A9");
        				addByte("00");
        				addByte("8D");
        				addByte("T" + currTregister);
        				currTregister += 1;
        				addByte("XX");
        			}
        			else if(node.children[0].name == "String")
        			{
        				statictable.push(new staticentry("T" + currTregister + "XX", node.children[1].name, "None", "String"));
                        currTregister += 1;
        			}
        		}
        		if(node.name == "Block")
        		{
        			block(node);
        		}
        		if(node.name == "If")
        		{	
        			//Evalueate Bool	
        			evaluateBoolExpr(node);

        			//add the D0
					addByte("D0"); 
					
					//Add new J
        			jumptable.push(new addjump("J" + jcounter, 0));
        			currJvalue1 = jcounter;
        			addByte("J" + jcounter);
        			jcounter++;
        			
        			
        			jumpstart = currlocation;
        			//console.log("The Jumpstart(IF): " + jumpstart);

        			//Evaluate the block
        			block(node.children[1]);

        			finallocation = (currlocation - jumpstart);
        			//console.log("The currlocation(IF): " + currlocation);
        			addtojump("J" + currJvalue1,finallocation);
        		}
        		if(node.name == "While")
        		{
        			//Get start of loop
                    var theStart = currlocation;
                    //console.log("The Start: " +theStart);

                    //Evaluate Bool expr
                    evaluateBoolExpr(node);

                    //add the D0
                    addByte("D0"); 

                    //Add new J to table                 
                    jumptable.push(new addjump("J" + jcounter, 0));
                    currJvalue = jcounter;        			
        			addByte("J" + jcounter);
        			jcounter++;

        			//Get the jumpstart
					beforeblock = currlocation;
					//console.log("The Jumpstart: " + beforeblock);

        			//Evalutate block normally
        			block(node.children[1]);

        			//Add the return
        			addByte("A2");
        			addByte("01");
        			addByte("EC");
        			addByte("FF");
        			addByte("00");
        			addByte("D0");

        			//Get the return back
        			whileReturn = (255 + theStart) - currlocation;
        			whileReturn = whileReturn.toString(16).toUpperCase();
        			addByte(whileReturn);

        			//fix
                    console.log("The jumpstart: " + beforeblock);
                    finallocation = (currlocation - beforeblock);
                    console.log("The final location: " + finallocation);
                    console.log("The currlocation: " + currlocation);
                    addtojump("J" + currJvalue,finallocation);

                 
        		}
        		if(node.name == "Assign")
        		{
        			if (node.children[1].name == "+")
        			{
        				assignid = scanST(node.children[0].name);
        				currNode = node.children[1];
        				passthroughs = 0;
        				
        				function addints(currNode)
        				{
        					if (currNode.children[1].name == "+")
        					{
        						//Load the accumulator with new value and add it to previous value
        						if(passthroughs == 0)
        						{
        							//Gotta add in first byte
        							addByte("A9");
        							addByte("0" + currNode.children[0].name);
        							addByte("8D");
        							addByte("T0");
        							addByte("XX");
        							passthroughs++;
        						}
        						else
        						{
        							addByte("A9");
        							addByte("0" + currNode.children[0].name);
        							addByte("6D");
        							addByte("T0");
        							addByte("XX");
        							addByte("8D");
        							addByte("T0");
        							addByte("XX");
        						}
        						addints(currNode.children[1]);
        					}
        					else
        					{
        						if(Number.isInteger(parseInt(currNode.children[1].name.valueOf())) == true)
        						{
        							if(passthroughs == 0)
        							{
        								//Gotta add in first byte
        								addByte("A9");
        								addByte("0" + currNode.children[0].name);
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Load the accumulator with right value
        								addByte("A9");
        								addByte("0" + currNode.children[1].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								//Do the final addition
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Assign the final value to the id of the var
        								addByte("AD");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte(assignid);
        								addByte("XX");
        							}
        							else
        							{
        								//Gotta add in first byte
        								addByte("A9");
        								addByte("0" + currNode.children[0].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								//Do the addition
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Load the accumulator with right value
        								addByte("A9");
        								addByte("0" + currNode.children[1].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								//Do the final addition
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Assign the final value to the id of the var
        								addByte("AD");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte(assignid);
        								addByte("XX");
        							}
        						}
        						//My type check will only let ints and variables through here
        						else
        						{
        							if(passthroughs == 0)
        							{
        								//Gotta add in first byte
        								addByte("A9");
        								addByte("0" + currNode.children[0].name);
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Load the accumulator with right value
        								addByte("AD");
        								addByte(scanST(currNode.children[1].name));
        								addByte("XX");
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Set up the add
        								addByte("AD");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte(assignid);
        								addByte("XX");
        							}
        							else
        							{
        								//Add the left number to the current number
        								addByte("A9");
        								addByte("0" + currNode.children[0].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Load the accumulator with right value
        								addByte("AD");
        								addByte(scanST(currNode.children[1].name));
        								addByte("XX");
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Set up print
        								addByte("AD");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte(assignid);
        								addByte("XX");
        							}
        						}
        					}
        				}
        				addints(currNode);
        			}
     				else
     				{
     					if(node.children[1].name == "True")
        				{
        					addByte("A9");
        					addByte("01");
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        				else if(node.children[1].name == "False")
        				{
        					addByte("A9");
        					addByte("00");
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        				else if(Number.isInteger(parseInt(node.children[1].name.valueOf())) == true)
        				{
        					addByte("A9");
        					addByte("0" + node.children[1].name);
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        				else if(node.children[1].name.charAt(0) == '"')
        				{
        					var theString = node.children[1].name.substring(1,(node.children[1].name.length - 1));
        					runtime[currheaplocation] == "00";
        					currheaplocation--;
        					for (i = (theString.length - 1); i >= 0; i--)
        					{
        						stringtohex = theString.charCodeAt(i).toString(16);
        						runtime[currheaplocation] = stringtohex;
        						currheaplocation--;
        					}
        					addByte("A9");
        					addByte((currheaplocation + 1).toString(16));
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        				else
        				{
        					addByte("AD");
        					addByte(scanST(node.children[1].name));
        					addByte("XX");
        					addByte("8D");
        					addByte(scanST(node.children[0].name));
        					addByte("XX");
        				}
        			}
        		}
        		if (node.name == "Print")
                {           
                	if (node.children[0].name == "+")
        			{
        				currNode = node.children[0];
        				passthroughs = 0;

        				addByte("A9");
        				addByte("0" + currNode.children[0].name);
        				addByte("8D");
        				addByte("T0");
        				addByte("XX");

        				function addints(currNode)
        				{
        					if (currNode.children[1].name == "+")
        					{
        						//Load the accumulator with new value and add it to previous value
        						if(passthroughs == 0)
        						{
        							passthroughs++;
        						}
        						else
        						{
        							addByte("A9");
        							addByte("0" + currNode.children[0].name);
        							addByte("6D");
        							addByte("T0");
        							addByte("XX");
        							addByte("8D");
        							addByte("T0");
        							addByte("XX");
        						}
        						addints(currNode.children[1]);
        					}
        					else
        					{
        						if(Number.isInteger(parseInt(currNode.children[1].name.valueOf())) == true)
        						{
        							if(passthroughs == 0)
        							{
        								//Load the accumulator with right value
        								addByte("A9");
        								addByte("0" + currNode.children[1].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								//Do the final addition
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								addByte("A2");
        								addByte("01");
        								addByte("AC");
        								addByte("T0");
        								addByte("XX");
        								addByte("FF");
        							}
        							else
        							{
        								//Load the accumulator with the value, add it and store it in T0
        								addByte("A9");
        								addByte("0" + currNode.children[0].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Do this again
        								addByte("A9");
        								addByte("0" + currNode.children[1].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Load the x value with 1, and load the acumulator with the value of t1 and print
        								addByte("A2");
        								addByte("01");
        								addByte("AC");
        								addByte("T0");
        								addByte("XX");
        								addByte("FF");
        							}
        						}
        						//My type check will only let ints and variables through here
        						else
        						{
        							if(passthroughs == 0)
        							{
        								//Load the accumulator with right value
        								addByte("AD");
        								addByte(scanST(currNode.children[1].name));
        								addByte("XX");
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Set up print
        								addByte("A2");
        								addByte("01");
        								addByte("AC");
        								addByte("T0");
        								addByte("XX");
        								addByte("FF");
        							}
        							else
        							{
        								//Add the left number to the current number
        								addByte("A9");
        								addByte("0" + currNode.children[0].name);
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Load the accumulator with right value
        								addByte("AD");
        								addByte(scanST(currNode.children[1].name));
        								addByte("XX");
        								addByte("6D");
        								addByte("T0");
        								addByte("XX");
        								addByte("8D");
        								addByte("T0");
        								addByte("XX");
        								//Set up print
        								addByte("A2");
        								addByte("01");
        								addByte("AC");
        								addByte("T0");
        								addByte("XX");
        								addByte("FF");
        							}
        						}
        					}
        				}
        				addints(currNode);
        			}
     				else
     				{
     					if(node.children[0].name == "True")
        				{
        					addByte("A0");
        					addByte("01");
        					addByte("A2");
        					addByte("01");
        					addByte("FF");
        				}
        				else if (node.children[0].name == "False")
        				{
        					addByte("A0");
        					addByte("00");
        					addByte("A2");
        					addByte("01");
        					addByte("FF");
        				}
        				else if(Number.isInteger(parseInt(node.children[0].name.valueOf())) == true)
        				{
        					addByte("A0");
        					addByte("0" + node.children[0].name);
        					addByte("A2");
        					addByte("01");
        					addByte("FF");
        				}
        				else if(node.children[0].name.charAt(0) == '"')
        				{
        					var theString = node.children[0].name.substring(1,(node.children[0].name.length - 1));
        					runtime[currheaplocation] == "00";
        					currheaplocation--;
        					for (i = (theString.length - 1); i >= 0; i--)
        					{
        						stringtohex = theString.charCodeAt(i).toString(16);
        						runtime[currheaplocation] = stringtohex;
        						currheaplocation--;
        					}
        					addByte("A0");
        					addByte((currheaplocation + 1).toString(16));
        					addByte("A2");
        					addByte("02");
        					addByte("FF");
        				}
        				else
        				{
        					if(scanSTforType(node.children[0].name) == "String")
        					{
        						addByte("AC");
        						addByte(scanST(node.children[0].name));
        						addByte("XX");
        						addByte("A2");
        						addByte("02");
        						addByte("FF");
        					}
        					else
        					{
        						addByte("AC");
        						addByte(scanST(node.children[0].name));
        						addByte("XX");
        						addByte("A2");
        						addByte("01");
        						addByte("FF");
        					}
        				}
        			}
                }               
        	}
        	if(node.name == "Block")
        	{
        		block(node);
        	}
        }

        expand(AST.root);

        function backpatch(statictable, runtime)
        {
        	for (j = 0; j < statictable.length; j++)
        	{
        		currlocation++;
        		if (currlocation < 16)
        		{
        			currhex = currlocation.toString(16);
        			currhex = "0" + currhex.toUpperCase();
        		}
        		else
        		{
        			currhex = currlocation.toString(16);
        			currhex = currhex.toUpperCase();
        		}
        		statictable[j].setAddress(currhex + " 00");		
        		for(k = 0; k < runtime.length; k++)
        		{
        			if(statictable[j].getTemp().substring(0,2) == runtime[k])
        			{
        				runtime[k] = currhex;
        				runtime[k + 1] = "00";
        			}
        		}
        	}
        }

        backpatch(statictable, runtime);

        function backpatchJump(jumptable, runtime)
        {
        	for (j = 0; j < jumptable.length; j++)
        	{
        		runtimeJump = jumptable[j].getDist();
        		if (runtimeJump < 16)
        		{
        			currhex = runtimeJump.toString(16);
        			currhex = "0" + currhex.toUpperCase();
        		}
        		else
        		{
        			currhex = runtimeJump.toString(16);
        			currhex.toUpperCase();
        		}
        		for(k = 0; k < runtime.length; k++)
        		{
        			if(jumptable[j].getTemp() == runtime[k])
        			{
        				runtime[k] = currhex;
        			}
        		}
        	}
        }

        backpatchJump(jumptable, runtime);

	}

	function evaluateBoolExpr(node)
	{
		var theStart;
        var jumpstart;
        //Add the values into the temp registers, first children
        if(node.children[0].children[0].name == "True")
        {
        	addByte("A9");
        	addByte("01");
        	addByte("8D");
        	addByte("T0");
        	addByte("XX");
        }
        else if(node.children[0].children[0].name == "False")
        {
        	addByte("A9");
        	addByte("00");
        	addByte("8D");
        	addByte("T0");
        	addByte("XX");
        }
        else if(Number.isInteger(parseInt(node.children[0].children[0].name.valueOf())) == true)
        {
        	addByte("A9");
        	addByte("0" + node.children[0].children[0].name.toUpperCase());
        	addByte("8D");
        	addByte("T0");
        	addByte("XX");
        }
        else if(node.children[0].children[0].name.charAt(0) == '"')
        {
        	
        }

        //Add the values to the temp registers, second children
        if(node.children[0].children[1].name == "True")
        {
        	addByte("A9");
        	addByte("01");
        	addByte("8D");
        	addByte("T1");
        	addByte("XX");
        }
        else if(node.children[0].children[1].name == "False")
        {
        	addByte("A9");
        	addByte("00");
        	addByte("8D");
        	addByte("T1");
        	addByte("XX");
        }
        else if(Number.isInteger(parseInt(node.children[0].children[1].name.valueOf())) == true)
        {
        	addByte("A9");
        	addByte("0" + node.children[0].children[1].name.toUpperCase());
        	addByte("8D");
        	addByte("T1");
        	addByte("XX");
        }
        else if(node.children[0].children[1].name.charAt(0) == '"')
        {
        	
        }

        //This is for comparing the registers
        if(node.children[0].children[0].name == "True")
        {
        	var theStart = currlocation;
        	addByte("AE");
        	addByte("T0");
        	addByte("XX");
        	addByte("EC");
        }
        else if(node.children[0].children[0].name == "False")
        {
        	var theStart = currlocation;
        	addByte("AE");
        	addByte("T0");
        	addByte("XX");
        	addByte("EC");
        }
        else if(Number.isInteger(parseInt(node.children[0].children[0].name.valueOf())) == true)
        {
        	var theStart = currlocation;
        	addByte("AE");
        	addByte("T0");
        	addByte("XX");
        	addByte("EC");
        }
        else if(node.children[0].children[0].name.charAt(0) == '"')
        {
        	
        }
        else
        {
        	if(scanSTforType(node.children[0].name) == "String")
        	{
        		
       		}	
        	else
        	{
        		var theStart = currlocation;
        		addByte("AE");
        		addByte(scanST(node.children[0].children[0].name));
        		addByte("XX");
        		addByte("EC");
        	}
        }

        //Same of the other child
        if(node.children[0].children[1].name == "True")
        {
        	addByte("T1");
        	addByte("XX");
        }
        else if(node.children[0].children[1].name == "False")
        {
        	addByte("T1");
        	addByte("XX");
        }
        else if(Number.isInteger(parseInt(node.children[0].children[1].name.valueOf())) == true)
        {
        	addByte("T1");
        	addByte("XX");
        }
        else if(node.children[0].children[1].name.charAt(0) == '"')
        {
        	
        }
        else
        {
        	if(scanSTforType(node.children[0].name) == "String")
        	{
        		
        	}
        	else
        	{
        		addByte(scanST(node.children[0].children[1].name));
        		addByte("XX");
        	}
        }
        addByte("A9");
	    addByte("00");
	    addByte("D0");
	    addByte("02");
	    addByte("A9");
	    addByte("01");
	    if(node.children[0].name== "!=")
	    {
	        addByte("A2");
	        addByte("00");
	        addByte("8D");
	        addByte("T0");
	        addByte("XX");
	        addByte("EC");
	        addByte("T0");
	        addByte("XX");
	    }
        return theStart;
    }

	function printST(stattable)
	{
		putST("Static table for Program 1:");
		putST("-----------------------------------");
		for (i = 0; i < stattable.length; i++)
		{
			putST("Temp: " + stattable[i].getTemp() + "  Var: " + stattable[i].getVara() + "  Address: " + stattable[i].getAddress())
		}
	}

	cgAST(AST);

	printST(statictable);

	return runtime;
}