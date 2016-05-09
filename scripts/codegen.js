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
        			}
        		}
        		if(node.name == "Block")
        		{
        			block(node);
        		}
        		if(node.name == "If")
        		{
        			var doblock = evaluateBoolExpr(node);
        			jumptable.push(new addjump("J" + jcounter, 0));
        			jumpstart = currlocation;
        			addByte("J" + jcounter);
        			jcounter++;
        			if(doblock == true)
        			{
        				block(node.children[1]);
        				finallocation = ((currlocation - 1) - jumpstart).toString(16);
        				addtojump("J" + (jcounter - 1),finallocation);
        			}
        		}
        		if(node.name == "While")
        		{
                   
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
        			currhex.toUpperCase();
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
        		//console.log(jumptable[j].getDist()); 
        		//console.log(jumptable[j].getTemp());
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
		var doblock = true;
        var jumpstart;
        var finallocation;
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
        	addByte("AE");
        	addByte("T0");
        	addByte("XX");
        	addByte("EC");
        }
        else if(node.children[0].children[0].name == "False")
        {
        	addByte("AE");
        	addByte("T0");
        	addByte("XX");
        	addByte("EC");
        }
        else if(Number.isInteger(parseInt(node.children[0].children[0].name.valueOf())) == true)
        {
        	addByte("AE");
        	addByte("T0");
        	addByte("XX");
        	addByte("EC");
        }
        else if(node.children[0].children[0].name.charAt(0) == '"')
        {
        	doblock = false;
        }
        else
        {
        	if(scanSTforType(node.children[0].name) == "String")
        	{
        		doblock = false;
       		}	
        	else
        	{
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
        	addByte("D0");
        }
        else if(node.children[0].children[1].name == "False")
        {
        	addByte("T1");
        	addByte("XX");
        	addByte("D0");
        }
        else if(Number.isInteger(parseInt(node.children[0].children[1].name.valueOf())) == true)
        {
        	addByte("T1");
        	addByte("XX");
        	addByte("D0");		
        }
        else if(node.children[0].children[1].name.charAt(0) == '"')
        {
        	doblock = false;
        }
        else
        {
        	if(scanSTforType(node.children[0].name) == "String")
        	{
        		doblock = false;
        	}
        	else
        	{
        		addByte(scanST(node.children[0].children[1].name));
        		addByte("XX");
        		addByte("D0");
        	}
        }
        return doblock;
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